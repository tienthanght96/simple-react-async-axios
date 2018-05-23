import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { updateUser } from '../actions/auth';
import { renderErrormessage } from '../components/ErrorMessage';

export default class Setting extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: props.user || null,
      errors: null,
      submitting : false,
    };
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { user } = this.state;

    this.setState({ submitting: true });

    this.props.dispatch(updateUser(user)).then(result => {
      if (result.status !== 'success') {
        this.setState({ submitting: false, errors });
      } else {
        history.push(`/`);
      }
    });
  }
  onHandleLogout = () => {
    this.props.dispatch(logout()).then(result => {
      this.props.history.push('/');
    });
  }

  render() {
    const { submitting, errors, user } = this.state;
    const { history } = this.props;
    if(!user) {
      return <Redirect to="/" />
    }
    const bind = path => ({
      value: user[path] == null ? "" : user[path],
      onChange: e =>
        this.setState({
          user: {
            ...user,
            [path]: e.target.value == "" ? null : e.target.value
          }
        })
    });

    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              {renderErrormessage(errors)}
              <form
                onSubmit={this.onHandleSubmit}
              >
                <fieldset>
                  <fieldset className="form-group" disabled={submitting}>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      {...bind("image")}
                    />
                  </fieldset>
                  <fieldset className="form-group" disabled={submitting}>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      {...bind("username")}
                    />
                  </fieldset>
                  <fieldset className="form-group" disabled={submitting}>
                    <textarea
                      className="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                      {...bind("bio")}
                    />
                  </fieldset>
                  <fieldset className="form-group" disabled={submitting}>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      {...bind("email")}
                    />
                  </fieldset>
                  <fieldset className="form-group" disabled={submitting}>
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="New Password"
                      {...bind("password")}
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                  </button>
                </fieldset>
              </form>

              <hr />
              <button
                className="btn btn-outline-danger"
                onClick={this.onHandleLogout}
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
