<template>
  <div class="list-container">
    <!-- 内容搜索框 -->
    <div class="vh">
      <div class="textEditor">
        <div class="titleBar">
          <span class="title"
            >typed.js — bash — 80x<span class="terminal-height">10</span></span
          >
        </div>
        <div class="textBody">
          $
          <span class="element"></span>
        </div>
      </div>
    </div>
    <div class="articleListContainer">
      <div class="contentSearch">
        <input type="text" required />
        <label ref="labelRef"
          >please&nbsp;enter&nbsp;your&nbsp;search&nbsp;here</label
        >
      </div>
      <div class="content">
        <div class="articleList">
          <a
            class="item sticky-box"
            :class="{ active: isCardActive(index, lineCount) }"
            v-for="(article, index) in articlesList"
            :key="article.articleId"
            @click="readArticle(article.articleId)"
          >
            <div class="background">
              <div class="image-container">
                <img
                  v-if="article.featuredImage"
                  :src="imageSrc(article.featuredImage)"
                  alt=""
                />
                <div class="overlay"></div>
              </div>
              <h3 class="title">{{ article.title }}</h3>
            </div>
            <div class="publicInfo">
              <p class="summary">{{ article.summary }}</p>
              <div class="line">
                <span class="publishTime"
                  ><svg-icon icon-class="date" />{{
                    formatTime(article.publishedAt)
                  }}</span
                >
                <span class="category"
                  ><svg-icon icon-class="tag" />{{
                    getCategoryName(article.categoryId)
                  }}</span
                >
              </div>
            </div>
            <div class="footer">
              <!-- <router-link
            v-for="tag in tagsList"
            :key="tag.articleId"
            to="/tags/{${tag.tags}}"
          >
          </router-link> -->
            </div>
          </a>
        </div>
        <div class="right">
          <div class="categoryList" :class="{ hidden: !showElement }">
            <h3>文章分类</h3>
            <ul>
              <li v-for="(category, index) in categoriesList" :key="index">
                <a href="/article/category">{{ category.name }}</a>
              </li>
            </ul>
          </div>
          <div class="recommendList" :class="{ hidden: !showElement }">
            <h3>文章推荐</h3>
            <ul>
              <li v-for="(category, index) in categoriesList" :key="index">
                <a href="/article/category">{{ category.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 获取文章列表请求
import { getArticlesList } from "@/utils/article/articlesList";
// 获取文章分类列表
import { getCategoryList } from "@/utils/article/articlesList";
// 格式化时间工具类
import { formatTime } from "@/utils/index";
// typed打字动画
import Typed from "typed.js";

export default {
  name: "ArticleList",
  data() {
    return {
      articlesList: [],
      total: 0,
      queryParams: {
        pageSize: 12,
        pageNum: 1,
      },
      categoriesList: [],
      // 控制分类和推荐的显示与隐藏
      showElement: false,
      lineCount: 3,
    };
  },
  methods: {
    // 输入框动画
    typeAnimation() {
      const label = document.querySelector(".contentSearch label");
      const textList = label.innerText.split("");

      label.innerHTML = textList
        .map(
          (letter, i) =>
            `<span style="transition-delay: ${i * 30}ms;filter: hue-rotate(${
              i * 10
            }deg);">${letter}</span>`
        )
        .join("");
    },
    // 获取文章列表
    getArticlesList() {
      getArticlesList(this, "published");
    },
    // 获取文章分类列表
    getCategoryList(vm) {
      getCategoryList(vm);
    },
    // 给图片路径拼接base路径
    imageSrc(featuredImage) {
      // 这里可以拼接 baseURL 和 featuredImage
      const baseURL = process.env.VUE_APP_BASE_API;
      return `${baseURL}${featuredImage}`;
    },
    // 导入的方法必须要实现？yes
    formatTime(time) {
      return formatTime(new Date(time).getTime());
    },
    // 获取文章分类名【要有错误处理】
    getCategoryName(categoryId) {
      // console.log(this.categoriesList);
      // 确保 categoriesList 已经加载
      if (this.categoriesList && this.categoriesList.length > 0) {
        // 使用 Array.find 或循环来查找匹配的 categoryId
        const category = this.categoriesList.find((category) => {
          // 要么写成(category)=>category.categoryId === categoryId;
          // 要么写成下面那样，上面的要写return
          /* console.log(
            category,
            category.categoryId,
            category.categoryId === categoryId
          ); */
          return category.categoryId === categoryId;
        });
        // console.log(category);
        // 如果找到匹配的 category，则返回它的名称，否则返回一个默认值或者 null
        return category ? category.name : "未分类";
      } else {
        // 如果 categoriesList 还没有加载，可以返回一个默认值或者 null
        return "未分类";
      }
    },
    // 跳转到阅读文章页面
    readArticle(articleId) {
      this.$router.push({
        name: "Article",
        params: { articleId },
        query: { articleId },
      });
    },
    // 根据滚动位置判断是否激活
    isCardActive(index, count) {
      // 计算一行中的第一个项目的索引
      const rowStartIndex = Math.floor(index / count) * count;
      // 计算一行中的最后一个项目的索引
      const rowEndIndex = rowStartIndex + (count - 1);
      // console.log(rowStartIndex, rowEndIndex);
      // 检查滚动位置是否在一行中的范围内
      const inRow = window.scrollY <= rowEndIndex * 140; // 值可修改！
      // 以下会导致来回移动
      // const inRow =
      //   window.scrollY >= rowStartIndex * 150 &&
      //   window.scrollY <= rowEndIndex * 150;
      return !inRow;
    },
    // 触发滚动事件时检测元素是否应该激活
    scrollTrigger() {
      const screenHeight = window.innerHeight - 100; // 获取屏幕高度
      const scrollY = window.scrollY;
      // console.log(screenHeight, scrollY);

      // 当滚动位置超过一屏高度时，显示元素
      if (scrollY > screenHeight) {
        this.showElement = true;
      } else {
        this.showElement = false;
      }

      this.$forceUpdate(); // 强制刷新以应用类绑定
    },
    // 返回一行中展示的文章数量
    calculatelineCount() {
      if (window.innerWidth >= 1200) {
        return 3;
      } else if (window.innerWidth >= 992) {
        return 2;
      } else {
        return 1;
      }
    },
    // 处理窗口大小变化
    handleWindowResize() {
      // console.log("窗口大小发生变化", this.calculatelineCount());
      this.lineCount = this.calculatelineCount();
    },
  },
  mounted() {
    this.typeAnimation();
    // 发请求获取文章数据
    this.getArticlesList();
    // 发请求获取文章分类列表
    this.getCategoryList(this);
    // 动态打字的配置项
    const options = {
      strings: ["First sentence.", "Second sentence."],
      typeSpeed: 60,
      loop: true,
    };
    // 使用Typed.js初始化动画
    new Typed(".element", options);
    // 初始化lineCount
    this.lineCount = this.calculatelineCount();
    window.addEventListener("scroll", this.scrollTrigger);
    // 监听窗口大小变化
    window.addEventListener("resize", this.handleWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollTrigger);
  },
  watch: {
    // 监听 window.innerWidth
    $data: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal.innerWidth !== oldVal.innerWidth) {
          this.lineCount = this.calculatelineCount();
        }
      },
    },
  },
};
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");

