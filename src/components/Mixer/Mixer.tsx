import { Sound } from "./Sound";

export const Mixer = () => {
    return (
        <main className="w-[80%] grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 justify-items-center mx-auto gap-10">
            <Sound
                title="LO-FI"
                iconName="lofi"
                audioSrc="/assets/sounds/lofi.mp3"
            />

            <Sound
                title="Rain"
                iconName="rain"
                audioSrc="/assets/sounds/rain.ogg"
            />

            <Sound
                title="Coffee Shop"
                iconName="coffee"
                audioSrc="/assets/sounds/coffee-shop.mp3"
            />

            <Sound
                title="Piano"
                iconName="piano"
                audioSrc="/assets/sounds/piano.wav"
            />

            <Sound
                title="Shonobi"
                iconName="fire"
                audioSrc="/assets/sounds/shinobi-theme.mp3"
            />

            <Sound
                title="War"
                iconName="sword"
                audioSrc="/assets/sounds/war.mp3"
            />
        </main>
    );
}