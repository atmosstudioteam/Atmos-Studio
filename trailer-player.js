(() => {
    const videoId = "n9GIwWhQDW4";
    const playerTargetId = "conflux-trailer-player";
    const root = document.querySelector(".build-trailer");
    const target = document.getElementById(playerTargetId);

    if (!root || !target) {
        return;
    }

    const playButton = root.querySelector(".trailer-play-toggle");
    const soundButton = root.querySelector(".trailer-sound-toggle");
    const fullscreenButton = root.querySelector(".trailer-fullscreen-toggle");
    const progress = root.querySelector(".trailer-progress");
    const time = root.querySelector(".trailer-time");

    let player = null;
    let progressTimer = null;
    let controlsTimer = null;
    let isSeeking = false;

    const languageCopy = {
        en: {
            controls: "Conflux trailer controls",
            pause: "Pause trailer",
            play: "Play trailer",
            soundOn: "Turn on sound",
            soundOff: "Mute trailer",
            progress: "Trailer playback position",
            channel: "Open the Atmos Studio YouTube channel",
            fullscreen: "Open trailer in full screen",
            exitFullscreen: "Exit full screen"
        },
        ru: {
            controls: "Управление трейлером Conflux",
            pause: "Поставить трейлер на паузу",
            play: "Продолжить воспроизведение трейлера",
            soundOn: "Включить звук",
            soundOff: "Выключить звук",
            progress: "Позиция воспроизведения трейлера",
            channel: "Открыть YouTube-канал Atmos Studio",
            fullscreen: "Развернуть трейлер на весь экран",
            exitFullscreen: "Выйти из полноэкранного режима"
        }
    };

    const getLanguage = () =>
        document.documentElement.dataset.language === "ru" ? "ru" : "en";

    const formatTime = (seconds) => {
        const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
        const minutes = Math.floor(safeSeconds / 60);
        const remainder = Math.floor(safeSeconds % 60);

        return `${minutes}:${String(remainder).padStart(2, "0")}`;
    };

    const updateLabels = () => {
        const copy = languageCopy[getLanguage()];
        const isPlaying = playButton.classList.contains("is-playing");
        const isMuted = soundButton.classList.contains("is-muted");
        const isFullscreen = document.fullscreenElement === root;

        root.querySelector(".trailer-controls")?.setAttribute(
            "aria-label",
            copy.controls
        );
        playButton.setAttribute("aria-label", isPlaying ? copy.pause : copy.play);
        playButton.title = isPlaying ? copy.pause : copy.play;
        soundButton.setAttribute(
            "aria-label",
            isMuted ? copy.soundOn : copy.soundOff
        );
        soundButton.title = isMuted ? copy.soundOn : copy.soundOff;
        progress.setAttribute("aria-label", copy.progress);
        root.querySelector(".trailer-channel-link")?.setAttribute(
            "aria-label",
            copy.channel
        );
        fullscreenButton.setAttribute(
            "aria-label",
            isFullscreen ? copy.exitFullscreen : copy.fullscreen
        );
        fullscreenButton.title = isFullscreen
            ? copy.exitFullscreen
            : copy.fullscreen;
    };

    const syncProgress = () => {
        if (!player || typeof player.getDuration !== "function") {
            return;
        }

        const duration = player.getDuration() || 0;
        const current = player.getCurrentTime() || 0;

        if (!isSeeking) {
            const percent = duration > 0 ? (current / duration) * 100 : 0;
            progress.value = String(percent);
            progress.style.setProperty("--trailer-progress", `${percent}%`);
        }

        time.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
    };

    const syncPlayerState = (state) => {
        const isPlaying = state === window.YT.PlayerState.PLAYING;

        playButton.classList.toggle("is-playing", isPlaying);
        updateLabels();

        if (isPlaying && !progressTimer) {
            progressTimer = window.setInterval(syncProgress, 250);
        } else if (!isPlaying && progressTimer) {
            window.clearInterval(progressTimer);
            progressTimer = null;
            syncProgress();
        }
    };

    const revealControlsOnTouch = () => {
        if (window.matchMedia("(hover: hover)").matches) {
            return;
        }

        root.classList.add("is-controls-visible");
        window.clearTimeout(controlsTimer);
        controlsTimer = window.setTimeout(() => {
            root.classList.remove("is-controls-visible");
        }, 3500);
    };

    const onPlayerReady = (event) => {
        player = event.target;
        player.mute();
        player.playVideo();
        soundButton.classList.add("is-muted");
        syncProgress();
        updateLabels();
    };

    const createPlayer = () => {
        if (player || !window.YT?.Player) {
            return;
        }

        const playerVars = {
            autoplay: 1,
            mute: 1,
            playsinline: 1,
            controls: 0,
            disablekb: 0,
            rel: 0,
            loop: 1,
            playlist: videoId,
            iv_load_policy: 3
        };

        if (window.location.origin && window.location.origin !== "null") {
            playerVars.origin = window.location.origin;
        }

        player = new window.YT.Player(playerTargetId, {
            host: "https://www.youtube-nocookie.com",
            videoId,
            playerVars,
            events: {
                onReady: onPlayerReady,
                onStateChange: (event) => syncPlayerState(event.data)
            }
        });
    };

    playButton.addEventListener("click", () => {
        if (!player) {
            return;
        }

        const state = player.getPlayerState();

        if (state === window.YT.PlayerState.PLAYING) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });

    soundButton.addEventListener("click", () => {
        if (!player) {
            return;
        }

        if (player.isMuted()) {
            player.unMute();
            soundButton.classList.remove("is-muted");
        } else {
            player.mute();
            soundButton.classList.add("is-muted");
        }

        updateLabels();
    });

    progress.addEventListener("input", () => {
        isSeeking = true;
        progress.style.setProperty("--trailer-progress", `${progress.value}%`);

        if (player) {
            const duration = player.getDuration() || 0;
            const previewTime = duration * (Number(progress.value) / 100);
            time.textContent = `${formatTime(previewTime)} / ${formatTime(duration)}`;
        }
    });

    progress.addEventListener("change", () => {
        if (player) {
            const duration = player.getDuration() || 0;
            player.seekTo(duration * (Number(progress.value) / 100), true);
        }

        isSeeking = false;
        syncProgress();
    });

    fullscreenButton.addEventListener("click", async () => {
        try {
            if (document.fullscreenElement === root) {
                await document.exitFullscreen();
            } else {
                await root.requestFullscreen();
            }
        } catch {
            // Fullscreen can be unavailable in restrictive embedded browsers.
        }
    });

    document.addEventListener("fullscreenchange", updateLabels);
    root.addEventListener("pointerdown", revealControlsOnTouch);

    new MutationObserver(updateLabels).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-language"]
    });

    const previousReadyHandler = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
        previousReadyHandler?.();
        createPlayer();
    };

    if (window.YT?.Player) {
        createPlayer();
    } else if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const apiScript = document.createElement("script");
        apiScript.src = "https://www.youtube.com/iframe_api";
        apiScript.async = true;
        document.head.append(apiScript);
    }

    updateLabels();
})();

