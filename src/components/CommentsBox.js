import classnames from "classnames";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import LoadingPanel from './LoadingPanel';
import CommentForm from './CommentForm';
import { onGetCommentsArticle, onAddCommentArticle, onDeleteCommentArticle } from "../actions/article";
export default class CommentsBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: null
    };
  }
  componentDidMount(){
    const { params } = this.props.match;
    onGetCommentsArticle(params.slug).then(result => {
      if(result.status === 'success'){
        this.setState({ comments: result.comments });
      }
    });
  }

  render() {
    const { comments } = this.state;
    const { articleSlug, user } = this.props;

    return (
      <Fragment>
        <CommentForm
          user={user}
          onPost={ async body => {
            onAddCommentArticle(articleSlug, {comment : {body} } )
              .then(result =>{
                if(result.status === 'success'){
                  const newComments = [...comments];
                  newComments.unshift(result.comment);
                  this.setState({ comments: newComments });
                  return result.comment;
                }
              })
          }}
        />

        {comments == null 
          ? <LoadingPanel text="Loading comments" />
          : ( comments.map((comment, i) => (
            <div className="card" key={comment.id}>
              <div className="card-block">
                <p className="card-text">{comment.body}</p>
              </div>
              <div className="card-footer">
                <Link
                  to={`/@${comment.author.username}`}
                  className="comment-author"
                >
                  <img
                    src={comment.author.image}
                    className="comment-author-img"
                  />
                </Link>
                &nbsp;
                <a href="" className="comment-author">
                  {comment.author.username}
                </a>
                <span className="date-posted">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
                {
                  (user && user.username === comment.author.username) && 
                  <span className="mod-options">
                    <i
                      className="ion-trash-a"
                      onClick={()=>{
                        onDeleteCommentArticle(articleSlug, comment.id).then(result => {
                          if(result.status === 'success'){
                            const newComments = [...comments].filter((c) => c.id !== comment.id);
                            this.setState({ comments: newComments });
                          }
                        });
                      }}
                    />
                  </span>
                }
              </div>
            </div>
          ))
        )}
      </Fragment>
    );
  }
}
