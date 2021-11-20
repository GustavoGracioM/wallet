import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, valueTotal } = this.props;
    return (
      <header>
        <div>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{valueTotal}</p>
          <p data-testid="header-currency-field">BRL</p>
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
