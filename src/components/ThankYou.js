import React from 'react';
import ThankYouEnd from './ThankYouEnd';
import CarouselViewAdd from './CarouselViewAdd';

class ThankYou extends React.Component {
    state = {
        questionsAdditional: [],
        userChoice: '',
    };

    componentWillMount() {
        fetch('http://ea-mondo.org/wp-json/wp/v2/promise_questions_ad')
            .then(res => res.json())
            .then(data => {
                data.map(res => this.setState({ questionsAdditional: res.acf.promise_additional_questions }));
            });
    }

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
            return this.state.questionsAdditional.length > 0 ? (
                <CarouselViewAdd questions={this.state.questionsAdditional} />
            ) : (
                <h1>Loading</h1>
            );
        } else if (this.state.userChoice === 'No') {
            return <ThankYouEnd />;
        }
    }
}

export default ThankYou;
