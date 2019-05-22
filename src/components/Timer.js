import React from 'react';

// Timer initially set to 420 seconds(7 minutes)
class Timer extends React.Component {
    state = {
        timer: 420,
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
        return <></>;
    }
}

export default Timer;
