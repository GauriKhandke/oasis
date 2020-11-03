import React from 'react';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: ''
        };
    }
    
    loginInput = (event) => {
        let user = event.target.name;
        let val = event.target.value;

        this.setState({ [user]: val });
    }
    
    handleRegister = event => {
        event.preventDefault();
        this.setState({
            firstName: '',
            lastName: '',
            username: '',
            password: ''
        })
    }

    render() {
        return (
            <div className="base-container mx-auto">
                <div>
                <h2>Registration Form</h2>
                </div>
                <form className="signup-form">
                    <div className="form-group">
                        <label htmlFor="username">First Name </label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            onChange={this.loginInput} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Last Name </label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            onChange={this.loginInput} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">E - Mail </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="E-mail address"
                            onChange={this.loginInput} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            onChange={this.loginInput}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Password </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={this.loginInput}
                        />
                    </div>
                    <div className="form-group">
                    <label htmlFor="username">Confirm password </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Confirm password"
                        onChange={this.loginInput}
                    />
                </div>
                    <button
                        className="btn-secondary mx-auto"
                        type="submit"
                        onClick={this.handleRegister.bind().this}
                    >Login
                </button>
                </form>
            </div>
        )
    }
}

export default RegisterForm;