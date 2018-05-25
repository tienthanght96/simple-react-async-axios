import React from "react";
import { onChangeFollowUser } from "../actions/auth";
export default class FavoriteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      profile: props.profile || null
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.profile && nextProps.profile !== this.props.profile){
      this.setState({ favorite: nextProps.profile });
    }
  }
  onHandleChangeFollowUser = following => {
    const { profile } = this.state;
    this.setState({ isLoading: true });
    onChangeFollowUser(profile.username, profile.following).then(result => {
      const profile = { ...this.state.profile };
      if (result.status === "success") {
        profile.following = result.profile.following;
        profile.username = result.profile.username;
      }
      this.setState({ isLoading: false, profile });
    });
  };
  render() {
    const { profile, isLoading } = this.state;
    if(!profile) return null;
    return (
      <button
        className={"btn btn-sm btn-outline-secondary action-btn"}
        onClick={this.onHandleChangeFollowUser}
        disabled={isLoading}
      >
        <i className="ion-plus-round" />
        &nbsp;
        {profile.following ? "Unfollow" : "Follow"} {profile.username}
      </button>
    );
  }
}
