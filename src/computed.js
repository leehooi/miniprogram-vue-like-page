function update(instance, setData) {
    var computed = instance.computed;
    (instance.mixins || []).forEach(mixin => {
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
        for (let fn in instance.computed) {
            computedData[fn] = instance.computed[fn].apply(instance);
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