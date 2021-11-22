import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Button extends React.Component {
  render(id, name, expense) {
    const { deleteExpense } = this.props;
    return (
      <button
        type="button"
        data-testid={ id }
        onClick={ () => deleteExpense(expense) }
      >
        {name}
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (value) => dispatch(actionDeleteExpends(value)),
});

Button.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Button);
