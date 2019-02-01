before(function () {
    var app = {};
    global.getApp = () => {
        return app;
    }
    global.setApp = (obj) => {
        app = obj;
    }
    global.Page = (page) => {
        page.setData = obj => {
            for (var key in obj) {
                page.data[key] = obj[key];
            }
        };
        return page;
    }
});