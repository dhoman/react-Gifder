import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDiscover, dismissGif, favoriteGif } from 'actions/gifs';
import Cards, {Card, CardItem} from 'components/card';
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

  getMoreGifs = () => {
    console.log('called');
  }

  renderGifs() {
    const {
      gifs,
    } = this.props;
    return (<Cards onEnd={() => {this.getMoreGifs()}}  >
    {gifs.map(gif => {
      return (
        <Card key={gif.id} onSwipeLeft={this.dismissGifClick.bind(this)} onSwipeRight={this.favoriteGifClick.bind(this)} >
          <CardItem key={gif.id} gif={ gif } dismiss={this.dismissGifClick.bind(this)} favorite={this.favoriteGifClick.bind(this)} />
        </Card>
      );
    })}
    </Cards>);
  }
/*
        <Card key={gif.id} onSwipeLeft={ () => {this.dismissGifClick(gif)} } onSwipeRight={ () =>  {this.favoriteGifClick(gif)}} >
          <CardItem key={gif.id} gif={ gif } dismiss={this.dismissGifClick.bind(this)} favorite={this.favoriteGifClick.bind(this)} />
        </Card>

    <Cards onEnd={() => {this.getMoreGifs()}}  >
    {gifs.map(gif => {
      return (
        <Card key={gif.id} onSwipeLeft={this.dismissGifClick.bind(this)} onSwipeRight={this.favoriteGifClick.bind(this)} >
          <CardItem key={gif.id} gif={ gif } dismiss={this.dismissGifClick.bind(this)} favorite={this.favoriteGifClick.bind(this)} />
        </Card>
      );
    })}
    </Cards>


*/
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
/*
          { gifs ?
              <Cards onEnd={() => {this.getMoreGifs()}} > 
                { this.renderGifs() }
              </Cards> :
              <div>Blah</div>
          }
*/