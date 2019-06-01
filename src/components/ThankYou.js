import React from 'react';
import ThankYouEnd from './ThankYouEnd';
import CarouselViewAdd from './CarouselViewAdd';
import { language } from '../utility/Language';
import Loading from './Loading';
import Context from '../context/Context';

class ThankYou extends React.Component {
    state = {
        questionsAdditional: [],
        proceedToQuestions: {},
        userChoice: '',
    };

    componentWillMount() {
        fetch(`https://ea-mondo.org/wp-json/wp/v2/promise_questions_ad?slug=${language}`)
            .then(res => res.json())
            .then(data => {
                data.map(res =>
                    this.setState({
                        questionsAdditional: res.acf.promise_additional_questions,
                        proceedToQuestions: res.acf.proceed_to_additional_questions,
                    })
                );
            });
    }

    handleClick = e => {
        this.setState({ userChoice: e.target.value });
    };

    render() {
        if (this.state.userChoice === '') {
            const { title, information, question, yes, no, more_info } = this.state.proceedToQuestions;

            return (
                <div className="Component">
                    <h2 className="component-title">{title}</h2>
                    <div className="component-container">
                        <p>{information}</p>
                        <p className="component-question">{question}</p>
                        <div className="button-grouper" style={{ marginBottom: '10px' }}>
                            <button className="button" onClick={this.handleClick} value="Yes">
                                {yes}
                            </button>
                            <button className="button" onClick={this.handleClick} value="No">
                                {no}
                            </button>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: more_info }} />
                    </div>
                </div>
            );
        } else if (this.state.userChoice === 'Yes') {
            return this.state.questionsAdditional.length > 0 ? (
                <Context.Consumer>
                    {context => (
                        <CarouselViewAdd
                            questions={this.state.questionsAdditional}
                            id={context.id}
                            coordinates={context.coordinates}
                            date={context.date}
                        />
                    )}
                </Context.Consumer>
            ) : (
                <Loading />
            );
        } else if (this.state.userChoice === 'No') {
            return <ThankYouEnd />;
        }
    }
}

export default ThankYou;
