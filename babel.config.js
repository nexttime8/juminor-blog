// babel.config.js
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // 配置 babel-plugin-import
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: "css", // true?
      },
    ],
  ],
}
