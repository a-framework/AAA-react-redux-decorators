import React, {Component} from 'react';
import {IntlProvider, injectIntl} from 'react-intl';

export const decorateContainer = function(DecoratedComponent, options = {}) {
    const ConnectedDecoratedComponent = injectIntl(DecoratedComponent);    

    const EnvelopedContaine = class extends Component {
        static get propTypes() {
            return options.propTypes;
        }

        constructor(props = {}) {
            super(props);
        }

        dispatch(actionCreator) {
            actionCreator((action) => {
                this.setState(action.payload || {});
            });
        }

        render() {
            const {dispatch = this.dispatch} = this.props;
            const {messages} = this.props;
            const {locale = this.props.locale || 'en'} = this.props || options;

            const decoratedComponent = (
                <ConnectedDecoratedComponent 
                    {...this.props} 
                    {...this.state} 
                    dispatch={dispatch.bind(this)}
                />
            );

            let intlComponent;

            if (typeof messages === 'undefined') {
                intlComponent = (  
                    <IntlProvider locale={locale}>
                        {decoratedComponent}
                    </IntlProvider>
                );
            } else {
                intlComponent = (  
                    <IntlProvider locale={locale} messages={messages}>
                        {decoratedComponent}
                    </IntlProvider>
                );
            }

            return intlComponent;
        }
    };

    Object.defineProperty(EnvelopedContaine, 'name', {writable: true});
    EnvelopedContaine.name = DecoratedComponent.name;
    Object.defineProperty(EnvelopedContaine, 'name', {writable: false});

    return EnvelopedContaine;
};

export default function Container(options = {}) {
    // `options` is the class being decorated
    let result;

    if (typeof options !== 'function') {
        result = (DecoratedComponent) => decorateContainer(DecoratedComponent, options);
    } else {
        result = decorateContainer(options);
    }

    return result;
}

