const computed = require('./computed');
const watch = require('./watch');

module.exports = function (page) {
    var ctx = {
        lifeFnTable: ['onLoad', 'onShow', 'onReady', 'onHide', 'onUnload']
            .reduce((table, fn) => { table[fn] = []; return table; }, {}),
    };

    [{  //first mixin
        onLoad: function () {
            computed.enable(this);
            watch.enable(this);
        }
    }].concat(getApp().mixins || []).concat(page.mixins || []).forEach(mixin => {
        for (let key in mixin) {
            if (ctx.lifeFnTable[key]) {
                ctx.lifeFnTable[key].push(mixin[key]);
            }
            else if (key == 'data') {
                if (!page[key]) {
                    page[key] = mixin[key];
                }
                for (let property in mixin[key]) {
                    if (!page[key][property]) {
                        page[key][property] = mixin[key][property];
                    }
                }
            }
            else {
                if (!page[key]) {
                    page[key] = mixin[key];
                }
            }
        }
    });

    //append page life functions
    for (let fn in ctx.lifeFnTable) {
        if (page[fn]) {
            //page function will be invoked after mixin ones.
            let fnList = ctx.lifeFnTable[fn];
            fnList.push(page[fn]);
        }
    }

    //inject page life functions
    for (let fn in ctx.lifeFnTable) {
        let fnList = ctx.lifeFnTable[fn];

        if (fnList.length > 0) {
            page[fn] = function () {
                fnList.forEach(fnItem => {
                    fnItem.apply(this, arguments);
                })
            }
        }
    }
    return page;
}