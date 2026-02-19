import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import App from '../../App';

describe('App Integration Tests', () => {
    const mockHealthData = {
        status: 'ok',
        message: 'ShopSmart Backend is running',
        timestamp: '2026-02-19T12:00:00.000Z',
    };

    beforeEach(() => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockHealthData),
            })
        );
    });

    afterEach(() => {
        vi.restoreAllMocks();
        cleanup();
    });

    // 1. Loading text disappears after data arrives
    it('transitions from loading to data display', async () => {
        render(<App />);
        expect(screen.getByText(/Loading backend status/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText(/Loading backend status/i)).not.toBeInTheDocument();
        });

        expect(screen.getByText('ok')).toBeInTheDocument();
    });

    // 2. Re-rendering App does not duplicate fetch calls
    it('does not duplicate fetch calls on re-render', async () => {
        const { rerender } = render(<App />);
        await waitFor(() => expect(screen.getByText('ok')).toBeInTheDocument());

        rerender(<App />);
        await waitFor(() => expect(screen.getByText('ok')).toBeInTheDocument());

        // fetch should only have been called once (initial mount)
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // 3. Uses VITE_API_URL env variable when set
    it('uses VITE_API_URL env variable for fetch', async () => {
        const originalEnv = import.meta.env.VITE_API_URL;
        import.meta.env.VITE_API_URL = 'https://api.example.com';

        render(<App />);
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/api/health');
        });

        // Restore
        if (originalEnv === undefined) {
            delete import.meta.env.VITE_API_URL;
        } else {
            import.meta.env.VITE_API_URL = originalEnv;
        }
    });

    // 4. Defaults to relative URL when no env var
    it('defaults to relative URL when VITE_API_URL is not set', async () => {
        delete import.meta.env.VITE_API_URL;

        render(<App />);
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('/api/health');
        });
    });

    // 5. On fetch failure, loading text stays visible
    it('keeps loading text visible on fetch error', async () => {
        global.fetch = vi.fn(() => Promise.reject(new Error('Server down')));
        vi.spyOn(console, 'error').mockImplementation(() => { });

        render(<App />);

        // Wait for error to be handled
        await waitFor(() => {
            expect(console.error).toHaveBeenCalled();
        });

        // Loading text should remain since data never arrived
        expect(screen.getByText(/Loading backend status/i)).toBeInTheDocument();
    });

    // 6. All three data fields render together
    it('renders all data fields together after fetch', async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getByText('ok')).toBeInTheDocument();
            expect(screen.getByText(/ShopSmart Backend is running/)).toBeInTheDocument();
            expect(screen.getByText(/2026-02-19/)).toBeInTheDocument();
        });
    });

    // 7. Correct DOM nesting structure
    it('has correct container-child DOM structure', () => {
        render(<App />);
        const container = document.querySelector('.container');
        expect(container).toBeInTheDocument();

        const h1 = container.querySelector('h1');
        expect(h1).toHaveTextContent('ShopSmart');

        const card = container.querySelector('.card');
        expect(card).toBeInTheDocument();

        const hint = container.querySelector('.hint');
        expect(hint).toBeInTheDocument();
    });

    // 8. Works correctly under StrictMode (double-render)
    it('renders correctly under React StrictMode', async () => {
        render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );

        await waitFor(() => {
            expect(screen.getByText('ok')).toBeInTheDocument();
        });

        expect(screen.getByText(/ShopSmart Backend is running/)).toBeInTheDocument();
    });

    // 9. Status displays the exact API response value
    it('displays exact status value from API', async () => {
        const customData = { status: 'healthy', message: 'All systems go', timestamp: 'now' };
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(customData),
            })
        );

        render(<App />);
        await waitFor(() => {
            expect(screen.getByText('healthy')).toBeInTheDocument();
            expect(screen.getByText(/All systems go/)).toBeInTheDocument();
        });
    });

    // 10. Full page renders expected semantic structure
    it('renders complete page with expected semantic elements', async () => {
        render(<App />);
        await waitFor(() => screen.getByText('ok'));

        // Verify the full set of expected elements
        const headings = screen.getAllByRole('heading');
        expect(headings).toHaveLength(2); // h1 + h2

        expect(headings[0].tagName).toBe('H1');
        expect(headings[0]).toHaveTextContent('ShopSmart');

        expect(headings[1].tagName).toBe('H2');
        expect(headings[1]).toHaveTextContent('Backend Status');

        // Three paragraphs in the data section + hint paragraph
        const paragraphs = document.querySelectorAll('p');
        expect(paragraphs.length).toBeGreaterThanOrEqual(4);
    });
});
