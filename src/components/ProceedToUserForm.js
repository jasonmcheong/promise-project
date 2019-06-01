import React from 'react';
import UserForm from './UserForm';
import ThankYouEnd from './ThankYouEnd';
import { language } from '../utility/Language';
import Context from '../context/Context';

class ProceedToUserForm extends React.Component {
    state = {
        form: {},
        userChoice: '',
    };

    componentDidMount = () => {
        fetch(`https://ea-mondo.org/wp-json/wp/v2/form?slug=${language}`)
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

        const { title, information, question, yes, no } = this.props.proceedToForm;

        return (
            <div className="Component">
                <h2 className="component-title">{title}</h2>
                <div className="component-container">
                    <p>{information}</p>
                    <div>
                        <p className="component-question">{question}</p>
                        <div className="button-grouper">
                            <button className="button" onClick={this.handleClick} value="Yes">
                                {yes}
                            </button>
                            <button className="button" onClick={this.handleClick} value="No">
                                {no}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProceedToUserForm;