// 通用
.list-container {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;

  min-height: 96.2vh; // 网页端适配
  padding-bottom: 200px;
  .vh {
    height: 80vh;

    .textEditor {
      display: block;
      margin: 33vh auto;
      max-width: 33.125rem;
      border-radius: 0.635rem;
      box-shadow: rgba(0, 0, 0, 0.8) 0px 20px 70px;
      clear: both;
      overflow: hidden;
      -webkit-transition: all 0.5s ease-out;
      -moz-transition: all 0.5s ease-out;
      -ms-transition: all 0.5s ease-out;
      -o-transition: all 0.5s ease-out;
      transition: all 0.5s ease-out;
      .titleBar {
        padding: 5px 0;
        font-family: "Lucida Grande", sans-serif;
        font-size: 0.75em;
        text-align: center;
        text-shadow: rgba(255, 255, 255, 0.8) 0px 1px 0px;
        background-color: #f8f8f8;
        background-image: -webkit-linear-gradient(top, #e8e8e8, #bcbbbc);
        background-image: -moz-linear-gradient(top, #e8e8e8, #bcbbbc);
        background-image: linear-gradient(top, #e8e8e8, #bcbbbc);
        box-shadow: inset rgba(255, 255, 255, 0.7) 0px 1px 1px;
        border-bottom: #6a6a6a 1px solid;
      }
      .textBody {
        height: 250px;
        background-color: rgba(0, 0, 0, 0.85);
        padding: 10px;
        color: #f0f0f0;
        text-shadow: #000 0px 1px 0px;
        font-family: "Consolas", "Courier New", "Courier";
        font-size: 1.45em;
        line-height: 1.4em;
        font-weight: 500;
        text-align: left;
        overflow: hidden;
        -webkit-transition: all 0.5s ease-out;
        -moz-transition: all 0.5s ease-out;
        -ms-transition: all 0.5s ease-out;
        -o-transition: all 0.5s ease-out;
        transition: all 0.5s ease-out;
        .element {
          color: #f0f0f0;
          text-shadow: #000 0px 1px 0px;
          font-family: "Consolas", "Courier New", "Courier";
          font-size: 1.45em;
          line-height: 1.4em;
          font-weight: 500;
          text-align: left;
        }
      }
    }
  }
  .articleListContainer {
    .contentSearch {
      border-radius: 5px;
      margin: 0 0 3.875rem 11.875rem;

      position: relative;
      width: 450px;
      top: 30px;
      // background: linear-gradient(to bottom, rgba(0, 0, 0, 0.787), #09203f);

      input {
        width: 100%;
        padding-block: 10px;
        background-color: transparent;
        border: none;
        outline: none;
        border-bottom: 2px solid #999;

        color: #000000;
        letter-spacing: 0.05em;
        font-size: 1.25em;
        transition: 0.5s;

        &:focus,
        &:valid {
          border-bottom-color: #746060;
        }

        &:focus ~ label span,
        &:valid ~ label span {
          color: #0f0;
          text-shadow: 0 0 5px #0f0, 0 0 15px #0f0, 0 0 30px #0f0;
          transform: translateY(-30px);
        }
      }

      label {
        pointer-events: none; // 防止挡住input,使其不会捕获鼠标事件
        position: absolute;
        left: 0;
        margin: 2px 0 0 15px;

        font-size: 1.25em;
        color: #666;
        user-select: none;

        span {
          display: inline-flex;
          flex-direction: row;

          font-size: 1.25em;
          letter-spacing: 0.05em;
          transition: 0.25s cubic-bezier(0.5, 1, 0.5, 1.5);
        }
      }
    }
    .content {
      display: flex;
      flex-direction: row;
      justify-content: center;
      .articleList {
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        .item {
          cursor: pointer;
          display: block;
          text-decoration: none;
          color: #000;
          overflow: hidden;
          background-color: #fff;

          opacity: 0;
          transition: 0.5s;

          .background {
            position: relative; /* 为了包裹子元素 */
            width: 100%;
            height: 40%;
            .title {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2; /* 限制显示两行文本 */
              -webkit-box-orient: vertical;
              padding-top: 20px;
              margin-left: 10px;

              color: #fff; /* 文本颜色 */
            }
            .image-container {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%; /* 这里要设置高度 */
              overflow: hidden; /* 超出容器的部分将被裁剪 */
              z-index: -1; /* 将图片放在父元素的下面 */
              background-color: rgba(0, 0, 0, 0.187);
              border-radius: 2% 2% 2% 2%/5% 5% 5% 5%;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover; /* 居中展示图像并确保整个图像可见 */
              }
              .overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5); /* 半透明黑色蒙版 */
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
              }
            }
          }
          .publicInfo {
            height: 40%;
            padding: 0.2rem 1.2rem;

            .summary {
              display: -webkit-box;
              height: 126px;
              margin-bottom: 40px;
              padding-top: 25px;

              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;

              font-size: 16px;
              color: #374155;
            }
            .line {
              display: flex;
              flex-direction: row;
              justify-content: space-between;

              color: #8b8888;
              font-size: 13px;
              .svg-icon {
                margin-right: 6px;
              }
              .svg-icon:hover {
                fill: #fff;
                transition: fill 0.2s;
              }
              .category:hover {
                background-color: rgba(0, 0, 0, 0.687);
                color: #fff;
                border-radius: 3% 3% 3% 3%/10% 10% 10% 10%;
                padding: 0px;
                line-height: 20px;
                display: inline-block;
                transition: color 0.2s;
              }
            }
          }
          .footer {
            height: 20%;
          }
        }
        .sticky-box {
          position: -webkit-sticky;
          position: sticky;
        }
      }
      .right {
        .categoryList,
        .recommendList {
          width: 25%;
          min-width: 200px;
          position: fixed;
          right: 30px;
          top: 50px;
          overflow: hidden;
          border-radius: 9px;
          background-color: #fff;
          box-shadow: rgb(158 151 151 / 80%) 0px 4px 14px;

          transition: opacity 1s;
          transform: translateX(0px);
          h3 {
            margin: 10px 20px;
            padding: 5px;
            line-height: 30px;
            font-weight: 400;
            border-bottom: 1px solid #e8e9e7;
            color: #383937;
            position: relative;
            font-size: 18px;
          }
          ul {
            list-style: none; // 去除默认样式
            overflow: hidden;
            border-radius: 9px;
            li {
              display: block;
              transition: all 0.4s;
              height: 40px;
              line-height: 39px;
              position: relative;
              z-index: 1;
              a {
                display: block;
                margin: 0 30px;
                height: 39px;
                transition: none;
                text-decoration: none;
                color: #787977;
              }
              a:hover {
                background-color: #d7d7d7;
              }
            }
          }
        }
        .recommendList {
          right: 30px;
          top: 505px;
        }

        /* 设置初始状态 */
        .categoryList.hidden,
        .recommendList.hidden {
          opacity: 0;
          transform: translateX(200%);
        }

        /* 设置显示状态 */
        .categoryList:not(.hidden),
        .recommendList:not(.hidden) {
          opacity: 1;
          transform: translateX(0px);
        }
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .list-container {
    .articleListContainer {
      .contentSearch {
        border-radius: 5px;
        margin: 0 0 3.875rem calc(37% - 119px) !important;

        position: relative;
        width: 450px;
        top: 30px;
        // background: linear-gradient(to bottom, rgba(0, 0, 0, 0.787), #09203f);

        input {
          width: 100%;
          padding-block: 10px;
          background-color: transparent;
          border: none;
          outline: none;
          border-bottom: 2px solid #999;

          color: #fff;
          letter-spacing: 0.05em;
          font-size: 1.25em;
          transition: 0.5s;

          &:focus,
          &:valid {
            border-bottom-color: #746060;
          }

          &:focus ~ label span,
          &:valid ~ label span {
            color: #0f0;
            text-shadow: 0 0 5px #0f0, 0 0 15px #0f0, 0 0 30px #0f0;
            transform: translateY(-30px);
          }
        }

        label {
          pointer-events: none; // 防止挡住input,使其不会捕获鼠标事件
          position: absolute;
          left: 0;
          margin: 2px 0 0 15px;

          font-size: 1.25em;
          color: #666;
          user-select: none;

          span {
            display: inline-flex;
            flex-direction: row;

            font-size: 1.25em;
            letter-spacing: 0.05em;
            transition: 0.25s cubic-bezier(0.5, 1, 0.5, 1.5);
          }
        }
      }
      .content {
        .articleList {
          width: 900px;
          margin-right: 30%; /* 添加这一行 */
          .item {
            width: 264px;
            height: 330px;
            border-radius: 0.3rem;
            margin: 0.5rem;
            text-decoration: none;
            color: #000;
            overflow: hidden;
            box-shadow: rgba(202, 188, 188, 0.8) 0px 2px 4px;
            opacity: 0;
            transition: 0.5s;

            .background {
              .title {
              }
              .image-container {
                img {
                }
                .overlay {
                }
              }
            }
            .publicInfo {
              .summary {
              }
              .line {
                .svg-icon {
                }
                .svg-icon:hover {
                }
                .category:hover {
                }
              }
            }
            .footer {
            }
          }

          .item:nth-child(3n + 1) {
            transform: translate(-500px, -100px) scale(0.8);
          }
          .item:nth-child(3n + 2) {
            transform: translate(-150px, 200px) scale(0.8);
          }
          .item:nth-child(3n) {
            transform: translate(500px, -100px) scale(0.8);
          }
          .item.active {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
        }
        .right {
          .categoryList {
            h3 {
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .articleListContainer {
    .contentSearch {
      margin: 0 0 3.875rem calc(37% - 119px) !important;
    }
    .articleList {
      margin: 0 auto !important;
      width: 900px !important;
      .item {
        width: 265px !important;
        width: calc(37% - 18px) !important;
        margin: 14px;
        opacity: 1 !important;
        height: 370px;
      }
      .item:nth-child(2n + 1) {
        transform: translate(-500px, -100px) scale(0.8);
      }
      .item:nth-child(2n) {
        transform: translate(500px, -100px) scale(0.8);
      }
      .item.active {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
    }

    .right {
      .categoryList {
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .vh {
  }
  .articleListContainer {
    .contentSearch {
      margin: 0 0 3.875rem 7.875rem !important;
      input {
        width: 75% !important;
        margin-left: 1.25rem;
      }
      label {
        font-size: 0.9rem !important;
        margin: 6px 0 0 40px !important;
      }
    }
    .content {
      .articleList {
        width: 80% !important;
        margin: 0 !important;
        .item {
          width: 25.9rem !important;
          opacity: 1 !important;
          .background {
            p {
              font-size: 13px;
            }
          }
        }
        .item:nth-child(2n + 1) {
          transform: translate(-500px, -100px) scale(0.8);
        }
        .item:nth-child(2n) {
          transform: translate(500px, -100px) scale(0.8);
        }
        .item.active {
          transform: translate(0, 0) scale(1);
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .list-container {
    .vh {
    }
    .articleListContainer {
      .contentSearch {
        position: relative;
        top: 0px;
        margin: 0 auto !important;
        width: 275px !important;
        input {
          letter-spacing: 0.03em;
          width: 95% !important;
          margin-left: 8px;
          &:focus ~ label span,
          &:valid ~ label span {
            transform: translateY(-10px);
          }
        }
        label {
          font-size: 1em;
          margin: 1px 0 0 0px !important;
          font-size: 0.8rem !important;
        }
      }
      .content {
        .articleList {
          width: 70% !important;
          margin: 0 !important;
          .item {
            opacity: 1 !important;
            transform: translate(-500px, -100px) scale(0.8);
            .background {
              p {
                font-size: 13px;
              }
            }
          }
          .item.active {
            transform: translate(0, 0) scale(1);
          }
        }
        .recommendList,
        .categoryList {
          display: none;
        }
      }
    }
  }
}
</style>