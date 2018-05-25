import React, { Fragment } from "react";
import LoadingPanel from "../components/LoadingPanel";
import CommentsBox from "../components/CommentsBox";
import ArticleContent from "../components/ArticleContent";
import { onLoadArticle } from "../actions/article";

export default class Article extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      article: null
    };
  }
  componentDidMount(){
    const { params } = this.props.match;
    this.props.dispatch(onLoadArticle(params.slug)).then(result => {
      if(result.status === 'success'){
        this.setState({ article : result.article });
      }
    });
  }

  render() {
    const { history, user } = this.props;
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
                <ArticleContent
                  article={article}
                  user={user}
                  history={history}
                />
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
                    {article &&
                      article.tagList &&
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
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <CommentsBox articleSlug={this.props.match.params.slug} user={user} match={this.props.match}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
