import { MusicNote, CloudRain, Coffee } from "phosphor-react";
import { useRef, useState } from "react";

const icons = {
    lofi: MusicNote,
    rain: CloudRain,
    coffee: Coffee,
};

interface SoundProps {
    iconName: keyof typeof icons;
    audioSrc: string;
    title: string;
}

export const Sound = ({ iconName, audioSrc, title }: SoundProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState(0.0);

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
            if (newVolume > 0 && audioRef.current.paused) {
                audioRef.current.play();
            }
        }
    };

    const IconComponent = icons[iconName];

    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="w-80 h-45 flex items-center border-4 border-white rounded-3xl">
                <div className="rotate-270">
                    <audio ref={audioRef} loop>
                        <source src={audioSrc} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>
                <div className="w-35 h-35 flex justify-center items-center rounded-full border-4 border-white">
                    {IconComponent && <IconComponent size={100} />}
                </div>
            </div>
            <p className="text-2xl italic">{title}</p>
        </div>
    )
}