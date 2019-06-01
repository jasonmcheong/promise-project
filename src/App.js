import React from 'react';
import './styles/index.css';
import Provider from './context/Provider';
import Header from './components/Header';
import ChooseLanguage from './components/ChooseLanguage';

const App = () => {
    return (
        <Provider>
            <div className="App">
                <Header />
                <div className="contain">
                    <ChooseLanguage />
                </div>
            </div>
        </Provider>
    );
};

export default App;
