const path = require('path');

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
  outputDir: 'dist',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    port: 8881,
    hot: true,
    compress: true,
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
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
      config.plugin('CompressionPlugin').use('compression-webpack-plugin', [
        {
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8,
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
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
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
