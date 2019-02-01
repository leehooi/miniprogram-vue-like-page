const assert = require('assert');
const Page = require('./page');
const VueLike = require('../miniprogram-vue-like-page');
describe('watch', function () {
    it('should detect data property change', () => {
        var outputs = [];
        var page = Page(VueLike({
            data: {
                notWatchedProperty: 'xxx',
                number1: 1,
                str1: 'aaa'
            },
            watch: {
                noSuchProperty: function (newVal, oldVal) {
                    outputs.push(`noSuchProperty change from ${oldVal} to ${newVal}`)
                },
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
        page.setData({ notWatchedProperty: 'yyy', number1: 3 })
        page.setData({ notWatchedProperty: 'zzz', str1: 'bbb' })

        assert.equal(outputs.join('|'),
            'number1 change from 1 to 2|' +
            'number1 change from 2 to 3|' +
            'str1 change from aaa to bbb')
    });
    it('should detect computed property change', () => {
        var outputs = [];
        var page = Page(VueLike({
            data: {
                notWatchedProperty: 'xxx',
                number1: 1
            },
            computed: {
                number2: function () {
                    return this.data.number1 + 1;
                }
            },
            watch: {
                number2: function (newVal, oldVal) {
                    outputs.push(`number2 change from ${oldVal} to ${newVal}`)
                }
            },
            onLoad: function (options) {
                this.setData({ number1: 2 })
            }
        }));
        page.onLoad();
        page.setData({ notWatchedProperty: 'yyy', number1: 3 })

        assert.equal(outputs.join('|'),
            'number2 change from 2 to 3|' +
            'number2 change from 3 to 4')
    });
});