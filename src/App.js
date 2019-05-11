import React from 'react';
import './styles/index.css';
import CarouselView from './components/CarouselView.js';
import Loading from './components/Loading.js';
import ProviderId from './context/ProviderId';
import ContextId from './context/ContextId';
import Header from './components/Header';

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
            <ProviderId>
                <div className="App">
                    <Header />
                    <div className="contain">
                        <ContextId.Consumer>
                            {context =>
                                this.state.questions.length > 0 ? (
                                    <CarouselView questions={this.state.questions} id={context.id} />
                                ) : (
                                    <Loading />
                                )
                            }
                        </ContextId.Consumer>
                    </div>
                </div>
            </ProviderId>
        );
    }
}

export default App;
