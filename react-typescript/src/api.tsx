const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchCoinInfo(coinId: String) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinTickers(coinId: String) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

/* react query (useQuery)
    { isLoading, data } = useQuery("query key(unique)", fetcher function);
    ->
    fetch + caching (query key를 바탕으로 reload 시 api를 다시 호출 하지 않고 캐시 데이터를 반환)
    ReactQueryDevtools을 app.tsx에 import해서 query명 별로 데이터 확인 가능 (패치, 리셋 등 action 가능)
*/
