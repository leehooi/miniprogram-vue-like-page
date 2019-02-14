const mixin = require('./mixin');

module.exports = function (page) {

    mixin.enable(page,
        [
            require('./computed'),
            require('./watch')
        ].concat(getApp().mixins || [])
            .concat(page.mixins || []));

    return page;
}