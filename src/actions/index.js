// Coloque aqui suas actions
import currenciesApi from '../services/currenciesApi';

export const actionLogin = (value) => ({ type: 'LOGIN', value });
export const actionWallet = (value) => ({ type: 'ADD_WALLET', value });
export const actionDeleteExpends = (value) => ({ type: 'DELETE_EXPENDS', value });
export const actionEditExpenses = (value) => ({ type: 'EDIT_EXPENSE', value });
export const actionDisableEdit = () => ({ type: 'DISABLE_EDIT' });
export const addCurrencies = (value) => ({ type: 'ADD_CURRENCIES', value });

export const actionCurrencies = () => (dispatch) => currenciesApi()
  .then((response) => dispatch(addCurrencies(response)));
