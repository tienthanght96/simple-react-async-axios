import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from '../components/FavoriteButton';

const ArticleList = ({ articles }) => {
  if (!articles || (Array.isArray(articles) && articles.length < 1)) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }
  return (
    <Fragment>
      {articles.map((article, index) => {
        const { author } = article;
        return (
          <div className="article-preview" key={index}>
            <div className="article-meta">
              <Link to={`/@${author.username}`}>
                <img src={author.image} />
              </Link>
              <div className="info">
                <Link to={`/@${author.username}`} className="author">
                  {author.username}
                </Link>
                <span className="date">
                  {new Date(article.createdAt).toLocaleString()}
                </span>
              </div>
              <FavoriteButton
                favorite={{
                  favorited:article.favorited,
                  favoritesCount:article.favoritesCount,
                  articleSlug:article.slug,
                }}
              />
            </div>
            <Link to={`/article/${article.slug}`} className="preview-link">
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>

              <ul className="tag-list">
                {article.tagList &&
                  article.tagList.map((tag, i) => (
                    <li className="tag-default tag-pill tag-outline" key={i}>
                      {tag}
                    </li>
                  ))}
              </ul>
            </Link>
          </div>
        );
      })}
    </Fragment>
  );
};
export default ArticleList;