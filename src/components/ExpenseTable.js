import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionDeleteExpends } from '../actions';

class ExpenseTable extends React.Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento,</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar</th>
        </tr>
        {expenses && Object.keys(expenses).map((key) => {
          const name = expenses[key].name.split('/')[0];
          const real = expenses[key].name.split('/')[1];
          return (
            <tr key={ key }>
              <td>{expenses[key].descriptionExpense}</td>
              <td>{expenses[key].categoryExpense}</td>
              <td>{expenses[key].payment}</td>
              <td>{expenses[key].expense}</td>
              <td>{name}</td>
              <td>{expenses[key].ask}</td>
              <td>{expenses[key].valueTotal}</td>
              <td>{real}</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => {
                    deleteExpense(expenses[key].id);
                  } }
                >
                  Deletar
                </button>

              </td>
            </tr>
          );
        })}
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
  expenses: PropTypes.arrayOf().isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
