import useAuthStore from './auth.store';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import React from 'react';

const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );  };

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  });

  it('should login successfully', async () => {
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.login('test@example.com');
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    });
  });

  it('should handle login error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: createWrapper(),
    });

    // Mock a failed login
    await act(async () => {
      await result.current.login('invalid@example.com');
    });

    expect(result.current.error).toBe('Login failed');
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should logout', () => {
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: createWrapper(),
    });

    // First set a logged in state
    act(() => {
      useAuthStore.setState({
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
        isAuthenticated: true,
      });
    });

    // Then logout
    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});