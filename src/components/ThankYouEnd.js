import React from 'react';

const ThankYouEnd = () => {
    const handleSubmit = e => {};

    return (
        <div className="Component">
            <h2 className="component-title">Thanks again</h2>
            <div className="component-container">
                <p>Again thanks for your promise.</p>

                <p>Bonajn dezirojn!</p>
                <p>Best Wishes!</p>

                <p>Esperanto Antaŭen!</p>

                <p>For more information visit:</p>
                <ul>
                    <li>the main English language website of Esperanto Antaŭen: ea-mondo.org</li>
                    <li>and/or the website of the World Esperanto Association: uea.org</li>
                </ul>

                <form onSubmit={handleSubmit}>
                    <button className="button" style={{ width: '100%' }}>
                        Back to start
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ThankYouEnd;
