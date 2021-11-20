import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, valueTotal } = this.props;
    const value = valueTotal ? valueTotal.toFixed(2) : 0;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{value}</p>
        <p data-testid="header-currency-field">BRL</p>
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
