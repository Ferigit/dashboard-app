import { create } from 'zustand';
import { type AuthState, type User } from '../types/auth';

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: true,
  isLoading: false,
  error: null,

  login: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock response
      const mockUser: User = {
        id: '1',
        email,
        name: 'Test User',
      };

      set({
        user: mockUser,
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } catch (error) {
      set({ error: 'Login failed', isLoading: false });
      return false;
    }
  },

  register: async (name: string, email: string,) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock response
      const mockUser: User = {
        id: '1',
        email,
        name,
      };

      set({
        user: mockUser,
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } catch (error) {
      set({ error: 'Registration failed', isLoading: false });
      return false;
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;