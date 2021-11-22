import React from 'react';
import PropTypes from 'prop-types';

class InputForm extends React.Component {
  render() {
    const { id, value, type, name, text } = this.props;
    return (
      <div className="col-md">
        <label htmlFor={ name }>
          {text}
          <input
            type={ type }
            data-testid={ id }
            name={ name }
            value={ value }
            className="form-control"
          />
        </label>
      </div>
    );
  }
}

InputForm.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default InputForm;
