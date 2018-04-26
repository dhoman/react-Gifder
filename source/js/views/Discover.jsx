import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDiscover, dismissGif, favoriteGif } from 'actions/gifs';
import { CardItem, MotionStack } from 'components/card';

@connect(state => ({
  error: state.gifs.get('error'),
  loading: state.gifs.get('loading'),
  gifs: state.gifs.get('gifs'),
  pagination: state.gifs.get('pagination'),
}))
export default class Discover extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    gifs: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
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


  swiped = (event) => {
    const { gifs } = this.props;
    const gif = gifs.find(x => x.id === event.pressedId);
    if (event.direction === 'right') {
      this.favoriteGifClick(gif);
    } else {
      this.dismissGifClick(gif);
    }
  }

  dismissGifClick = (gif) => {
    const { dispatch } = this.props;
    dispatch(dismissGif(gif));
    this.checkForMoreGifs();
  }

  favoriteGifClick = (gif) => {
    const { dispatch } = this.props;
    dispatch(favoriteGif(gif));
    this.checkForMoreGifs();
  }

  checkForMoreGifs = () => {
    const {
      dispatch,
      gifs,
      pagination,
    } = this.props;
    const nextPage = {
      count: pagination.count,
      offset: pagination.offset + pagination.count,
    };
    if (gifs.length <= 1) {
      dispatch(getDiscover(nextPage));
    }
  }

  renderGifs() {
    const {
      gifs,
    } = this.props;
    return (<MotionStack
      data={ gifs }
      onSwipeEnd={ this.swiped }
      render={ (props) => {
          return (
            <CardItem
              key={ props.id }
              gif={ props }
              dismiss={ this.dismissGifClick }
              favorite={ this.favoriteGifClick }
            />
          );
        }
      }
    />);
  }

  render() {
    const {
      loading,
      error,
      gifs,
    } = this.props;

    return (
      <div>
        <h1>Gifs</h1>
        { loading && <div>Loading gifs...</div> }
        { error && error.toString() }
        <div className='gif-list'>
          { gifs && this.renderGifs() }
        </div>
      </div>
    );
  }
}
