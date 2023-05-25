import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Poster from '../catalog_pages/Poster.js';

const testVideo = {
  poster: '../../public/logo192.png.jpg',
  title: 'Test Video',
};

const errorVideo = {
    poster: '../../public',
    title: 'Error Video',
  };

describe('Poster', () => {
  it('renders the poster image correctly', () => {
    render(<Poster video={testVideo} index={0} />);
    const posterImg = screen.getByRole('img');
    expect(posterImg).toHaveAttribute('src', testVideo.poster);
    expect(posterImg).toHaveAttribute('alt', '1');
  });

  it('handles image loading error and shows fallback image', () => {
    render(<Poster video={errorVideo} index={0} />);
    const fallbackImg = screen.getByRole('img');
    fireEvent.error(fallbackImg);
    expect(fallbackImg).toHaveAttribute('src', 'noImageAvailable.jpg');
    expect(fallbackImg).toHaveAttribute('alt', 'Fallback poster');
  });

  it('calls onClick handler when poster image is clicked', () => {
    const onClickMock = jest.fn();
    render(<Poster video={testVideo} index={0} onClick={onClickMock} />);
    const posterImg = screen.getByRole('img');
    userEvent.click(posterImg);
    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith(testVideo);
  });
});
