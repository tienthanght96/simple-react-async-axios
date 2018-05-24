import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import Pagination from "../components/Pagination";
import { onLoadArticleList,onLoadFeedArticleList, onLoadArticleListByTag  } from "../actions/article";
export default class PaginationArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      articlesCount: null,
      articles : []
    };
  }
  componentDidMount() {
    this.onGetArticleList(this.props, this.state.page);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.currentTag !== this.props.currentTag || nextProps.type !== this.props.type){
      this.onGetArticleList(nextProps, 0);
    }
  }
  onGetArticleList = (props = this.props, page) => {
    const { currentTag, type } = props;
    if(type === 'home_page'){
      this.props.dispatch(
        currentTag === 'Global Feed' 
        ? onLoadArticleList(page)
        : currentTag === 'Your Feed'
        ? onLoadFeedArticleList(page)
        : onLoadArticleListByTag(page,currentTag)
      ).then(result => {
        if(result.status === 'success'){
          this.setState({ articles : result.articles, articlesCount : result.articlesCount , page })
        }
      });
    }
  }
  render() {
    const { page, articlesCount, articles } = this.state;
    return (
      <Fragment>
        <ArticleList key={page} articles={articles} />

        {articlesCount && Math.ceil(articlesCount/10) > 1 && (
          <Pagination
              total={Math.ceil(articlesCount/10)}
              currentPage={page}
              onChange={(page) => this.onGetArticleList(this.props, page)}
          />
        )}
      </Fragment>
    );
  }
}
