'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = I18N;
function I18N(options) {
    // `options` is the class being decorated
    var result = options;

    if (typeof options !== 'function') {
        (function () {
            var _ref = options || {};

            var _ref$injector = _ref.injector;
            var injector = _ref$injector === undefined ? function (type) {
                type;
            } : _ref$injector;

            result = function result(DecoratedComponent) {
                return injector(DecoratedComponent);
            };
        })();
    }

    return result;
};