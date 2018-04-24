import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeartSvg from 'svg/heart.svg';
import XSvg from 'svg/x.svg';


export default class CardItem extends Component {
  static propTypes = {
    gif: PropTypes.object,
    dismiss: PropTypes.func,
    favorite: PropTypes.func,
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
    'minWidth': '400px',
    'height': '600px',
    'minHeight': '600px',
    'display': 'flex',
    'justifyContent': 'space-between',
    'flexDirection': 'column',
  }
  render() {
    const {
      gif,
      dismiss,
      favorite,
    } = this.props;
    return (
      <div className='card' style={ this.cardStyle }>
        <h3 >{ gif.title }</h3>
        <img
          alt={ gif.title }
          src={ gif.images.original.webp }
        />
        <div>
          <XSvg onClick={ () => { dismiss(gif); } } style={ this.iconStyle } />
          <HeartSvg onClick={ () => { favorite(gif); } } style={ Object.assign({ 'float': 'right' }, this.iconStyle) } />
        </div>
      </div>
    );
  }
}
