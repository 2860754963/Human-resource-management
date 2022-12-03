'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title 网页标题


const port = process.env.port || process.env.npm_config_port || 9528 // dev port
// 2.定义cdn ，并 通过环境变量 进行判断  是否使用cdn，因为在 开发模式是不需要cdn ，在生产模式需要cdn
let cdn = { css: [], js: [] } ///先定义 空对象
const isproduce = process.env.NODE_ENV === 'production' ///进行判断
let externals = {}
if (isproduce) {
  //在生产模式 需要将大的包排除，并通过cdn获取
  //key（要排除的包名）：value（引入的cdn的包的全局变量名）
  externals = {
    'vue': 'Vue',
    'element-ui': 'ELEMENT',
    'xlsx': 'XLSX'
  }
  ///引入cdn
  cdn = {
    css: [ // 放置css文件目录
      // element-ui css
      'https://unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css'
    ],
    js: [// 放置js文件目录
      // vue must at first! vue必须放在第一位
      'https://unpkg.com/vue@2.6.10/dist/vue.js', // vuejs //***vue必须是带版本的 , 默认的3.x不行, 会报错***
      'https://unpkg.com/element-ui@2.13.2/lib/index.js', // elementUI
      //xlsx
      'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/jszip.min.js',
      'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/xlsx.full.min.js'
    ]
  }
  // 接下来处理 生产模式下的  引入文件，就是在生产模式下，将cdn的css和js注入到 html中

  // 通过 html-webpack-plugin注入到 index.html之中:


}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * 如果您计划在子路径下部署站点，
   *例如GitHub Pages，则需要设置publicPath如果您计划将站点部署到https://foo.github.io/bar/，
   *则publicPath应设置为“/bar/”
   *在大多数情况下，请使用“/”
   *详细信息：https://cli.vuejs.org/config/#publicpath 
   */

  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      'api': {
        target: 'http://ihrm.itheima.net/',
        // target: 'http://ihrm-java.itheima.net/',
        changeOrigin: true
        //不需要路径重写
      }
    }
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // 在webpack的名称字段中提供应用程序的标题，以便
    //可以在索引中访问它。html来注入正确的标题。
    name: name,
    resolve: {
      alias: {
        //这里 都是 默认配置好的 @为src目录
        '@': resolve('src')
      }
    },
    // 1.最后项目打包上线： 1.因为打包时 vue，elui ，xlsx占用体积大，所以将其排除 使用线上（CND地址）下载样式资源
    // cdn资源--element：https://unpkg.com/element-ui/lib/index.js
    externals: externals

  },
  // 3.进行注入
  // 配置注入webpack的属性 这个属性会注入到模板的变量中
  chainWebpack(config) {

    // 插入cdn变量
    // args 就是原有注入模板中的变量
    config.plugin('html').tap(args => {
      // args[0] 相当于 html模板中 htmlWebpackplugin.options
      args[0].cdn = cdn// 将cdn变量注入到html模板中
      return args
    })
    // 4.接下来 在puiblic/index.html 中进行配置


    // 它可以提高第一个屏幕的速度，建议打开预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
