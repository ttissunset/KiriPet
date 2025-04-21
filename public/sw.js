// 缓存版本号
const CACHE_NAME = 'kiripet-cache-v1';
const STATIC_CACHE_NAME = 'kiripet-static-v1';
const DYNAMIC_CACHE_NAME = 'kiripet-dynamic-v1';
const ASSETS_CACHE_NAME = 'kiripet-assets-v1';

// 需要优先缓存的静态资源列表
const STATIC_URLS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.webmanifest',
];

// 安装service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_URLS);
      }),
      self.skipWaiting()
    ])
  );
});

// 激活service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('kiripet-') && 
                 ![CACHE_NAME, STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME, ASSETS_CACHE_NAME].includes(cacheName);
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // 对静态资源和API请求采用不同的缓存策略
  if (event.request.method === 'GET') {
    
    // 对图片资源使用缓存优先策略
    if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
      event.respondWith(cacheFirstStrategy(event.request, ASSETS_CACHE_NAME));
      return;
    }
    
    // 对CSS和JS文件使用网络优先策略，但有缓存做备份
    if (event.request.url.match(/\.(css|js)$/)) {
      event.respondWith(networkFirstStrategy(event.request, STATIC_CACHE_NAME));
      return;
    }
    
    // 对字体文件使用缓存优先策略
    if (event.request.url.match(/\.(woff|woff2|ttf|otf|eot)$/)) {
      event.respondWith(cacheFirstStrategy(event.request, STATIC_CACHE_NAME));
      return;
    }
    
    // 对API请求使用网络优先策略
    if (url.pathname.includes('/api/')) {
      event.respondWith(networkFirstStrategy(event.request, DYNAMIC_CACHE_NAME));
      return;
    }
    
    // 对主页或HTML导航请求，总是尝试获取最新的版本
    if (url.pathname === '/' || url.pathname.endsWith('.html')) {
      event.respondWith(networkFirstThenCache(event.request, CACHE_NAME));
      return;
    }
    
    // 对其他请求使用缓存，然后再尝试网络
    event.respondWith(networkFirstStrategy(event.request, CACHE_NAME));
  }
});

// 缓存优先，网络作为备份的策略
async function cacheFirstStrategy(request, cacheName) {
  const cacheResponse = await caches.match(request);
  if (cacheResponse) {
    return cacheResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    // 克隆响应以便能够同时返回和缓存它
    const clonedResponse = networkResponse.clone();
    
    // 只缓存成功的响应
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, clonedResponse);
    }
    
    return networkResponse;
  } catch (error) {
    // 如果网络请求失败，尝试从缓存中获取
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// 网络优先，缓存作为备份的策略
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    // 克隆响应以便能够同时返回和缓存它
    const clonedResponse = networkResponse.clone();
    
    // 只缓存成功的响应
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, clonedResponse);
    }
    
    return networkResponse;
  } catch (error) {
    // 如果网络请求失败，尝试从缓存中获取
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// 网络优先，缓存作为备份的策略
async function networkFirstThenCache(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    // 克隆响应以便能够同时返回和缓存它
    const clonedResponse = networkResponse.clone();
    
    // 只缓存成功的响应
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, clonedResponse);
    }
    
    return networkResponse;
  } catch (error) {
    // 如果网络请求失败，尝试从缓存中获取
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
} 