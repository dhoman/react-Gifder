import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MotionStack from 'react-motion-stack';
import { getDiscover, dismissGif, favoriteGif } from 'actions/gifs';
import Cards, {Card, CardItem} from 'components/card';
// import 'react-motion-stack/build/motion-stack.css';

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
  cardStackStyle = {
    'display': 'grid',
    'grid-template-columns': '240px',
    'grid-template-rows': '360px',
    'align-items': 'center',
    'justify-content': 'center',
  }

  cardItemStyle = {
    'grid-column': '1/2',
    'grid-row': '1/2',
    'will-change': 'transform',
  }

  renderGifs() {
    const {
      gifs,
    } = this.props;
    return (<MotionStack
      style={ this.cardStackStyle }
      data={ gifs }
      onSwipeEnd={ this.swiped }
      render={ (props) => {
        return (
          <CardItem style={ this.cardItemStyle } key={ props.id } gif={ props } dismiss={ this.dismissGifClick } favorite={ this.favoriteGifClick } />
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
      <div className='People'>
        <h1>Gifs</h1>
        { loading && <div>Loading gifs...</div> }
        { error && error.toString() }
        <div className='People-list' style={ { display: 'flex', height: 660, width: 440} }>
          { gifs && this.renderGifs() }
        </div>
      </div>
    );
  }
}
