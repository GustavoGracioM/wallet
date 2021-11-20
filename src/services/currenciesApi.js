const currenciesApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const resultApi = await response.json();
  delete resultApi.USDT;
  return resultApi;
};

export default currenciesApi;
