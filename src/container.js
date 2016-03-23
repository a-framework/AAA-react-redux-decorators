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

            const {dispatch = this.dispatch} = props;
            this.inejctedDispath = dispatch.bind(this);
        }

        dispatch(actionCreator) {
            if (typeof actionCreator === 'function') {
                actionCreator((action) => {
                    this.setState(action.payload || {});
                });
            } else {
                // actionCreator is, in fact, an FSA
                this.setState(actionCreator.payload || {});
            }
        }

        calculateProps() {
            const {messages} = this.props;
            const {locale = this.props.locale || 'en'} = this.props || options;

            const props = {locale};

            if (typeof messages !== 'undefined') {
                props.messages = messages;
            }
            
            return props;
        }

        render() {
            const props = this.calculateProps();

            return (  
                <IntlProvider {...props}>
                    <ConnectedDecoratedComponent 
                        {...this.props} 
                        {...this.state} 
                        dispatch={this.inejctedDispath}
                    />
                </IntlProvider>
            );
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

