import React , { Fragment } from "react";
import LoadingPanel from '../components/LoadingPanel';
export default class ArticleRoute extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      article: null
    };

  }

  render() {
    const { history } = this.props;
    const { article } = this.state;
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            {article == null ? (
              <LoadingPanel />
            ) : (
              <Fragment>
                <h1>{article.title}</h1>
              </Fragment>
            )}
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              {article == null ? (
                <LoadingPanel />
              ) : (
                <Fragment>

                  <ul className="tag-list">
                    { article && article.tagList &&
                      article.tagList.map((tag, i) => (
                        <li
                          className="tag-default tag-pill tag-outline"
                          key={i}
                        >
                          {tag}
                        </li>
                      ))}
                  </ul>
                </Fragment>
              )}
            </div>
          </div>

          <hr />

          <div className="article-actions">
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
            Commnent
            </div>
          </div>
        </div>
      </div>
    );
  }
}
