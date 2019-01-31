# miniprogram-vue-like-page
微信小程序js库。使小程序的Page代码支持Vue的一些特性。
## 安装

### 方法一：npm安装
```bash
npm install --save miniprogram-vue-like-page
```
代码中引入npm包
```js
const VueLike = require('miniprogram-vue-like-page')
```
### 方法二：直接下载 
下载 miniprogram-vue-like-page.js 文件到小程序目录中，代码中引入js文件

```js
const VueLike = require('path_to_lib/miniprogram-vue-like-page')
```


## 使用
### 计算属性
DemoPage.js:
```js
const VueLike = require('miniprogram-vue-like-page')
Page(VueLike({
    data: {
        number1: 1
    },
    computed: {
        number2: function () {
            return this.data.number1 + 1;
        }
    }
}));
```

### 混入
DemoPage.js:
```js
const VueLike = require('miniprogram-vue-like-page')
Page(VueLike({
    data: {
        contentInput: '',
        contentOutput: ''
    },
    mixins: [
        require('sample_mixin.js')
    ],
    onLoad: function (options) {
    }
}));
```
sample_mixin.js
```js
module.exports = {
    onLoad: function (options) {
    },
    onShareAppMessage: function (e) {
        return {
            title: 'share title'
        }
    }
}
```
