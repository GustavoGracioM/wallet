import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SelectOptions extends React.Component {
  render() {
    const { value, currencies } = this.props;
    return (
      <div className="col">
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ value }
            className="form-select"
          >
            {currencies.map((currencie) => (
              <option
                key={ currencie }
                value={ currencie }
                data-testid={ currencie }
              >
                {currencie}
              </option>))}
          </select>
        </label>
      </div>
    );
  }
}

SelectOptions.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(SelectOptions);
