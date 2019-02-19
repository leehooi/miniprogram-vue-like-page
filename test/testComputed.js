const assert = require('assert');
const VueLike = require('../dist/miniprogram-vue-like-page');
describe('computed', function () {
    it('Should return correct result', () => {
        var page = Page(VueLike({
            data: {
                number2: 1
            },
            computed: {
                number3: function () {
                    assert.ok(this.data)
                    return this.data.number2 + 1;
                },
                number1: function () {
                    assert.ok(this.data)
                    return this.data.number3 + 1;
                }
            },
            onLoad: function (options) {
                assert.ok(this.data)
                assert.equal(this.data.number3, 2)
                assert.equal(this.data.number1, 3)
                this.setData({number2: 2})
                assert.equal(this.data.number3, 3)
                assert.equal(this.data.number1, 4)
            }
        }));
        page.onLoad();

        page.setData({number2: 3})
        assert.equal(page.data.number3, 4)
        assert.equal(page.data.number1, 5)
    });
});