module.exports = function (page) {

    var ctx = {
        lastDataCaptureJson: '',
        setData: null,
        lifeFnTable: ['onLoad', 'onShow', 'onReady', 'onHide', 'onUnload']
            .reduce((table, fn) => { table[fn] = []; return table; }, {}),
        watchFnTable: {},
        notifyWatch: function (instance, newData) {
            if (!newData) {
                return;
            }
            var oldData = JSON.parse(this.lastDataCaptureJson);
            for (let property in newData) {
                if (JSON.stringify(oldData[property]) == JSON.stringify(newData[property])) {
                    continue;
                }
                var watchFnList = this.watchFnTable[property];
                if (!watchFnList || watchFnList.length == 0) {
                    continue;
                }
                watchFnList.forEach(fn => {
                    fn.apply(instance, [newData[property], oldData[property]]);
                })
            }
        },
        updateComputedProperties: function (instance) {
            if (instance.computed) {
                var computedData = {};
                for (let fn in instance.computed) {
                    computedData[fn] = instance.computed[fn].apply(instance);
                }
                this.setData.apply(instance, [computedData])
            }
        }
    };

    [{  //first mixin
        onLoad: function () {
            //inject setData fn.
            ctx.setData = this.setData;
            this.setData = function () {
                ctx.setData.apply(this, arguments);
                ctx.updateComputedProperties(this);
                ctx.notifyWatch(this, this.data);
                ctx.lastDataCaptureJson = JSON.stringify(this.data);
            }

            //update Computed Properties immediately
            ctx.updateComputedProperties(this);
            ctx.lastDataCaptureJson = JSON.stringify(this.data);
        }
    }].concat(getApp().mixins || []).concat(page.mixins || []).forEach(mixin => {
        for (let key in mixin) {
            if (ctx.lifeFnTable[key]) {
                ctx.lifeFnTable[key].push(mixin[key]);
            }
            else if (key == 'data' || key == 'computed') {
                if (!page[key]) {
                    page[key] = mixin[key];
                }
                for (let property in mixin[key]) {
                    if (!page[key][property]) {
                        page[key][property] = mixin[key][property];
                    }
                }
            }
            else if (key == 'watch') {
                for (let property in mixin[key]) {
                    ctx.watchFnTable[property] = ctx.watchFnTable[property] || [];
                    ctx.watchFnTable[property].push(mixin[key][property]);
                }
            }
            else {
                if (!page[key]) {
                    page[key] = mixin[key];
                }
            }
        }
    });

    //append page watch functions
    if (page.watch) {
        for (let property in page.watch) {
            ctx.watchFnTable[property] = ctx.watchFnTable[property] || [];
            ctx.watchFnTable[property].push(page.watch[property]);
        }
    }

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