import React from 'react';
import './styles/index.css';
import CarouselView from './components/CarouselView.js';
import Provider from './context/Provider';
import Context from './context/Context';
import Header from './components/Header';
import Timer from './components/Timer';

const App = () => {
    return (
        <Provider>
            <div className="App">
                <Header />
                <div className="contain">
                    <Context.Consumer>
                        {context => (
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
            </div>
        </Provider>
    );
};

export default App;
