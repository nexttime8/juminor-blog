<template>
  <div class="container">
    <v-md-editor
      :value="content"
      @copy-code-success="handleCopyCodeSuccess"
      left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link img code | todo-list emoji | save"
    ></v-md-editor>
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
      getArticles(120)
        .then((response) => {
          console.log(response);
          this.content = response.data.content;
        })
        .catch((error) => {
          console.error("Error fetching article:", error);
        });
    },
    // 没什么没有成功触发?
    handleCopyCodeSuccess(code) {
      console.log(code);
      console.log(123);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  v-md-editor {
  }
}
</style>