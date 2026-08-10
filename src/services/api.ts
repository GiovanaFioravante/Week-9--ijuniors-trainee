import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://trainee.fidelis.workers.dev/api',
  headers: {
    'Authorization': 'Bearer 222c6253-5ccf-42c6-9891-290e1628e0b1',
    'Content-Type': 'application/json',
  },
});