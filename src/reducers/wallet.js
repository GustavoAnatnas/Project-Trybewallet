// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const WALLET_REDUCER = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CURRENCIES':
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((coin) => coin !== 'USDT') };
  case 'EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }] };
  default:
    return state;
  }
};
export default WALLET_REDUCER;
