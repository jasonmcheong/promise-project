import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ProceedToUserForm from './ProceedToUserForm';
import axios from 'axios';

const postToDatabase = (questions) => {
    axios
        .post(
            'https://ldljqdsel3.execute-api.us-west-2.amazonaws.com/v1/questions',
            {
                id: '111',
                questions,
            },
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
};

class CarouselView extends React.Component {
    state = {
        index: 0,
        userInput: [],
    };

    handleSelect(selectedIndex) {
        this.setState({
            index: selectedIndex,
        });
    }

    render() {
        const questionList = this.props.questions.map(
            ({ title, information, question, answers }) => {
                const answerList = answers.map(({ answer }) => {
                    return (
                        <button
                            className="button"
                            key={answer}
                            value={answer}
                            onClick={(e) =>
                                this.state.index <
                                    this.props.questions.length &&
                                this.setState({
                                    index: index + 1,
                                    userInput: [
                                        ...this.state.userInput,
                                        `${title} - ${e.target.value}`,
                                    ],
                                })
                            }>
                            {answer}
                        </button>
                    );
                });

                return (
                    <Carousel.Item key={title}>
                        <h2 className="component-title">{title}</h2>
                        <div className="component-container">
                            <p>{information}</p>
                            <div>
                                <p className="component-question">{question}</p>
                                <div className="button-grouper">
                                    {answerList}
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                );
            },
        );

        const { index } = this.state;
        const q = this.props.questions;

        if (index === q.length) {
            postToDatabase(this.state.userInput);
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
                className="Component">
                {questionList}
            </Carousel>
        ) : (
            <ProceedToUserForm />
        );
    }
}

export default CarouselView;
