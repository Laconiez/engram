import axios from 'axios';

import config from './config';

const { ip, port } = config;

const prefix = 'api/topics';

export function getTopics() {
  return axios.get(`//${ip}:${port}/${prefix}`);
}

export function getTopic(id) {
  return axios.get(`//${ip}:${port}/${prefix}/${id}`);
}

export function createTopic(data) {
  return axios.post(`//${ip}:${port}/${prefix}`, data);
}

export function updateTopic(id, data) {
  return axios.put(`//${ip}:${port}/${prefix}/${id}`, data);
}

export function deleteTopic(id) {
  return axios.delete(`//${ip}:${port}/${prefix}/${id}`);
}
