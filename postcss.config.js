module.exports = ({ file }) => {
  let vwUnit
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    vwUnit = 16
  } else {
    vwUnit = 32
  }
  return {
    plugins: {
      'postcss-pxtorem': {
        rootValue: vwUnit,
        unitPrecision: 5, // 小数位数
        propList: ['*'],
        minPixelValue: 5,
        selectorBlackList: ['html']
      },
      autoprefixer: {
        browsers: [
          '> 1%',
          'last 20 versions'
        ]
      }
    }
  }
}
