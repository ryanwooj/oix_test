import React from 'react';
import classes from '../styles/Button.module.scss';
import Icon from '../assets/icons/Icon';

const Button = props => {
  return (
    <div className={classes.button}>
      <div onClick={props.clickThis}>
        <Icon />
      </div>
    </div>
  );
};

export default Button;
