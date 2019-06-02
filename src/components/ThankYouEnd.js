import React from 'react';
import { language } from '../utility/Language';
import Loading from './Loading';

class ThankYouEnd extends React.Component {
    state = {
        thankYouInfo: {},
    };

    componentWillMount = () => {
        fetch(`https://ea-mondo.org/wp-json/wp/v2/thank_you?slug=${language}`)
            .then(res => res.json())
            .then(data => data.map(res => this.setState({ thankYouInfo: res.acf })));
    };

    handleSubmit = e => {};

    render() {
        const { title, info, button_text } = this.state.thankYouInfo;

        return Object.getOwnPropertyNames(this.state.thankYouInfo).length !== 0 ? (
            <div className="Component">
                <h2 className="component-title">{title}</h2>
                <div className="component-container">
                    <div dangerouslySetInnerHTML={{ __html: info }} />
                    <form onSubmit={this.handleSubmit}>
                        <button className="button" style={{ width: '100%' }}>
                            {button_text}
                        </button>
                    </form>
                </div>
            </div>
        ) : (
            <Loading />
        );
    }
}

export default ThankYouEnd;
