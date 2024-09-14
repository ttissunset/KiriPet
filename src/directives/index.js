// 该函数用于判断绑定元素是否进入视图区
import { useIntersectionObserver } from '@vueuse/core'

// 定义懒加载插件
export const lazyPlugin = {
  install(app) {
    //定义自定义指令
    app.directive('img-lazy', {
      mounted: (el, binding) => {
        //el: 指令绑定的那个元素 ---> img
        //binding:binding.value 是表达式等于号后面的值 -----> 这里指的是图片的urfa-li
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          console.log(isIntersecting)
          if (isIntersecting) {
            //进入视口区域
            el.src = binding.value
            //stop():当第一次懒加载完成后，停止懒加载的监听，避免占用内存
            stop()
          }
        })
      },
    })
  },
}
