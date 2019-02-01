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
当调用setData设置数据时，会自动计算computed中定义的属性值。

在DemoPage.js中定义一个Page使用计算属性
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
    },
    onLoad: function (options) {
        console.log(this.data.number2) //这里会输出 2
        this.setData({number1: 2})
        console.log(this.data.number2) //这里会输出 3
    }
}));
```
页面中输出计算属性
DemoPage.wxml
```html
    <view>
        {{number2}}
    </view>
```

### 混入
类似Vue的混入，所有混入对象的选项将被混入该Page本身的选项。

在sample_mixin.js文件中定义一个混入对象
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
在DemoPage.js中定义一个Page并使用混入对象
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
#### 生命周期回调函数合并
生命周期函数包括`onLoad`, `onShow`, `onReady`, `onHide`, `onUnload`
同名生命周期回调函数将混合为一个数组，因此都将被调用。另外，混入对象的回调函数将在Page自身回调函数*之前*调用。