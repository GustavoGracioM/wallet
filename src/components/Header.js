import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  counterCurrencies() {
    const { expenses } = this.props;
    if (expenses) {
      return expenses.reduce((acc, curr) => (
        acc + Number(curr.exchangeRates[curr.currency].ask * curr.value)), 0).toFixed(2);
    }
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header-wallet">
        <span data-testid="email-field" className="header-user">
          {email}
        </span>
        <div className="expenses">
          <span data-testid="total-field" className="header-expenses">
            {this.counterCurrencies()}
          </span>
          <span
            data-testid="header-currency-field"
            className="header-expenses"
          >
            BRL
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  valueTotal: state.wallet.valueTotal,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    valueTotal: PropTypes.shape({}).isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
