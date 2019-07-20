import React from 'react';
import OtherLanguages from './OtherLanguages';
import MainLanguages from './MainLanguages';

class ChooseLanguage extends React.Component {
    state = {
        languages: [],
        viewOtherLanguages: false,
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
        return (
            <div className="choose">
                <div className="translate">
                    <i
                        className="far fa-plus-square"
                        onClick={e => this.setState({ viewOtherLanguages: !this.state.viewOtherLanguages })}
                    />
                </div>
                {!this.state.viewOtherLanguages ? (
                    <MainLanguages languages={this.state.languages} languageSelect={this.props.languageSelect} />
                ) : (
                    <OtherLanguages languages={this.state.languages} languageSelect={this.props.languageSelect} />
                )}
            </div>
        );
    }
}

export default ChooseLanguage;
