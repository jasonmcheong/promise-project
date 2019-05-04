import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

class CarouselView extends React.Component {
    state = {
        index: 0,
    };

    render() {
        const questionList = this.props.questions.map(({ title, information, question, answers }) => {
            const answerList = answers.map(({ answer }) => {
                return (
                    <button
                        className="button"
                        key={answer}
                        onClick={() =>
                            this.state.index < this.props.questions.length - 1 && this.setState({ index: index + 1 })
                        }
                    >
                        {answer}
                    </button>
                );
            });

            return (
                <Carousel.Item key={title}>
                    {this.state.index > 0 && (
                        <button className="button" onClick={() => this.setState({ index: index - 1 })}>
                            Previous Question
                        </button>
                    )}
                    <h1>{title}</h1>
                    <p>{information}</p>
                    <div className="button-group">
                        <p>{question}</p>
                        <div>{answerList}</div>
                    </div>
                </Carousel.Item>
            );
        });

        const { index } = this.state;

        return (
            <Carousel
                activeIndex={index}
                controls={false}
                fade={true}
                indicators={false}
                interval={null}
                keyboard={false}
                slide={false}
                wrap={false}
            >
                {questionList}
            </Carousel>
        );
    }
}

export default CarouselView;
