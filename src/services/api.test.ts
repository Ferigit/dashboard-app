import { apiClient } from './api';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { vi } from 'vitest';

const server = setupServer(
  http.get('http://localhost:3000/api/users', () => {
    return HttpResponse.json([{ id: 1, name: 'John' }]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('apiClient', () => {
  it('makes GET requests', async () => {
    const response = await apiClient.get('/users');
    expect(response.data).toEqual([{ id: 1, name: 'John' }]);
  });

  it('handles errors', async () => {
    server.use(
      http.get('http://localhost:3000/api/users', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(apiClient.get('/users')).rejects.toThrow();
  });

  it('includes auth token in headers', async () => {
    localStorage.setItem('authToken', 'test-token');
    const spy = vi.spyOn(apiClient, 'get');
    
    await apiClient.get('/users');
    expect(spy).toHaveBeenCalledWith('/users', {
      headers: { Authorization: 'Bearer test-token' }
    });
    
    localStorage.removeItem('authToken');
  });
});