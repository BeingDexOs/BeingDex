export default {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 192, // 根据设计图尺寸写，设计图是1920，就写192
      unitPrecision: 5, //允许REM单位增长到的十进制数字,小数点后保留的位数。
      propList: ['*'], // 需要被转换的属性
      exclude: /node_modules/, // 排除文件夹
      mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
      selectorBlackList: ['.van'] // 不进行px转换的选择器
    }
  }
}
