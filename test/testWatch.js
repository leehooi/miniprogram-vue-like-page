const assert = require('assert');
const VueLike = require('../dist/miniprogram-vue-like-page');
describe('watch', function () {
    it('should detect data property change', () => {
        var outputs = [];
        var outputs2 = [];
        var page = Page(VueLike({
            data: {
                notWatchedProperty: 'xxx',
                number1: 1,
                str1: 'aaa'
            },
            watch: {
                noSuchProperty: function (newVal, oldVal) {
                    assert.ok(this.data)
                    outputs.push(`noSuchProperty change from ${oldVal} to ${newVal}`)
                },
                number1: function (newVal, oldVal) {
                    assert.ok(this.data)
                    outputs.push(`number1 change from ${oldVal} to ${newVal}`)
                },
                str1: function (newVal, oldVal) {
                    assert.ok(this.data)
                    outputs.push(`str1 change from ${oldVal} to ${newVal}`)
                }
            },
            onLoad: function (options) {
                this.setData({ number1: 2 })
                this.$watch('notWatchedProperty', function (newVal, oldVal) {
                    assert.ok(this.data)
                    outputs2.push(`$watch: notWatchedProperty change from ${oldVal} to ${newVal}`)
                })
            }
        }));
        page.onLoad();
        page.setData({ notWatchedProperty: 'yyy', number1: 3 })
        page.setData({ notWatchedProperty: 'zzz', str1: 'bbb' })

        assert.equal(outputs.join('|'),
            'number1 change from 1 to 2|' +
            'number1 change from 2 to 3|' +
            'str1 change from aaa to bbb');
        assert.equal(outputs2.join('|'),
            '$watch: notWatchedProperty change from xxx to yyy|' +
            '$watch: notWatchedProperty change from yyy to zzz');
    });
    it('should detect complex data property change', () => {
        var outputs = [];
        var page = Page(VueLike({
            data: {
                foo: {
                    list: [
                        1, 2, 3
                    ]
                }
            },
            watch: {
                "foo.list[1]": function (newVal, oldVal) {
                    assert.ok(this.data)
                    outputs.push(`complex property change from ${oldVal} to ${newVal}`)
                }
            },
            onLoad: function (options) {
                let {
                    foo
                } = this.data;
                foo.list[1] = 6;
                this.setData({ foo });
            }
        }));
        page.onLoad();
        
        let {
            foo
        } = page.data;
        foo.list[2] = 7;
        page.setData({ foo });

        assert.equal(outputs.join('|'),
            'complex property change from 2 to 6');
    });
    it('should detect computed property change', () => {
        var outputs = [];
        var page = Page(VueLike({
            data: {
                notWatchedProperty: 'xxx',
                number1: 1,
                message: ''
            },
            computed: {
                number2: function () {
                    assert.ok(this.data)
                    return this.data.number1 + 1;
                }
            },
            watch: {
                number2: function (newVal, oldVal) {
                    assert.ok(this.data)
                    this.setData({
                        message: `number2 change from ${oldVal} to ${newVal}`
                    });
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
            'number2 change from 3 to 4');
        assert.equal(page.data.message, 'number2 change from 3 to 4');
    });
    it('should detect array change properly', () => {
        var outputs = [];
        var page = Page(VueLike({
            data: {
                list: []
            },
            watch: {
                list: function (newVal, oldVal) {
                    assert.ok(this.data)
                    outputs.push(`list change from ${oldVal} to ${newVal}`)
                }
            },
            onLoad: function (options) {
                this.setData({ list: [1] })
            }
        }));
        page.onLoad();
        page.setData({ list: [1, 2] })
        page.setData({ list: [1, 2] })

        assert.equal(outputs.join('|'),
            'list change from  to 1|' +
            'list change from 1 to 1,2')
    });
    it('should detect object change properly', () => {
        var outputs = [];
        var page = Page(VueLike({
            data: {
                foo: {
                    list: [],
                    number1: 1
                }
            },
            watch: {
                foo: function (newVal, oldVal) {
                    assert.ok(this.data)
                    outputs.push(`list change from ${JSON.stringify(oldVal)} to ${JSON.stringify(newVal)}`)
                }
            },
            onLoad: function (options) {
                let {
                    foo
                } = this.data;
                foo.number1 = 2;
                this.setData({ foo })
            }
        }));
        page.onLoad();
        let {
            foo
        } = page.data;
        foo.list.push(2);
        page.setData({ foo })

        assert.equal(outputs.join('|'),
            'list change from {"list":[],"number1":1} to {"list":[],"number1":2}|' +
            'list change from {"list":[],"number1":2} to {"list":[2],"number1":2}')
    });
});