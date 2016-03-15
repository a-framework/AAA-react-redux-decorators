'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = Container;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Container(options) {
    // `options` is the class being decorated
    var result = options;

    if (typeof options !== 'function') {
        result = function result(DecoratedComponent) {
            return function (_Component) {
                _inherits(Decorator, _Component);

                function Decorator() {
                    _classCallCheck(this, Decorator);

                    return _possibleConstructorReturn(this, Object.getPrototypeOf(Decorator).apply(this, arguments));
                }

                _createClass(Decorator, [{
                    key: 'dispatch',
                    value: function dispatch(actionCreator) {
                        var _this2 = this;

                        actionCreator(function (action) {
                            _this2.setState(action.payload || {});
                        });
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        var _props$dispatch = this.props.dispatch;
                        var dispatch = _props$dispatch === undefined ? this.dispatch : _props$dispatch;


                        return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, this.state, {
                            dispatch: dispatch.bind(this)
                        }));
                    }
                }], [{
                    key: 'propTypes',
                    get: function get() {
                        return options.propTypes;
                    }
                }]);

                return Decorator;
            }(_react.Component);
        };
    }

    return result;
};