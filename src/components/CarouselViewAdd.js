import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ThankYouEnd from './ThankYouEnd';

class CarouselViewAdd extends React.Component {
    state = {
        index: 0,
        userInputAdditional: [],
    };

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
                        <h2>{title_additional}</h2>
                        <p>{information_additional}</p>
                        <div className="button-group">
                            <p>{question_additional}</p>
                            <div>{answerList}</div>
                        </div>
                        <p>{more_information_additional}</p>
                    </Carousel.Item>
                );
            }
        );

        const { index } = this.state;
        const q = this.props.questions;

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
            >
                {questionList}
            </Carousel>
        ) : (
            <ThankYouEnd />
        );
    }
}

export default CarouselViewAdd;