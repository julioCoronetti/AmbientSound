import { useState } from "react";
import { Sound } from "./Sound";

const SOUNDS = [
    { id: 'lofi', title: 'LO-FI', iconName: 'lofi', audioSrc: '/assets/sounds/lofi.mp3' },
    { id: 'rain', title: 'Rain', iconName: 'rain', audioSrc: '/assets/sounds/rain.ogg' },
    { id: 'coffee', title: 'Coffee Shop', iconName: 'coffee', audioSrc: '/assets/sounds/coffee-shop.mp3' },
    { id: 'piano', title: 'Piano', iconName: 'piano', audioSrc: '/assets/sounds/piano.wav' },
    { id: 'fire', title: 'Shonobi', iconName: 'fire', audioSrc: '/assets/sounds/shinobi-theme.mp3' },
    { id: 'sword', title: 'War', iconName: 'sword', audioSrc: '/assets/sounds/war.mp3' },
] as const;

export const Mixer = () => {
    const [volumes, setVolumes] = useState<Record<string, number>>(() => {
        const initialVolumes: Record<string, number> = {};
        SOUNDS.forEach(sound => {
            initialVolumes[sound.id] = 0;
        });
        return initialVolumes;
    });

    const handleVolumeChange = (id: string, newVolume: number) => {
        setVolumes(prev => ({
            ...prev,
            [id]: newVolume
        }));
    };

    const handleStopAll = () => {
        const newVolumes: Record<string, number> = {};
        SOUNDS.forEach(sound => {
            newVolumes[sound.id] = 0;
        });
        setVolumes(newVolumes);
    };

    return (
        <div className="flex flex-col items-center gap-10">
            <button
                onClick={handleStopAll}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors text-xl shadow-lg cursor-pointer"
            >
                Stop All
            </button>
            <main className="w-[80%] grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 justify-items-center mx-auto gap-10">
                {SOUNDS.map(sound => (
                    <Sound
                        key={sound.id}
                        title={sound.title}
                        iconName={sound.iconName}
                        audioSrc={sound.audioSrc}
                        volume={volumes[sound.id]}
                        onVolumeChange={(newVolume) => handleVolumeChange(sound.id, newVolume)}
                    />
                ))}
            </main>
        </div>
    );
}
