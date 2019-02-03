function update(instance, setData) {
    //merge computed
    var computed = instance.computed;
    (getApp().mixins || []).concat(instance.mixins || []).forEach(mixin => {
        if (!computed) {
            computed = mixin.computed;
        }
        for (let property in mixin.computed) {
            if (!computed[property]) {
                computed[property] = mixin.computed[property];
            }
        }
    });
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