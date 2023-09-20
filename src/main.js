import Vue from "vue"
import App from "./App" // 可以不要vue后缀
import router from "@/router"

Vue.config.productionTip = false

import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
Vue.use(VMdEditor);

/* 预览markdown */
import '@kangc/v-md-editor/lib/style/base-editor.css';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
Vue.use(VMdPreview);
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

new Vue({
  render: (h) => h(App),
  router, // 一定要在入口文件引入并注册！
}).$mount("#app")
