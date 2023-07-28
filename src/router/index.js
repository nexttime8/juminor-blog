import Vue from "vue"
import VueRouter from "vue-router"
import About from "@/views/About"
import Article from "@/views/Article"
import Home from "@/views/Home"
import Sort from "@/views/Sort"
Vue.use(VueRouter)

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      name: "Home",
      component: Home, // 这里不要引号也不要大括号
    },
    {
      path: "/sort",
      name: "Sort",
      component: Sort,
    },
    {
      path: "/article",
      name: "Article",
      component: Article,
    },
    {
      path: "/about",
      name: "About",
      component: About,
    },
    {
      path: "*",
      redirect: "/home",
    },
  ],
})
