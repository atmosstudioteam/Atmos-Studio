(() => {
    const copy = {
        en: {
            label: "Modpack contents",
            title: "Conflux Mods",
            description:
                "The current Conflux mod list is grouped by category. Additional mods may be added as development continues.",
            categories: [
                {
                    title: "World Enhancement",
                    items: [
                        "Alex's Caves",
                        "Alex's Mobs",
                        "Arts & Crafts",
                        "Atmospheric",
                        "Autumnity",
                        "Caverns & Chasms",
                        "Environmental",
                        "Farmer's Delight",
                        "Naturalist",
                        "Terralith",
                        "Upgrade Aquatic"
                    ]
                },
                {
                    title: "Technologies",
                    items: [
                        "Applied Energistics 2",
                        "Modern Industrialization"
                    ]
                },
                {
                    title: "Magic",
                    items: ["Malum", "Spectrum"]
                }
            ],
            confirm: "Got it",
            closeAction: "Close",
            close: "Close mod list"
        },
        ru: {
            label: "Состав сборки",
            title: "Моды Conflux",
            description:
                "Текущий список модов Conflux распределён по категориям. По мере разработки сборка может пополняться.",
            categories: [
                {
                    title: "Улучшение мира",
                    items: [
                        "Alex's Caves",
                        "Alex's Mobs",
                        "Arts & Crafts",
                        "Atmospheric",
                        "Autumnity",
                        "Caverns & Chasms",
                        "Environmental",
                        "Farmer's Delight",
                        "Naturalist",
                        "Terralith",
                        "Upgrade Aquatic"
                    ]
                },
                {
                    title: "Технологии",
                    items: [
                        "Applied Energistics 2",
                        "Modern Industrialization"
                    ]
                },
                {
                    title: "Магия",
                    items: ["Malum", "Spectrum"]
                }
            ],
            confirm: "Понятно",
            closeAction: "Закрыть",
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

                <div
                    class="mods-dialog-categories"
                    data-mods-categories
                ></div>

                <div class="mods-dialog-actions">
                    <button
                        class="mods-dialog-secondary"
                        type="button"
                        data-mods-copy="closeAction"
                    ></button>

                    <button
                        class="mods-dialog-confirm"
                        type="button"
                        data-mods-copy="confirm"
                    ></button>
                </div>
            </section>
        `;

        const closeButton = root.querySelector(".mods-dialog-close");
        const secondaryButton = root.querySelector(
            ".mods-dialog-secondary"
        );
        const confirmButton = root.querySelector(".mods-dialog-confirm");
        const categories = root.querySelector("[data-mods-categories]");
        let activeTrigger = null;

        const localize = () => {
            const localizedCopy = copy[getLanguage()];

            root.querySelectorAll("[data-mods-copy]").forEach((element) => {
                const key = element.dataset.modsCopy;
                element.textContent = localizedCopy[key];
            });

            categories.replaceChildren(
                ...localizedCopy.categories.map((category) => {
                    const card = document.createElement("section");
                    card.className = "mods-dialog-category";

                    const heading = document.createElement("h3");
                    heading.textContent = category.title;

                    const list = document.createElement("ul");
                    list.className = "mods-dialog-list";

                    list.replaceChildren(
                        ...category.items.map((item) => {
                            const listItem = document.createElement("li");
                            listItem.className = "mods-dialog-item";
                            listItem.textContent = item;
                            return listItem;
                        })
                    );

                    card.append(heading, list);
                    return card;
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
        secondaryButton.addEventListener("click", () => close());
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
                const focusable = [
                    closeButton,
                    secondaryButton,
                    confirmButton
                ];
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
