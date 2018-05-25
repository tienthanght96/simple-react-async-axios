import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: null,
      submmiting: false
    };
  }

  onHandlePost() {
    const { body } = this.state;
    const { onPost, user } = this.props;
    if(!user) return;
    this.setState({ posting: true });
    onPost(body).then(() => {
      this.setState({ body: null, posting: false });
    });
  }

  render() {
    const { body, submmiting } = this.state;

    const { user } = this.props;
    if (!user) {
      return (
        <p>
          <Link to="/login">Sign in</Link> or{" "}
          <Link to="/register">sign up</Link> to add comments on this article.
        </p>
      );
    }

    const bindInput = inputName => ({
      value: this.state[inputName] == null ? "" : this.state[inputName],
      onChange: e => this.setState({ [inputName]: e.target.value })
    });

    return (
      <form
        className="card comment-form"
        onSubmit={e => {
          e.preventDefault();
          this.onHandlePost();
        }}
      >
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            rows="3"
            disabled={submmiting}
            {...bindInput("body")}
          />
        </div>
        <div className="card-footer">
          <img src={user.image} className="comment-author-img" />
          <button
            className="btn btn-sm btn-primary"
            disabled={submmiting || !body}
          >
            Post Comment
          </button>
        </div>
      </form>
    );
  }
}
