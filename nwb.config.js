module.exports = {
  type: 'web-app',

  webpack: {
    extractText: {
      filename: '[name].css'
    },
    extra: {
      output: {
        filename: '[name].js',
        chunkFilename: '[name].js'
      }
    }
  }
}
