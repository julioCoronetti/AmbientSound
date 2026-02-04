// @vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { PresetList } from './PresetList';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('PresetList', () => {
    const mockOnLoadPreset = vi.fn();
    const currentVolumes = { lofi: 0.5, rain: 0.2 };

    beforeEach(() => {
        localStorage.clear();
        mockOnLoadPreset.mockClear();
    });

    afterEach(() => {
        cleanup();
    });

    it('renders correctly', () => {
        render(<PresetList currentVolumes={currentVolumes} onLoadPreset={mockOnLoadPreset} />);
        expect(screen.getByPlaceholderText('New Mix Name')).toBeDefined();
        expect(screen.getByTitle('Save Mix')).toBeDefined();
    });

    it('saves a preset to localStorage', () => {
        render(<PresetList currentVolumes={currentVolumes} onLoadPreset={mockOnLoadPreset} />);

        const input = screen.getByPlaceholderText('New Mix Name');
        fireEvent.change(input, { target: { value: 'My Mix' } });

        const saveBtn = screen.getByTitle('Save Mix');
        fireEvent.click(saveBtn);

        expect(screen.getByText('My Mix')).toBeDefined();

        const stored = JSON.parse(localStorage.getItem('ambient_sound_presets') || '[]');
        expect(stored).toHaveLength(1);
        expect(stored[0].name).toBe('My Mix');
        expect(stored[0].volumes).toEqual(currentVolumes);
    });

    it('loads a preset', () => {
        const presets = [{ name: 'Test Mix', volumes: { lofi: 0.8 } }];
        localStorage.setItem('ambient_sound_presets', JSON.stringify(presets));

        render(<PresetList currentVolumes={currentVolumes} onLoadPreset={mockOnLoadPreset} />);

        const loadBtn = screen.getByTitle('Load Mix');
        fireEvent.click(loadBtn);

        expect(mockOnLoadPreset).toHaveBeenCalledWith({ lofi: 0.8 });
    });

    it('deletes a preset', () => {
         const presets = [{ name: 'To Delete', volumes: {} }];
        localStorage.setItem('ambient_sound_presets', JSON.stringify(presets));

        render(<PresetList currentVolumes={currentVolumes} onLoadPreset={mockOnLoadPreset} />);

        expect(screen.getByText('To Delete')).toBeDefined();

        const deleteBtn = screen.getByTitle('Delete Mix');
        fireEvent.click(deleteBtn);

        expect(screen.queryByText('To Delete')).toBeNull();
        expect(JSON.parse(localStorage.getItem('ambient_sound_presets') || '[]')).toHaveLength(0);
    });
});
