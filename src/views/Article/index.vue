<template>
  <div>
    <div class="change" v-show="notready">
      <div class="loading">
        <span>拼命加载中</span>
      </div>
    </div>
    <div class="container" v-show="!notready">
      <!-- 文章部分 -->
      <div class="article">
        <div class="info">
          <h1 style="font-weight: 900; font-size: 40px">{{ article.title }}</h1>
          <div>
            <p style="display: inline-block; margin-right: 20px">
              作者：{{ article.authorId }}
            </p>
            <p style="display: inline-block">
              发布时间：{{ article.categoryId }}
            </p>
          </div>
        </div>
        <v-md-preview
          :text="article.content"
          @copy-code-success="handleCopyCodeSuccess"
          v-model="article.content"
          ref="preview"
        >
        </v-md-preview>
      </div>
      <!-- 目录部分 -->
      <div class="catalog" :class="{ active: showSidebar }" ref="catalog">
        <h1 class="title">文章大纲</h1>
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
      <!-- 电梯导航部分 -->
      <div class="elevator-nav" v-if="titles.length">
        <div class="back-to-top" @click="scrollToTop">回到顶部</div>
      </div>
      <!-- 进度条部分 -->
      <div id="reading-progress-bar" :style="{ width: progressBarWidth }"></div>
    </div>
  </div>
</template>

<script>
// 查看文章列表详情
import { getArticles } from "@/api/article/list";
export default {
  name: "InfoComp",
  data() {
    return {
      article: {},
      titles: [],
      showSidebar: false, // 控制侧边栏的显示
      progressBarWidth: "0%", // 控制进度条的宽度
      notready: true,
    };
  },
  methods: {
    // 加载文章内容
    getArticleDetail() {
      getArticles(120)
        .then((response) => {
          this.article = response.data;

          // 数据已经被设置，稍等片刻以让Vue更新DOM
          this.$nextTick(() => {
            this.updateTitles();
          });

          // 设置 notready 为 false，以隐藏加载动画
          this.notready = false;
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
  created() {
    this.getArticleDetail();
  },
  mounted() {
    this.scrollHandler = this.onScroll;
    window.addEventListener("scroll", this.scrollHandler);
  },
};
</script>

<style lang="scss" scoped>
// 加载动画
.change {
  /* 100%窗口高度 */
  height: 100vh;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.787), #09203f);
  /* 弹性布局 水平、垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  .loading {
    width: 200px;
    height: 200px;
    box-sizing: border-box;
    border-radius: 50%;
    border-top: 10px solid #63a69f;
    /* 相对定位 */
    position: relative;
    /* 执行动画：动画a1 时长 线性的 无限次播放 */
    animation: a1 2s linear infinite;
    &::before,
    &::after {
      content: "";
      width: 200px;
      height: 200px;
      /* 绝对定位 */
      position: absolute;
      left: 0;
      top: -10px;
      box-sizing: border-box;
      border-radius: 50%;
    }
    &::before {
      border-top: 10px solid #f2e1ac;
      /* 旋转120度 */
      transform: rotate(120deg);
    }
    ::after {
      border-top: 10px solid #f2836b;
      /* 旋转240度 */
      transform: rotate(240deg);
    }
    span {
      /* 绝对定位 */
      position: absolute;
      width: 200px;
      height: 200px;
      line-height: 200px;
      text-align: center;
      color: #fff;
      /* 执行动画：动画a2 时长 线性的 无限次播放 */
      animation: a2 2s linear infinite;
    }
  }
}

/* 定义动画 */
@keyframes a1 {
  to {
    transform: rotate(360deg);
  }
}
@keyframes a2 {
  to {
    transform: rotate(-360deg);
  }
}
// 数据信息
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

  .article {
    .info {
      padding: 20px 35px;
    }
  }

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
    .title {
      margin-bottom: 10px;
    }
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
    .article {
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
    .article {
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

    .article {
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