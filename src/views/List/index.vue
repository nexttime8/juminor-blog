<template>
  <div class="container">
    <v-md-preview
      :text="content"
      @copy-code-success="handleCopyCodeSuccess"
      ref="preview"
      v-model="content"
    >
    </v-md-preview>
    <div class="catalog" :class="{ active: showSidebar }" ref="catalog">
      <div
        v-for="(anchor, index) in titles"
        :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
        @click="handleAnchorClick(anchor)"
        :key="index"
        class="item"
      >
        <a style="cursor: pointer">{{ anchor.title }}</a>
      </div>
    </div>
    <div class="elevator-nav" v-if="titles.length">
      <div class="back-to-top" @click="scrollToTop">回到顶部</div>
    </div>
    <div id="reading-progress-bar" :style="{ width: progressBarWidth }"></div>
  </div>
</template>

<script>
// 查看文章列表详情
import { getArticles } from "@/api/article/list";
export default {
  name: "InfoComp",
  data() {
    return {
      content: "   ## loading",
      titles: [],
      showSidebar: false, // 控制侧边栏的显示
      progressBarWidth: "0%", // 控制进度条的宽度
    };
  },
  methods: {
    getArticleDetail() {
      getArticles(120)
        .then((response) => {
          // console.log(response);
          this.content = response.data.content;

          // 数据已经被设置，稍等片刻以让Vue更新DOM
          this.$nextTick(() => {
            this.updateTitles();
          });
        })
        .catch((error) => {
          console.error("Error fetching article:", error);
        });
    },
    updateTitles() {
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
        offsetTop: el.offsetTop,
      }));
    },
    handleAnchorClick(anchor) {
      window.scrollTo({
        top: anchor.offsetTop,
        behavior: "smooth",
      });
    },
    handleCopyCodeSuccess(code) {
      alert(code + "复制成功");
    },
    // 回到顶部
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    // 监听滚动
    onScroll() {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;

      // 更新进度条的宽度
      this.progressBarWidth = `${progress}%`;

      // 检查是否滚动超过一屏
      if (window.scrollY > window.innerHeight) {
        this.showSidebar = true;
      }
    },
  },
  // 在组件被销毁前移除事件监听
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  mounted() {
    this.getArticleDetail();
    this.scrollHandler = this.onScroll;
    window.addEventListener("scroll", this.scrollHandler);
  },
};
</script>

<style lang="scss" scoped>
.container {
  --spacing-lg: 20px;
  --spacing-md: 15px;
  --spacing-sm: 10px;
  --spacing-xs: 5px;

  --catalog-width-lg: 12.5rem;
  --catalog-width-md: 15.625rem;
  --catalog-width-sm: 12.5rem;
  --catalog-width-xs: 6.25rem;

  padding: var(--spacing-lg);
  display: grid;
  grid-template-columns: 75% 25%;
  .catalog {
    position: fixed;
    top: var(--catalog-width-xs); // 距离页面顶部的距离
    right: var(--spacing-lg); // 距离页面左侧的距离
    border-radius: 3% 3% 3% 3%/1% 1% 1% 1%;
    padding-left: 10px;
    color: #a08a8a;
    opacity: 0;
    transform: translateX(110%);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    &.active {
      opacity: 1;
      transform: translateX(0);
    }
    .item {
      width: var(--catalog-width-lg);
    }
  }
  .elevator-nav {
    display: none;
    position: fixed;
    bottom: var(--spacing-sm); // 距离页面顶部的距离
    right: var(--spacing-sm); // 距离页面左侧的距离
    border-radius: 3% 3% 3% 3%/1% 1% 1% 1%;
    padding-left: 10px;
    color: #a08a8a;
    .back-to-top {
      cursor: pointer;
      background-color: #969ea2;
      color: #fff;
      padding: 5px 10px;
      border-radius: 3px;
      transition: background-color 0.3s;
      &:hover {
        background-color: darken(#383f43, 10%);
      }
    }
  }
}

// 适配大屏幕（大于 992px）
@media screen and (min-width: 993px) {
  .container {
    padding: var(--spacing-sm);
    font-size: 14px; // 减小字体大小
    .v-md-editor-preview {
      margin-left: 0 !important; // 取消左边距
    }
    .elevator-nav {
      bottom: var(--spacing-md); // 减小底部距离
      right: var(--spacing-md); // 减小右侧距离

      .back-to-top {
        padding: 3px 6px; // 减小内边距
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .container {
    padding: var(--spacing-sm);
    font-size: 14px; // 减小字体大小
    .v-md-editor-preview {
      margin-left: 0 !important; // 取消左边距
    }
    .elevator-nav {
      bottom: var(--spacing-sm); // 减小底部距离
      right: var(--spacing-sm); // 减小右侧距离

      .back-to-top {
        padding: 3px 6px; // 减小内边距
      }
    }
  }
}

// 适配小屏幕（小于或等于 480px）
@media screen and (max-width: 480px) {
  .container {
    // 在这里添加适用于小屏幕（如手机）的样式
    padding: var(--spacing-sm);
    font-size: 14px;

    .v-md-editor-preview {
      margin-left: 0 !important;
    }

    .elevator-nav {
      bottom: var(--spacing-xs);
      right: var(--spacing-xs);

      .back-to-top {
        padding: 3px 6px;
      }
    }
  }
}

#reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px; /* 可以自行调整高度 */
  background: #9fa0a1; /* 选择你喜欢的颜色 */
  width: 0%;
  z-index: 1000; /* 确保它在其他内容的上面 */
}
</style>