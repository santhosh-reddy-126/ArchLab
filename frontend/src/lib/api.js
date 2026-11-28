const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const SESSION_KEY = 'archlab:session';

function readSession() {
  try {
    return JSON.parse(window.localStorage.getItem(SESSION_KEY) || '{}');
  } catch {
    return {};
  }
}

async function request(path, { method = 'GET', payload, authenticated = false } = {}) {
  const headers = {};

  if (payload !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (authenticated) {
    const { token } = readSession();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    ...(payload !== undefined ? { body: JSON.stringify(payload) } : {}),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export function login(username, password) {
  return request('/api/v1/auth/login', {
    method: 'POST',
    payload: { username, password },
  });
}

export function signUp(username, password) {
  return request('/api/v1/auth/signUp', {
    method: 'POST',
    payload: { username, password },
  });
}

export function createGraphMeta(title, description) {
  return request('/v1/api/graph', {
    method: 'POST',
    authenticated: true,
    payload: { title, description },
  });
}

export function searchGraphMeta(title) {
  return request('/v1/api/graph/search', {
    method: 'POST',
    authenticated: true,
    payload: { title },
  });
}

export function getGraphMeta(id) {
  return request(`/v1/api/graph/${encodeURIComponent(id)}`, { authenticated: true });
}
