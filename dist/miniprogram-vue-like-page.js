module.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const o=n(1),r=n(2);e.exports=function(e){var t={lifeFnTable:["onLoad","onShow","onReady","onHide","onUnload"].reduce((e,t)=>(e[t]=[],e),{})};[{onLoad:function(){o.enable(this),r.enable(this)}}].concat(getApp().mixins||[]).concat(e.mixins||[]).forEach(n=>{for(let o in n)if(t.lifeFnTable[o])t.lifeFnTable[o].push(n[o]);else if("data"==o){e[o]||(e[o]=n[o]);for(let t in n[o])e[o][t]||(e[o][t]=n[o][t])}else e[o]||(e[o]=n[o])});for(let n in t.lifeFnTable)if(e[n]){t.lifeFnTable[n].push(e[n])}for(let n in t.lifeFnTable){let o=t.lifeFnTable[n];o.length>0&&(e[n]=function(){o.forEach(e=>{e.apply(this,arguments)})})}return e}},function(e,t){function n(e,t){var n=e.computed;if((e.mixins||[]).forEach(e=>{n||(n=e.computed);for(let t in e.computed)n[t]||(n[t]=e.computed[t])}),n){var o={};for(let t in e.computed)o[t]=e.computed[t].apply(e);t.apply(e,[o])}}e.exports={enable:e=>{var t=e.setData;e.setData=function(){t.apply(this,arguments),n(e,t)},n(e,t)}}},function(e,t){e.exports={enable:e=>{var t=e.setData,n=JSON.stringify(e.data);e.setData=function(){t.apply(this,arguments),function(e,t,n){if(n){var o={};(e.mixins||[]).map(e=>e.watch).concat([e.watch]).forEach(r=>{if(r)for(let a in n){var i=r[a];i&&(o[a]||(o[a]={changed:JSON.stringify(t[a])!=JSON.stringify(n[a])}),o[a].changed&&i.apply(e,[n[a],t[a]]))}})}}(this,JSON.parse(n),arguments[0]),n=JSON.stringify(this.data)},n=JSON.stringify(e.data)}}}]);