import React from "react";
import { connect } from "react-redux";
import BannerHome from "../components/BannerHome";
import TagsListHome from "../components/TagsListHome";
import { loadTags } from "../actions/tags";
import PaginationArticleList from '../components/PaginationArticleList';
import TabTypeArticle from '../components/TabTypeArticle';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      currentTag : 'Global Feed',
      listTab : props.token 
      ? [{ name : 'Global Feed' }, { name : 'Your Feed' }] 
      : [{ name : 'Global Feed' }] ,
    };
  }
  componentDidMount() {
    this.props.dispatch(loadTags()).then(result => {
      if (result.status === "success") {
        this.setState({ tags: result.tags });
      }
    });
  }
  render() {
    const { tags, listTab } = this.state;
    return (
      <div className="home-page">
        <BannerHome appName={this.props.appName} token={this.props.token} />
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <TabTypeArticle listTab={listTab} currentTag={this.state.currentTag} onChangeTag={(currentTag) => this.setState({currentTag})}/>
              <PaginationArticleList dispatch={this.props.dispatch} currentTag={this.state.currentTag} type="home_page" />
            </div>
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <TagsListHome tags={tags} onClickTag={(tag) => {
                  const listNewTab = listTab.filter((tab, index) => index < 2);
                  listNewTab.push({ name : tag });
                  this.setState({currentTag : tag, listTab : listNewTab})
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tags: state.Tags.tags
  };
};
export default connect(mapStateToProps, null)(Home);
