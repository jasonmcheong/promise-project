// TODO: Create a randomly generated id for each session, right now using static id

import React from 'react';
import './styles/App.css';
import './styles/index.css';
import CarouselView from './components/CarouselView.js';
import Loading from './components/Loading.js';
import UserForm from './components/UserForm';

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
                {/* {this.state.questions.length > 0 ? <CarouselView questions={this.state.questions} /> : <Loading />} */}
                <UserForm />
            </div>
        );
    }
}

export default App;
