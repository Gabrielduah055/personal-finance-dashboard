import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/personal finance dashboard/i);
  expect(headingElement).toBeInTheDocument();
});
