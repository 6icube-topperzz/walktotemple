const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4008/api/v1'

async function request<T>(path: string, init?: RequestInit, token?: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.message || err.error || 'Request failed')
  }
  return res.json()
}

export const api = {
  get: <T>(path: string, token?: string) => request<T>(path, { method: 'GET' }, token),
  post: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }, token),
  put: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }, token),
  delete: <T>(path: string, token?: string) => request<T>(path, { method: 'DELETE' }, token),
}
