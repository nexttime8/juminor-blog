<template>
  <div class="whole">
    <!-- 顶部导航栏 -->
    <WebHeader />
    <!-- 主内容区域，包含侧边栏和文章列表 -->
    <!-- <Article /> -->
    <router-view></router-view>
  </div>
</template>
<script>
// import Article from "@/views/Article"
import WebHeader from "@/components/WebHeader";

export default {
  name: "App",
  components: {
    // Article,
    WebHeader,
  },
};
</script>
<style lang="scss">
:root {
  --card-width: 25rem;
  --card-height: 34.375rem;
  --card-transition-duration: 800ms;
  --card-transition-easing: ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background-color: #f0f0f0;
  .whole {
    width: 100%;
    height: 100vh;
    router-view {
      width: 100%;
      height: 100%;
    }
  }
}

@media only screen and (max-width: 768px) {
  :root {
    --card-width: 18.75rem;
    --card-height: 25rem;
  }
}

@media only screen and (max-width: 480px) {
  :root {
    --card-width: 12.5rem;
    --card-height: 18.75rem;
  }
}
</style>
