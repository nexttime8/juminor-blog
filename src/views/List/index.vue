<template>
  <div class="container">
    <div
      v-for="(anchor, index) in titles"
      :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
      @click="handleAnchorClick(anchor)"
      :key="index"
    >
      <a style="cursor: pointer">{{ anchor.title }}</a>
    </div>
    <v-md-preview
      :text="content"
      @copy-code-success="handleCopyCodeSuccess"
      ref="preview"
    ></v-md-preview>
  </div>
</template>

<script>
// 查看文章列表详情
import { getArticles } from "@/api/article/list";
export default {
  name: "InfoComp",
  data() {
    return {
      content: "",
      titles: [],
    };
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
    handleAnchorClick(anchor) {
      const { preview } = this.$refs;
      const { lineIndex } = anchor;

      const heading = preview.$el.querySelector(
        `[data-v-md-line="${lineIndex}"]`
      );

      if (heading) {
        // 注意：如果你使用的是编辑组件的预览模式,则这里的方法名改为 previewScrollToTarget
        preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60,
        });
      }
    },
  },
  mounted() {
    this.getArticleDetail();
    const anchors =
      this.$refs.preview.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
    const titles = Array.from(anchors).filter(
      (title) => !!title.innerText.trim()
    );

    if (!titles.length) {
      this.titles = [];
      return;
    }

    const hTags = Array.from(
      new Set(titles.map((title) => title.tagName))
    ).sort();

    this.titles = titles.map((el) => ({
      title: el.innerText,
      lineIndex: el.getAttribute("data-v-md-line"),
      indent: hTags.indexOf(el.tagName),
    }));
  },
};
</script>

<style lang="scss" scoped>
.container {
  v-md-editor {
  }
}
</style>