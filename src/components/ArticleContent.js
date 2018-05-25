import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import FollowButton from "../components/FollowButton";
import FavoriteButton from "../components/FavoriteButton";
import { onDeleteArticle } from "../actions/article";
export default class ArticleContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleting: false
    };
  }

  deleteArticle = () => {
    this.setState({ deleting: true });
    const { article, history } = this.props;
    onDeleteArticle(article.slug).then((result) => {
      this.setState({ deleting: false });
      if(result.status === 'success'){
        history.push('/');
      }
    });
  }

  render() {
    const { article } = this.props;
    const { user } = this.props;
    return (
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} />
        </Link>
        <div className="info">
          <Link to={`/@${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.updatedAt).toLocaleString()}
          </span>
        </div>
        {user == null || user.username != article.author.username ? (
          <Fragment>
            <FollowButton
              profile={article.author}
            />
            <FavoriteButton
              // favorited={article.favorited}
              favorite={{
                favorited: article.favorited,
                favoritesCount: article.favoritesCount,
                articleSlug: article.slug
              }}
              isHaveText
            />
          </Fragment>
        ) : (
          <Fragment>
            <Link
              className="btn btn-outline-secondary btn-sm"
              to={`/editor/${article.slug}`}
            >
              <i className="ion-edit" /> Edit Article
            </Link>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={this.deleteArticle}
            >
              <i className="ion-trash-a" /> Delete Article
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}
