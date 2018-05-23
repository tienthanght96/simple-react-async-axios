import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { onLoadApp } from "../actions/app";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Register from "../containers/Register";
import Setting from "../containers/Setting";

class AppRouter extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.onLoadApp();
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
  }
  render() {
    const { appLoaded, user, appName } = this.props;
    const dataProps = {...this.props};
    if (appLoaded) {
      return (
        <Router>
          <div>
            <Header user={user} appName={appName} />
            <Switch>
              <Route path="/" exact render={props => <Home {...dataProps} {...props} />}/>
              <Route path="/login" render={props => <Login {...dataProps} {...props}/>}/>
              <Route path="/register" render={props => <Register {...dataProps} {...props}/>} />
              <Route path={"/settings" } render={props => <Setting {...dataProps} {...props}/>} />
            </Switch>
          </div>
        </Router>
      );
    }
    return (
      <Router>
        <div>
          <Header appName={appName} currentUser={user} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    appLoaded: state.Common.appLoaded,
    appName: state.Common.appName,
    user: state.Common.user,
    token: state.Common.token
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLoadApp : () => dispatch(onLoadApp()),
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
