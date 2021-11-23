import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionDeleteExpends, actionEditExpenses } from '../actions';

const tags = ['Descrição', 'Tag',
  'Método de pagamento',
  'Valor', 'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir'];

class ExpenseTable extends React.Component {
  render() {
    const { expenses, deleteExpense, editExpenses } = this.props;
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            {tags.map((tag) => (<th key={ tag }>{tag}</th>))}
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.map((expense) => {
            const { ask, name } = expense.exchangeRates[expense.currency];
            const nameExchange = name.split('/')[0];
            const valueTotal = Number(ask * expense.value).toFixed(2);
            const exchange = Number(ask).toFixed(2);
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{nameExchange}</td>
                <td>{exchange}</td>
                <td>{valueTotal}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpense(expense) }
                  >
                    Deletar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-testid="edit-btn"
                    onClick={ () => editExpenses(expense.id) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
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
  editExpenses: (value) => dispatch(actionEditExpenses(value)),
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
  editExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
