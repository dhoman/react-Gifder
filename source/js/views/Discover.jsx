import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDiscover, dismissGif, favoriteGif } from 'actions/gifs';
import HeartSvg from 'svg/heart.svg';
import XSvg from 'svg/x.svg';

@connect(state => ({
  error: state.gifs.get('error'),
  loading: state.gifs.get('loading'),
  gifs: state.gifs.get('gifs'),
}))
export default class Discover extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    gifs: PropTypes.arrayOf(PropTypes.object),
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  componentWillMount() {
    const {
      dispatch,
      gifs,
    } = this.props;

    if (!gifs) {
      dispatch(getDiscover());
    }
  }
  iconStyle = {
    'height': '50px',
    'width': '50px',
    'marginLeft': '40px',
    'marginRight': '40px',
  }
  cardStyle = {
    'border': 'solid',
    'borderRadius': '10px',
    'padding': '10px',
    'margin': '10px',
    'width': '400px',
    'height': '600px',
    'display': 'flex',
    'justifyContent': 'space-between',
    'flexDirection': 'column',
  }

  dismissGifClick = (gif) => {
    const { dispatch } = this.props;
    dispatch(dismissGif(gif));
  }

  favoriteGifClick = (gif) => {
    const { dispatch } = this.props;
    dispatch(favoriteGif(gif));
  }

  renderGifs() {
    const {
      gifs,
    } = this.props;

    return gifs.map(gif => {
      return (
        <div key={ gif.id } className='card' style={ this.cardStyle }>
          <h3 >{ gif.title }</h3>
          <img
            alt={ gif.title }
            src={ gif.images.original.webp }
          />
          <div>
            <XSvg onClick={ () => { this.dismissGifClick(gif); } } style={ this.iconStyle } />
            <HeartSvg onClick={ () => { this.favoriteGifClick(gif); } } style={ Object.assign({ 'float': 'right' }, this.iconStyle) } />
          </div>
        </div>
      );
    });
  }

  render() {
    const {
      loading,
      error,
      gifs,
    } = this.props;

    return (
      <div className='People'>
        <h1>Gifs</h1>
        { loading && <div>Loading gifs...</div> }
        { error && error.toString() }
        <div className='People-list' style={ { display: 'flex' } }>
          { gifs && this.renderGifs() }
        </div>
      </div>
    );
  }
}
