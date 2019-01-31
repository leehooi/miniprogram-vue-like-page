module.exports = page => {
    page.setData = obj => {
        for (var key in obj) {
            page.data[key] = obj[key];
        }
    };
    page.onLoad();
    return page;
}