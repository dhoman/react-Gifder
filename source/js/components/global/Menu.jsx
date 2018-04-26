import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';

export default class Menu extends Component {
  render() {
    return (
      <div className='Menu'>
        <div className='Menu-links'>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            exact
            to={ routeCodes.DISCOVER }
          >
            Discover
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to={ routeCodes.FAVORITES }
          >
            Favorites
          </NavLink>
        </div>
      </div>
    );
  }
}
