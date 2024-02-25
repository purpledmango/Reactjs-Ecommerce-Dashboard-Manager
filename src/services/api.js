import axios from 'axios';

// Create an instance of axios with a custom configuration
const api = axios.create({

  baseURL: 'https://api.theneighbourhoood.com/',

  // headers: {
  //     'Content-Type': 'application/json',
  //     // You can add additional headers here
  // },
  withCredentials: true,
  timeout: 120000, // Set timeout to 1 minute (60,000 milliseconds)
});

export default api;
