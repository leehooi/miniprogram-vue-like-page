const assert = require('assert');
const Page = require('./page');
const VueLike = require('../miniprogram-vue-like-page');
describe('computed', function () {
    it('Should return correct result', async () => {
        var page = Page(VueLike({
            data: {
                number1: 1
            },
            computed: {
                number2: function () {
                    return this.data.number1 + 1;
                }
            }
        }));
        assert.equal(page.data.number2, 2)
        page.setData({number1: 2})
        assert.equal(page.data.number2, 3)
    });
});