import React from 'react';

class Alert extends React.Component {
    closeAlert = () => {
        document.getElementById('alert').style.display = 'none';
    };

    render() {
        return (
            <div id="alert" className="Alert">
                <h3>The application will reset soon and all changes will be lost. ({this.props.time})</h3>
                <button className="button" onClick={this.props.reset}>
                    Add more time
                </button>
                <button className="button" onClick={this.closeAlert}>
                    Cancel
                </button>
            </div>
        );
    }
}

export default Alert;
