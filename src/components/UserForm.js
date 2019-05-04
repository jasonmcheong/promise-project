import React from 'react';

class UserForm extends React.Component {
    render() {
        return (
            <form>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <input type="tel" name="phone" />
                <input type="text" name="country" placeholder="City, Country" />
                <input type="radio" name="update" /> Frequent
                <input type="radio" name="update" /> Infrequent
                <input type="radio" name="update" /> all the time
                <button>Submit</button>
            </form>
        );
    }
}

export default UserForm;
