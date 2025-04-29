import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Newsletter Signup Form', () => {
  test('renders a name input', () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();
  });

  test('renders an email input', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('renders checkboxes for interests', () => {
    render(<App />);
    const interestCheckbox = screen.getByLabelText(/coding/i);
    expect(interestCheckbox).toBeInTheDocument();
  });

  test('renders a submit button', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
  });

  test('updates name input when user types', async () => {
    render(<App />);
    const input = screen.getByLabelText(/name/i);
    await userEvent.type(input, 'Alice');
    expect(input).toHaveValue('Alice');
  });

  test('updates email input when user types', async () => {
    render(<App />);
    const input = screen.getByLabelText(/email/i);
    await userEvent.type(input, 'alice@example.com');
    expect(input).toHaveValue('alice@example.com');
  });

  test('displays success message after form submission', async () => {
    render(<App />);
    await userEvent.type(screen.getByLabelText(/name/i), 'Alice');
    await userEvent.type(screen.getByLabelText(/email/i), 'alice@example.com');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByText(/thank you, alice/i)).toBeInTheDocument();
  });

  test('includes selected interests in success message', async () => {
    render(<App />);
    await userEvent.click(screen.getByLabelText(/coding/i));
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByText(/your interests: coding/i)).toBeInTheDocument();
  });

  test('handles no interests selected correctly', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.queryByText(/your interests:/i)).not.toBeInTheDocument();
  });
});
