import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, fetchApi } from '../actions';
import '../CSS/Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.currenciesOptions = this.currenciesOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { toFetch } = this.props;
    toFetch();
  }

  currenciesOptions() {
    const { moedas } = this.props;
    const { currency } = this.state;
    const options = moedas.filter((moeda) => moeda !== 'USDT');
    return (
      <select name="currency" onChange={ this.handleChange } value={ currency }>
        {options.map((moeda) => (<option key={ moeda }>{ moeda }</option>))}
      </select>
    );
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    const { toSubmit } = this.props;
    e.preventDefault();
    toSubmit(this.state);
  }

  render() {
    const { value, description, method, tag } = this.state;
    return (
      <form onSubmit={ this.handleSubmit } className="Form">
        <span className="form-title">Despesa</span>
        <label htmlFor>
          Valor
          <input
            type="text"
            name="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor>
          Descrição
          <input
            type="text"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <label htmlFor>
          Moeda
          {this.currenciesOptions()}
        </label>
        <label htmlFor>
          Método de pagamento
          <select name="method" onChange={ this.handleChange } value={ method }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor>
          Tag
          <select name="tag" onChange={ this.handleChange } value={ tag }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  toFetch: () => dispatch(fetchApi()),
  toSubmit: (payload) => dispatch(addExpenses(payload)),
});

const mapStateToProps = (state) => ({
  moedas: Object.keys(state.wallet.currencies),
});

Form.propTypes = {
  toFetch: PropTypes.func,
  toSubmit: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
