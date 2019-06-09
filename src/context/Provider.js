/*
 ** TODO: Include a fallback for the date the promise was completed when user goes offline
 */

import React from 'react';
import Context from './Context';
const uuidv4 = require('uuid/v4');
const moment = require('moment');

class Provider extends React.Component {
    state = {
        id: uuidv4(),
        coordinates: 'unavailable',
        date: 'unavailable',
        userStarted: false,
    };

    componentWillMount = () => {
        navigator.geolocation.getCurrentPosition(
            location => {
                // Getting coordinates
                let latitude = location.coords.latitude;
                let longitude = location.coords.longitude;

                // Formatting the date
                let date = new Date(location.timestamp);
                let timezone = date
                    .toString()
                    .split('(')
                    .pop()
                    .split(')')[0];
                let dateFormatted = moment().format('YYYYMMDD - HH:mm');
                let finalDate = `${dateFormatted} (${timezone})`;

                // Assigning them into state
                this.setState({ coordinates: `${latitude}, ${longitude}`, date: finalDate });
            },
            err => window.alert('Please enable GPS position features'),
            { enableHighAccuracy: true }
        );
    };

    userStarted = () => {
        this.setState({ userStarted: true });
    };

    render() {
        return (
            <Context.Provider
                value={{
                    id: this.state.id,
                    coordinates: this.state.coordinates,
                    date: this.state.date,
                    start: this.userStarted,
                    userStarted: this.state.userStarted,
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default Provider;
