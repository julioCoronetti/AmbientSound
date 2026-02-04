import { useState, useCallback } from "react";
import { Sound } from "./Sound";
import { XCircle } from "phosphor-react";
import { SOUNDS } from "../../data/sounds";
import { IconName } from "./iconMap";
import { PresetList } from "./PresetList";
import { Timer } from "./Timer";

export const Mixer = () => {
    const [volumes, setVolumes] = useState<Record<string, number>>(() => {
        const initialVolumes: Record<string, number> = {};
        SOUNDS.forEach(sound => {
            initialVolumes[sound.id] = 0;
        });
        return initialVolumes;
    });

    const handleVolumeChange = useCallback((id: string, newVolume: number) => {
        setVolumes(prev => ({
            ...prev,
            [id]: newVolume
        }));
    }, []);

    const handleStopAll = () => {
        const newVolumes: Record<string, number> = {};
        SOUNDS.forEach(sound => {
            newVolumes[sound.id] = 0;
        });
        setVolumes(newVolumes);
    };

    const handleLoadPreset = (newVolumes: Record<string, number>) => {
        setVolumes(newVolumes);
    };

    const isAnySoundPlaying = Object.values(volumes).some(volume => volume > 0);

    return (
        <div className="flex flex-col items-center gap-10 relative pb-20">
            <div className="flex flex-wrap justify-center gap-6 w-full px-4">
                <PresetList currentVolumes={volumes} onLoadPreset={handleLoadPreset} />
                <Timer onTimerEnd={handleStopAll} />
            </div>
            <button
                onClick={handleStopAll}
                className={`fixed bottom-10 right-10 z-50 px-6 py-3 bg-[#A3FF8C] hover:bg-[#8ee07a] text-black font-bold rounded-full transition-all duration-300 ease-in-out text-xl shadow-lg cursor-pointer flex items-center gap-2 ${isAnySoundPlaying ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-12 pointer-events-none'}`}
            >
                <XCircle size={32} />
                Stop All
            </button>
            <main className="w-[80%] grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 justify-items-center mx-auto gap-10">
                {SOUNDS.map(sound => (
                    <Sound
                        key={sound.id}
                        id={sound.id}
                        title={sound.title}
                        iconName={sound.iconName as IconName}
                        audioSrc={sound.audioSrc}
                        volume={volumes[sound.id]}
                        onVolumeChange={handleVolumeChange}
                    />
                ))}
            </main>
        </div>
    );
}
