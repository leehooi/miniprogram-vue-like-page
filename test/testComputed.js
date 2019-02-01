const assert = require('assert');
const Page = require('./page');
const VueLike = require('../miniprogram-vue-like-page');
describe('computed', function () {
    it('Should return correct result', () => {
        var page = Page(VueLike({
            data: {
                number1: 1
            },
            computed: {
                number2: function () {
                    return this.data.number1 + 1;
                }
            },
            onLoad: function (options) {
                assert.equal(this.data.number2, 2)
                this.setData({number1: 2})
                assert.equal(this.data.number2, 3)
            }
        }));
        page.onLoad();

        page.setData({number1: 3})
        assert.equal(page.data.number2, 4)
    });
});