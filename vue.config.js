module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://demo.reracesport.com/api/',
        secure: false,
        pathRewrite: {
          '^/api': '/'
        }
      },
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}