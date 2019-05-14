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
        translate: false,
    };

    handleOnChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ submitted: true });
        axios
            .post('https://ldljqdsel3.execute-api.us-west-2.amazonaws.com/v1/form', {
                id: this.props.id,
                coordinates: this.props.coordinates,
                date: this.props.date,
                form: {
                    name: this.state.name,
                    email: this.state.email || 'none',
                    phone: this.state.phone || 'none',
                    country: this.state.country,
                    newsletter: this.state.newsletter,
                },
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
        return this.state.submitted ? (
            <ThankYou />
        ) : (
            <form className="ui large form Form" onSubmit={this.handleSubmit}>
                <div className="toggle">
                    <div className="ui toggle checkbox">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.translate}
                            onClick={() => this.setState({ translate: !this.state.translate })}
                        />
                        <label />
                    </div>
                    {!this.state.translate ? (
                        <label style={{ color: '#fff', fontSize: '1.3rem' }}>Translate to Esperanto</label>
                    ) : (
                        <label style={{ color: '#fff', fontSize: '1.3rem' }}>Traduki al la Angla</label>
                    )}
                </div>
                <p style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '3.5rem' }}>
                    {!this.state.translate ? (
                        <>
                            I promise to learn the international language, Esperanto, after 100 000 000 people make this
                            promise.
                        </>
                    ) : (
                        <>
                            Mi promesas lerni la internacian lingvon, Esperanto post kiam 100 000 000 personoj faras ĉi
                            tiun promeson.
                        </>
                    )}
                </p>
                <div className="field required">
                    <label
                        style={{
                            color: '#fff',
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                        }}
                        htmlFor="name"
                    >
                        {!this.state.translate ? <>Name</> : <>Nomo</>}
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
                        htmlFor="email"
                    >
                        {!this.state.translate ? <>Email</> : <>Retadreso</>}
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
                        htmlFor="phone"
                    >
                        {!this.state.translate ? <>Phone Number</> : <>Telefon-numero</>}
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
                <div className="field required">
                    <label
                        style={{
                            color: '#fff',
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                        }}
                        htmlFor="country"
                    >
                        {!this.state.translate ? <>Country</> : <>Nacio</>}
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        placeholder="Country"
                        onChange={this.handleOnChange}
                        value={this.state.country}
                        required
                    />
                </div>
                <div className="grouped fields">
                    <label
                        style={{
                            color: '#fff',
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                        }}
                        htmlFor="newsletter"
                    >
                        {!this.state.translate ? (
                            <>After the first email contact me (frequency):</>
                        ) : (
                            <>Post la unua retmesaĝo, bonvolu kontakti min (ofteco):</>
                        )}
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
                                htmlFor="Frequent"
                            >
                                {!this.state.translate ? (
                                    <>to inform me about events and important news from the Esperanto movement.</>
                                ) : (
                                    <>por informi min pri eventoj kaj grava novaĵo de la Esperanto-movado.</>
                                )}
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
                                htmlFor="Monthly"
                            >
                                {!this.state.translate ? (
                                    <>
                                        each month with news from Esperanto Antaŭen projects and the Esperanto movement.
                                    </>
                                ) : (
                                    <>
                                        ĉiumonate, kun novaĵo de projektoj de Esperanto Antaŭen kaj la Esperanto-movado.
                                    </>
                                )}
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
                                htmlFor="Rarely"
                            >
                                {!this.state.translate ? (
                                    <>rarely, only when major milestones are reached (10 000, ...1 000 000 etc).</>
                                ) : (
                                    <>
                                        malofte, nur post la atingo de notindaj progres-punktoj (10 000, … 1 000 000
                                        ktp).
                                    </>
                                )}
                            </label>
                        </div>
                    </div>
                </div>
                <button className="button" style={{ width: '100%' }}>
                    {!this.state.translate ? <>Submit</> : <>Sendu</>}
                </button>
            </form>
        );
    }
}

export default UserForm;
