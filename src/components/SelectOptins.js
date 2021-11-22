import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SelectOptions extends React.Component {
  options() {
    const { currencies } = this.props;
    return currencies.map((currencie) => (
      <option
        key={ currencie }
        value={ currencie }
        data-testid={ currencie }
      >
        {currencie}
      </option>
    ));
  }

  render() {
    const { value } = this.props;
    return (
      <div className="col">
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            value={ value }
            className="form-select"
          >
            {this.options()}
          </select>
        </label>
      </div>
    );
  }
}

SelectOptions.propTypes = {
  currencies: PropTypes.arrayOf().isRequired,
  value: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(SelectOptions);
