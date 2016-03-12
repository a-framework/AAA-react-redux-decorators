import React, {Component} from 'react';

export default function(DecoratedComponent) {
    return class Decorator extends Component {
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
