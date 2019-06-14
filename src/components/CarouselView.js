import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Loading from './Loading';

const postToDatabase = (questions, id, coordinates, date) => {
    // If internet connection is present, send off to AWS
    axios
        .post('https://ldljqdsel3.execute-api.us-west-2.amazonaws.com/v1/ea-centro', {
            id,
            coordinates,
            date,
            questions,
        })
        .then(res => console.log(res))
        .then(() => window.location.reload())
        .catch(err => console.log(err));
};

class CarouselView extends React.Component {
    state = {
        questions: [],
        index: 0,
        userInput: [],
    };

    componentDidMount = () => {
        fetch(`http://ea-centro.org/wp-json/wp/v2/esperanto_questions`)
            .then(res => res.json())
            .then(data =>
                data.map(response => {
                    this.setState({ questions: response.acf.questions });
                })
            );
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
                        {title} / {this.state.questions.length}
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

        if (q.length > 0) {
            if (index === q.length) {
                return (
                    <>
                        <Loading />
                        {postToDatabase(this.state.userInput, this.props.id, this.props.coordinates, this.props.date)}
                    </>
                );
            } else {
                return (
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
                );
            }
        } else {
            return <Loading />;
        }
    }
}

export default CarouselView;
