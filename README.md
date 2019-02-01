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
类似Vue的computed。当调用setData设置数据时，会自动计算computed中定义的属性值。

在DemoPage.js中定义一个Page并使用计算属性：
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

页面DemoPage.wxml中输出计算属性：
```html
    <view>
        {{number2}}
    </view>
```

### 侦听器
类似Vue的watch。用来观察和响应data属性数据变动。

### 混入
类似Vue的混入。所有混入对象的属性将被混入该Page本身的属性。

在sample_mixin.js文件中定义一个混入对象：
```js
module.exports = {
    bindTap: function (e) {
        this.setData({contentInput : 'set by mixin'})
    }
}
```

在DemoPage.js中定义一个Page并使用混入对象：
```js
const VueLike = require('miniprogram-vue-like-page')
Page(VueLike({
    data: {
        contentInput: ''
    },
    mixins: [
        require('sample_mixin.js')
    ],
    onLoad: function (options) {
        this.bindTap(); //mixin中的bindTap函数已经混入Page, 因此会正确设置contentInput的内容
    }
}));
```

#### 普通函数和属性合并
当Page和混入对象含有同名属性时，取Page的属性。

#### 生命周期回调函数合并
小程序的页面[生命周期回调函数](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0)有`onLoad`, `onShow`, `onReady`, `onHide`, `onUnload`。

同名生命周期回调函数将混合为一个数组，因此都将被调用。另外，混入对象的回调函数将在Page自身回调函数*之前*调用。

#### data，computed 属性对象合并
当Page和混入对象的data，computed对象含有同名属性时，取Page的属性。