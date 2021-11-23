// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  valueTotal: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_WALLET':
    return ({
      ...state,
      expenses: [...state.expenses, action.value],
    });
  case 'ADD_CURRENCIES':
    return ({
      ...state,
      currencies: Object.keys(action.value).map((key) => key),
    });
  case 'DELETE_EXPENDS':
    return ({
      ...state,
      valueTotal:
      state.valueTotal
      - (action.value.value * action.value.exchangeRates[action.value.currency].ask),
      expenses: state.expenses
        .filter((value) => value.id !== action.value.id),
    });
  default:
    return state;
  }
};

export default wallet;
