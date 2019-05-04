import React from 'react';
import ThankYou from './ThankYou';

class UserForm extends React.Component {
    state = {
        name: '',
        email: '',
        phone: '',
        country: '',
        update: 'Frequent',
        submitted: false,
    };

    componentWillMount() {
        this.setState({
            name: '',
            email: '',
            phone: '',
            country: '',
            update: 'Frequent',
            submitted: false,
        });
    }

    handleOnChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ submitted: true });
    };

    render() {
        return this.state.submitted ? (
            <ThankYou />
        ) : (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={this.handleOnChange}
                    value={this.state.name}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleOnChange}
                    value={this.state.email}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={this.handleOnChange}
                    value={this.state.phone}
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    onChange={this.handleOnChange}
                    value={this.state.country}
                />
                <p>After the first email contact me (Frequency): </p>
                <input
                    type="radio"
                    name="update"
                    onChange={this.handleOnChange}
                    value="Frequent"
                    checked={this.state.update === 'Frequent'}
                />
                To inform me about events and important news from the Esperanto movement.
                <input
                    type="radio"
                    name="update"
                    onChange={this.handleOnChange}
                    value="Infrequent"
                    checked={this.state.update === 'Infrequent'}
                />{' '}
                Each month with news from Esperanto Antaŭen projects and the Esperanto movement.
                <input
                    type="radio"
                    name="update"
                    onChange={this.handleOnChange}
                    value="Rarely"
                    checked={this.state.update === 'Rarely'}
                />{' '}
                Rarely, only when major milestones are reached (10 000, ...1 000 000 etc)
                <button>Submit</button>
            </form>
        );
    }
}

export default UserForm;
