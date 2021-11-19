import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCurrencies, actionWallet } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      expense: 0,
      descriptionExpense: '',
      currency: 'USD',
      payment: 'Dinheiro',
      categoryExpense: 'Alimentação',

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.currenciesState = this.currenciesState.bind(this);
  }

  async componentDidMount() {
    const { getCurrencies } = this.props;
    this.currenciesState(await getCurrencies());
  }

  currenciesState(currencies) {
    this.setState({ currencies: currencies.value });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { addExpense } = this.props;
    const {
      expense,
      descriptionExpense,
      currency,
      payment,
      categoryExpense,
    } = this.state;
    addExpense({ expense,
      descriptionExpense,
      currency,
      payment,
      categoryExpense });
  }

  currenciesList() {
    const { currencies } = this.state;
    return Object.keys(currencies).map((key) => (
      <option key={ key } value={ key }>{key}</option>
    ));
  }

  paymentList() {
    const paymentArray = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return paymentArray.map((pay) => (
      <option key={ pay } value={ pay }>{pay}</option>
    ));
  }

  categoryExpenseList() {
    const categoryExpenseArray = ['Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde'];
    return categoryExpenseArray.map((pay) => (
      <option key={ pay } value={ pay }>{pay}</option>
    ));
  }

  render() {
    const {
      expense,
      descriptionExpense,
      currency,
      payment,
      categoryExpense,
    } = this.state;
    return (
      <form onSubmit={ this.handleClick } onChange={ this.handleChange }>
        <input
          type="number"
          data-testid="value-input"
          name="expense"
          value={ expense }
        />
        <textarea
          data-testid="description-input"
          name="descriptionExpense"
          value={ descriptionExpense }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
        >
          {this.currenciesList()}
        </select>
        <select
          data-testid="method-input"
          name="payment"
          value={ payment }
        >
          {this.paymentList()}
        </select>
        <select
          data-testid="tag-input"
          name="categoryExpense"
          value={ categoryExpense }
        >
          {this.categoryExpenseList()}
        </select>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (value) => dispatch(actionWallet(value)),
  getCurrencies: () => dispatch(actionCurrencies()),
});

// const mapStateToProps = () => {

// }

Form.propTypes = {
  addExpense: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Form);
