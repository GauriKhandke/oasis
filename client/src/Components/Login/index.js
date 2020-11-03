import React from 'react';
import '../Login/style.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    // storing the user input
    loginInput = (event) => {

        let username = event.target.username;
        let value = event.target.value;
        this.setState({ [username]: value });
    }
    // login handler
    handleLoginSubmit = event => {
        event.preventDefault();
        this.setState({      
            username: '',
            password: ''
        })
    
    }

    render() {
        return (
            <div className="base-container mx-auto">
                    <form className="login-form">
                        <div className="form-group mx-auto">  
                        <h3>Login Page</h3>
                            <label htmlFor="username"> Username </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="username"
                                onChange={this.loginInput}
                            />
                        </div>
                        <div className="form-group mx-auto">
                            <label htmlFor="username"> Password </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                onChange={this.loginInput}
                            />
                        </div>
                        <button
                            className="btn-secondary mx-auto"
                            type="submit"
                            onClick={this.handleLoginSubmit.bind().this}
                        >Login
                        </button>
                        <div className="mx-auto">
                            Not a member ? please sign up
                    </div>
                    </form>
                </div>
                
        );
    }
}

export default LoginForm;