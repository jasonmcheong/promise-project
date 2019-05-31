import React from 'react';
import Alert from './Alert';

// Timer initially set to 600 seconds(10 minutes)
class Timer extends React.Component {
    state = {
        timer: 600,
        showAlert: false,
    };

    resetTimer = () => {
        // Closes Alert component and adds 300 seconds(5 minutes) to the timer
        this.setState({ timer: 300, showAlert: false });
    };

    componentDidMount = () => {
        setInterval(() => {
            this.setState({ timer: this.state.timer - 1 });
            if (this.state.timer === 30) {
                this.setState({ showAlert: true });
            }
            if (this.state.timer === 0) {
                window.location.reload();
            }
        }, 1000);
    };

    render() {
        return <>{this.state.showAlert && <Alert time={this.state.timer} reset={this.resetTimer} />}</>;
    }
}

export default Timer;
