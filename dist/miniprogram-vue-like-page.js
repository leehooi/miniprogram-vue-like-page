module.exports=function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const i=n(1),r=n(2),a=n(3);e.exports=function(e){return i.enable(e,[r,a].concat(getApp().mixins||[]).concat(e.mixins||[])),e}},function(e,t){e.exports={enable:(e,t)=>{var n={};t.forEach(t=>{for(let i in t)switch(i){case"watch":case"computed":continue;case"data":e[i]||(e[i]=t[i]);for(let n in t[i])e[i][n]||(e[i][n]=t[i][n]);break;case"onLoad":case"onShow":case"onReady":case"onHide":case"onUnload":n[i]=n[i]||[],n[i].push(t[i]);break;default:e[i]||(e[i]=t[i])}});for(let t in n){let i=n[t];e[t]&&i.push(e[t]),e[t]=function(){i.forEach(e=>{e.apply(this,arguments)})}}}}},function(e,t){function n(e,t){var n=[e.computed].concat((e.mixins||[]).concat(getApp().mixins||[]).map(e=>e.computed)).reduce((e,t)=>{if(!t)return e;for(let n in t)e[n]||(e[n]=t[n]);return e},{});if(n){var i={};for(let t in n)i[t]=n[t].apply(e);t.apply(e,[i])}}e.exports={onLoad:function(){var e=this.setData;this.setData=function(){e.apply(this,arguments),n(this,e)},n(this,e)}}},function(e,t){function n(e,t){if("string"==typeof t){for(var n,i,r,a,o=e,c={"'":/\\\'/g,'"':/\\\"/g},l=0;l<t.length;){if(null==o)return;if(n=t.indexOf(".",l),i=t.indexOf("[",l),-1===n&&-1===i)o=o[t.slice(l,t.length)],l=t.length;else if(-1===i||-1!==n&&n<i)o=o[t.slice(l,n)],l=n+1;else if(i>l&&(o=o[t.slice(l,i)],l=i),'"'!==(r=t.slice(i+1,i+2))&&"'"!==r)-1===(a=t.indexOf("]",i))&&(a=t.length),o=o[t.slice(l+1,a)],l="."===t.slice(a+1,a+2)?a+2:a+1;else{for(-1===(a=t.indexOf(r+"]",i))&&(a=t.length);"\\"===t.slice(a-1,a)&&i<t.length;)i++,a=t.indexOf(r+"]",i);o=o[t.slice(l+2,a).replace(c[r],r)],l="."===t.slice(a+2,a+3)?a+3:a+2}}return o}}e.exports={onLoad:function(){var e=function(e){var t=(getApp().mixins||[]).concat(e.mixins||[]).map(e=>e.watch).concat([e.watch]),n=[];return t.forEach(e=>{if(e)for(let t in e)n.push({key:t,callback:e[t]})}),n}(this),t=this.setData,i=JSON.stringify(this.data);this.setData=function(){t.apply(this,arguments);var r=JSON.parse(i);i=JSON.stringify(this.data),function(e,t,i,r){var a={};e.forEach(e=>{var o=e.key,c=n(i,o);if(null!=c){var l=n(r,o);null!=l&&(a[o]||(a[o]={changed:JSON.stringify(c)!=JSON.stringify(l)}),a[o].changed&&e.callback.apply(t,[l,c]))}})}(e,this,r,this.data)},this.$watch=function(t,n){e.push({key:t,callback:n})}}}}]);