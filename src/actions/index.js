// Coloque aqui suas actions
import currenciesApi from '../services/currenciesApi';

export const actionLogin = (value) => ({ type: 'LOGIN', value });
export const actionWallet = (value) => ({ type: 'ADD_WALLET', value });
const addCurrencies = (value) => ({ type: 'ADD_CURRENCIES', value });

export const actionCurrencies = () => (dispatch) => currenciesApi()
  .then((response) => dispatch(addCurrencies(response)));
