const assert = require('assert');
const Page = require('./page');
const VueLike = require('../miniprogram-vue-like-page');
describe('mixin', function () {
    describe('lifecycle callbacks', function () {
        it('should be invoked sequentialy', () => {
            var outputs = [];
            var page = Page(VueLike({
                mixins: [
                    {
                        onLoad: function () {
                            outputs.push('minxin 1 onLoad')
                        },
                        onShow: function () {
                            outputs.push('minxin 1 onShow')
                        }
                    },
                    {
                        onLoad: function () {
                            outputs.push('minxin 2 onLoad')
                        },
                        onShow: function () {
                            outputs.push('minxin 2 onShow')
                        }
                    }],
                onLoad: function (options) {
                    outputs.push('page 2 onLoad')
                },
                onShow: function () {
                    outputs.push('page 2 onShow')
                }
            }));
            page.onLoad();
            page.onShow();

            assert.equal(outputs.join('|'),
                'minxin 1 onLoad|minxin 2 onLoad|page 2 onLoad|minxin 1 onShow|minxin 2 onShow|page 2 onShow')
        });
    });
    describe('method', function () {
        it('should be merged', () => {
            var outputs = [];
            var page = Page(VueLike({
                mixins: [
                    {
                        method2: function () {
                            outputs.push('minxin 1 method2')
                        }
                    },
                    {
                        method2: function () {
                            outputs.push('minxin 2 method2')
                        }
                    }],
                method1: function () {
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
                mixins: [
                    {
                        method1: function () {
                            outputs.push('minxin 1 method1')
                        },
                        method2: function () {
                            outputs.push('minxin 1 method2')
                        }
                    },
                    {
                        method1: function () {
                            outputs.push('minxin 2 method1')
                        },
                        method2: function () {
                            outputs.push('minxin 2 method2')
                        }
                    }],
                method1: function () {
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
    describe('data object', function () {
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
    describe('computed object', function () {
        it('should be merged', () => {
            var page = Page(VueLike({
                mixins: [
                    {
                        computed: {
                            contentComputed2: function () {
                                return this.data.content + ' computed by mixin'
                            }
                        }
                    }],
                data: {
                    content: 'test content'
                },
                computed: {
                    contentComputed1: function () {
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
                                return this.data.content + ' computed by mixin'
                            },
                            contentComputed2: function () {
                                return this.data.content + ' computed by mixin'
                            }
                        }
                    }],
                data: {
                    content: 'test content'
                },
                computed: {
                    contentComputed1: function () {
                        return this.data.content + ' computed by page'
                    }
                }
            }));
            page.onLoad();
            assert.equal(page.data.contentComputed1, 'test content computed by page')
            assert.equal(page.data.contentComputed2, 'test content computed by mixin')
        });
    });
});