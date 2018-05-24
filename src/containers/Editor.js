import React, { Component } from "react";
import { renderErrormessage } from '../components/ErrorMessage';
import { Redirect } from 'react-router-dom';
import TagList from '../components/TagList';
import { onCreateArticle, onUpdateArticle, onLoadArticle } from "../actions/article";
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article : {
        title : '',
        description : '',
        body : '',
        tagInput : '',
        tagList : props.tagList || [],
      },
      errors : null,
      submmiting: false
    };
  }
  componentDidMount() {
    const { match } = this.props;
    if(typeof match !== 'undefined' && typeof match.params !== 'undefined' && match.params.slug){
      this.props.dispatch(onLoadArticle(match.params.slug)).then(result => {
        if(result.status === 'success'){
          this.setState({article : {...result.article , tagInput : ''}});
          return;
        }
      })
    }
  }
  onHandleSubmitForm = () => {
    const article  = {...this.state.article};
    delete article.tagInput;
    this.setState({ submmiting : true });
    const {slug} = this.props.match.params;
    
    this.props.dispatch(
      (slug ? onUpdateArticle(slug,article) : apiArticle.onCreateArticle(article))
    ).then(result => {
      if(result.status === 'success'){
        this.setState({ submmiting : false});
        this.props.history.push('/');
        return;
      }
      this.setState({ errors: result.errors, submmiting: false })
    })
  }
  onRemoveTagList = (index) => {
    const { tagList } = this.state.article;
    const newTagList =  tagList.filter((value, i) => index !== i);
    this.setState({
      article : {
        ...this.state.article,
        tagList : newTagList
      }
    })
  }
  onAddTagList = (e) => {
    const { article } = this.state;
    if(e.target.value && e.keyCode == 13){
      e.preventDefault();
      const tagList =  [...article.tagList, e.target.value];
      this.setState({
        article : {
          ...this.state.article,
          tagInput : '',
          tagList
        }
      })
    }
    return;
  }
  render() {
    const { user, history } = this.props;
    if(!user){
      return <Redirect to="/"/>
    }
    const { submmiting, errors, article } = this.state;
    const bingdingInput = (inputName) => ({
      value : !article[inputName] ? '' : article[inputName],
      onChange : (event) => this.setState({ 
        article : {
          ...article,
          [inputName] : event.target.value
        }
       })
    });
    return (
      <div className="editor-page">

        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
            {
              renderErrormessage(errors)
            }
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      disabled={submmiting}
                      placeholder="Article Title"
                      {...bingdingInput('title')}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      disabled={submmiting}
                      placeholder="What's this article about?"
                      {...bingdingInput('description')}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      disabled={submmiting}
                      placeholder="Write your article (in markdown)"
                      {...bingdingInput('body')}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      disabled={submmiting}
                      {...bingdingInput('tagInput')}
                      onKeyUp={this.onAddTagList}
                    />
                    <TagList tagList={article.tagList} removeTag={this.onRemoveTagList}/>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={submmiting}
                    onClick={this.onHandleSubmitForm}
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
