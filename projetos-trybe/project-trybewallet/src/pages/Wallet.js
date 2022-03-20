import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './Form';
import { fetchApi } from '../actions';
import '../CSS/Wallet.css';
import List from './List';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.totalSpent = this.totalSpent.bind(this);
  }

  componentDidMount() {
    fetchApi();
  }

  totalSpent() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.value * expense.exchangeRates[expense.currency].ask;
    });
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div className="wallet">
        <header className="wallet-header">
          <p data-testid="email-field">{email}</p>
          <div className="total-price-BRL">
            <p data-testid="total-field">{`Despesa total: ${this.totalSpent()}`}</p>
            <p data-testid="header-currency-field" className="brl">BRL</p>
          </div>
        </header>
        <div className="main-content">
          <Form />
          <List />
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);
