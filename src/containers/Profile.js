import React from "react";
import HeaderProfile from "../components/HeaderProfile";
import { onGetUserProfile } from "../actions/auth";
import ProfileTab from '../components/ProfileArticleTab';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null
    };
  }
  componentDidMount() {
    this.onHanldeGetUserProfile(this.props);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params !== this.props.match.params){
      this.onHanldeGetUserProfile(nextProps);
    }
  }
  onHanldeGetUserProfile = (props = this.props) => {
    const { match } = props;
    onGetUserProfile(match.params.username).then(result => {
      if (result.status === "success") {
        this.setState({ profile: result.profile });
      }
    });
  }
  render() {
    const { profile } = this.state;
    const { user } = this.props;
    if (!profile) return null;
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div>
                  <HeaderProfile profile={profile} user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <ProfileTab
                match={this.props.match}
                currentLocation={this.props.history.location.pathname}
                dispatch={this.props.dispatch}
                auth={profile.username}
                tabs={
                  [ 
                    {label : 'My Article' , url : ""}, 
                    {label : "Favorited Article", url : '/favorites'}
                  ]
                } 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
