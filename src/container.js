import React, {Component} from 'react';
import {IntlProvider, injectIntl} from 'react-intl';

export const decorateContainer = function(DecoratedComponent, options = {}) {
    const ConnectedDecoratedComponent = injectIntl(DecoratedComponent);    

    const Container = class extends Component {
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
            const {messages = {}} = this.props;

            const {locale = this.props.locale || 'en'} = this.props || options;
            
            return (  
                <IntlProvider locale={locale} messages={messages}>
                    <ConnectedDecoratedComponent 
                        {...this.props} 
                        {...this.state} 
                        dispatch={dispatch.bind(this)}
                    />
                </IntlProvider>
            );
        }
    };

    Object.defineProperty(Container, 'name', {writable: true});
    Container.name = DecoratedComponent.name;
    Object.defineProperty(Container, 'name', {writable: false});

    return Container;
};

export default function ContainerDecorator(options = {}) {
    // `options` is the class being decorated
    let result;

    if (typeof options !== 'function') {
        result = (DecoratedComponent) => decorateContainer(DecoratedComponent, options);
    } else {
        result = decorateContainer(options);
    }

    return result;
}

