module.exports = {
  type: 'web-app',

  webpack: {
    extractCSS: {
      filename: '[name].css'
    },

    extra: {
      output: {
        filename: '[name].js',
        chunkFilename: '[name].js'
      }
    }
  }
};
