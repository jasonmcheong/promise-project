import React from 'react';
import Alert from './Alert';

// Timer initially set to 600 seconds(10 minutes)
class Timer extends React.Component {
    state = {
        timer: 32,
    };

    componentDidMount = () => {
        setInterval(() => {
            this.setState({ timer: this.state.timer - 1 });
            if (this.state.timer === 0) {
                window.location.reload();
            }
        }, 1000);
    };

    render() {
        return <>{this.state.timer <= 30 && <Alert />}</>;
    }
}

export default Timer;
