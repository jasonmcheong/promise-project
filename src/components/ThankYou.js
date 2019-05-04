import React from 'react';

class ThankYou extends React.Component {
    state = {
        userChoice: '',
    };

    handleClick = e => {
        this.setState({ userChoice: e.target.value });
    };

    render() {
        if (this.state.userChoice === '') {
            return (
                <div>
                    <h2>Thank You</h2>
                    <p>Expect a welcome email within 48 hours, then future contact in accordance with your wishes.</p>
                    <p>
                        If you are interested, we have three optional questions to help us with Strategy. Are you
                        willing to answer the optional questions?
                    </p>
                    <button onClick={this.handleClick} value="Yes">
                        Yes
                    </button>
                    <button onClick={this.handleClick} value="No">
                        No
                    </button>
                    <p>For more information visit:</p>
                    <p>the main English language website of Esperanto Antaŭen at ea-mondo.org</p>
                    <p>the website of the Canadian Esperanto Association esperanto.ca</p>
                    <p>and/or the website of the World Esperanto Association uea.org</p>
                </div>
            );
        } else if (this.state.userChoice === 'Yes') {
            return (
                <div>
                    this
                    <p />
                </div>
            );
        } else if (this.state.userChoice === 'No') {
            return (
                <div>
                    No
                    <p />
                </div>
            );
        }
    }
}

export default ThankYou;
