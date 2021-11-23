import React from 'react';
import PropTypes from 'prop-types';

class InputFormLogin extends React.Component {
  render() {
    const { id, value, type, name, text } = this.props;
    return (
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
    );
  }
}

InputFormLogin.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default InputFormLogin;
