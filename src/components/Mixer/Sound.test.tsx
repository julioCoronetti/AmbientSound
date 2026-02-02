import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Sound } from './Sound';

describe('Sound Component', () => {
    let playSpy: ReturnType<typeof vi.spyOn>;
    let pauseSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        let isPaused = true;

        // Mock HTMLAudioElement prototype
        playSpy = vi.spyOn(window.HTMLAudioElement.prototype, 'play').mockImplementation(async () => {
            isPaused = false;
        });
        pauseSpy = vi.spyOn(window.HTMLAudioElement.prototype, 'pause').mockImplementation(() => {
            isPaused = true;
        });

        // Mock the paused property getter
        Object.defineProperty(window.HTMLAudioElement.prototype, 'paused', {
            get() {
                return isPaused;
            },
            configurable: true
        });
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('pauses audio when volume is set to 0 (optimized)', () => {
        const { rerender } = render(
            <Sound
                id="rain"
                iconName="rain"
                audioSrc="test.mp3"
                title="Rain"
                volume={0.5}
                onVolumeChange={() => {}}
            />
        );

        // Should play when volume > 0
        expect(playSpy).toHaveBeenCalled();

        playSpy.mockClear();
        pauseSpy.mockClear();

        // Update to volume 0
        rerender(
            <Sound
                id="rain"
                iconName="rain"
                audioSrc="test.mp3"
                title="Rain"
                volume={0}
                onVolumeChange={() => {}}
            />
        );

        // New behavior: pause IS called
        expect(pauseSpy).toHaveBeenCalled();
    });

    it('plays audio when volume changes from 0 to >0', () => {
        const { rerender } = render(
            <Sound
                id="rain"
                iconName="rain"
                audioSrc="test.mp3"
                title="Rain"
                volume={0}
                onVolumeChange={() => {}}
            />
        );

        // Initial state: volume 0. Should check pause if it was playing, but here it starts at 0.
        // It won't call pause because it's initial render and likely not playing?
        // Actually useEffect runs after render.
        // If it starts paused (default), and volume is 0, nothing happens.

        playSpy.mockClear();
        pauseSpy.mockClear();

        // Update to volume 0.5
        rerender(
            <Sound
                id="rain"
                iconName="rain"
                audioSrc="test.mp3"
                title="Rain"
                volume={0.5}
                onVolumeChange={() => {}}
            />
        );

        expect(playSpy).toHaveBeenCalled();
    });
});
