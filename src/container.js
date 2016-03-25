import React, {Component} from 'react';
import {IntlProvider, injectIntl} from 'react-intl';

export const decorateContainer = function(DecoratedComponent, options = {}) {
    const ConnectedDecoratedComponent = injectIntl(DecoratedComponent);    

    const EnvelopedContainer = class extends Component {
        static get propTypes() {
            return options.propTypes;
        }

        constructor(props = {}) {
            super(props);

            const {dispatch = this.dispatch} = props;
            this.inejctedDispath = dispatch.bind(this);
        }

        dispatch(action) {
            // thunk-lik action, in fact, an actionCreator
            if (typeof action === 'function') {
                action((action) => {
                    this.setState(action.payload || {});
                });
            } else {
                this.setState(action.payload || {});
            }
        }

        calculateProps() {
            const {messages} = this.props;
            const {locale = options.locale || 'en'} = this.props;

            const props = {locale};

            if (typeof messages !== 'undefined') {
                props.messages = messages;
            }
            
            return props;
        }

        render() {
            const intlProps = this.calculateProps();

            // TODO: Deep merge? Performance on render?
            const propsConfig = this.props ? (this.props.config || {}) : {};
            const stateConfig = this.state ? (this.state.config || {}) : {};
            const config = {...options.config, ...propsConfig, ...stateConfig};

            console.log(config);

            const props = {
                ...this.props,
                ...this.state,
                ...{config: config}, 
                ...{dispatch: this.inejctedDispath}
            };

            return (  
                <IntlProvider {...intlProps}>
                    <ConnectedDecoratedComponent {...props} />
                </IntlProvider>
            );
        }
    };

    Object.defineProperty(EnvelopedContainer, 'name', {writable: true});
    EnvelopedContainer.name = DecoratedComponent.name;
    Object.defineProperty(EnvelopedContainer, 'name', {writable: false});

    return EnvelopedContainer;
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

