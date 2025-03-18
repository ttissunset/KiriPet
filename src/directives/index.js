// 该函数用于判断绑定元素是否进入视图区
import { useIntersectionObserver } from '@vueuse/core'

// 定义懒加载插件
export const lazyPlugin = {
  install(app) {
    //定义自定义指令
    app.directive('img-lazy', {
      mounted: (el, binding) => {
        //el: 指令绑定的那个元素 ---> img
        //binding:binding.value 是表达式等于号后面的值 -----> 这里指的是图片的url
        
        // 添加默认的加载中样式或占位图
        const defaultSrc = binding.arg || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+'
        el.src = defaultSrc
        
        // 使用IntersectionObserver进行懒加载
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 设置延迟，避免同时加载过多图片
            setTimeout(() => {
              //进入视口区域
              const img = new Image()
              img.src = binding.value
              img.onload = () => {
                el.src = binding.value
              }
              img.onerror = () => {
                // 加载失败时显示错误占位图
                el.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmaWxsOiM5OTk7Zm9udC1zaXplOjE2cHg7Zm9udC1mYW1pbHk6c2Fucy1zZXJpZjsiPuWbvueJh+WKoOi9veWksei0pTwvdGV4dD48L3N2Zz4='
              }
            }, 200)
            //stop():当第一次懒加载完成后，停止懒加载的监听，避免占用内存
            stop()
          }
        }, {
          // 增加阈值，使图片提前加载
          threshold: 0.1
        })
      },
    })
  },
}
