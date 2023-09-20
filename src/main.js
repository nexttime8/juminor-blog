import Vue from "vue"
import App from "./App" // 可以不要vue后缀
import router from "@/router"

Vue.config.productionTip = false

// markdown编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
Vue.use(VueMarkdownEditor);
import hljs from 'highlight.js';

// 使用github主题
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs, // 高亮显示代码
  config: {
    toc: {
      includeLevel: [1, 2, 3, 4],
    },
  },
});

// markdown预览
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
Vue.use(VMdPreview);

// 默认使用vuepress主题
/* import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
VueMarkdownEditor.use(vuepressTheme); */

// 提示信息插件
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index';
import '@kangc/v-md-editor/lib/plugins/tip/tip.css';
VueMarkdownEditor.use(createTipPlugin());
VMdPreview.use(createTipPlugin());

// emoji插件
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
VueMarkdownEditor.use(createEmojiPlugin());
VMdPreview.use(createEmojiPlugin());

// 公式插件
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
VueMarkdownEditor.use(createKatexPlugin());
VMdPreview.use(createKatexPlugin());

// 流程图插件
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';
VueMarkdownEditor.use(createMermaidPlugin());
VMdPreview.use(createMermaidPlugin());

// 代码行号插件
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
VueMarkdownEditor.use(createLineNumbertPlugin());
VMdPreview.use(createLineNumbertPlugin());

// todolist插件
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
VueMarkdownEditor.use(createTodoListPlugin({ color: "#d2d2ffe7" }));
VMdPreview.use(createTodoListPlugin({ color: "#d2d2ffe7" }));

// 快速复制代码插件(有图标,但是没有复制)
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
VueMarkdownEditor.use(createCopyCodePlugin());
VMdPreview.use(createCopyCodePlugin());

// 内容定位插件_左中右
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';
VueMarkdownEditor.use(createAlignPlugin());
VMdPreview.use(createAlignPlugin());

new Vue({
  render: (h) => h(App),
  router, // 一定要在入口文件引入并注册！
}).$mount("#app")
