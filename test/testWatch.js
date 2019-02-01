const assert = require('assert');
const Page = require('./page');
const VueLike = require('../miniprogram-vue-like-page');
describe('watch', function () {
    it('Should return correct result', () => {
        var outputs = [];
        var page = Page(VueLike({
            data: {
                number1: 1,
                str1: 'aaa'
            },
            watch: {
                number1: function (newVal, oldVal) {
                    outputs.push(`number1 change from ${oldVal} to ${newVal}`)
                },
                str1: function (newVal, oldVal) {
                    outputs.push(`str1 change from ${oldVal} to ${newVal}`)
                }
            },
            onLoad: function (options) {
                this.setData({ number1: 2 })
            }
        }));
        page.onLoad();
        page.setData({ number1: 3 })
        page.setData({ str1: 'bbb' })

        assert.equal(outputs.join('|'),
            'number1 change from 1 to 2|' +
            'number1 change from 2 to 3|' +
            'str1 change from aaa to bbb')
    });
});