# miniprogram-vue-like-page

## 安装

```bash
npm install --save miniprogram-vue-like-page
```

## 使用
### computed
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

### mixins
DemoPage.js:
```js
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
