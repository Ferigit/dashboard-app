// src/pages/auth/LoginPage.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import useAuthStore from '../../stores/auth.store';

// Mock the auth store
vi.mock('../../stores/auth.store', () => ({
  useAuthStore: vi.fn(),
}));

describe('LoginPage', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.mocked(useAuthStore).mockImplementation(() => ({
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: mockLogin,
      register: vi.fn(),
      logout: vi.fn(),
    }));
  });

  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('submits valid form', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });
});