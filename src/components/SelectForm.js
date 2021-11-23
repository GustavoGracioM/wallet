import React from 'react';
import PropTypes from 'prop-types';

class SelectForm extends React.Component {
  render() {
    const { id, value, name, options, text } = this.props;
    return (
      <div className="col">
        <label htmlFor={ name }>
          {text}
          <select
            data-testid={ id }
            name={ name }
            id={ name }
            value={ value }
            className="form-select"
          >
            {options()}
          </select>
        </label>
      </div>
    );
  }
}

SelectForm.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SelectForm;
