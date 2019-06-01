import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import ProceedToUserForm from './ProceedToUserForm';
import { language } from '../utility/Language';
import Dexie from 'dexie';
import Loading from './Loading';

const postToDatabase = (questions, id, coordinates, date) => {
    // If internet connection is present, send off to AWS
    axios
        .post('https://ldljqdsel3.execute-api.us-west-2.amazonaws.com/v1/questions', {
            id,
            coordinates,
            date,
            questions,
        })
        .then(res => console.log(res))

        // If there is no internet connection, add data to IndexedDB
        .catch(err => {
            var db = new Dexie('questionsDB');

            db.version(1).stores({
                data: 'id, coordinates, date, questions',
            });

            db.data
                .add({
                    id: id,
                    coordinates: coordinates,
                    date: date,
                    questions: questions,
                })
                .catch(err => {
                    alert(`Error: ${err.stack || err}`);
                });
        });
};

class CarouselView extends React.Component {
    state = {
        questions: [],
        proceedToForm: {},
        index: 0,
        userInput: [],
    };

    componentDidMount = () => {
        fetch(`https://ea-mondo.org/wp-json/wp/v2/promise_questions?slug=${language}`)
            .then(res => res.json())
            .then(data => {
                data.map(res =>
                    this.setState({ questions: res.acf.promise_questions, proceedToForm: res.acf.proceed_to_form })
                );
            });
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
        const questionList = this.state.questions.map(({ title, information, question, answers }) => {
            const answerList = answers.map(({ answer }) => {
                return (
                    <button
                        className="button"
                        key={answer}
                        value={answer}
                        onClick={e =>
                            this.state.index < this.state.questions.length &&
                            this.setState({
                                index: index + 1,
                                userInput: [...this.state.userInput, `${title} - ${e.target.value}`],
                            })
                        }
                    >
                        {answer}
                    </button>
                );
            });

            return (
                <Carousel.Item key={title}>
                    <h2 className="component-title">
                        {title} of {this.state.questions.length + 1}
                    </h2>
                    <div className="component-container">
                        <p>{information}</p>
                        <div>
                            <p className="component-question">{question}</p>
                            <div className="button-grouper">{answerList}</div>
                        </div>
                    </div>
                </Carousel.Item>
            );
        });

        const { index } = this.state;
        const q = this.state.questions;

        if (this.state.userInput.length === 1) {
            setTimeout(() => {
                this.props.start();
            });
        }

        // if (index === q.length) {
        //     postToDatabase(this.state.userInput, this.props.id, this.props.coordinates, this.props.date);
        // }

        if (q.length > 0) {
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
                <ProceedToUserForm proceedToForm={this.state.proceedToForm} />
            );
        } else {
            return <Loading />;
        }
    }
}

export default CarouselView;
