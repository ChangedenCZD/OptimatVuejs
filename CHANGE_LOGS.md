# 更新日志
## 2.2.2
#### 2018年6月1日08点57分
>修复easyGen在生成component时文件命名错误的问题

>优化vuex插件的部分功能

## 2.2.1
#### 2018年5月31日09点47分
>修复easyGen的一些Bugs

## 2.2.0
#### 2018年5月30日17点29分
>优化api的封装
```
GET请求
new ApiOptions(config.DEMO, GET).setParams({per_page: page}).request();

POST请求
new ApiOptions(config.DEMO, POST).setData({per_page: page}).request();

设置请求头
new ApiOptions(config.DEMO, POST).setData({per_page: page}).setHeaders({}).request();
```
>easyGen迎来升级
>>加入快速创建项目功能
```
// config.json
{
  "project": {
    "path": "项目相对路径"
  }
}
```
>>优化component的配置
```
// config.json
{
  "components": [
    "组件路径"
  }
}
```

## 2.1.0
#### 2018年3月24日11点24分
````
优化组件中样式的作用域
lib引入基础类Class，当中包含clone等静态方法
utils加入ObjectSupport，用于对象的操作
````
## 2.0.1
#### 2018年03月01日15:40:00
````
升级module模板，使得module中的文件结构更加简便
每个module中config.json的module-entry字段已经过时（不再生效）
````
## 2.0.0
#### 2018年03月01日11:41:00
````
升级component模板，使得导入component时更加简便
使用easyGen/componentUpgradeTo2.js能快速将现有的component升级至2.0版本
````
## 1.0.4
#### 2017年12月22日15:00:22
````
1.src/lib/BaseClass更名为src/lib/Context
````
## 1.0.3
#### 2017年12月19日15:00:21
````
1.优化网络请求模块，加入params的设置，加入静默请求模式
````
## 1.0.2
#### 2017年12月13日15:00:05
````
1.添加AlertDialog、ConfirmDialog、InputDialog、SelectorDialog四个公用组件
2.BaseModule加入setProps方法，用以动态配置vue单文件中的porps属性
3.优化Api的封装,更加简洁合理
````
## 1.0.1
#### 2017年12月12日16:45:45
````
1.加入Api封装规范
2.Module和Component改用class方式进行封装
3.修复了npm run dev可能出现OOM的问题
````
## 1.0.0
#### 2017年12月11日12:04:50
````
1.创建项目主体
2.加入快速生成Module和Component工具
3.引入Vuex模块
4.添加Loading和Toast两个公用组件
````
