import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionDeleteExpends } from '../actions';

class ExpenseTable extends React.Component {
  render() {
    const tags = ['Descrição', 'Tag',
      'Método de pagamento',
      'Valor', 'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar'];

    const { expenses, deleteExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {tags.map((tag) => (<th key={ tag }>{tag}</th>))}
          </tr>
        </thead>
        <tbody>
          {expenses.length >= 1 && expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.descriptionExpense}</td>
              <td>{expense.categoryExpense}</td>
              <td>{expense.payment}</td>
              <td>{expense.expense}</td>
              <td>{expense.nameExchange}</td>
              <td>{expense.ask}</td>
              <td>{expense.valueTotal}</td>
              <td>{expense.conversionCurrency}</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => deleteExpense(expense.id) }
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (value) => dispatch(actionDeleteExpends(value)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    descriptionExpense: PropTypes.string.isRequired,
    categoryExpense: PropTypes.string.isRequired,
    ask: PropTypes.string.isRequired,
    payment: PropTypes.string.isRequired,
    expense: PropTypes.string.isRequired,
    valueTotal: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
