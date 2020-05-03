import axios from "axios";

const baseUrl = "https://5dd14f8d15bbc2001448d07d.mockapi.io/";

export function getUser() {
  return axios.get(`${baseUrl}/products/`);
}

export function postUser(product) {
  return axios.post(`${baseUrl}/products/`, product);
}

export function deleteUser(productId) {
  return axios.delete(`${baseUrl}/products/${productId}`);
}

export function imageValidate(url) {
  return axios.get(url);
}
