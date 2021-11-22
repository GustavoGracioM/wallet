import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, valueTotal } = this.props;
    const value = valueTotal ? valueTotal.toFixed(2) : 0;
    return (
      <header className="header-wallet bg-dark">
        <h4 data-testid="email-field">
          {email}
        </h4>
        <div className="expenses">
          <h4 data-testid="total-field">
            {value}
          </h4>
          <h4 data-testid="header-currency-field"> BRL</h4>
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
