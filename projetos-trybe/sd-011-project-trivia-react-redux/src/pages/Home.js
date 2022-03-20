import React, { Component } from 'react';
import Forms from '../components/Forms';
import logo from '../trivia.png';
import '../CSS/Home.css';

class Home extends Component {
  render() {
    return (
      <div className="home__container">
        <img className="logo" src={ logo } alt="trivia logo" />
        <Forms />
      </div>
    );
  }
}

export default Home;
