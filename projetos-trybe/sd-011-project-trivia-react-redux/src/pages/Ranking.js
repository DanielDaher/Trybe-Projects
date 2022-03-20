import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Ranking.css';

export default class Ranking extends Component {
  getRanking() {
    const { ranking } = JSON.parse(localStorage.ranking);
    return ranking;
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const maxPodiumPlaces = 5;
    return (
      <section className="page">
        <h2 data-testid="ranking-title">Ranking</h2>
        <div className="container">
          {ranking.length < maxPodiumPlaces ? [...ranking.sort((a, b) => (
            b.score - a.score))]
            .map((player, index) => (
              <div className={ `player-container${index}` } key={ index }>
                <img className="profile" src={ player.picture } alt="Player" />
                <div className={ `podium${index}` }>
                  <span className="player-name" data-testid={ `player-name-${index}` }>
                    {player.name}
                  </span>
                  <span className="score" data-testid={ `player-score-${index}` }>
                    {player.score}
                  </span>
                </div>
              </div>
            )) : <span>No highscores yet =(</span>}
        </div>
        <Link className="button" to="/">
          <button type="button" data-testid="btn-go-home">
            Play again
          </button>
        </Link>
      </section>
    );
  }
}
