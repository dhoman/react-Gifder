import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { increment } from 'actions/app';
import CircleSvg from 'svg/circle.svg';
import SquareSvg from 'svg/square.svg';
import TriangleSvg from 'svg/triangle.svg';
import bookImg from 'img/book2.jpg';

@connect(state => ({
  favorites: state.app.get('favorites'),
}))
export default class Favorites extends Component {
  static propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.object),
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  handleTestButtonClick = () => {
    const { dispatch } = this.props;

    dispatch(increment());
  }

  arrayofGifs = () => {
    const {
      favorites,
    } = this.props;

    return Object.keys(favorites)
      .map(key => {
        const gif = favorites[key];
        return (
          <div key={ key }>
            <img alt={ gif.title } src={ gif.images.original.webp } />
          </div>
        );
      });
  }

  render() {
    const {
      favorites,
    } = this.props;

    return (
      <div className='Home'>
        <div className='Example'>
          { favorites && this.arrayOfGifs()}
        </div>
      </div>
    );
  }
}
