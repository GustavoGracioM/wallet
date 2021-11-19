import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { email, password } = this.state;
      const minCharacters = 6;
      // regex retirando desse site https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
      const regex = /\S+@\S+\.\S+/;
      if (regex.test(email) && password.length >= minCharacters) {
        return this.setState({ isDisabled: false });
      }
      return this.setState({ isDisabled: true });
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { addUser, history } = this.props;
    const { email } = this.state;
    addUser(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <form onSubmit={ this.handleClick }>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (value) => dispatch(actionLogin(value)),
});

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
