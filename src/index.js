const mixin = require('./mixin');
const computed = require('./computed');
const watch = require('./watch');

module.exports = function (page) {

    mixin.enable(page, [{
        onLoad: function () {
            computed.enable(this);
            watch.enable(this);
        }
    }].concat(getApp().mixins || []).concat(page.mixins || []));

    return page;
}