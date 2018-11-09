module.exports = {
  type: 'web-app',

  webpack: {
    extra: {
      output: {
        filename: '[name].js',
        chunkFilename: '[name].js'
      }
    }
  }
};
