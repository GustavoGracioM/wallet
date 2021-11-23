// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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
      expenses: state.expenses
        .filter((value) => value.id !== action.value.id),
    });
  case 'EDIT_EXPENSE':
    return ({
      ...state,
      editor: true,
      idToEdit: action.value,
    });
  case 'DISABLE_EDIT':
    return ({
      ...state,
      editor: false,
    });
  default:
    return state;
  }
};

export default wallet;
