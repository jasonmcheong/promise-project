import React from 'react';
import ThankYouEnd from './ThankYouEnd';
import CarouselViewAdd from './CarouselViewAdd';
import Loading from './Loading';
import ContextId from '../context/ContextId';

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
                <div className="Component">
                    <h2 className="component-title">Thank You</h2>
                    <div className="component-container">
                        <p>
                            Expect a welcome email within 48 hours, then future contact in accordance with your wishes.
                        </p>
                        <p className="component-question">
                            If you are interested, we have three optional questions to help us with Strategy. Are you
                            willing to answer the optional questions?
                        </p>
                        <div className="button-grouper" style={{ marginBottom: '10px' }}>
                            <button className="button" onClick={this.handleClick} value="Yes">
                                Yes
                            </button>
                            <button className="button" onClick={this.handleClick} value="No">
                                No
                            </button>
                        </div>
                        <p>For more information visit:</p>
                        <p>the main English language website of Esperanto Antaŭen at ea-mondo.org</p>
                        <p>the website of the Canadian Esperanto Association esperanto.ca</p>
                        <p>and/or the website of the World Esperanto Association uea.org</p>
                    </div>
                </div>
            );
        } else if (this.state.userChoice === 'Yes') {
            return this.state.questionsAdditional.length > 0 ? (
                <ContextId.Consumer>
                    {context => <CarouselViewAdd questions={this.state.questionsAdditional} id={context.id} />}
                </ContextId.Consumer>
            ) : (
                <Loading />
            );
        } else if (this.state.userChoice === 'No') {
            return <ThankYouEnd />;
        }
    }
}

export default ThankYou;
