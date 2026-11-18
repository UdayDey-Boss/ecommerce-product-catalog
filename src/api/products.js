export function getProducts() {
  return fetch("https://dummyjson.com/products?limit=100").then(
    function (response) {
      return response.json();
    },
  );
}
