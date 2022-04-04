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
目前减少了字体包的大小，但是文章详情页引入的代码高亮处理包很大，之后考虑解决。

目前解决了一个样式问题就是 header 的 input 在不同的浏览器上样式表现不一致，chrome 没问题，火狐和苹果浏览器会出现过长，原因是字体的缘故，我用的当然用原生的字体就没这个问题了，用了思源的字体就会出现这个差异，目前解决方式是直接给 input 设置一个最大宽度。

记录问题，目前就是代码高亮包偏大，然后就是引入的 xss 插件会导致文章渲染慢，所以暂不使用，另外就是自定义的 env.d.ts 文件不生效，即一些类型问题待解决。注册后用户角色更新不及时

后期检查下所有表单的校验包括格式和限制

2033/3/13
-- 修复 xss 漏洞触发
原先是后台存储 md 字符串，然后前台获取后进行渲染，但是会有 xss 风险，之后在前端设置了 xss 过滤，发现渲染性能太差，后又改到后台处理，另外在改的过程中发现了后台的 markdown 编辑器有 xss 风险，就是在编辑的时候都会触发 xss，之后我又 fork 原仓库的代码进行修改后发版修复了这个问题，然后后端数据库添加了了一个字段，现在文章表中是存有文章的 html 字符串和 md 字符串的，所以这样前端就可以按需获取了。

--- 修复了管理端的文章编辑器的尺寸，修复了一些数据为空的 bug，添加了一个权限，是否能查询所有的文章，目前文章非本人最大的权限就是查询，说实话这也不是啥权限

---

考虑组件抽取
