import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionLogin } from '../actions';
import InputForm from '../components/InputFormLogin';

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
    this.validation = this.validation.bind(this);
  }

  validation() {
    const { email, password } = this.state;
    const minCharacters = 6;
    // regex retirando desse site https://www.horadecodar.com.br/2020/09/
    // 13/como-validar-email-com-javascript/
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) && password.length >= minCharacters) {
      return this.setState({ isDisabled: false });
    }
    return this.setState({ isDisabled: true });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.validation());
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
        <form
          onSubmit={ this.handleClick }
          className=" form-login container"
          onChange={ this.handleChange }
        >
          <InputForm
            id="email-input"
            name="email"
            type="email"
            value={ email }
            text="Email"
          />
          <InputForm
            id="password-input"
            name="password"
            type="password"
            value={ password }
            text="Senha"
          />
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
