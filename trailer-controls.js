(() => {
    const initialize = () => {
        const player = document.querySelector("[data-trailer-player]");

        if (!player) {
            return;
        }

        const iframe = player.querySelector("iframe");
        const playButton = player.querySelector("[data-trailer-play]");
        const soundButton = player.querySelector("[data-trailer-sound]");
        const soundLabel = player.querySelector("[data-trailer-sound-label]");
        const fullscreenButton = player.querySelector("[data-trailer-fullscreen]");

        let isPlaying = true;
        let isMuted = true;
        let revealTimer;

        const copy = {
            en: {
                play: "Play trailer",
                pause: "Pause trailer",
                soundOn: "Turn sound on",
                soundOff: "Mute trailer",
                sound: "Sound",
                mute: "Mute",
                fullscreen: "Open trailer fullscreen"
            },
            ru: {
                play: "Воспроизвести трейлер",
                pause: "Приостановить трейлер",
                soundOn: "Включить звук",
                soundOff: "Выключить звук",
                sound: "Звук",
                mute: "Без звука",
                fullscreen: "Развернуть трейлер на весь экран"
            }
        };

        const getLanguage = () =>
            document.documentElement.dataset.language === "ru" ? "ru" : "en";

        const command = (name, args = []) => {
            iframe.contentWindow?.postMessage(
                JSON.stringify({
                    event: "command",
                    func: name,
                    args
                }),
                "https://www.youtube-nocookie.com"
            );
        };

        const revealVideo = () => {
            window.clearTimeout(revealTimer);
            revealTimer = window.setTimeout(() => {
                player.classList.add("is-video-visible");
            }, 3400);
        };

        const localize = () => {
            const text = copy[getLanguage()];

            playButton.setAttribute(
                "aria-label",
                isPlaying ? text.pause : text.play
            );
            soundButton.setAttribute(
                "aria-label",
                isMuted ? text.soundOn : text.soundOff
            );
            soundButton.setAttribute("aria-pressed", String(!isMuted));
            soundLabel.textContent = isMuted ? text.sound : text.mute;
            fullscreenButton.setAttribute("aria-label", text.fullscreen);
        };

        playButton.addEventListener("click", () => {
            isPlaying = !isPlaying;
            command(isPlaying ? "playVideo" : "pauseVideo");
            playButton.classList.toggle("is-paused", !isPlaying);
            localize();
        });

        soundButton.addEventListener("click", () => {
            isMuted = !isMuted;
            command(isMuted ? "mute" : "unMute");

            if (!isMuted) {
                command("setVolume", [100]);
            }

            localize();
        });

        fullscreenButton.addEventListener("click", async () => {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
                return;
            }

            await player.requestFullscreen?.();
        });

        iframe.addEventListener("load", () => {
            command("mute");
            command("playVideo");
            revealVideo();
        });

        revealTimer = window.setTimeout(() => {
            player.classList.add("is-video-visible");
        }, 4600);

        const languageObserver = new MutationObserver(localize);
        languageObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-language", "lang"]
        });

        localize();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, {
            once: true
        });
    } else {
        initialize();
    }
})();

