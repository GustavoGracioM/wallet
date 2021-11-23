import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCurrencies, actionValueTotal, actionWallet } from '../actions';
import { categoryExpenseList, paymentList } from './Options';
import InputForm from './InputFormWallet';
import TextareaForm from './TextareaForm';
import SelectForm from './SelectForm';
import SelectOptins from './SelectOptins';

const INITIAL_STATE = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
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
    await getCurrencies();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { id } = this.state;
    const { addExpense, addValueTotal, getCurrencies, expenses } = this.props;
    const exchangeRates = (await getCurrencies()).value;
    addExpense({ ...this.state, id: expenses.length, exchangeRates });
    this.setState(
      { ...INITIAL_STATE, id },
      () => addValueTotal(this.counterCurrencies()),
    );
  }

  counterCurrencies() {
    const { expenses } = this.props;
    if (expenses) {
      return expenses.reduce((acc, curr) => (
        acc + Number(curr.exchangeRates[curr.currency].ask * curr.value)), 0);
    }
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <form
        onSubmit={ this.handleClick }
        onChange={ this.handleChange }
        className="form-wallet row g-2"
      >
        <InputForm
          type="number"
          id="value-input"
          name="value"
          value={ value }
          text="Valor"
        />
        <TextareaForm
          id="description-input"
          name="description"
          value={ description }
          text="Descrição"
        />
        <SelectOptins
          value={ currency }
        />
        <SelectForm
          id="method-input"
          name="method"
          value={ method }
          options={ paymentList }
          text="Método de pagamento"
        />
        <SelectForm
          id="tag-input"
          name="tag"
          value={ tag }
          options={ categoryExpenseList }
          text="Tag"
        />
        <button type="submit" className="btn col button">
          Adicionar despesa
        </button>
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
  currencies: state.wallet.currencies,
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
