import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = () => (
    <Dimmer active>
        <Loader size="massive" style={{ fontSize: '1.8rem', paddingLeft: '10px', letterSpacing: '1.5px' }}>
            Loading...
        </Loader>
    </Dimmer>
);

export default Loading;
