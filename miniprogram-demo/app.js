//app.js
App({
  mixins: [
    {
      changePropertyById: function (e) {
        if (!e.currentTarget.id) {
          return;
        }
        var obj = {};
        obj[e.currentTarget.id] = e.detail.value;
        this.setData(obj);
      }
    }
  ]
})