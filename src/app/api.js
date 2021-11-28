import axios from 'axios';

const productCache = {
  tesco: {},
  sainsbury: {},
}

let $axios = axios.create({
  baseURL: '/api/',
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}
})

// Request Interceptor
// $axios.interceptors.request.use(function (config) {
//   config.headers['Authorization'] = 'Fake Token'
//   return config
// })

// Response Interceptor to handle and log errors
$axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // Handle Error
  console.log(error)
  return Promise.reject(error)
})

export function getProduct(store, id) {
  return productCache[store][id] || $axios.get(`${store}/${id}`).then(response => {
    productCache[store][id] = response.data;
    return productCache[store][id];
  });
}
