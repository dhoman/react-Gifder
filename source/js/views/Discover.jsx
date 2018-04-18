import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDiscover } from 'actions/gifs';

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

  renderGifs() {
    const {
      gifs,
    } = this.props;

    return gifs.map(gif => {
      return (
        <div key={ gif.id } className='People-person'>
          <h3>{ gif.title }</h3>
          <img alt={ gif.title } src={ gif.images.original.webp } />
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
        <h1>People</h1>
        { loading && <div>Loading people...</div> }
        { error && error.toString() }
        <div className='People-list'>
          { gifs && this.renderGifs() }
        </div>
      </div>
    );
  }
}
