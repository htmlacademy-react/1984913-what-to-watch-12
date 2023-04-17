import { fireEvent, render, screen } from '@testing-library/react';
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

  it('should show more films when clicked', () => {
    render(
      <ShowMoreButton onShown={handleShownClick} />,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(handleShownClick).toBeCalled();
  });
});
