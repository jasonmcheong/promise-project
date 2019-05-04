import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import UserForm from './UserForm';

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
        const questionList = this.props.questions.map(({ title, information, question, answers }) => {
            const answerList = answers.map(({ answer }) => {
                return (
                    <button
                        className="button"
                        key={answer}
                        value={answer}
                        onClick={e =>
                            this.state.index < this.props.questions.length &&
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
                    <h2>{title}</h2>
                    <p>{information}</p>
                    <div className="button-group">
                        <p>{question}</p>
                        <div>{answerList}</div>
                    </div>
                </Carousel.Item>
            );
        });

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
            <UserForm />
        );
    }
}

export default CarouselView;
