function update(instance, setData) {
    //merge computed
    var computed = [instance.computed].concat(
        ((instance.mixins || []).concat(getApp().mixins || [])).map(mixin => {
            return mixin.computed;
        })
    ).reduce((result, computed) => {
        if (!computed) {
            return result;
        }
        for (let property in computed) {
            if (!result[property]) {
                result[property] = computed[property];
            }
        }
        return result;
    }, {});
    
    if (computed) {
        for (let fn in computed) {
            var computedData = {};
            computedData[fn] = computed[fn].apply(instance);
            setData.apply(instance, [computedData]);
        }
    }
}

module.exports = {
    onLoad: function () {
        var setData = this.setData;
        this.setData = function () {
            setData.apply(this, arguments);
            update(this, setData);
        }
        update(this, setData);
    }
}