const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const PurifyCSS = require("purifycss-webpack")
const glob = require("glob-all")

module.exports = {
    // 1.入口
    entry: './src/index.js',
    // 1.1 多入口
    // entry: {
    //     lodash: './src/pages/lodash.js',
    //     index: './src/index.js'
    // },

    // 2.出口
    output: {
        // 输出文件的名字
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        // 输出文件的路径，必须是绝对路径
        path: path.resolve(__dirname, "dist"),
        // 9 性能优化 
        // 9.3 使用静态资源路径publicPath(CDN)
        // publicPath: '公司的cdn服务器地址'
    },
    // 2.1 多出口
    // output: {
    //     path: path.resolve(__dirname, "dist"),
    //     filename: "[name].js"
    // },

    // 3.webpack运行环境
    mode: 'development',
    // mode: 'production',

    // 4.源代码与打包后的代码的映射关系，通过sourceMap定位到源代码
    // cheap: 较快，不包含列信息
    // module: 第三方模块
    // eval: 速度最快,使用eval包裹模块代码
    // source-map: 产生.map文件
    // inline: 将.map作为DataURI嵌入，不单独生成.map文件
    // 开发环境配置
    devtool: 'cheap-module-eval-source-map',
    // 线上环境不推荐开启，如果要开启可以用下面的配置
    // devtool: 'cheap-module-source-map',

    // 5. WebpackDevServer,启动服务
    // 5.1 启动服务后，会发现dist目录没有了，这是因为devServer打包后的模块不会放在dist目录下，而是放到内存中，从而提升速度
    // 5.2 修改代码【webpack配置除外】自动刷新
    devServer: {
        contentBase: "./dist", //服务源文件目录
        watchContentBase: true,
        port: 8081, //端口
        open: true, //启动服务后自动弹出浏览器窗口
        // 跨域，通过代理的方式
        proxy: {
            "/api": {
                target: "http://localhost:3000"
            }
        },
        // 开启热更新
        // 对于css: 内部css可以HMR，外部css文件无法HMR
        // 对于js: 无法HRM，需要使用module.hot.accept来观察模块更新，从而更新【麻烦】
        hot: true, //如果HMR失败，可能会刷新浏览器
        hotOnly: true, // 如果HMR失败，也不会自动刷新浏览器
    },


    // 6. 模块，放所有loader
    module: {
        rules: [
            // 1.处理静态资源模块
            // 1.1 处理图片
            {
                test: /\.(png|jpe?g|gif)$/,
                // 使用一个loader可以用对象
                use: {
                    // loader: 'file-loader',
                    // url-loader内部使用了file-loader,所以可以处 file-loader所有的事情，但是它多了一个limit选项，会把limit以下大小的图片转换成base64格式字符 
                    loader: 'url-loader',
                    // 额外的配置
                    options: {
                        // 打包后的文件的文件名
                        // [name]: 老资源的文件名
                        // [hash]: 随机的hash值
                        // [ext]: 老资源的文件格式
                        name: '[name]_[hash].[ext]',
                        // 打包后的资源的存放位置
                        // 'images/'结合上面的output表示存放在 ./dist/images/
                        outputPath: 'images/',
                        // 下面表示小于10kb，转换成base64 
                        limit: 10 * 1024
                    },
                },
                // 9 性能优化
                // 9.1 缩小文件范围
                // include：包括
                // exclude: 排除
                include: path.resolve(__dirname, "./src"),
                // exclude: path.resolve(__dirname, "./node_modules")
            },
            // 1.2 处理字体
            // 同个loader可以根据规则的不同写成多个
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                loader: 'file-loader',
                include: path.resolve(__dirname, "./src"),
            },
            // 2.css相关
            // 2.1 处理sass/scss文件
            {
                test: /\.(s[ac]ss)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                include: path.resolve(__dirname, "./src"),
            },
            // 2.2 处理less文件
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                include: path.resolve(__dirname, "./src"),
            },
            // 2.3 处理css文件
            {
                test: /\.css$/,
                // 使用多个loader用数组，loader从后往前执行
                use: [
                    // 样式以内部样式的形式插入到index.html的<head>中
                    // 'style-loader',
                    // 打包好的样式会生成样式文件
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    // 把下面postcss-loader的配置抽离到根目录下的postcss.config.js中
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         plugins: [
                    //             require("autoprefixer")({
                    //                 overrideBrowserslist: ["last 2 versions", ">1%"]
                    //             })
                    //         ]
                    //     }
                    // }
                ],
                include: path.resolve(__dirname, "./src"),
            },
            // 3 babel处理es6和jsx
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
                include: path.resolve(__dirname, "./src"),
            },
            // 4 处理.Vue单文件
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: path.resolve(__dirname, "./src"),
            }
        ]
    },

    // 7. 插件
    plugins: [
        // htmlwebpackplugin会在打包结束后，自动生成一个html文件，并把打包生成的js,css模块引入到该html中
        new htmlWebpackPlugin({
            title: 'Webpack Practice',
            filename: 'main.html',
            template: './src/index.html',
            // 9.5 压缩HTML文件
            minify: {
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true //压缩内联css
            }
        }),
        // 每次打包都会清空build/下的文件
        new CleanWebpackPlugin(),
        // 把打包的css模块以文件的形式生成在build文件夹下
        new MiniCssExtractPlugin({
            filename: '[name][chunkhash:6].css'
        }),
        // 开启HMR
        new webpack.HotModuleReplacementPlugin(),
        // 处理Vue单文件，确保引入这个插件！
        new VueLoaderPlugin(),
        // 9.4 压缩css
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            }
        }),
        // 9.7.1 css tree shaking
        new PurifyCSS({
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(__dirname, "./src/*.html"), // 请注意，我们同样需要对 html 文件进行 tree shaking
                path.resolve(__dirname, "./src/*.js")
            ])
        }),
    ],

    // 8. 文件监听
    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/, //不监听的文件
    //     aggregateTimeout: 500, //防止重复按键，500毫米内算按键一次
    //     poll: 1000, //轮询，监测修改的时间(ms)                              
    // },

    // 9. 性能优化
    optimization: {
        // 9.7.2 js tree shaking: 按需编译(只支持ES module的引入方式)
        usedExports: true,
        // 9.8 splitting code: 代码分割 -- webpack自动进行代码分割
        splitChunks: {
            chunks: 'all', //默认是支持异步
            cacheGroups: {
                // react和|react-dom 单独打包出一个包
                react: {
                    test: /react|react-dom/,
                    name: 'react',
                },
                // lodash 单独打包出一个包
                loadash: {
                    test: /lodash/,
                    name: 'lodash'
                },
            }
        },
    },

    // 9.2 优化resolve.modules配置
    resolve: {
        // 9.2.1 用于配置wepack去哪个目录下查找第三方模块
        modules: [path.resolve(__dirname, "./node_modules")],
        // 9.2.2 通过别名将原导入路径映射成一个新的导入路径
        alias: {
            "@": path.resolve(__dirname, './src'),
            "react": path.resolve(__dirname, "./node_modules/react/umd/react.production.min.js"),
            "react-dom": path.resolve(__dirname, "./node_modules/react-dom/umd/react-dom.production.min.js"),
            "vue": path.resolve(__dirname, "./node_modules/vue/dist/vue.runtime.esm.js"),
        },
        // 9.2.3 在导入语句没有后缀时，webpack会自动带上后缀，去尝试查找文件是否存在
        extensions: [".js"]
    },
}