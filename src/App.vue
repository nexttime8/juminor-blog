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
import WebHeader from "@/components/WebHeader"

export default {
  name: "App",
  components: {
    // Article,
    WebHeader,
  },
}
</script>
<style lang="css">
.whole {
  width: 100%;
}
router-view {
  width: 100%;
  height: 100%;
}
</style>
