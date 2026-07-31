(() => {
    const news = {
        enabled: true,
        url: "https://www.youtube.com/watch?v=n9GIwWhQDW4",
        copy: {
            en: {
                toastKicker: "New teaser",
                toastTitle: "Conflux: the teaser is out",
                toastHint: "Open the news",
                openLabel: "Open news about the Conflux teaser",
                panelLabel: "Atmos Studio News",
                panelTitle: "The Conflux teaser is out",
                panelDescription:
                    "The first official teaser for the Conflux modpack is now available. Watch “WE WENT TOO DEEP” on the Atmos Studio YouTube channel.",
                action: "Watch the teaser",
                close: "Close news"
            },
            ru: {
                toastKicker: "Новый тизер",
                toastTitle: "Conflux: тизер уже вышел",
                toastHint: "Открыть новость",
                openLabel: "Открыть новость о тизере Conflux",
                panelLabel: "Новости Atmos Studio",
                panelTitle: "Вышел тизер сборки Conflux",
                panelDescription:
                    "Первый официальный тизер сборки Conflux уже опубликован. Смотрите «WE WENT TOO DEEP» на YouTube-канале Atmos Studio.",
                action: "Смотреть тизер",
                close: "Закрыть новости"
            }
        }
    };

    const getLanguage = () =>
        document.documentElement.dataset.language === "ru" ? "ru" : "en";

    const initialize = () => {
        if (!news.enabled || document.querySelector("#atmos-news-widget")) {
            return;
        }

        const root = document.createElement("aside");
        root.id = "atmos-news-widget";
        root.className = "news-widget";
        root.setAttribute("aria-live", "polite");

        root.innerHTML = `
            <button
                class="news-toast"
                type="button"
                aria-expanded="false"
                aria-controls="atmos-news-panel"
            >
                <span class="news-toast-icon" aria-hidden="true">N</span>

                <span class="news-toast-copy">
                    <span
                        class="news-toast-kicker"
                        data-news-copy="toastKicker"
                    ></span>
                    <span
                        class="news-toast-title"
                        data-news-copy="toastTitle"
                    ></span>
                    <span
                        class="news-toast-hint"
                        data-news-copy="toastHint"
                    ></span>
                </span>

                <span class="news-toast-chevron" aria-hidden="true"></span>
            </button>

            <section
                class="news-panel"
                id="atmos-news-panel"
                role="region"
                aria-hidden="true"
                aria-labelledby="atmos-news-title"
            >
                <div class="news-panel-header">
                    <span
                        class="news-panel-label"
                        data-news-copy="panelLabel"
                    ></span>

                    <button class="news-close" type="button">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>

                <div class="news-panel-visual" aria-hidden="true">
                    <span class="news-play-mark"></span>
                </div>

                <h2
                    class="news-panel-title"
                    id="atmos-news-title"
                    data-news-copy="panelTitle"
                ></h2>

                <p
                    class="news-panel-description"
                    data-news-copy="panelDescription"
                ></p>

                <a
                    class="news-action"
                    href="${news.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-news-copy="action"
                ></a>
            </section>
        `;

        const toast = root.querySelector(".news-toast");
        const panel = root.querySelector(".news-panel");
        const closeButton = root.querySelector(".news-close");

        const localize = () => {
            const localizedCopy = news.copy[getLanguage()];

            root.querySelectorAll("[data-news-copy]").forEach((element) => {
                const key = element.dataset.newsCopy;

                if (localizedCopy[key]) {
                    element.textContent = localizedCopy[key];
                }
            });

            toast.setAttribute("aria-label", localizedCopy.openLabel);
            closeButton.setAttribute("aria-label", localizedCopy.close);
        };

        const setOpen = (isOpen, returnFocus = false) => {
            root.classList.toggle("is-open", isOpen);
            toast.setAttribute("aria-expanded", String(isOpen));
            panel.setAttribute("aria-hidden", String(!isOpen));

            if (isOpen) {
                closeButton.focus();
            } else if (returnFocus) {
                toast.focus();
            }
        };

        toast.addEventListener("click", () => setOpen(true));
        closeButton.addEventListener("click", () => setOpen(false, true));

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && root.classList.contains("is-open")) {
                setOpen(false, true);
            }
        });

        document.addEventListener("click", (event) => {
            if (
                root.classList.contains("is-open") &&
                !root.contains(event.target)
            ) {
                setOpen(false);
            }
        });

        const languageObserver = new MutationObserver(localize);
        languageObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-language", "lang"]
        });

        localize();
        document.body.append(root);

        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                root.classList.add("is-ready");
            });
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, {
            once: true
        });
    } else {
        initialize();
    }
})();
