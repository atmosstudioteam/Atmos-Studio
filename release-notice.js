(() => {
    const copy = {
        en: {
            title: "Free download is not available yet",
            description:
                "Conflux has not yet been published for free download. The public version will become available on Modrinth and CurseForge one month after the official release.",
            confirm: "Got it",
            close: "Close notification"
        },
        ru: {
            title: "Бесплатная версия пока недоступна",
            description:
                "Сборка Conflux ещё не опубликована для бесплатного скачивания. Публичная версия появится на Modrinth и CurseForge через месяц после официального релиза.",
            confirm: "Понятно",
            close: "Закрыть уведомление"
        }
    };

    const getLanguage = () =>
        document.documentElement.dataset.language === "ru" ? "ru" : "en";

    const getDownloadUrl = (trigger) => {
        const value = trigger.dataset.downloadUrl?.trim();

        if (!value || value.startsWith("PASTE_")) {
            return null;
        }

        try {
            const url = new URL(value, window.location.href);

            return ["https:", "http:"].includes(url.protocol)
                ? url.href
                : null;
        } catch {
            return null;
        }
    };

    const initialize = () => {
        const triggers = document.querySelectorAll(
            ".download-button[data-release-notice]"
        );

        if (!triggers.length || document.querySelector("#release-notice")) {
            return;
        }

        const root = document.createElement("div");
        root.className = "release-notice";
        root.id = "release-notice";
        root.setAttribute("aria-hidden", "true");

        root.innerHTML = `
            <section
                class="release-notice-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="release-notice-title"
                aria-describedby="release-notice-description"
            >
                <button class="release-notice-close" type="button">
                    <span aria-hidden="true">×</span>
                </button>

                <div class="release-notice-visual" aria-hidden="true">
                    <span class="release-notice-orbit"></span>
                    <span class="release-notice-clock"></span>
                </div>

                <span
                    class="release-notice-platform"
                    data-release-platform
                ></span>

                <h2
                    class="release-notice-title"
                    id="release-notice-title"
                    data-release-copy="title"
                ></h2>

                <p
                    class="release-notice-description"
                    id="release-notice-description"
                    data-release-copy="description"
                ></p>

                <button
                    class="release-notice-confirm"
                    type="button"
                    data-release-copy="confirm"
                ></button>
            </section>
        `;

        const closeButton = root.querySelector(".release-notice-close");
        const confirmButton = root.querySelector(".release-notice-confirm");
        const platformLabel = root.querySelector("[data-release-platform]");
        let activeTrigger = null;

        const localize = () => {
            const localizedCopy = copy[getLanguage()];

            root.querySelectorAll("[data-release-copy]").forEach((element) => {
                const key = element.dataset.releaseCopy;
                element.textContent = localizedCopy[key];
            });

            closeButton.setAttribute("aria-label", localizedCopy.close);
        };

        const close = (restoreFocus = true) => {
            root.classList.remove("is-open");
            root.setAttribute("aria-hidden", "true");

            if (restoreFocus) {
                activeTrigger?.focus();
            }
        };

        const open = (trigger) => {
            activeTrigger = trigger;
            platformLabel.textContent = trigger.dataset.releasePlatform;
            root.classList.add("is-open");
            root.setAttribute("aria-hidden", "false");
            closeButton.focus();
        };

        document.addEventListener("click", (event) => {
            const trigger = event.target.closest(
                ".download-button[data-release-notice]"
            );

            if (!trigger) {
                return;
            }

            const downloadUrl = getDownloadUrl(trigger);

            if (downloadUrl) {
                window.open(
                    downloadUrl,
                    "_blank",
                    "noopener,noreferrer"
                );
                return;
            }

            open(trigger);
        }, true);

        closeButton.addEventListener("click", () => close());
        confirmButton.addEventListener("click", () => close());

        root.addEventListener("click", (event) => {
            if (event.target === root) {
                close();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (!root.classList.contains("is-open")) {
                return;
            }

            if (event.key === "Escape") {
                close();
                return;
            }

            if (event.key === "Tab") {
                const focusable = [closeButton, confirmButton];
                const currentIndex = focusable.indexOf(document.activeElement);
                const nextIndex = event.shiftKey
                    ? (currentIndex - 1 + focusable.length) % focusable.length
                    : (currentIndex + 1) % focusable.length;

                event.preventDefault();
                focusable[nextIndex].focus();
            }
        });

        const languageObserver = new MutationObserver(localize);
        languageObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-language", "lang"]
        });

        localize();
        document.body.append(root);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, {
            once: true
        });
    } else {
        initialize();
    }
})();

