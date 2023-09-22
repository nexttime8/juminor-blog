<template>
  <div class="list-container">
    <!-- 内容搜索框 -->
    <div class="contentSearch">
      <input type="text" required />
      <label ref="labelRef"
        >please&nbsp;enter&nbsp;your&nbsp;search&nbsp;here</label
      >
    </div>
    <div class="articleList">
      <div
        class="item"
        v-for="article in articlesList"
        :key="article.articleId"
      ></div>
    </div>
  </div>
</template>

<script>
import { listArticles } from "@/api/article/list";
export default {
  name: "ArticleList",
  data() {
    return {
      articlesList: [],
      queryParams: {
        pageSize: 10,
        pageNum: 1,
      },
    };
  },
  methods: {
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
    getArticlesList(queryParams) {
      listArticles(queryParams)
        .then((response) => {
          this.articlesList = response.rows;
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching article:", error);
        });
    },
  },
  mounted() {
    this.typeAnimation();
    this.getArticlesList();
  },
};
</script>


<style lang="scss" >
@import url("https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");

.list-container {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 96.2vh; // 网页端适配
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.787), #09203f);
}

.contentSearch {
  position: relative;
  width: 450px;

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
      border-bottom-color: #fff;
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
</style>