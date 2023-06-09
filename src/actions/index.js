// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const CURRENCIES = 'CURRENCIES';
export const EXPENSES = 'EXPENSES';

export function addEmailAction(name) {
  return {
    type: 'ADD_EMAIL',
    payload: name,
  };
}

export const changeCurrencies = (currencies) => ({
  type: 'CURRENCIES',
  payload: currencies,
});

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      dispatch(changeCurrencies(data));
    } catch (error) {
      console.error(error);
    }
  };
}

export const addTotalField = (expense) => ({
  type: 'EXPENSES',
  payload: expense,

});

export const fetchAPITotal = (expense) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    dispatch(addTotalField({
      ...expense,
      exchangeRates: data,
    }));
  } catch (error) {
    console.error(error);
  }
};
