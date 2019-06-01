import React from 'react';
import './styles/index.css';
import Provider from './context/Provider';
import Context from './context/Context';
import Header from './components/Header';
import Timer from './components/Timer';
import CarouselView from './components/CarouselView';
import ChooseLanguage from './components/ChooseLanguage';

class App extends React.Component {
    state = {
        languageSelected: false,
    };

    languageSelect = () => {
        this.setState({ languageSelected: true });
    };

    render() {
        const display = this.state.languageSelected ? (
            <>
                <Header />
                <div className="contain">
                    <Context.Consumer>
                        {(context) => (
                            <>
                                {context.userStarted === true && <Timer />}
                                <CarouselView
                                    id={context.id}
                                    coordinates={context.coordinates}
                                    date={context.date}
                                    start={context.start}
                                />
                            </>
                        )}
                    </Context.Consumer>
                </div>
            </>
        ) : (
            <ChooseLanguage languageSelect={this.languageSelect} />
        );

        return (
            <Provider>
                <div className="App">{display}</div>
            </Provider>
        );
    }
}

export default App;
