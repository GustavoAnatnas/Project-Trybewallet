import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmailAction } from '../actions/index';

class Login extends React.Component {
state = {
  email: '',
  password: '',
  disabled: true,
};

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifySubmitButton());
  }

handleClickButton= (onClick) => {
  const {
    dispatch,
    history,
  } = this.props;
  const { email } = this.state;
  onClick.preventDefault();
  dispatch(addEmailAction(email));
  history.push('/carteira');
}

verifySubmitButton() {
  const {
    email,
    password,
  } = this.state;
  const minPassword = 6;
  const emailRequirement = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;

  if (password.length >= minPassword && emailRequirement.test(email)) {
    return this.setState({ disabled: false });
  }
  this.setState({ disabled: true });
}

render() {
  const {
    email,
    password,
    disabled,
  } = this.state;
  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          name="email"
          value={ email }
          data-testid="email-input"
          onChange={ this.handleChange }
          type="email"
          required
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          name="password"
          value={ password }
          data-testid="password-input"
          onChange={ this.handleChange }
          type="text"
          required
        />
      </label>
      <button
        disabled={ disabled }
        onClick={ this.handleClickButton }
        type="button"
      >
        Entrar
      </button>
    </form>
  );
}
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
export default connect()(Login);
