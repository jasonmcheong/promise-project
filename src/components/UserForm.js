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
            <form className="ui large form Form" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '1rem' }} htmlFor="name">
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
                    <label style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '1rem' }} htmlFor="email">
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
                    <label style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '1rem' }} htmlFor="phone">
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
                    <label style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '1rem' }} htmlFor="country">
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
                    <label style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '1rem' }} htmlFor="update">
                        After the first email contact me (frequency):
                    </label>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                id="Frequent"
                                name="update"
                                onChange={this.handleOnChange}
                                value="Frequent"
                                checked={this.state.update === 'Frequent'}
                            />
                            <label
                                style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem' }}
                                htmlFor="Frequent"
                            >
                                To inform me about events and important news from the Esperanto movement.
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                id="Infrequent"
                                name="update"
                                onChange={this.handleOnChange}
                                value="Infrequent"
                                checked={this.state.update === 'Infrequent'}
                            />
                            <label
                                style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem' }}
                                htmlFor="Infrequent"
                            >
                                Each month with news from Esperanto Antaŭen projects and the Esperanto movement.
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                id="Rarely"
                                name="update"
                                onChange={this.handleOnChange}
                                value="Rarely"
                                checked={this.state.update === 'Rarely'}
                            />
                            <label style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem' }} htmlFor="Rarely">
                                Rarely, only when major milestones are reached (10 000, ...1 000 000 etc).
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
