import React from 'react';
import './styles/index.css';
import CarouselView from './components/CarouselView.js';
import Loading from './components/Loading.js';
import Provider from './context/Provider';
import Context from './context/Context';
import Header from './components/Header';
import Timer from './components/Timer';
import ThankYouEnd from './components/ThankYouEnd';

class App extends React.Component {
    state = {
        questions: [],
        proceedToForm: {},
    };

    componentWillMount = () => {
        fetch('https://ea-mondo.org/wp-json/wp/v2/promise_questions')
            .then(res => res.json())
            .then(data => {
                data.map(res =>
                    this.setState({ questions: res.acf.promise_questions, proceedToForm: res.acf.proceed_to_form })
                );
            });
    };

    render() {
        return (
            <Provider>
                <div className="App">
                    <Header />
                    <div className="contain">
                        <Context.Consumer>
                            {context =>
                                this.state.questions.length > 0 ? (
                                    <>
                                        {context.userStarted === true && <Timer />}
                                        <CarouselView
                                            questions={this.state.questions}
                                            proceedToForm={this.state.proceedToForm}
                                            id={context.id}
                                            coordinates={context.coordinates}
                                            date={context.date}
                                            start={context.start}
                                        />
                                    </>
                                ) : (
                                    <Loading />
                                )
                            }
                        </Context.Consumer>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
