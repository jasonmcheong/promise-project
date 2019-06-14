import React from 'react';
import './styles/index.css';
import CarouselView from './components/CarouselView.js';
import Provider from './context/Provider';
import Context from './context/Context';

const App = () => {
    return (
        <Provider>
            <div className="App">
                <div className="contain">
                    <Context.Consumer>
                        {context => (
                            <>
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
