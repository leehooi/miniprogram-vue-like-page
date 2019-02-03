function notifyWatch(instance, oldData, newData) {
    if (!newData) {
        return;
    }
    var propertyInfoTable = {};
    (instance.mixins || []).map(mixin => {
        return mixin.watch;
    }).concat([instance.watch]).forEach(watch => {
        if (!watch) {
            return;
        }
        for (let property in newData) {
            var fn = watch[property];
            if (!fn) {
                continue;
            }
            if (!propertyInfoTable[property]) {
                propertyInfoTable[property] = {
                    changed: JSON.stringify(oldData[property]) != JSON.stringify(newData[property])
                };
            }
            if (!propertyInfoTable[property].changed) {
                continue;
            }
            fn.apply(instance, [newData[property], oldData[property]]);
        }
    });
}

module.exports = {
    enable: (instance) => {
        var setData = instance.setData;
        var lastDataCaptureJson = JSON.stringify(instance.data);
        instance.setData = function () {
            setData.apply(this, arguments);
            notifyWatch(this, JSON.parse(lastDataCaptureJson), arguments[0]);
            lastDataCaptureJson = JSON.stringify(this.data);
        }
        lastDataCaptureJson = JSON.stringify(instance.data);
    }
}