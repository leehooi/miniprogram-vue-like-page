const assert = require('assert');
const VueLike = require('../dist/miniprogram-vue-like-page');
describe('mixin', function () {
    describe('lifecycle callback', function () {
        it('should be invoked sequentialy', () => {
            var outputs = [];
            var page = Page(VueLike({
                data: {},
                mixins: [
                    {
                        onLoad: function () {
                            assert.ok(this.data)
                            outputs.push('minxin 1 onLoad')
                        },
                        onShow: function () {
                            assert.ok(this.data)
                            outputs.push('minxin 1 onShow')
                        }
                    },
                    {
                        onLoad: function () {
                            assert.ok(this.data)
                            outputs.push('minxin 2 onLoad')
                        },
                        onShow: function () {
                            assert.ok(this.data)
                            outputs.push('minxin 2 onShow')
                        }
                    }],
                onLoad: function (options) {
                    assert.ok(this.data)
                    outputs.push('page 2 onLoad')
                },
                onShow: function () {
                    assert.ok(this.data)
                    outputs.push('page 2 onShow')
                }
            }));
            page.onLoad();
            page.onShow();

            assert.equal(outputs.join('|'),
                'minxin 1 onLoad|' +
                'minxin 2 onLoad|' +
                'page 2 onLoad|' +
                'minxin 1 onShow|' +
                'minxin 2 onShow|' +
                'page 2 onShow')
        });
    });
    describe('method', function () {
        it('should be merged', () => {
            var outputs = [];
            var page = Page(VueLike({
                data: {},
                mixins: [
                    {
                        method2: function () {
                            assert.ok(this.data)
                            outputs.push('minxin 1 method2')
                        }
                    },
                    {
                        method2: function () {
                            assert.ok(this.data)
                            outputs.push('minxin 2 method2')
                        }
                    }],
                method1: function () {
                    assert.ok(this.data)
                    outputs.push('page method1')
                }
            }));
            page.onLoad();

            page.method1();
            assert.equal(outputs.join('|'), 'page method1')

            outputs.splice(0)
            page.method2();
            assert.equal(outputs.join('|'), 'minxin 1 method2')
        });
        it('should be overwriten by Page', () => {
            var outputs = [];
            var page = Page(VueLike({
                data: {},
                mixins: [
                    {
                        method1: function () {
                            assert.ok(this.data)
                            outputs.push('minxin 1 method1')
                        },
                        method2: function () {
                            assert.ok(this.data)
                            outputs.push('minxin 1 method2')
                        }
                    },
                    {
                        method1: function () {
                            assert.ok(this.data)
                            outputs.push('minxin 2 method1')
                        },
                        method2: function () {
                            assert.ok(this.data)
                            outputs.push('minxin 2 method2')
                        }
                    }],
                method1: function () {
                    assert.ok(this.data)
                    outputs.push('page method1')
                }
            }));
            page.onLoad();

            page.method1();
            assert.equal(outputs.join('|'), 'page method1')

            outputs.splice(0)
            page.method2();
            assert.equal(outputs.join('|'), 'minxin 1 method2')
        });
    });
    describe('data', function () {
        it('should be merged', () => {
            var page = Page(VueLike({
                mixins: [
                    {
                        data: {
                            propery2: 'mixin propery2'
                        }
                    }],
                data: {
                    propery1: 'page propery1'
                }
            }));
            page.onLoad();
            assert.equal(page.data.propery1, 'page propery1')
            assert.equal(page.data.propery2, 'mixin propery2')
        });
        it('should be overwriten by Page', () => {
            var page = Page(VueLike({
                mixins: [
                    {
                        data: {
                            propery1: 'mixin propery1',
                            propery2: 'mixin propery2'
                        }
                    }],
                data: {
                    propery1: 'page propery1'
                }
            }));
            page.onLoad();
            assert.equal(page.data.propery1, 'page propery1')
            assert.equal(page.data.propery2, 'mixin propery2')
        });
    });
    describe('computed', function () {
        it('should be merged', () => {
            var page = Page(VueLike({
                mixins: [
                    {
                        computed: {
                            contentComputed2: function () {
                                assert.ok(this.data)
                                return this.data.content + ' computed by mixin'
                            }
                        }
                    }],
                data: {
                    content: 'test content'
                },
                computed: {
                    contentComputed1: function () {
                        assert.ok(this.data)
                        return this.data.content + ' computed by page'
                    }
                }
            }));
            page.onLoad();
            assert.equal(page.data.contentComputed1, 'test content computed by page')
            assert.equal(page.data.contentComputed2, 'test content computed by mixin')
        });
        it('should be overwriten by Page', () => {
            var page = Page(VueLike({
                mixins: [
                    {
                        computed: {
                            contentComputed1: function () {
                                assert.ok(this.data)
                                return this.data.content + ' computed by mixin'
                            },
                            contentComputed2: function () {
                                assert.ok(this.data)
                                return this.data.content + ' computed by mixin'
                            }
                        }
                    }],
                data: {
                    content: 'test content'
                },
                computed: {
                    contentComputed1: function () {
                        assert.ok(this.data)
                        return this.data.content + ' computed by page'
                    }
                }
            }));
            page.onLoad();
            assert.equal(page.data.contentComputed1, 'test content computed by page')
            assert.equal(page.data.contentComputed2, 'test content computed by mixin')
        });
    });
    describe('watch', function () {
        it('should be merged', () => {
            var outputs = [];
            var page = Page(VueLike({
                mixins: [
                    {
                        watch: {
                            number1: function (newVal, oldVal) {
                                assert.ok(this.data)
                                outputs.push(`mixin detected change from ${oldVal} to ${newVal}`)
                            }
                        },
                    }],
                data: {
                    number1: 1
                },
                watch: {
                    number1: function (newVal, oldVal) {
                        assert.ok(this.data)
                        outputs.push(`page change from ${oldVal} to ${newVal}`)
                    }
                },
                onLoad: function (options) {
                    assert.ok(this.data)
                    this.setData({ number1: 2 })
                }
            }));
            page.onLoad();
            page.setData({ number1: 3 })

            assert.equal(outputs.join('|'),
                'mixin detected change from 1 to 2|page change from 1 to 2|' +
                'mixin detected change from 2 to 3|page change from 2 to 3')
        });
    });
    describe('global mixin', function () {
        it('should be merged at first', () => {
            var outputs = [];
            setApp({
                mixins: [
                    {
                        onLoad: function (options) {
                            assert.ok(this.data)
                            outputs.push('global minxin onLoad')
                        }
                    }]
            })
            var page = Page(VueLike({
                data: {},
                mixins: [
                    {
                        onLoad: function (options) {
                            assert.ok(this.data)
                            outputs.push('local minxin onLoad')
                        }
                    }],
                onLoad: function (options) {
                    assert.ok(this.data)
                    outputs.push('page onLoad')
                }
            }));
            page.onLoad();

            assert.equal(outputs.join('|'),
                'global minxin onLoad|' +
                'local minxin onLoad|' +
                'page onLoad')
        });
    });
});