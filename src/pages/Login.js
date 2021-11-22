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
      <section className="section-login">
        <h1 className="text-center fs-1">
          Login
        </h1>
        <form onSubmit={ this.handleClick } className=" form-login container">
          <label htmlFor="email">
            Email
            <input
              type="email"
              data-testid="email-input"
              className="form-control"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              data-testid="password-input"
              className="form-control"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            className="btn button"
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </section>
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
