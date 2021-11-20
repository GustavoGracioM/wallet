// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  valueTotal: '0',
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
      currencies: action.value,
    });
  case 'VALUE_TOTAL':
    return ({
      ...state,
      valueTotal: action.value,
    });
  default:
    return state;
  }
};

export default wallet;
