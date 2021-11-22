import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, valueTotal } = this.props;
    const value = valueTotal ? valueTotal.toFixed(2) : 0;
    return (
      <header className="header-wallet">
        <span data-testid="email-field" className="header-user">
          {email}
        </span>
        <div className="expenses">
          <span data-testid="total-field" className="header-expenses">
            {value}
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
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  valueTotal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
