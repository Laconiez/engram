import config from './config';

const { ip, port } = config;

const prefix = 'api/topics';

export function getTopics() {
  return fetch(`//${ip}:${port}/${prefix}`).then(response => response.json());
}

export function getTopic(id) {
  return fetch(`//${ip}:${port}/${prefix}/${id}`).then(response => response.json());
}
