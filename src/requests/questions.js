import axios from 'axios';

import config from './config';

const { ip, port } = config;

export function getQuestions(topicId, articleId) {
  return axios.get(`//${ip}:${port}/api/topics/${topicId}/articles/${articleId}/questions`);
}

export function getQuestion(topicId, articleId, questionId) {
  return axios.get(`//${ip}:${port}/api/topics/${topicId}/articles/${articleId}/questions/${questionId}`);
}

export function createQuestion(topicId, articleId, data) {
  return axios.post(`//${ip}:${port}/api/topics/${topicId}/articles/${articleId}/questions`, data);
}

export function updateQuestion(topicId, articleId, questionId, data) {
  return axios.put(
    `//${ip}:${port}/api/topics/${topicId}/articles/${articleId}/questions/${questionId}`,
    data,
  );
}

export function deleteQuestion(topicId, articleId, questionId) {
  return axios.delete(`//${ip}:${port}/api/topics/${topicId}/articles/${articleId}/questions/${questionId}`);
}
