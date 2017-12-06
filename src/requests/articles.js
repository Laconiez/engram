import axios from 'axios';

import config from './config';

const { ip, port } = config;

export function getArticles(topicId) {
  return axios.get(`//${ip}:${port}/api/topics/${topicId}/articles`);
}

export function getArticle(topicId, articleId) {
  return axios.get(`//${ip}:${port}/api/topics/${topicId}/articles/${articleId}`);
}

export function createArticle(topicId, data) {
  return axios.post(`//${ip}:${port}/api/topics/${topicId}/articles`, data);
}

export function updateArticle(topicId, articleId, data) {
  return axios.put(`//${ip}:${port}/api/topics/${topicId}/articles/${articleId}`, data);
}

export function deleteArticle(topicId, articleId) {
  return axios.delete(`//${ip}:${port}/api/topics/${topicId}/articles/${articleId}`);
}
