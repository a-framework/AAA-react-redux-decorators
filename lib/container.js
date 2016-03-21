'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decorateContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = ContainerDecorator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var decorateContainer = exports.decorateContainer = function decorateContainer(DecoratedComponent) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var ConnectedDecoratedComponent = (0, _reactIntl.injectIntl)(DecoratedComponent);

    var Container = function (_Component) {
        _inherits(Container, _Component);

        _createClass(Container, null, [{
            key: 'propTypes',
            get: function get() {
                return options.propTypes;
            }
        }]);

        function Container() {
            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            _classCallCheck(this, Container);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Container).call(this, props));
        }

        _createClass(Container, [{
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
                var _props$messages = this.props.messages;
                var messages = _props$messages === undefined ? {} : _props$messages;

                var _ref = this.props || options;

                var _ref$locale = _ref.locale;
                var locale = _ref$locale === undefined ? this.props.locale || 'en' : _ref$locale;


                return _react2.default.createElement(
                    _reactIntl.IntlProvider,
                    { locale: locale, messages: messages },
                    _react2.default.createElement(ConnectedDecoratedComponent, _extends({}, this.props, this.state, {
                        dispatch: dispatch.bind(this)
                    }))
                );
            }
        }]);

        return Container;
    }(_react.Component);

    Object.defineProperty(Container, 'name', { writable: true });
    Container.name = DecoratedComponent.name;
    Object.defineProperty(Container, 'name', { writable: false });

    return Container;
};

function ContainerDecorator() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    // `options` is the class being decorated
    var result = void 0;

    if (typeof options !== 'function') {
        result = function result(DecoratedComponent) {
            return decorateContainer(DecoratedComponent, options);
        };
    } else {
        result = decorateContainer(options);
    }

    return result;
}