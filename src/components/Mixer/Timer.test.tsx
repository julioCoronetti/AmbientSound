// @vitest-environment jsdom
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { Timer } from './Timer';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Timer', () => {
    const mockOnTimerEnd = vi.fn();

    beforeEach(() => {
        vi.useFakeTimers();
        mockOnTimerEnd.mockClear();
    });

    afterEach(() => {
        cleanup();
        vi.useRealTimers();
    });

    it('renders initial state', () => {
        render(<Timer onTimerEnd={mockOnTimerEnd} />);
        expect(screen.getByText('25:00')).toBeDefined();
        expect(screen.getByTitle('Start')).toBeDefined();
    });

    it('starts and counts down', () => {
        render(<Timer onTimerEnd={mockOnTimerEnd} />);
        const startBtn = screen.getByTitle('Start');
        fireEvent.click(startBtn);

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(screen.getByText('24:59')).toBeDefined();
    });

    it('calls onTimerEnd when time reaches 0', () => {
        render(<Timer onTimerEnd={mockOnTimerEnd} />);

        // Select 15m to be sure we are in a known state
        const btn15 = screen.getByText('15m');
        fireEvent.click(btn15);

        const startBtn = screen.getByTitle('Start');
        fireEvent.click(startBtn);

        act(() => {
            // Advance by 15 minutes + 1 second buffer
            vi.advanceTimersByTime(15 * 60 * 1000 + 1000);
        });

        expect(mockOnTimerEnd).toHaveBeenCalled();
        expect(screen.getByTitle('Start')).toBeDefined(); // Should reset to start (paused)
    });
});
