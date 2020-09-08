# 性能优化
## 一、从输⼊url到显示⻚⾯，发⽣了什么
1. 网络通信阶段
    - 1.1 用户输入网址
    - 1.2 浏览器通过 DNS ，把 url 解析成 IP
    - 1.3 浏览器和 IP 地址建立 TCP 连接（三次握手），发送 HTTP 请求
    - 1.4 服务器接收请求（可能有重定向），处理请求（比如反向代理，查库，读文件等），拼接好（网页源代码）返回的 HTTP 响应
2. 页面渲染阶段
    - 2.1 浏览器收到首屏 html, 开始渲染
    - 2.2 构建 DOM 树，根据 html 结构生成 DOM 树
        - 遇到 `<script>` 标签，会阻塞渲染，转而去执行 `<script>` 里面的代码
        - 遇到外部js文件，图片等，会发送 HTTP 请求，异步加载
    - 2.3 生成样式表，根据 css 文件和元素上的 inline 样式生成样式表
        - CSS 的解析是从右往左逆向解析的，嵌套标签越多，解析越慢
    - 2.4 构建 Render 树，将 DOM 树和样式表关联起来，构建一棵 Render 树
        - DOM 树，CSS 样式表和 Render 树，这三个过程不是独立渐进的，它们会有交叉，会一边加载，一边解析，以及一边渲染
    - 2.5 绘制页面，根据 Render 树和节点显示坐标，调用每个节点的 *paint* 方法，将它们绘制出来
        - JS 操作真实 DOM, 可能会引起页面的重排和重绘，因此代价是巨大的
> 所谓性能优化，就是上⾯的步骤加⼀起，时间尽可能的短
## 二、性能优化
1. 网络层面
    - 1.1 减少 DNS 查询
        - DNS预解析, 缓存 DNS 查询记录, 比如淘宝首页: `<link rel="dns-prefetch" href="//g.alicdn.com" />`
    - 1.2 减少HTTP请求
        - 1.2.1 静态资源独立部署（CDN）（CDN也可以减少⽤户和服务器的距离）
        - 1.2.2 静态资源合并（JS，CSS...）
        - 1.2.3 缓存
            - HTTP 缓存（强缓存和协商缓存）
            - CDN 缓存
    - 1.3 请求过程的优化
        - 1.3.1 图片优化
            - 根据场景选用合适的图片格式（png, JPG/JPEG, gif, webP,svg，base64...）
                - PNG: logo，颜⾊简单但对图⽚质量要求较⾼
                - JPG/JPEG: 背景图，大的轮播 banner 图
                - GIF：loading 图
                - SVG：绘制地图，股票k线图等
                - WebP：全能，缺点就是兼容性不好
                - Base64：因为图⽚base64之后会变⼤，所以适合⼩的⽮量图标
            - 使用 Sprite, css3, iconfont等技术
            - 图片压缩
        - 1.3.2 压缩：服务端设置 Gzip 压缩
        - 1.3.3 Cookie: 减少 Cookie 体积
2. 渲染层面
    - 2.1 提高首屏渲染速度
        - ssr 实践
        - 按需加载，懒加载，事件节流和防抖
            - 节流：隔⼀段时间只触发⼀次
            - 防抖: 完成后再统⼀发送请求
        - HTML5 Web Works
            - web works 是运行在后台的Javascript，独立于其它脚本
        - ⽩屏应对
            - 先展示骨架（比如antd的skeleton组件）
            - ⾃动化⽅案：page-skeleton-webpack-plugin
    - 2.2 CSS 性能方案
        - CSS 放在`<header>`里
        - CSS 选择器优化
            - 选择器嵌套不超过三层
            - 不使用标签选择器
    - 2.3 JS 性能方案
        - 把脚本放到底部
        - 减少 DOM 操作
            - 链式操作
            - 批量操作（比如字符串拼接）
            - 在 DOM 树外更新节点，然后添加到 DOM 树（虚拟DOM）
3. 性能监测
    - Performance API：直接在浏览器控制台输入`Window.performance`来查看
    - 工具：lighthouse
        - 安装：`npm install -g lighthouse`
        - 使用（以淘宝为例）：命令行终端输入 `lighthouse https://www.taobao.com/`
## 三、移动端优化技巧
## 四、Vue 项目性能优化
## 五、React 项目性能优化
## 六、Webpack 性能优化
