const mixin = require('./mixin');
const computed = require('./computed');
const watch = require('./watch');

module.exports = function (page) {

    mixin.enable(page,
        [computed, watch]
            .concat(getApp().mixins || [])
            .concat(page.mixins || []));

    return page;
}