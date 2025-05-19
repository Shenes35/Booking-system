import { render, screen } from '@testing-library/react';
import LoginPage from '../LoginPage';

test('renders login form', () => {
  render(<LoginPage />);
  expect(screen.getByLabelText(/User ID/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});
