import Vue from "vue"
import App from "./App" // 可以不要vue后缀
import router from "@/router"

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router, // 一定要在入口文件引入并注册！
}).$mount("#app")
