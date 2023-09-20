<template>
  <div class="container">
    <v-md-editor :value="content" mode="preview"></v-md-editor>
  </div>
</template>

<script>
// 查看文章列表详情
import { getArticles } from "@/api/article/list";
export default {
  name: "InfoComp",
  data() {
    return {
      text: "",
      content: "## 大标题 \n ### 小标题",
    };
  },
  mounted() {
    this.getArticleDetail();
  },
  methods: {
    getArticleDetail() {
      getArticles(115)
        .then((response) => {
          console.log(response);
          this.content = response.data.content;
        })
        .catch((error) => {
          console.error("Error fetching article:", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>