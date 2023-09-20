<template>
  <header class="header">
    <nav>
      <ul class="nav-links">
        <li v-for="link in navs" :key="link.id">
          <router-link v-if="link.isRoute" :to="link.toRoute">
            {{ link.title }}
          </router-link>
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
          title: "列表",
          toRoute: "/list",
          isRoute: true, // 搞半天因为这里写错了，幸好用@click对router-link和标签进行了测试
        },
        {
          id: 4,
          title: "分类",
          toRoute: "/sort",
          isRoute: true,
        },
        {
          id: 5,
          title: "发布",
          toRoute: "/create",
          isRoute: true,
        },
        {
          id: 6,
          title: "项目",
          toRoute: "https://github.com/nexttime8",
          isRoute: false,
        },
        {
          id: 7,
          title: "Github",
          toRoute: "https://github.com/nexttime8",
          isRoute: false,
        },
        {
          id: 8,
          title: "关于",
          toRoute: "/about",
          isRoute: true,
        },
      ],
      isNavbarHidden: false,
      lastScrollTop: 0,
    };
  },
};
</script>

<style scoped lang="scss">
/* 顶部导航栏样式 */
/* #region */
.header {
  background-color: rgba(0, 0, 0, 0.787);
  color: #fff;
  padding: 0.625rem;
  nav {
    ul {
      list-style: none;
      display: flex;
      justify-content: center;
      li {
        margin: 0 10px;
        a {
          color: #fff;
          text-decoration: none;
        }
        router-link {
          cursor: pointer;
        }
      }
    }
  }
}

/* #endregion */
</style>
