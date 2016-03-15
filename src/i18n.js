export default function I18N(options) {
    // `options` is the class being decorated
    let result = options;

    if (typeof options !== 'function') {
        const {injector = (type) => {type}} = options || {};
        result = (DecoratedComponent) => injector(DecoratedComponent);
    }

    return result;
};