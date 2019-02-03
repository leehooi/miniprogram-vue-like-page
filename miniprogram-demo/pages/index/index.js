//index.js
//获取应用实例
const app = getApp()
const VueLike = require('../../miniprogram-vue-like-page')

Page(VueLike({
  data: {
    number1: 2,
    number2: 3,
    message: ''
  },
  computed: {
    numberSum: function () {
      return this.data.number1 + this.data.number2;
    }
  },
  watch: {
    numberSum: function (newVal, oldVal) {
      this.setData({
        message: `计算结果从${oldVal}变为${newVal}`
      })
    }
  },
  onLoad: function () {
  }
}));
