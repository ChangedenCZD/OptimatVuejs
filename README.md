# optimat-vuejs

> 一个基于Vuejs+Webpack定义了开发规范的网页开发框架。

## Build Setup

``` bash
# 安装
npm install

# 在开发环境运行，url = localhost:8080
npm run dev

# 编译项目
npm run build
```
# 快速创建Module和Component
修改 /easyGen/config.json 文件。
config.json文件内容为Json字符串。
"modules": [{"page-title": "页面标题","url-path": "页面访问时的相对路径"}]
"components": [{"import-path": "引用组件的相对位置"}]
编辑完并保存config.json文件后，运行easyGen.bat即可。

# 目录结构

```js
|--- build  // 参考vue-cli生成的脚手架
|--- config // 参考vue-cli生成的脚手架
|--- easyGen // 快速创建Module和Component的工具
|--- dist // 编译后的文件
|--- src
	|--- api // 接口的封装
	|--- assets // 网页中的静态资源
	|--- components // 组件
	  |--- index.js // 组件中vue单文件的js引用
	  |--- index.scss // 组件中vue单文件的样式引用
	  |--- index.vue // 组件中vue单文件
	|--- module // 页面
    |--- config.json // 页面的配置文件
    |--- index.json // 入口文件，可自定义（自定义后在对应配置文件中修改module-entry字段）
    |--- module.js // 页面中默认vue单文件的js引用
    |--- module.scss // 页面中默认vue单文件的样式引用
    |--- module.vue // 页面中默认vue单文件
  |--- store // vuex 的实现
  |--- template // 快速生成工具的模板
  |--- utils // 工具类
  |--- main.js // 页面公用统一入口（用于统一处理共同的业务）
|--- static // 静态资源
|--- test // 测试文件目录
```
