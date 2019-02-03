module.exports = {
    enable: (page, mixins) => {
        var lifeFnTable = {};

        mixins.forEach(mixin => {
            for (let key in mixin) {
                switch (key) {
                    case 'watch':
                    case 'computed':
                        //handled by itself
                        continue;
                    case 'data':
                        if (!page[key]) {
                            page[key] = mixin[key];
                        }
                        for (let property in mixin[key]) {
                            if (!page[key][property]) {
                                page[key][property] = mixin[key][property];
                            }
                        }
                        break;
                    case 'onLoad':
                    case 'onShow':
                    case 'onReady':
                    case 'onHide':
                    case 'onUnload':
                        lifeFnTable[key] = lifeFnTable[key] || [];
                        lifeFnTable[key].push(mixin[key]);
                        break;
                    default:
                        if (!page[key]) {
                            page[key] = mixin[key];
                        }
                        break;
                }
            }
        });

        for (let fn in lifeFnTable) {
            let fnList = lifeFnTable[fn];
            if (page[fn]) {
                //page function will be invoked after mixin ones.
                fnList.push(page[fn]);
            }
            page[fn] = function () {
                fnList.forEach(fnItem => {
                    fnItem.apply(this, arguments);
                })
            }
        }
    }
}