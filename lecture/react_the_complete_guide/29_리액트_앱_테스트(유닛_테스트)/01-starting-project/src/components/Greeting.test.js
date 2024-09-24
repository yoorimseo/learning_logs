import { render, screen, userClick } from '@testing-library/react';

import Greeting from './Greeting';

describe('Greeting component', () => {
  test('renders Hello World as a text', () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText('Hello World', { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });
});

// 첫 번째 테스트
test('renders good to see you if the button was NOT clicked', () => {
  render(<Greeting />);

  const outputElement = screen.getByText('good to see you', { exact: false });
  expect(outputElement).toBeInTheDocument();
});

// 두 번째 테스트
test('renders "Changed!" if the button was clicked', () => {
  // Arrange
  render(<Greeting />);

  // Act
  const buttonElement = screen.getByRole('button');
  userClick.click(buttonElement);

  // Assert
  const outputElement = screen.getByText('Changed!');
  expect(outputElement).toBeInTheDocument();
});

// 세 번째 테스트
test('does not render "good to see you" if the button was clicked', () => {
  // Arrange
  render(<Greeting />);

  // Act
  const buttonElement = screen.getByRole('button');

  userClick.click(buttonElement);

  // Assert
  const outputElement = screen.queryByText('good to see you', { exact: false });
  expect(outputElement).toBeNull();
});
