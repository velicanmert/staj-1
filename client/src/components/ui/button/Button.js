import React from 'react';
import './Button.css';

const button = props => {
  // className must have a string value, therefore we need to use join
  return (
    <button
      className={['Button', [props.btnType]].join(' ')}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
export default button;
