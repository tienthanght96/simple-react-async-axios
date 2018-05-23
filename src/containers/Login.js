import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { login } from '../actions/auth';
import { renderErrormessage } from '../components/ErrorMessage';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      password : '',
      error : null,
      submitting: false,
    };
  }
  onHandleLogin = (e) => {
    e.preventDefault();
    const  { email, password } = this.state;
    const user = {
      email, password
    };
    this.setState({ submitting : true });
    this.props.dispatch(login({ user })).then((result) => {
      if(result.status === 'success'){
        this.setState({ submitting: false, data : result.data });
        this.props.history.push('/');
        return;
      }
      this.setState({ submitting: false, error: result.errors });
    })
  }
  render() {
    const bindingInput = (inputName) => ({
      value: this.state[inputName] == null ? "" : this.state[inputName],
      onChange: (e) => this.setState({[inputName]: e.target.value}), 
    });
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="register">Need an account?</Link>
              </p>
              {
                renderErrormessage(this.state.error)
              }
              <form onSubmit={this.onHandleLogin}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      {...bindingInput('email')}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      {...bindingInput('password')}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.state.submitting ? true : false}
                  >
                    Sign in
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
