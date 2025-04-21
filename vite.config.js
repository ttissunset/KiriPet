import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 生产环境下启用打包分析
    process.env.ANALYZE === 'true' && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    // GZIP压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 10kb以上的文件才会被压缩
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // 图片压缩
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 启用source map
    sourcemap: false,
    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        // 删除console
        drop_console: true,
        // 删除debugger
        drop_debugger: true,
        // 优化更多压缩选项
        pure_funcs: ['console.log', 'console.info'],
        passes: 2,
      },
      format: {
        comments: false,
      }
    },
    // 代码分割策略
    rollupOptions: {
      output: {
        // 分包策略优化
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // 基础库单独打包
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vue-libs';
            }
            // UI和动画相关库单独打包
            if (id.includes('scrollreveal') || id.includes('vue3-smooth-scroll')) {
              return 'ui-libs';
            }
            // 工具库单独打包
            if (id.includes('lodash') || id.includes('axios') || id.includes('pinia')) {
              return 'utils';
            }
            // 其他第三方库
            return 'vendor';
          }
        },
        // 用于从入口点创建的块的打包输出格式
        entryFileNames: 'assets/js/[name].[hash].js',
        // 用于代码块的打包输出格式
        chunkFileNames: 'assets/js/[name].[hash].js',
        // 用于资源的打包输出格式
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)(\?.*)?$/.test(assetInfo.name)) {
            extType = 'img';
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'fonts';
          } else if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/.test(assetInfo.name)) {
            extType = 'media';
          } else if (/\.css$/.test(assetInfo.name)) {
            extType = 'css';
          }
          return `assets/${extType}/[name].[hash][extname]`;
        },
      },
    },
    // 启用CSS压缩
    cssMinify: true,
    // 启用构建缓存，提高重复构建速度
    commonjsOptions: {
      include: [],
    },
    // 设置chunk大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
  // 预渲染和静态资源优化
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'axios', 'lodash'],
  },
  // 开发服务器配置
  server: {
    open: false,
    cors: true,
    proxy: {},
  },
});
