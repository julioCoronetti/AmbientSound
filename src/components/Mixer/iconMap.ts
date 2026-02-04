import { MusicNote, CloudRain, Coffee, PianoKeys, Fire, Sword } from "phosphor-react";

export const iconMap = {
    lofi: MusicNote,
    rain: CloudRain,
    coffee: Coffee,
    piano: PianoKeys,
    fire: Fire,
    sword: Sword,
};

export type IconName = keyof typeof iconMap;
