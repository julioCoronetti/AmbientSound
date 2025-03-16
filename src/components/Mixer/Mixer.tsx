import { Sound } from "./Sound";

export const Mixer = () => {
    return (
        <main className="w-[80%] grid grid-cols-3 justify-items-center mx-auto">
            <Sound
                title="LO-FI"
                iconName="lofi"
                audioSrc="/src/assets/sounds/lofi.mp3"
            />

            <Sound
                title="Rain"
                iconName="rain"
                audioSrc="/src/assets/sounds/rain.ogg"
            />

            <Sound
                title="Coffee Shop"
                iconName="coffee"
                audioSrc="/src/assets/sounds/coffee-shop.mp3"
            />
        </main>
    );
}