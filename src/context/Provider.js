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

    userStarted = () => {
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

                // Assigning them into state, and userStarted = true
                this.setState({
                    coordinates: `${latitude}, ${longitude}`,
                    date: finalDate,
                    userStarted: true,
                });
            },
            err => {
                // Setting the date as a fallback when location cannot be retrieved
                let date = new Date();
                let timezone = date
                    .toString()
                    .split('(')
                    .pop()
                    .split(')')[0];
                let dateFormatted = moment().format('YYYYMMDD - HH:mm');
                let finalDate = `${dateFormatted} (${timezone})`;

                this.setState({ date: finalDate, userStarted: true });
            },
            { enableHighAccuracy: true }
        );
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
