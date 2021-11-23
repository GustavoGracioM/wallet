import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCurrencies,
  actionDeleteExpends, actionDisableEdit, actionWallet } from '../actions';
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
    this.clickEditExpense = this.clickEditExpense.bind(this);
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
    const { addExpense, getCurrencies, expenses } = this.props;
    const exchangeRates = (await getCurrencies()).value;
    addExpense({ ...this.state, id: expenses.length, exchangeRates });
    this.setState(
      { ...INITIAL_STATE, id },
    );
  }

  async clickEditExpense(event) {
    event.preventDefault();
    const {
      addExpense,
      getCurrencies,
      idToEdit,
      deleteExpense } = this.props;
    const exchangeRates = (await getCurrencies()).value;
    deleteExpense({ id: idToEdit });
    addExpense({ ...this.state, id: idToEdit, exchangeRates });
    this.setState({ ...INITIAL_STATE, isEditor: false });
  }

  edit() {
    const { expenses, idToEdit, disableEdit } = this.props;
    const expense = expenses.find((x) => x.id === idToEdit);
    this.setState({ ...expense, isEditor: true });
    disableEdit();
  }

  isEdition() {
    const { editor } = this.props;
    if (editor) return this.edit();
  }

  render() {
    const { value, description, currency, method, tag, isEditor } = this.state;
    this.isEdition();
    return (
      <form
        onSubmit={ isEditor ? this.clickEditExpense : this.handleClick }
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
          {isEditor ? <span>Editar despesa</span> : <span>Adicionar despesa</span>}
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (value) => dispatch(actionWallet(value)),
  deleteExpense: (value) => dispatch(actionDeleteExpends(value)),
  getCurrencies: () => dispatch(actionCurrencies()),
  disableEdit: () => dispatch(actionDisableEdit()),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

Form.propTypes = {
  addExpense: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  disableEdit: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    valueTotal: PropTypes.shape({}).isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
