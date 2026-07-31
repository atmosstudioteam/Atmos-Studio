(() => {
    const copy = {
        en: {
            label: "Modpack contents",
            title: "Conflux Mods",
            description:
                "The complete mod list is still being prepared. This temporary list will be replaced when the final modpack lineup is ready.",
            items: [
                "Technology mod — details will be added later",
                "Magic mod — details will be added later",
                "Exploration mod — details will be added later",
                "Additional mod — details will be added later"
            ],
            confirm: "Close",
            close: "Close mod list"
        },
        ru: {
            label: "Состав сборки",
            title: "Моды Conflux",
            description:
                "Полный список модов ещё готовится. Этот временный перечень будет заменён, когда окончательный состав сборки будет готов.",
            items: [
                "Технологический мод — подробности появятся позже",
                "Магический мод — подробности появятся позже",
                "Исследовательский мод — подробности появятся позже",
                "Дополнительный мод — подробности появятся позже"
            ],
            confirm: "Закрыть",
            close: "Закрыть список модов"
        }
    };

    const getLanguage = () =>
        document.documentElement.dataset.language === "ru" ? "ru" : "en";

    const initialize = () => {
        const triggers = document.querySelectorAll("[data-mods-dialog-open]");

        if (!triggers.length || document.querySelector("#mods-dialog")) {
            return;
        }

        const root = document.createElement("div");
        root.className = "mods-dialog";
        root.id = "mods-dialog";
        root.setAttribute("aria-hidden", "true");

        root.innerHTML = `
            <section
                class="mods-dialog-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mods-dialog-title"
                aria-describedby="mods-dialog-description"
            >
                <button class="mods-dialog-close" type="button">
                    <span aria-hidden="true">×</span>
                </button>

                <span
                    class="mods-dialog-label"
                    data-mods-copy="label"
                ></span>

                <h2
                    class="mods-dialog-title"
                    id="mods-dialog-title"
                    data-mods-copy="title"
                ></h2>

                <p
                    class="mods-dialog-description"
                    id="mods-dialog-description"
                    data-mods-copy="description"
                ></p>

                <ul class="mods-dialog-list" data-mods-list></ul>

                <button
                    class="mods-dialog-confirm"
                    type="button"
                    data-mods-copy="confirm"
                ></button>
            </section>
        `;

        const closeButton = root.querySelector(".mods-dialog-close");
        const confirmButton = root.querySelector(".mods-dialog-confirm");
        const list = root.querySelector("[data-mods-list]");
        let activeTrigger = null;

        const localize = () => {
            const localizedCopy = copy[getLanguage()];

            root.querySelectorAll("[data-mods-copy]").forEach((element) => {
                const key = element.dataset.modsCopy;
                element.textContent = localizedCopy[key];
            });

            list.replaceChildren(
                ...localizedCopy.items.map((item) => {
                    const listItem = document.createElement("li");
                    listItem.className = "mods-dialog-item";
                    listItem.textContent = item;
                    return listItem;
                })
            );

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
            root.classList.add("is-open");
            root.setAttribute("aria-hidden", "false");
            closeButton.focus();
        };

        triggers.forEach((trigger) => {
            trigger.addEventListener("click", () => open(trigger));
        });

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
                const currentIndex = focusable.indexOf(
                    document.activeElement
                );
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
