import React from "react";

export default class FavoriteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      favorite: props.favorite || null
    };
  }
  onHandleChangeFavorite = (favorited) => {
    
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
        {!favorite.isHaveText 
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
