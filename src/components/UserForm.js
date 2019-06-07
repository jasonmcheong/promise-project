import React from 'react';
import ThankYou from './ThankYou';
import { language } from '../utility/Language';
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
                language,
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
        const {
            translate_button,
            promise,
            name,
            email,
            phone_number,
            city_country,
            frequency,
            frequency_frequent,
            frequency_monthly,
            frequency_rarely,
            submit_button,
        } = this.props.form;

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
                        <label style={{ color: '#fff', fontSize: '1.3rem' }}>{translate_button}</label>
                    ) : (
                        <label style={{ color: '#fff', fontSize: '1.3rem' }}>Traduku al la Angla</label>
                    )}
                </div>
                <p style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '3.5rem' }}>
                    {!this.state.translate ? (
                        <>{promise}</>
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
                        {!this.state.translate ? <>{name}</> : <>Nomo</>}
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder={!this.state.translate ? `${name}` : 'Nomo'}
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
                        {!this.state.translate ? <>{email}</> : <>Retadreso</>}
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder={!this.state.translate ? `${email}` : 'Retadreso'}
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
                        {!this.state.translate ? <>{phone_number}</> : <>Telefon-numero</>}
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder={!this.state.translate ? `${phone_number}` : 'Telefon-numero'}
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
                        {!this.state.translate ? <>{city_country}</> : <>Urbo, Nacio</>}
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        placeholder={!this.state.translate ? `${city_country}` : 'Urbo, Nacio'}
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
                            <>{frequency}</>
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
                                    <>{frequency_frequent}</>
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
                                    <>{frequency_monthly}</>
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
                                    <>{frequency_rarely}</>
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
                    {!this.state.translate ? <>{submit_button}</> : <>Sendu</>}
                </button>
            </form>
        );
    }
}

export default UserForm;
