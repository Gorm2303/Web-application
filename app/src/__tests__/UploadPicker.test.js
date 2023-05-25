jest.mock('axios');
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UploadPicker from '../upload_pages/UploadPicker';
import axios from 'axios';

describe('UploadPicker', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('renders the component', () => {
        render(<UploadPicker />);
        expect(screen.getByText('Example of input file:')).toBeInTheDocument();
    });

    it('calls the onUpload prop with the uploaded file URL', async () => {
        const file = new File(['test'], 'test.png', { type: 'image/png' });
        const url = 'https://example.com/uploaded.png';
        const response = { data: { url } };
        axios.default.post.mockResolvedValueOnce(response);
        const onUpload = jest.fn(); 
        render(<UploadPicker onUpload={onUpload} />);
        const input = screen.getByTestId('upload-picker');
        fireEvent.change(input, { target: { files: [file] } });
        const button = screen.getByText('Upload');
        fireEvent.click(button);
        await waitFor(() => expect(onUpload).toHaveBeenCalledWith(url));
    });

    it('displays an error message when the url is undefined', async () => {
        const file = new File(['test'], 'test.png', { type: 'image/png' });
        const error = new Error('Upload failed');
        axios.default.post.mockResolvedValueOnce(error);
        render(<UploadPicker />);
        const input = screen.getByTestId('upload-picker');
        fireEvent.change(input, { target: { files: [file] } });
        const button = screen.getByText('Upload');
        fireEvent.click(button);
        const errorText = await waitFor(() => screen.getByText('Cannot read properties of undefined (reading \'url\')'));
        expect(errorText).toBeInTheDocument();
    });

});