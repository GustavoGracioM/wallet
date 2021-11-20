import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCurrencies, actionValueTotal, actionWallet } from '../actions';
import { categoryExpenseList, paymentList } from './Options';

const INITIAL_STATE = {
  id: 0,
  expense: 0,
  descriptionExpense: '',
  currency: 'USD',
  payment: 'Dinheiro',
  categoryExpense: 'Alimentação',
};
class Form extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  counterCurrencies() {
    const { expenses } = this.props;
    console.log(expenses);
    if (expenses) {
      return expenses
        .reduce((acc, curr) => acc
        + Number(curr.exchangeRates[curr.currency].ask * curr.value),
        0);
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const {
      expense,
      descriptionExpense,
      currency,
      payment,
      categoryExpense,
      id,
    } = this.state;
    const { addExpense, addValueTotal, getCurrencies, expenses } = this.props;
    const exchangeRates = (await getCurrencies()).value;
    addExpense({
      id: expenses.length,
      currency,
      value: expense,
      description: descriptionExpense,
      method: payment,
      tag: categoryExpense,
      exchangeRates,
    });
    this.setState(
      { ...INITIAL_STATE, id },
      () => addValueTotal(this.counterCurrencies()),
    );
  }

  currenciesList() {
    const { currencies } = this.props;
    return currencies.map((currencie) => (
      <option
        key={ currencie }
        value={ currencie }
        data-testid={ currencie }
      >
        {currencie}

      </option>
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
        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
          >
            {this.currenciesList()}
          </select>
          Moeda
        </label>
        <select
          data-testid="method-input"
          name="payment"
          value={ payment }
        >
          {paymentList()}
        </select>
        <select
          data-testid="tag-input"
          name="categoryExpense"
          value={ categoryExpense }
        >
          {categoryExpenseList()}
        </select>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (value) => dispatch(actionWallet(value)),
  addValueTotal: (value) => dispatch(actionValueTotal(value)),
  getCurrencies: () => dispatch(actionCurrencies()),
  // addCurrencies: (value) => dispatch(addCurrencies(value)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  addExpense: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  addValueTotal: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf().isRequired,
  // addCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    valueTotal: PropTypes.shape({}).isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
