function notifyWatch(watchFnList, instance, oldData, newData) {
    var valuleChangedTable = {};
    watchFnList.forEach(watchFn => {
        var key = watchFn.key;
        if (!valuleChangedTable[key]) {
            valuleChangedTable[key] = {
                changed: JSON.stringify(oldData[key]) != JSON.stringify(newData[key])
            };
        }
        if (!valuleChangedTable[key].changed) {
            return;
        }
        watchFn.callback.apply(instance, [newData[key], oldData[key]]);
    })
}

function getWatchFnList(instance) {
    var mixins = (getApp().mixins || []).concat(instance.mixins || []);
    var watchList = mixins.map(mixin => {
        return mixin.watch;
    }).concat([instance.watch]);
    var watchFnList = [];
    watchList.forEach(watch => {
        if (!watch) {
            return;
        }
        for (let key in watch) {
            watchFnList.push({
                key,
                callback: watch[key]
            });
        }
    });
    return watchFnList;
}

module.exports = {
    enable: (instance) => {
        var watchFnList = getWatchFnList(instance);
        var setData = instance.setData;
        var lastDataCaptureJson = JSON.stringify(instance.data);
        instance.setData = function () {
            setData.apply(this, arguments);
            var oldData = JSON.parse(lastDataCaptureJson);
            lastDataCaptureJson = JSON.stringify(this.data);
            notifyWatch(watchFnList, this, oldData, this.data);
        }

        instance.$watch = function (key, callback) {
            watchFnList.push({ key, callback })
        }
    }
}