import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import PlayerPage from '../player_pages/PlayerPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('PlayerPage', () => {
  it('renders the video player with the correct URL', async () => {
    const testVideoUrl = 'https://example.com/video.mp4';
    const mockLocation = {
      search: `?url=${encodeURIComponent(testVideoUrl)}`,
    };

    // Mock the useLocation hook
    useLocation.mockReturnValue(mockLocation);

    render(
    <BrowserRouter>
        <PlayerPage />
      </BrowserRouter>
      );

    // Assert that the video player is rendered
    await waitFor(() => {
        const videoElement = screen.getByTestId('video-player').firstChild;
        expect(videoElement).toBeInTheDocument();

        // Assert that the video URL prop matches the provided URL
        expect(videoElement).toHaveAttribute('src', testVideoUrl);
    });
  });
});
