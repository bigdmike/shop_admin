// const { defineConfig } = require('@vue/cli-service');
const path = require('path');

// 路径处理方法
function resolve(dir) {
  return path.join(__dirname, dir);
}

const externals = [
  {
    vue: 'Vue',
  },
  {
    'vue-router': 'VueRouter',
  },
  {
    axios: 'axios',
  },
  {
    vuetify: 'Vuetify',
  },
  {
    apexcharts: 'apexcharts',
  },
  {
    VueApexCharts: 'vue-apexcharts',
  },
];
const cdn = {
  css: [],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/vuetify@2.6.2/dist/vuetify.min.js',
    'https://cdn.jsdelivr.net/npm/apexcharts',
    'https://cdn.jsdelivr.net/npm/vue-apexcharts',
  ],
};

module.exports = {
  filenameHashing: true,
  publicPath: '/krace_admin/',
  //   publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    port: 8887,
    hot: true,
    compress: true, // 是否启动压缩 gzip
    proxy: {
      '/api': {
        target: 'https://api.krace.com.tw',
        secure: false,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
  //   css: {
  //     loaderOptions: {
  //       scss: {
  //         additionalData: '@import "@/assets/variables.scss";',
  //       },
  //     },
  //   },
  configureWebpack: {
    resolve: {
      extensions: ['.vue', '.js', '.json', 'scss', 'css'],
      alias: {
        '@': resolve('src'),
      },
      modules: [resolve('src'), 'node_modules'],
    },
    module: {},
    plugins: [],
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.externals(externals);
      // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
      config.plugin('CompressionPlugin').use('compression-webpack-plugin', [
        {
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240, // 只处理比这个值大的资源。按字节计算
          minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
        },
      ]);
      config.optimization.splitChunks({
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(s?css|less|sass)$/,
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'chunk-common',
            chunks: 'all',
            minChunks: 2, // 拆分前必须共享模块的最小 chunks 数。
            maxInitialRequests: 5, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
            minSize: 0, // 生成 chunk 的最小体积（≈ 20kb)
            priority: 1, // 优化将优先考虑具有更高 priority（优先级）的缓存组
            reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 2,
            reuseExistingChunk: true,
          },
          lrucache: {
            name: 'chunk-lrucache',
            test: /[\\/]node_modules[\\/]_?lru-cache(.*)/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true,
          },
        },
      });
    }
  },
};
