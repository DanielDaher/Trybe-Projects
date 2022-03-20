import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import '../CSS/GamePage.css';

// MAGIC NUMBERS
const fourQuestions = 4;
const onePoint = 1;
const twoPoints = 2;
const threePoints = 3;
const tenPoints = 10;
const twoHundredMilliseconds = 200;
const oneSecond = 1000;

const racaNegraSongs =
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${Math.floor(Math.random() * 9) + 1}.mp3`;
const audio = new Audio(racaNegraSongs);

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      nQuestion: 0,
      showCorrect: false,
      isDisable: false,
      timer: 30,
      timerStatus: '',
    };
  }

  componentDidMount() {
    this.startTimer();
    audio.play();
  }

  componentWillUnmount() {
    this.generateRanking();
    audio.pause();
  }

  // FUNÇÃO ATIVADA AO APERTAR A ALTERNATIVA CORRETA
  // IRÁ MOSTRAR AS RESPOSTAS CORRETAS E INCORRETAS
  correct(dificult) {
    this.show();
    this.addPoint(dificult);
  }

  // ESTÁ FUNÇÃO ADICIONA PONTOS DE ACORDO COM NÍVEL DE DIFICULDADE E NO TEMPO + 10. TAMBÉM ACRESCENTA O CONTADOR DE ACERTOS;
  addPoint(difficulty) {
    // IRÁ SELECIONAR O MULTIPLICADOR DE PONTOS POR DIFICULDADE
    let weigthPoint;
    if (difficulty === 'easy') weigthPoint = onePoint;
    if (difficulty === 'medium') weigthPoint = twoPoints;
    if (difficulty === 'hard') weigthPoint = threePoints;
    // CAPTURA O TIMER PARA O CÁLCULO DOS PONTOS
    const { timer } = this.state;
    // CAPTURA A PONTUAÇÃO ATUAL
    const data = JSON.parse(localStorage.state);
    // CALCULA OS PONTOS DIFICULDADE*TEMPORESTANTE
    data.player.score += weigthPoint * timer + tenPoints;
    // ACRESCENTA AO NÚMERO DE QUESTÕES ACERTADAS
    data.player.assertions += 1;
    // SETA O NOVO A NOVA SITUAÇÃO DO PLAYER
    localStorage.state = JSON.stringify(data);
    // FORÇA UM NOVO RENDER PARA ATUALIZAR A PONTUAÇÃO NO HEADER
    this.forceUpdate();
  }

  // FUNÇÃO ATIVADA AO APERTAR A ALTERNATIVA INCORRETA // IRÁ MOSTRAR AS RESPOSTAS CORRETAS E INCORRETAS
  wrong() {
    this.show();
  }

  // FUNÇÃO QUE MOSTRA AS RESPOSTAS CORRETAS E INCORRETAS, DESATIVA OS BOTÕES, E PAUSA O TIMER
  show() {
    this.stopTimer();
    this.setState({
      showCorrect: true,
      isDisable: true,
    });
  }

  // FUNÇÃO QUE ESCONDE AS RESPOSTAS CORRETAS E INCORRETAS E ATIVA OS BOTÕES
  hide() {
    this.setState({
      showCorrect: false,
      isDisable: false,
    });
  }

  // FUNÇÃO QUE VAI PARA PRÓXIMA QUESTÃO
  // MUDA O ESTADO PARA ESCONDER AS RESPOSTAS ANTES DA PRÓXIMA QUESTÃO COM hide()
  // ADICIONA 1 AO INDEX DE QUESTÕES(nQuestion) // PARA O TIMER COM stopTimer()
  // ESPERA 0,2 SEGUNDOS PARA COMPENSAR O DELAY E REATIVAR OT TIMER
  nextQuestion() {
    this.hide();
    this.setState((previus) => ({
      nQuestion: previus.nQuestion + 1,
    }));
    this.stopTimer();
    setTimeout(() => {
      this.startTimer();
    }, twoHundredMilliseconds);
  }

  // FUNÇÃO TIMER E COMANDOS
  // - SE TIMER FOR > 0, IRÁ RETIRAR 1 SEGUNDO DO STATE
  // - SE NÃO PASSAR DA ÚLTIMA QUESTÃO IRÁ RETIRAR 1 SEGUNDO DO STATE
  // - SE O TIMERSTATUS FOR DIFERENTE DE 'stop' IRÁ RETIRAR 1 SEGUNDO
  // - SE O TIMER CHEGAR EM 0, IRÁ MOSTRAR AS CORRETAS E DESABILITAR AS RESPOSTAS
  // - SE TIMERSTATUS FOR IGUAL A 'stop' OU PASSAR DA ÚLTIMA QUESTÃO IRÁ LIMPAR O INTERVAL
  timer() {
    const myTimer = setInterval(() => {
      const { timer, nQuestion, timerStatus } = this.state;
      if (timer !== 0 && nQuestion <= fourQuestions && timerStatus !== 'stop') {
        this.setState((previus) => ({
          timer: previus.timer - 1,
        }));
      }
      if (timer === 0) {
        this.show();
      }

      if (timerStatus === 'stop' || nQuestion > fourQuestions) {
        clearInterval(myTimer);
      }
    }, oneSecond);
  }

  // ESTA FUNÇÃO INICIA O TIMER COM 30 SEGUNDOS
  startTimer() {
    this.setState({
      timer: 30,
      timerStatus: '',
    });
    this.timer();
  }

  // ESTA FUNÇÃO PARA O TIMER
  stopTimer() {
    this.setState({
      timerStatus: 'stop',
    });
  }

  // BOTÃO CRIADO EM FUNÇÃO DEVIDO AO LINTER
  CorrectBtn(answer, difficulty) {
    const { showCorrect, isDisable } = this.state;
    return (
      <button
        type="button"
        data-testid="correct-answer"
        disabled={ isDisable }
        className={ showCorrect ? 'green' : '' }
        onClick={ () => this.correct(difficulty) }
      >
        {answer}
      </button>
    );
  }

  // BOTÃO CRIADO EM FUNÇÃO DEVIDO AO LINTER
  WrongBtn(answer, i) {
    const { showCorrect, isDisable } = this.state;
    return (
      <button
        type="button"
        data-testid={ `wrong-answer-${i}` }
        disabled={ isDisable }
        className={ showCorrect ? 'red' : '' }
        onClick={ () => this.wrong() }
      >
        {answer}
      </button>
    );
  }

  // BOTÃO CRIADO EM FUNÇÃO DEVIDO AO LINTER
  NextBtn() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => this.nextQuestion() }
      >
        Próximo
      </button>
    );
  }

  // FUNÇÃO QUE CRIA RANKING AO TERMINAR O JOGO. CASO JÁ EXISTA UM RAKING, ELE ADICIONA OS DADOS DO ÚLTIMO JOGADOR. SE AINDA NÃO HOUVER, CRIA UMA CHAVE NO LOCALSTORAGE COM OS DADOS DO JOGADOR. SERÁ CHAMADA NO componentWillUnmount()
  generateRanking() {
    const { player } = JSON.parse(localStorage.state);
    const { name, score, gravatarEmail } = player;
    const gravatarHash = md5(gravatarEmail.trim().toLowerCase()).toString();
    const picture = `https://www.gravatar.com/avatar/${gravatarHash}`;
    const obj = { name, score, picture };
    if (localStorage.ranking) {
      const ranking = JSON.parse(localStorage.ranking);
      const newRanking = [...ranking, obj];
      localStorage.ranking = JSON.stringify(newRanking);
    } else {
      localStorage.setItem('ranking', JSON.stringify([obj]));
    }
  }

  render() {
    const { gameData: { results }, isLoading } = this.props;
    const { nQuestion, showCorrect, timer } = this.state;
    return (
      <div>
        <Header />
        <span>{timer}</span>
        {!isLoading && results
          .map((question, iQuestion) => {
            if (iQuestion === nQuestion) {
              return (
                <div className="questions__container" key={ iQuestion }>
                  <h1 data-testid="question-category">{question.category}</h1>
                  <h2 data-testid="question-text">{question.question}</h2>
                  {[...question.incorrect_answers, question.correct_answer]
                    .sort()
                    .map((answer, index) => (
                      answer === question.correct_answer
                        ? this.CorrectBtn(answer, question.difficulty)
                        : this.WrongBtn(answer, index)
                    ))}
                </div>
              );
            }
            return '';
          })}
        {showCorrect ? this.NextBtn() : ''}
        {nQuestion > fourQuestions && <Redirect to="/feedback" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameData: state.gameReducer.gameData,
  isLoading: state.gameReducer.isLoading,
});

GamePage.propTypes = {
  gameData: PropTypes.object,
  isLoading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, null)(GamePage);
