import React from 'react';

class Carousel extends React.Component {
    render() {
        const questionList = this.props.questions.map(({ title, information, question, answers }) => {
            const answerList = answers.map(({ answer }) => {
                return <button key={answer}>{answer}</button>;
            });

            return (
                <div key={title}>
                    <h1>{title}</h1>
                    <p>{information}</p>
                    <div>
                        <p>{question}</p>
                        <div>{answerList}</div>
                    </div>
                </div>
            );
        });

        return <div className="Carousel">{questionList}</div>;
    }
}

export default Carousel;
