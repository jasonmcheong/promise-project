import React from 'react';
import Loading from './Loading';

class ThankYouEnd extends React.Component {
    state = {
        thankYouInfo: {},
    };

    componentWillMount = () => {
        fetch('https://ea-mondo.org/wp-json/wp/v2/thank_you')
            .then(res => res.json())
            .then(data => data.map(res => this.setState({ thankYouInfo: res.acf })));
    };

    handleSubmit = e => {};


    render() {
        // ENDED HERE DESCRTUCTURE 
        const {title}

        return this.state.thankYouInfo ? (
            <div className="Component">
                <h2 className="component-title">Thanks again</h2>
                <div className="component-container">
                    <p>Again thanks for your promise.</p>

                    <p>Bonajn dezirojn!</p>
                    <p>Best Wishes!</p>

                    <p>Esperanto Antaŭen!</p>

                    <p>For more information visit:</p>
                    <ul>
                        <li>the main English language website of Esperanto Antaŭen: ea-mondo.org</li>
                        <li>and/or the website of the World Esperanto Association: uea.org</li>
                    </ul>

                    <form onSubmit={this.handleSubmit}>
                        <button className="button" style={{ width: '100%' }}>
                            Back to start
                        </button>
                    </form>
                </div>
            </div>
        ) : (
            <Loading />
        );
    }
}

export default ThankYouEnd;
