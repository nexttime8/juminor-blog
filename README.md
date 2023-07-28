# juminor-blog

# Project environment setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Blog setup

1. my start code
   1. vue create juminor-blog
   2. npm install ant-design-vue@1.7.8 --save
   3. npm install dayjs
   4. 删除 package.json 中 extends 的配置项"eslint:recommended"，解决未声明使用报错
   5. 在调用 Vue.use() 方法时，传入了一个不是 Vue 插件的对象，Vue.use() 方法用于安装 Vue.js 插件。所以报错：uncaught typeerror vue**webpack_imported_module_0**.use is not a function
   6. 不同版本引入的样式不同，1.7.8 是 antd.css，4.x 版本是 reset.css
   7. 使用 babel-plugin-import，实现按需引入，只需要引入对应的模块即可，js 和 css 会自动加载
      - npm install babel-plugin-import -D
      - 修改 babel.config.js 配置文件
      - 之后需要全局使用的模块就在 main.js 中注册，不是的就直接在各个组件里面注册使用
2. 用 ant-design-vue + vue2 实现个人博客
   1. 创建页面组件：根据个人博客网站的需求，创建相应的页面组件，例如首页、文章列表页、文章详情页、标签页等。
   2. 使用 Ant Design Vue 组件：在页面组件中使用 Ant Design Vue 提供的组件，例如按钮、导航栏、卡片、表单等。
   3. 实现功能：根据博客网站的功能需求，编写相应的业务逻辑和功能实现代码，例如文章的增删改查、评论功能、搜索功能等。
   4. 完善样式：根据设计需求，完善网站的样式和布局，可以使用 Ant Design Vue 提供的样式和组件进行快速布局。
   5. 部署上线：完成开发后，将项目打包并部署到服务器上，使博客网站能够在公网上访问。
3. 常用主题变量如下所示，所有主题变量:https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less
   ```
   @primary-color: #1890ff; // 全局主色
   @link-color: #1890ff; // 链接色
   @success-color: #52c41a; // 成功色
   @warning-color: #faad14; // 警告色
   @error-color: #f5222d; // 错误色
   @font-size-base: 14px; // 主字号
   @heading-color: rgba(0, 0, 0, 0.85); // 标题色
   @text-color: rgba(0, 0, 0, 0.65); // 主文本色
   @text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
   @disabled-color: rgba(0, 0, 0, 0.25); // 失效色
   @border-radius-base: 4px; // 组件/浮层圆角
   @border-color-base: #d9d9d9; // 边框色
   @box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影
   ```
4. antd 的样式是 less 写的，依赖于 less 和 less-loader
   - npm install --save less@3 less-loader@7
5. 两种方式定制主题 参考：https://1x.antdv.com/docs/vue/customize-theme-cn
   1. 配置 less 变量文件
   2. 在 vue.config.js 中定制主题
6. 按需载入两种方式
   1. 在 main.js 中全局注册，指定 components，哪些组件可以使用，使用 Vue 的 use 方法
      - components: { App },
      - import {Button} from 'ant-Design-vue'
      - Vue.use(Button)
   2. 在单个组件中注册，指定 components，要用哪些组件
      - components: { ALayout: Layout }
      - import { Layout } from "ant-design-vue"
7. 路由-引入、注册
   - npm install --save vue-router@3

# blog 移动端与 pc 端适配
