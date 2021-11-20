import React from 'react';

export const paymentList = () => {
  const paymentArray = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  return paymentArray.map((pay) => (
    <option key={ pay } value={ pay }>{pay}</option>
  ));
};

export const categoryExpenseList = () => {
  const categoryExpenseArray = ['Alimentação',
    'Lazer',
    'Trabalho',
    'Transporte',
    'Saúde'];
  return categoryExpenseArray.map((pay) => (
    <option key={ pay } value={ pay }>{pay}</option>
  ));
};
