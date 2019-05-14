import React from 'react';

class Header extends React.Component {
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
                        <button className="button back-button">START AGAIN</button>
                    </form>
                </header>
            </div>
        );
    }
}

export default Header;
