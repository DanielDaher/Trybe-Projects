import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import '../CSS/Header.css';

export default class Header extends Component {
  constructor() {
    super();

    this.getPlayerFromLocalStorage = this.getPlayerFromLocalStorage.bind(this);
  }

  getPlayerFromLocalStorage() {
    const playerInfo = localStorage.getItem('state');
    return JSON.parse(playerInfo);
  }

  render() {
    const { player: { name, gravatarEmail, score } } = this.getPlayerFromLocalStorage();
    const emailHash = md5(gravatarEmail.trim().toLowerCase()).toString();
    const gravatarPicture = `https://www.gravatar.com/avatar/${emailHash}`;

    return (
      <header className="trivia__header">
        <img data-testid="header-profile-picture" src={ gravatarPicture } alt="Player" />
        <span data-testid="header-player-name">
          <strong>Player: </strong>
          { name }
        </span>
        <span data-testid="header-score">
          <strong>Score: </strong>
          { score }
        </span>
      </header>
    );
  }
}
