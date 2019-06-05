import React from 'react';
import { setLanguage } from '../utility/Language';

class ChooseLanguage extends React.Component {
    state = {
        languages: [],
    };

    componentWillMount = () => {
        fetch(`https://ea-mondo.org/wp-json/wp/v2/promise_questions`)
            .then(res => res.json())
            .then(data => {
                data.map(res => {
                    this.setState({
                        languages: [...this.state.languages, res],
                    });
                });
            });
    };

    render() {
        const languages = this.state.languages.map(language => {
            const { id, slug, title } = language;
            return (
                <button
                    key={id}
                    className="button"
                    style={{ fontSize: '1.3rem' }}
                    value={slug}
                    onClick={e => {
                        setLanguage(e.target.value);
                        this.props.languageSelect();
                    }}
                >
                    {title.rendered}
                </button>
            );
        });

        return (
            <div className="languages">
                <div className="lang-grid">{languages}</div>
            </div>
        );
    }
}

export default ChooseLanguage;
