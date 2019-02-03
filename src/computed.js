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
        var computedData = {};
        for (let fn in computed) {
            computedData[fn] = computed[fn].apply(instance);
        }
        setData.apply(instance, [computedData]);
    }
}

module.exports = {
    enable: (instance) => {
        var setData = instance.setData;
        instance.setData = function () {
            setData.apply(this, arguments);
            update(instance, setData);
        }
        update(instance, setData);
    }
}