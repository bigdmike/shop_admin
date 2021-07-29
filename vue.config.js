module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.reracesport.com/api/',
        secure: false,
        pathRewrite: {
          '^/api': '/'
        }
      },
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  filenameHashing: true,
  publicPath: '/rerace_admin/',
}