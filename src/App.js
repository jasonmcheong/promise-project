import React from 'react';
import CarouselView from './components/CarouselView.js';
import ThankYou from './components/ThankYou.js';

class App extends React.Component {
    state = {
        questions: [],
    };

    componentWillMount = () => {
        fetch('http://ea-mondo.org/wp-json/wp/v2/promise_questions')
            .then(res => res.json())
            .then(data => {
                data.map(res => this.setState({ questions: res.acf.promise_questions }));
            });
    };

    render() {
        return (
            <div className="App">
                {/* {this.state.questions.length > 0 ? <CarouselView questions={this.state.questions} /> : <h1>Loading</h1>} */}
                <ThankYou />
            </div>
        );
    }
}

export default App;
