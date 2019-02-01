module.exports = function (page) {

    var ctx = {
        setData: null,
        lifeFnTable: ['onLoad', 'onShow', 'onReady', 'onHide', 'onUnload']
            .reduce((table, fn) => { table[fn] = []; return table; }, {}),
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
                ctx.setData.apply(this, arguments)
                ctx.updateComputedProperties(this);
            }

            //update Computed Properties immediately
            ctx.updateComputedProperties(this);
        }
    }].concat(page.mixins || []).forEach(mixin => {
        for (let key in mixin) {
            if (ctx.lifeFnTable[key]) {
                ctx.lifeFnTable[key].push(mixin[key]);
            }
            else if (key == 'data' || key == 'computed' || key == 'watch') {
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

    //inject page life functions
    for (let fn in ctx.lifeFnTable) {
        let hooks = ctx.lifeFnTable[fn];

        if (page[fn]) {
            //page hook will be invoked after mixin ones.
            hooks.push(page[fn]);
        }

        if (hooks.length > 0) {
            page[fn] = function () {
                hooks.forEach(hook => {
                    hook.apply(this, arguments);
                })
            }
        }
    }
    return page;
}