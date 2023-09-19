<template>
  <div>
    <v-md-editor v-model="text" height="600px"></v-md-editor>
    <v-md-editor :value="text" mode="preview"></v-md-editor>
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
    };
  },
  created() {
    this.getArticleDetail();
  },
  methods: {
    async getArticleDetail() {
      const response = await getArticles(Number("109"));
      this.ruleForm = response.data;
      const [authorName, categoryName] = await Promise.all([
        getCurrentAuthorName(this.ruleForm.authorId),
        getCurrentArticleCate(this),
      ]);
      this.authorName = authorName;
      this.categoryName = categoryName;
    },
  },
};
</script>