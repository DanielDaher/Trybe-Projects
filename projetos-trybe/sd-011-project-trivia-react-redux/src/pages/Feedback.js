import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import '../CSS/Feedback.css';

export default class FeedBack extends Component {
  constructor() {
    super();
    this.state = {
      assertions: 0,
    };

    this.getStorageAssertions = this.getStorageAssertions.bind(this);
    this.getPlayerFromLocalStorage = this.getPlayerFromLocalStorage.bind(this);
  }

  componentDidMount() {
    this.getStorageAssertions();
  }

  getStorageAssertions() {
    const storage = JSON.parse(localStorage.getItem('state'));
    this.setState({
      assertions: storage.player.assertions,
    });
  }

  getPlayerFromLocalStorage() {
    const playerInfo = localStorage.getItem('state');
    return JSON.parse(playerInfo);
  }

  message() {
    const { assertions } = this.state;
    const magicNumber = 3;
    if (assertions < magicNumber) return 'Could be better...';
    if (assertions >= magicNumber) return 'Well done!';
  }

  render() {
    const { player } = this.getPlayerFromLocalStorage();
    const { name, score, gravatarEmail, assertions } = player;
    const gravatarHash = md5(gravatarEmail.trim().toLowerCase()).toString();
    const gravatarPicture = `https://www.gravatar.com/avatar/${gravatarHash}`;
    return (
      <div className="feedback__container">
        <div className="feedback-nav-bar">
          <img
            data-testid="header-profile-picture"
            src={ gravatarPicture }
            alt="Player"
          />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h3 data-testid="header-score">{`${score} points`}</h3>
        </div>
        <h2 data-testid="feedback-text" className="feedback-message">{this.message()}</h2>
        <div className="feedback-score">
          <h5>Your score:</h5>
          <h6 data-testid="feedback-total-score">{`${score} points`}</h6>
          <h6 data-testid="feedback-total-question">{`Number of hits: ${assertions}`}</h6>
        </div>
        <div className="feedback-links">
          <Link to="/">
            <button type="button" data-testid="btn-play-again">
              Play Again
            </button>
          </Link>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">
              Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
