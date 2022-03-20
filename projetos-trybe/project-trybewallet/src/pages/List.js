import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.makeList = this.makeList.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
  }

  makeList() {
    const { expensesList } = this.props;
    if (expensesList.length > 0) {
      return expensesList.map((item, index) => (
        <li key={ index }>
          <span>{ item.value}</span>
          <span>{ item.currency}</span>
          <span>{ item.description}</span>
          <span>{item.method}</span>
          <span>{item.tag}</span>
          <button type="button">Editar</button>
          <button type="button" onClick={ () => this.removeFromList(item.id) }>X</button>
        </li>
      ));
    }
  }

  removeFromList(id) {
    const { expensesList, removedor } = this.props;
    const newList = expensesList.filter((item) => item.id !== id);
    console.log(newList);
    removedor(newList);
  }

  render() {
    return (
      <ol>
        {this.makeList()}
      </ol>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesList: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removedor: (payload) => dispatch(removeExpense(payload)),
});

List.propTypes = {
  expensesList: PropTypes.array,
  removedor: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(List);
