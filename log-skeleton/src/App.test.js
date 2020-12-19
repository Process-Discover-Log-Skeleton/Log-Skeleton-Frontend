import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Log Skeleton/i);
  expect(linkElement).toBeInTheDocument();
});
