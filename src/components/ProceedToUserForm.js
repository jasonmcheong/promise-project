import React from 'react';
import UserForm from './UserForm';
import ThankYouEnd from './ThankYouEnd';
import Context from '../context/Context';

class ProceedToUserForm extends React.Component {
    state = {
        form: {},
        userChoice: '',
    };

    componentDidMount = () => {
        fetch('https://ea-mondo.org/wp-json/wp/v2/form')
            .then(res => res.json())
            .then(data => {
                data.map(res => this.setState({ form: res.acf }));
            });
    };

    handleClick = e => {
        this.setState({ userChoice: e.target.value });
    };

    render() {
        if (this.state.userChoice === 'Yes') {
            return (
                <Context.Consumer>
                    {context => (
                        <UserForm
                            form={this.state.form}
                            id={context.id}
                            coordinates={context.coordinates}
                            date={context.date}
                        />
                    )}
                </Context.Consumer>
            );
        }

        if (this.state.userChoice === 'No') {
            return <ThankYouEnd />;
        }

        return (
            <div className="Component">
                <h2 className="component-title">Question 7 of 7</h2>
                <div className="component-container">
                    <p>We are trying to collect 100 000 000 promises</p>
                    <div>
                        <p className="component-question">Could we collect one from you?</p>
                        <div className="button-grouper">
                            <button className="button" onClick={this.handleClick} value="Yes">
                                Yes
                            </button>
                            <button className="button" onClick={this.handleClick} value="No">
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProceedToUserForm;
