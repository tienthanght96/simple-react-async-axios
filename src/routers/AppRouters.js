import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { onLoadApp } from "../actions/app";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Register from "../containers/Register";
import Setting from "../containers/Setting";
import Editor from "../containers/Editor";
import Profile from "../containers/Profile";
import Article from "../containers/Article";

class AppRouter extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.onLoadApp();
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
              <Route path={"/@:username" } render={props => <Profile {...dataProps} {...props}/>} />
              <Route path={"/editor/:slug" } render={props => <Editor {...dataProps} {...props}/>} />
              <Route path={"/article/:slug" } render={props => <Article {...dataProps} {...props}/>} />
              <Route path={"/editor" } render={props => <Editor {...dataProps} {...props}/>} />
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
