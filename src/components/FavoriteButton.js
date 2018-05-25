import React from "react";
import { onChangeFavoriteArticle } from "../actions/article";
export default class FavoriteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      favorite: props.favorite || null
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.favorite && nextProps.favorite !== this.props.favorite){
      this.setState({ favorite: nextProps.favorite });
    }
  }
  onHandleChangeFavorite = (favorited) => {
    const { articleSlug } = this.state.favorite;
    this.setState({ isLoading : true });
    onChangeFavoriteArticle(articleSlug, favorited).then(result => {
      const favorite= {...this.state.favorite};
      if(result.status === 'success'){
        favorite.favorited = result.article.favorited;
        favorite.favoritesCount = result.article.favoritesCount;
        favorite.articleSlug = result.article.slug;
      }
      this.setState({ isLoading: false, favorite });
    });
    
  }
  render() {
    const { favorite, isLoading } = this.state;
    if (!favorite) return null;

    return (
      <button
        className={`btn btn-sm pull-xs-right ${
          favorite.favorited ? "btn-primary" : "btn-outline-primary"
        }`}
        disabled={isLoading}
        onClick={() => this.onHandleChangeFavorite(favorite.favorited)}
      >
        {!this.props.isHaveText 
          ? (
            <span>
              <i className="ion-heart" /> {favorite.favoritesCount}
            </span>
            ) 
          : (
            <span>
              <i className="ion-heart" />
              &nbsp; Favorite Article{" "}
              <span className="counter">({favorite.favoritesCount})</span>
            </span>
            )
          }
      </button>
    );
  }
}
