import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ThankYouEnd from './ThankYouEnd';
import { language } from '../utility/Language';
import Dexie from 'dexie';
import axios from 'axios';

const postToDatabase = (questions, id, coordinates, date) => {
    // If internet connection is present, send off to AWS
    axios
        .post('https://ldljqdsel3.execute-api.us-west-2.amazonaws.com/v1/questions-additional', {
            id,
            coordinates,
            date,
            questions,
            language,
        })
        .then(res => console.log(res))

        // If there is no internet connection, add data to IndexedDB
        .catch(err => {
            var db = new Dexie('questionsAdditionalDB');

            db.version(1).stores({
                data: 'id, coordinates, date, questions, language',
            });

            db.data
                .add({
                    id: id,
                    coordinates: coordinates,
                    date: date,
                    questions: questions,
                    language: language,
                })
                .catch(err => {
                    alert(`Error: ${err.stack || err}`);
                });
        });
};

class CarouselViewAdd extends React.Component {
    state = {
        index: 0,
        userInputAdditional: [],
    };

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    handleSelect(selectedIndex) {
        this.setState({
            index: selectedIndex,
        });
    }

    render() {
        const questionList = this.props.questions.map(
            ({
                title_additional,
                information_additional,
                question_additional,
                answers_additional,
                more_information_additional,
            }) => {
                const answerList = answers_additional.map(({ answer_additional }) => {
                    return (
                        <button
                            className="button"
                            key={answer_additional}
                            value={answer_additional}
                            onClick={e =>
                                this.state.index < this.props.questions.length &&
                                this.setState({
                                    index: index + 1,
                                    userInputAdditional: [
                                        ...this.state.userInputAdditional,
                                        `${title_additional} - ${e.target.value}`,
                                    ],
                                })
                            }
                        >
                            {answer_additional}
                        </button>
                    );
                });

                return (
                    <Carousel.Item key={title_additional}>
                        <h2 className="component-title">{title_additional}</h2>
                        <div className="component-container">
                            <p>{information_additional}</p>
                            <div>
                                <p className="component-question">{question_additional}</p>
                                <div className="button-grouper">{answerList}</div>
                            </div>
                            <p>{more_information_additional}</p>
                        </div>
                    </Carousel.Item>
                );
            }
        );

        const { index } = this.state;
        const q = this.props.questions;

        if (index === q.length) {
            postToDatabase(this.state.userInputAdditional, this.props.id, this.props.coordinates, this.props.date);
        }

        return index < q.length ? (
            <Carousel
                activeIndex={index}
                controls={false}
                fade={true}
                indicators={false}
                interval={null}
                keyboard={false}
                onSelect={this.handleSelect}
                slide={false}
                wrap={false}
                className="Component"
            >
                {questionList}
            </Carousel>
        ) : (
            <ThankYouEnd />
        );
    }
}

export default CarouselViewAdd;
