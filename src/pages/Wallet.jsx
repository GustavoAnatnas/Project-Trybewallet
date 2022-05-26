import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, fetchAPITotal } from '../actions';

class Wallet extends React.Component {
  state= {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  }

  componentDidMount() {
    const { coinFetchAPI } = this.props;
    coinFetchAPI();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, currencies, totalExpenses, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const valuesExpenses = {
      value,
      description,
      currency,
      method,
      tag,
    };
    const reduce = expenses.reduce((acc, curr) => {
      const rates = Number(curr.exchangeRates[curr.currency].ask);
      const convertValue = Number(curr.value) * rates;
      acc += convertValue;
      return acc;
    }, 0);
    return (
      <>
        <header>
          <h3 data-testid="email-field">{email}</h3>
          <h3 data-testid="total-field">
            {reduce.toFixed(2)}
          </h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              name="value"
              value={ value }
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              name="description"
              value={ description }
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              value={ currency }
              id="currency"
              onChange={ this.handleChange }
            >
              { currencies.map((curr) => (
                <option key={ curr } value={ curr }>
                  {curr}
                </option>
              )) }
            </select>
          </label>
          <label htmlFor="method">
            Forma de Pagamento:
            <select
              id="method"
              onChange={ this.handleChange }
              value={ method }
              data-testid="method-input"
              name="method"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              onChange={ this.handleChange }
              value={ tag }
              data-testid="tag-input"
              name="tag"
              id="tag"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => {
              totalExpenses(valuesExpenses);
              this.setState({
                value: '',
              });
            } }
          >
            Adicionar despesa
          </button>
          <table>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            <tbody>
              {expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>
                    {Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)}
                  </td>
                  <td>
                    {(Number(expense.value)
                  * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
                  </td>
                  <td>Real</td>
                </tr>
              ))}

            </tbody>
          </table>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  coinFetchAPI: () => dispatch(fetchAPI()),
  totalExpenses: (object) => dispatch(fetchAPITotal(object)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  fetchAPI: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isResquired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
