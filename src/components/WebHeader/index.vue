<template>
  <header class="header">
    <nav>
      <!-- 静态结构 -->
      <!-- <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">文章</a></li>
        <li><a href="#">分类</a></li>
        <li><a href="#">项目</a></li>
        <li><a href="#">Github</a></li>
        <li><a href="#">关于我</a></li>
      </ul> -->
      <!-- 动态导航 -->
      <ul class="nav-links">
        <li v-for="link in navs" :key="link.id">
          <router-link v-if="link.isRoute" :to="link.toRoute">{{
            link.title
          }}</router-link>
          <a v-else :href="link.toRoute" target="_blank">{{ link.title }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "WebHeader",
  data() {
    return {
      navs: [
        {
          id: 1,
          title: "主页",
          toRoute: "/home",
          isRoute: true,
        },
        {
          id: 2,
          title: "博客",
          toRoute: "/article",
          isRoute: true, // 搞半天因为这里写错了，幸好用@click对router-link和标签进行了测试
        },
        {
          id: 3,
          title: "分类",
          toRoute: "/sort",
          isRoute: true,
        },
        {
          id: 4,
          title: "项目",
          toRoute: "https://github.com/nexttime8",
          isRoute: false,
        },
        {
          id: 5,
          title: "Github",
          toRoute: "https://github.com/nexttime8",
          isRoute: false,
        },
        {
          id: 6,
          title: "关于",
          toRoute: "/about",
          isRoute: true,
        },
      ],
      isNavbarHidden: false,
      lastScrollTop: 0,
    }
  },
  methods: {},
}
</script>

<style scoped lang="css">
/* 顶部导航栏样式 */
/* #region */
.header {
  background-color: #333;
  color: #fff;
  padding: 0.625rem;
}

.header nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
}

.header nav li {
  margin: 0 10px;
}

.header nav a {
  color: #fff;
  text-decoration: none;
}

router-link {
  cursor: pointer;
}

.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  /* ... 其他样式 ... */
}

/* #endregion */
</style>
