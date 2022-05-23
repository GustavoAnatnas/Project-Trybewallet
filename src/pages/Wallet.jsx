import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { coinFetchAPI } = this.props;
    coinFetchAPI();
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <>
        <header>
          <h3 data-testid="email-field">{email}</h3>
          <h3 data-testid="total-field"> 0 </h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              name="value"
              type="text"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              name="description"
              type="text"
            />
          </label>
          <label htmlFor="Moeda">
            Moeda:
            <select name="Moeda" id="Moeda">
              { currencies.map((curr) => (
                <option key={ curr } value={ curr }>
                  {curr}
                </option>
              )) }
            </select>
          </label>
          <label htmlFor="payment-form">
            Forma de Pagamento:
            <select data-testid="method-input" name="payment-form">
              <option value="Cash">Dinheiro</option>
              <option value="Credit-Card">Cartão de crédito</option>
              <option value="Debit-Card">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select data-testid="tag-input" name="tag">
              <option value="Feeding">Alimentação</option>
              <option value="Leisure">Lazer</option>
              <option value="Work">Trabalho</option>
              <option value="Transportation">Transporte</option>
              <option value="Health">Saúde</option>
            </select>
          </label>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  coinFetchAPI: () => dispatch(fetchAPI()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  fetchAPI: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isResquired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
