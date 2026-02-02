// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Mixer } from './Mixer';

// Global mock tracker
const renderTracker = vi.fn();

vi.mock('./Sound', async () => {
    const React = await import('react');
    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Sound: React.memo((props: any) => {
            renderTracker(props.title); // Track which sound rendered
            return (
                <div data-testid={`sound-${props.iconName}`}>
                    <input
                        data-testid={`input-${props.iconName}`}
                        type="range"
                        value={props.volume}
                        onChange={(e) => {
                            // Optimized version expects (id, volume)
                            if (props.id) {
                                props.onVolumeChange(props.id, parseFloat(e.target.value));
                            } else {
                                // Fallback for unoptimized if needed (but we are testing optimized now)
                                props.onVolumeChange(parseFloat(e.target.value));
                            }
                        }}
                    />
                </div>
            );
        })
    };
});

describe('Mixer Performance', () => {
    afterEach(() => {
        renderTracker.mockClear();
    });

    it('measures re-renders on volume change', () => {
        render(<Mixer />);

        // Initial render: 6 sounds
        expect(renderTracker).toHaveBeenCalledTimes(6);
        renderTracker.mockClear();

        // Change volume of 'rain' (iconName: 'rain')
        const rainInput = screen.getByTestId('input-rain');
        fireEvent.change(rainInput, { target: { value: '0.5' } });

        // In OPTIMIZED version:
        // Expected: 1 re-render (only the one that changed).
        console.log('Renders after update:', renderTracker.mock.calls.length);

        expect(renderTracker).toHaveBeenCalledTimes(1);
        expect(renderTracker).toHaveBeenCalledWith('Rain');
    });
});
