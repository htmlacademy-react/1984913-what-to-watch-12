import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShowMoreButton from './show-more-button';

const handleShownClick = jest.fn();

describe('Component: ShowMoreButton', () => {

  it('should render correctly', () => {
    render(
      <ShowMoreButton onShown={handleShownClick} />,
    );
    expect(screen.getByText('Show more')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('catalog__button');
  });

  it('should show more films when clicked', async () => {
    render(
      <ShowMoreButton onShown={handleShownClick} />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handleShownClick).toBeCalled();
  });
});
