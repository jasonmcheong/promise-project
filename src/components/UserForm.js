import React from 'react';
import ThankYou from './ThankYou';
import axios from 'axios';

class UserForm extends React.Component {
    state = {
        name: '',
        email: '',
        phone: '',
        country: '',
        newsletter: 'Frequent',
        submitted: false,
    };

    handleOnChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        axios
            .post(
                'https://ldljqdsel3.execute-api.us-west-2.amazonaws.com/v1/form',
                {
                    id: '111',
                    form: {
                        name: this.state.name,
                        email: this.state.email || 'none',
                        phone: this.state.phone || 'none',
                        country: this.state.country,
                        newsletter: this.state.newsletter,
                    },
                },
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    render() {
        return this.state.submitted ? (
            <ThankYou />
        ) : (
            <form className="ui large form Form" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label
                        style={{
                            color: '#fff',
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                        }}
                        htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={this.handleOnChange}
                        value={this.state.name}
                        required
                    />
                </div>
                <div className="field">
                    <label
                        style={{
                            color: '#fff',
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                        }}
                        htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleOnChange}
                        value={this.state.email}
                    />
                </div>
                <div className="field">
                    <label
                        style={{
                            color: '#fff',
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                        }}
                        htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={this.handleOnChange}
                        value={this.state.phone}
                    />
                </div>
                <div className="field">
                    <label
                        style={{
                            color: '#fff',
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                        }}
                        htmlFor="country">
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        placeholder="Country"
                        onChange={this.handleOnChange}
                        value={this.state.country}
                    />
                </div>
                <div className="grouped fields">
                    <label
                        style={{
                            color: '#fff',
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                        }}
                        htmlFor="newsletter">
                        After the first email contact me (frequency):
                    </label>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                id="Frequent"
                                name="newsletter"
                                onChange={this.handleOnChange}
                                value="Frequent"
                                checked={this.state.newsletter === 'Frequent'}
                            />
                            <label
                                style={{
                                    color: '#fff',
                                    fontSize: '1.2rem',
                                    marginBottom: '1rem',
                                }}
                                htmlFor="Frequent">
                                To inform me about events and important news
                                from the Esperanto movement.
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                id="Monthly"
                                name="newsletter"
                                onChange={this.handleOnChange}
                                value="Monthly"
                                checked={this.state.newsletter === 'Monthly'}
                            />
                            <label
                                style={{
                                    color: '#fff',
                                    fontSize: '1.2rem',
                                    marginBottom: '1rem',
                                }}
                                htmlFor="Monthly">
                                Each month with news from Esperanto Antaŭen
                                projects and the Esperanto movement.
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                id="Rarely"
                                name="newsletter"
                                onChange={this.handleOnChange}
                                value="Rarely"
                                checked={this.state.newsletter === 'Rarely'}
                            />
                            <label
                                style={{
                                    color: '#fff',
                                    fontSize: '1.2rem',
                                    marginBottom: '1rem',
                                }}
                                htmlFor="Rarely">
                                Rarely, only when major milestones are reached
                                (10 000, ...1 000 000 etc).
                            </label>
                        </div>
                    </div>
                </div>
                <button className="button" style={{ width: '100%' }}>
                    Submit
                </button>
            </form>
        );
    }
}

export default UserForm;
