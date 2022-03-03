# vite-saber-blog

一个基于 vite+react 的博客展示页面

## 页面设置

### 主页

不登陆就显示所有文章,页面分两栏，左边显示文章，右边显示标签，推荐文章，和一些杂项块
登录就在中间添加我的文章一栏，选择后左边分类和右边的标签切换为个人的数据

### 文章详情

点击文章后，跳转到该页面
页面两栏展示，中间展示文章，右边展示作者信息，推荐文章

### 个人中心

## 后续问题记录

各种加载动画，比如，在后续还可以考虑骨架屏
下拉加载
react 知识又生疏了。。。路由相关，store 相关事后复习
tailwindCss 使用感受，习惯了会很舒服的，对于响应式布局很爽
将一些分页的数据提取出来当常量进行处理

总结如何将 md 文档编译城 html 并且设置样式和代码高亮，showdown 和 marked 方案利弊

总结弹窗组件的写法

优化字体包的加载速度

后续添加消息提示，表单验证，加载动画
http 压缩

一些类型错误修改
完善搜索功能，增加文章切换数据展示的准确性，有时切换过快会展示上一个文章的内容，这个在后台也有这个问题

记录问题---tailwindcss 设置的默认样式修改
后续可以将文章展示页面的数据进行分段加载

解决下首屏加载慢的问题，目前想的是用骨架屏来增加点体验，但是数据的渲染依旧很慢，之后考虑下分包或者 cdn，又或者之后用 ssr 模式渲染
