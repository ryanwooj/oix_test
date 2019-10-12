import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Aux from './Aux';
import Button from './Button';
import classes from '../styles/Layout.module.scss';

function Layout(props) {
  const [showNav, toggleNav] = useState(false);

  function navToggleHandler() {
    console.log('clicked');
    toggleNav(!showNav);
  }

  return (
    <Aux>
      {showNav ? (
        <Nav clickThis={navToggleHandler} />
      ) : (
        <Button clickThis={navToggleHandler} />
      )}
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
}

export default Layout;
