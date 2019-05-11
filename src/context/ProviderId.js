import React from 'react';
import ContextId from './ContextId';
const uuidv4 = require('uuid/v4');

class ProviderId extends React.Component {
    state = {
        id: uuidv4(),
    };

    render() {
        return (
            <ContextId.Provider
                value={{
                    id: this.state.id,
                }}
            >
                {this.props.children}
            </ContextId.Provider>
        );
    }
}

export default ProviderId;
