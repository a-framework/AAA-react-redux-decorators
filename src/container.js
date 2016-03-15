import React, {Component} from 'react';

export default function Container(options) {
    // `options` is the class being decorated
    let result = options;

    if (typeof options !== 'function') {
        result = (DecoratedComponent) => {
            return class Decorator extends Component {
                static get propTypes() {
                    return options.propTypes;
                }

                dispatch(actionCreator) {
                    actionCreator((action) => {
                        this.setState(action.payload || {});
                    });
                }

                render() {
                    const {dispatch = this.dispatch} = this.props;

                    return (  
                        <DecoratedComponent 
                            {...this.props} 
                            {...this.state} 
                            dispatch={dispatch.bind(this)}
                        />
                    );
                }
            };        
        };        
    }

    return result;
};
