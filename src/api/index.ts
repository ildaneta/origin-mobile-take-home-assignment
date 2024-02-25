import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://tque3jpn1e.execute-api.us-east-1.amazonaws.com/mobile-tha/',
});
