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

# 快速创建Module和Component
修改 /easyGen/config.json 文件。
配置文件内容为Json字符串。
"modules": [{"page-title": "页面标题","url-path": "页面访问时的相对路径"}]
"components": [{"import-path": "引用组件的相对位置"}]

