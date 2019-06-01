import React from 'react';
import Context from '../context/Context';
import Timer from './Timer';
import CarouselView from './CarouselView.js';
import { setLanguage } from '../utility/Language';

class ChooseLanguage extends React.Component {
    state = {
        languages: [],
        selected: false,
    };

    componentWillMount = () => {
        fetch(`https://ea-mondo.org/wp-json/wp/v2/promise_questions`)
            .then(res => res.json())
            .then(data => {
                data.map(res =>
                    this.setState({
                        languages: [...this.state.languages, res.title.rendered],
                    })
                );
            });
    };

    render() {
        const languages = this.state.languages.map(language => {
            return (
                <button
                    key={language}
                    className="button"
                    style={{ fontSize: '1.3rem' }}
                    value={language.toLowerCase()}
                    onClick={e => {
                        setLanguage(e.target.value);
                        this.setState({ selected: true });
                    }}
                >
                    {language}
                </button>
            );
        });

        return (
            <Context.Consumer>
                {context =>
                    this.state.selected ? (
                        <>
                            {context.userStarted === true && <Timer />}
                            <CarouselView
                                id={context.id}
                                coordinates={context.coordinates}
                                date={context.date}
                                start={context.start}
                            />
                        </>
                    ) : (
                        <div style={{ maxWidth: '680px', width: '100%' }}>{languages}</div>
                    )
                }
            </Context.Consumer>
        );
    }
}

export default ChooseLanguage;
