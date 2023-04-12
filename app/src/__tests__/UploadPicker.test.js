import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UploadPicker from '../upload_pages/UploadPicker';

jest.mock('axios');

describe('UploadPicker', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('renders the component', () => {
        render(<UploadPicker />);
        expect(screen.getByText('Example of input file:')).toBeInTheDocument();
    });

    it('displays progress when uploading a file', async () => {
        const file = new File(['test'], 'test.png', { type: 'image/png' });
        const url = 'https://example.com/uploaded.png';
        const response = { data: { url } };
        axios.post.mockResolvedValueOnce(response);
        render(<UploadPicker />);
        const input = screen.getByLabelText('upload-picker');
        fireEvent.change(input, { target: { files: [file] } });
        const button = screen.getByText('Upload');
        fireEvent.click(button);
        const progressText = await waitFor(() => screen.getByText('100% uploaded'));
        expect(progressText).toBeInTheDocument();
        expect(screen.getByAltText('Uploaded poster')).toBeInTheDocument();
    });

    it('calls the onUpload prop with the uploaded file URL', async () => {
        const file = new File(['test'], 'test.png', { type: 'image/png' });
        const url = 'https://example.com/uploaded.png';
        const response = { data: { url } };
        axios.post.mockResolvedValueOnce(response);
        const onUpload = jest.fn(); 
        render(<UploadPicker onUpload={onUpload} />);
        const input = screen.getByLabelText('upload-picker');
        fireEvent.change(input, { target: { files: [file] } });
        const button = screen.getByText('Upload');
        fireEvent.click(button);
        await waitFor(() => expect(onUpload).toHaveBeenCalledWith(url));
    });

    it('displays an error message when there is an upload error', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const error = new Error('Upload failed');
    axios.post.mockRejectedValueOnce(error);
    render(<UploadPicker />);
    const input = screen.getByLabelText('upload-picker');
    fireEvent.change(input, { target: { files: [file] } });
    const button = screen.getByText('Upload');
    fireEvent.click(button);
    const errorText = await waitFor(() => screen.getByText('Upload failed'));
    expect(errorText).toBeInTheDocument();
    });
})