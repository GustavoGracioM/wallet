import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCurrencies, actionValueTotal, actionWallet } from '../actions';
import { categoryExpenseList, paymentList } from './Options';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      id: 0,
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

  counterCurrencies() {
    const { expenses } = this.props;
    console.log(expenses);
    if (expenses) {
      return Object.keys(expenses)
        .reduce((acc, curr) => acc + Number(expenses[curr].valueTotal), 0);
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { addExpense, addValueTotal } = this.props;
    const { getCurrencies } = this.props;
    const {
      expense,
      descriptionExpense,
      currency,
      payment,
      categoryExpense,
    } = this.state;
    let { id } = this.state;
    const { ask, codein, name } = (await getCurrencies()).value[currency];
    const valueTotal = expense * ask;
    id += 1;
    addExpense({
      id,
      expense,
      ask,
      name,
      codein,
      valueTotal,
      descriptionExpense,
      currency,
      payment,
      categoryExpense,
    });
    this.setState({ id }, () => addValueTotal(this.counterCurrencies()));
  }

  currenciesList() {
    const { currencies } = this.state;
    return Object.keys(currencies).map((key) => (
      <option
        key={ key }
        value={ key }
        data-testid={ key }
      >
        {key}

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
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Form.propTypes = {
  addExpense: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  addValueTotal: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    valueTotal: PropTypes.shape({}).isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
