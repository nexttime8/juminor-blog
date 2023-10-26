import Vue from "vue"
import VueRouter from "vue-router"
import About from "@/views/About"
import Article from "@/views/Article"
import Home from "@/views/Home"
import Sort from "@/views/Sort"
import Create from "@/views/Create"
import List from "@/views/List"
import { resetProgressBar } from "../utils"
Vue.use(VueRouter)

const router = new VueRouter({

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
      path: "/create",
      name: "Create",
      component: Create,
    },
    {
      path: "/article",
      name: "Article",
      component: Article,
    },/* 
    {
      path: '/article/:articleId',
      component: ArticleDetail,
      props: true
    }, */
    {
      path: "/list",
      name: "List",
      component: List,
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
router.beforeEach((to, from, next) => {
  // 在路由切换前，可以在这里执行一些操作
  // 例如：将进度条复位
  // 这里假设你有一个名为 resetProgressBar 的方法用来复位进度条
  resetProgressBar();
  // 继续路由切换
  next();
});

export default router;
