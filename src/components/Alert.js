import React from 'react';

class Alert extends React.Component {
    closeAlert = e => {
        document.getElementById('Alert').style.display = 'none';
    };

    render() {
        return (
            <div id="Alert">
                <h4>The application will reset soon and all changes will be lost.</h4>
                <button>Add more time</button>
                <button onClick={this.closeAlert}>Cancel</button>
            </div>
        );
    }
}

export default Alert;
