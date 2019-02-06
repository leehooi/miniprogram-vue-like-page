function notifyWatch(watchFnList, instance, oldData, newData) {
    var valuleChangedTable = {};
    watchFnList.forEach(watchFn => {
        var key = watchFn.key;
        var oldValue = getObjectValueByKey(oldData, key);
        if (oldValue == undefined) {
            return;
        }
        var newValue = getObjectValueByKey(newData, key);
        if (newValue == undefined) {
            return;
        }
        if (!valuleChangedTable[key]) {
            valuleChangedTable[key] = {
                changed: JSON.stringify(oldValue) != JSON.stringify(newValue)
            };
        }
        if (!valuleChangedTable[key].changed) {
            return;
        }
        watchFn.callback.apply(instance, [newValue, oldValue]);
    })
}

function getObjectValueByKey(obj, key) {
    if (typeof key !== 'string') {
        return;
    }
    var value = obj;
    var regQuote = {
        '\'': /\\\'/g,
        '"': /\\\"/g,
    };
    var i = 0;
    var iDot, iBrktStart, charQuote, iBrktEnd;
    while (i < key.length) {
        if (value == undefined) {
            return undefined;
        }
        iDot = key.indexOf('.', i);
        iBrktStart = key.indexOf('[', i);

        // we've reached the end
        if (iDot === -1 && iBrktStart === -1) {
            value = value[key.slice(i, key.length)];
            i = key.length;
        }

        // dots
        else if (iBrktStart === -1 || (iDot !== -1 && iDot < iBrktStart)) {
            value = value[key.slice(i, iDot)];
            i = iDot + 1;
        }

        // brackets
        else {
            if (iBrktStart > i) {
                value = value[key.slice(i, iBrktStart)];
                i = iBrktStart;
            }
            charQuote = key.slice(iBrktStart + 1, iBrktStart + 2);
            if (charQuote !== '"' && charQuote !== '\'') {
                iBrktEnd = key.indexOf(']', iBrktStart);
                if (iBrktEnd === -1) iBrktEnd = key.length;
                value = value[key.slice(i + 1, iBrktEnd)];
                i = (key.slice(iBrktEnd + 1, iBrktEnd + 2) === '.') ? iBrktEnd + 2 : iBrktEnd + 1;
            } else {
                iBrktEnd = key.indexOf(charQuote + ']', iBrktStart);
                if (iBrktEnd === -1) iBrktEnd = key.length;
                while (key.slice(iBrktEnd - 1, iBrktEnd) === '\\' && iBrktStart < key.length) {
                    iBrktStart++;
                    iBrktEnd = key.indexOf(charQuote + ']', iBrktStart);
                }
                value = value[key.slice(i + 2, iBrktEnd).replace(regQuote[charQuote], charQuote)];
                i = (key.slice(iBrktEnd + 2, iBrktEnd + 3) === '.') ? iBrktEnd + 3 : iBrktEnd + 2;
            }
        }
    }
    return value;
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