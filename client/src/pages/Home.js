import React from 'react';
import Parser from 'html-react-parser';

function Home() {
  const state = {
    message: ''
  };

  state.message = `<div>Welcome </br> ${localStorage.getItem(
    'username'
  )} </div>`;

  return <div className='home'>{Parser(state.message)}</div>;
}

export default Home;
