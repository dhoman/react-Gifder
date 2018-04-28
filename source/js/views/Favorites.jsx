import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dismissFavorite } from 'actions/gifs';
import XSvg from 'svg/x.svg';

@connect(state => ({
  favorites: state.gifs.get('favorites'),
}))
export default class Favorites extends Component {
  static propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.object),
    dispatch: PropTypes.func,
  }

  dismissFavoriteClick = (gif) => {
    const { dispatch } = this.props;

    dispatch(dismissFavorite(gif));
  }

  iconStyle = {
    'height': '50px',
    'width': '50px',
    'marginLeft': '40px',
    'marginRight': '40px',
  }

  renderFavorites() {
    const {
      favorites,
    } = this.props;

    return favorites.map(gif => {
      return (
        <div key={ gif.id }>
          <img alt={ gif.title } src={ gif.images.original.url } />
          <XSvg style={ this.iconStyle } onClick={ () => { this.dismissFavoriteClick(gif); } } />
        </div>
      );
    });
  }

  render() {
    const {
      favorites,
    } = this.props;
    let favoriteSection = <div>You have no favorites =[ Go find some maybe?</div>;
    if (favorites && favorites.length > 0) {
      favoriteSection = this.renderFavorites();
    }
    return (
      <div>
        <div className='favorites'>
          { favoriteSection }
        </div>
      </div>
    );
  }
}
