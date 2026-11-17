export function getProducts() {
  return fetch("https://dummyjson.com/products").then(function (response) {
    return response.json();
  });
}
