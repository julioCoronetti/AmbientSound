import { useState, useEffect } from 'react';
import { FloppyDisk, Play, Trash } from 'phosphor-react';

interface Preset {
  name: string;
  volumes: Record<string, number>;
}

interface PresetListProps {
  currentVolumes: Record<string, number>;
  onLoadPreset: (volumes: Record<string, number>) => void;
}

export const PresetList = ({ currentVolumes, onLoadPreset }: PresetListProps) => {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [newPresetName, setNewPresetName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('ambient_sound_presets');
    if (saved) {
      try {
        setPresets(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse presets", e);
      }
    }
  }, []);

  const savePreset = () => {
    if (!newPresetName.trim()) return;
    const newPreset = { name: newPresetName, volumes: { ...currentVolumes } };
    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    localStorage.setItem('ambient_sound_presets', JSON.stringify(updatedPresets));
    setNewPresetName('');
  };

  const deletePreset = (index: number) => {
    const updatedPresets = presets.filter((_, i) => i !== index);
    setPresets(updatedPresets);
    localStorage.setItem('ambient_sound_presets', JSON.stringify(updatedPresets));
  };

  return (
    <div className="flex flex-col gap-4 p-6 border-2 border-[#A3FF8C] rounded-2xl w-full max-w-lg bg-black/20 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-[#A3FF8C]">Mixes</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={newPresetName}
          onChange={(e) => setNewPresetName(e.target.value)}
          placeholder="New Mix Name"
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[#A3FF8C] text-white"
        />
        <button
          onClick={savePreset}
          disabled={!newPresetName.trim()}
          className="p-2 bg-[#A3FF8C] text-black rounded-lg disabled:opacity-50 hover:bg-[#8ee07a] transition-colors cursor-pointer"
          title="Save Mix"
        >
          <FloppyDisk size={24} />
        </button>
      </div>

      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto custom-scrollbar">
        {presets.length === 0 && (
          <p className="text-white/50 italic text-center">No saved mixes yet.</p>
        )}
        {presets.map((preset, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <span className="font-medium text-lg truncate flex-1">{preset.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => onLoadPreset(preset.volumes)}
                className="p-2 text-[#A3FF8C] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                title="Load Mix"
              >
                <Play size={20} weight="fill" />
              </button>
              <button
                onClick={() => deletePreset(index)}
                className="p-2 text-red-400 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                title="Delete Mix"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
