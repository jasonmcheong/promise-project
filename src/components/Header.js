import React from 'react';
import { language } from '../utility/Language';

class Header extends React.Component {
    state = {
        buttonText: '',
    };

    componentWillMount = () => {
        fetch(`https://ea-mondo.org/wp-json/wp/v2/header?slug=${language}`)
            .then(res => res.json())
            .then(data => {
                data.map(res =>
                    this.setState({
                        buttonText: res.acf.back_to_start,
                    })
                );
            });
    };

    handleSubmit = () => {};

    render() {
        return (
            <div className="Header">
                <header>
                    <div className="brand">
                        <h1>EA Mondo</h1>
                        <p style={{ fontSize: '1.2rem' }}>ea-mondo.org</p>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <button className="button back-button">{this.state.buttonText.toUpperCase()}</button>
                    </form>
                </header>
            </div>
        );
    }
}

export default Header;
