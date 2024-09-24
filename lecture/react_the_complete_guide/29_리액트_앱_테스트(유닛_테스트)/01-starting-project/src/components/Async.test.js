import { render, screen } from '@testing-library/react';

import Async from './Async ';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    // jest.fn 함수는 mock 함수를 만듦
    window.fetch = jest.fn();
    // fetch 함수가 호출되었을 때, 결정되어야 하는 값을 설정할 수 있음
    // jest 기능을 사용하여 더미 함수에 promise가 반환해야 하는 실제 값을 설정
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }],
    });
    render(<Async />);

    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });
});
