import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

class CarouselView extends React.Component {
    state = {
        index: 0,
        direction: null,
    };

    handleSelect = (selectedIndex, e) => {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    };

    render() {
        const questionList = this.props.questions.map(({ title, information, question, answers }) => {
            const answerList = answers.map(({ answer }) => {
                return (
                    <button key={answer} onClick={() => this.setState({ index: index + 1 })}>
                        {answer}
                    </button>
                );
            });

            return (
                <Carousel.Item key={title}>
                    <h1>{title}</h1>
                    <p>{information}</p>
                    <div>
                        <p>{question}</p>
                        <div>{answerList}</div>
                    </div>
                </Carousel.Item>
            );
        });

        const { index, direction } = this.state;

        return (
            <Carousel
                activeIndex={index}
                direction={direction}
                controls={true}
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
        );
    }
}

export default CarouselView;
