import React from 'react';
import classes from '../styles/Layout.module.scss';
import { NavLink } from 'react-router-dom';

const Nav = props => {
  return (
    <div className={classes.NavContainer}>
      <nav className={classes.ToolbarNavigation}>
        <ul className={classes.NavigationItems}>
          <li className={classes.NavigationItem}>
            <NavLink
              to='/planets'
              activeClassName={classes.active}
              exact={false}>
              Planets
            </NavLink>
            <NavLink to='/ships' activeClassName={classes.active} exact={false}>
              Ships
            </NavLink>
            <NavLink to='/' activeClassName={classes.active} exact={true}>
              Home
            </NavLink>
          </li>
          <li className={classes.NavClose} onClick={props.clickThis}>
            <i className='material-icons'>close</i>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
