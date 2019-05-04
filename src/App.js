import React from 'react';
import Carousel from './components/Carousel.js';

class App extends React.Component {
    state = {
        questions: [],
    };

    componentWillMount = () => {
        fetch('http://ea-mondo.org/wp-json/wp/v2/promise_questions')
            .then(res => res.json())
            .then(resArr => {
                resArr.map(res => this.setState({ questions: res.acf.promise_questions }));
            });
    };

    render() {
        return (
            <div className="App">
                {this.state.questions.length > 0 ? <Carousel questions={this.state.questions} /> : <h1>Loading</h1>}
            </div>
        );
    }
}

export default App;
