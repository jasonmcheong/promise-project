import React from 'react';

class Alert extends React.Component {
    closeAlert = () => {
        document.getElementById('alert').style.display = 'none';
    };

    render() {
        const { msg, add_time, cancel } = this.props.alertInfo;

        return (
            <div id="alert" className="Alert">
                <h3>
                    {msg} ({this.props.time})
                </h3>
                <button className="button" onClick={this.props.reset}>
                    {add_time}
                </button>
                <button className="button" onClick={this.closeAlert}>
                    {cancel}
                </button>
            </div>
        );
    }
}

export default Alert;
