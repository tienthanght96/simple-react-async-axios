import React, { Fragment } from "react";
import { Link, Route } from "react-router-dom";
import FollowButton from "../components/FollowButton";

const HeaderProfile = props => {
  const { profile } = props;
  const user = props.user;
  return (
    <Fragment>
      {profile && (
        <Fragment>
          <img src={profile.image} className="user-img" />
          <h4>{profile.username}</h4>
          <p>{profile.bio}</p>
        </Fragment>
      )}
      {user && profile.username == user.username ? (
        <Link
          to="/settings"
          className="btn btn-sm btn-outline-secondary action-btn"
        >
          <i className="ion-gear-a" /> Edit Profile Settings
        </Link>
      ) : (
        <FollowButton profile={profile} />
      )}
    </Fragment>
  );
};
export default HeaderProfile;
