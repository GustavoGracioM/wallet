import React from 'react';
import PropTypes from 'prop-types';

class TextareaForm extends React.Component {
  render() {
    const { id, value, name, text } = this.props;
    return (
      <div className="col-md">
        <label htmlFor={ name }>
          {text}
          <textarea
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

TextareaForm.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TextareaForm;
