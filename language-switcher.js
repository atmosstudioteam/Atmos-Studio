(() => {
    const storageKey = "atmos-language";
    const supportedLanguages = new Set(["en", "ru"]);

    const getInitialLanguage = () => {
        const queryLanguage = new URLSearchParams(window.location.search).get("lang");

        if (supportedLanguages.has(queryLanguage)) {
            return queryLanguage;
        }

        if (window.location.hash === "#russian") {
            return "ru";
        }

        if (window.location.hash === "#english") {
            return "en";
        }

        try {
            const savedLanguage = window.localStorage.getItem(storageKey);

            if (supportedLanguages.has(savedLanguage)) {
                return savedLanguage;
            }
        } catch {
            // Local storage may be unavailable in privacy-focused browsers.
        }

        return window.navigator.language.toLowerCase().startsWith("ru")
            ? "ru"
            : "en";
    };

    let currentLanguage = getInitialLanguage();

    document.documentElement.dataset.language = currentLanguage;
    document.documentElement.lang = currentLanguage;

    const copy = {
        en: {
            navigation: {
                "index.html": "Home",
                "builds.html": "Builds",
                "privacy-policy.html": "Privacy Policy",
                "terms-of-use.html": "Terms of Use"
            },
            switcherLabel: "Choose page language",
            englishButton: "Switch to English",
            russianButton: "Switch to Russian"
        },
        ru: {
            navigation: {
                "index.html": "Главная",
                "builds.html": "Сборки",
                "privacy-policy.html": "Конфиденциальность",
                "terms-of-use.html": "Условия"
            },
            switcherLabel: "Выбор языка страницы",
            englishButton: "Переключить на английский",
            russianButton: "Переключить на русский"
        }
    };

    const pageCopy = {
        "privacy-policy.html": {
            en: {
                title: "Global Privacy Policy",
                description:
                    "This Policy explains how Atmos Studio processes information across its Discord applications, Minecraft products, support services, websites, and publications distributed through Boosty, Modrinth, CurseForge, and other platforms.",
                metadata: [
                    "Effective: July 30, 2026",
                    "Last updated: July 31, 2026",
                    "English and Russian"
                ],
                notice:
                    "<strong>Important:</strong> product-specific notices or terms may supplement this Policy. Where a product-specific privacy notice conflicts with this document, the product-specific notice takes priority for that product.",
                footer:
                    "This page contains the current version of the Atmos Studio Global Privacy Policy."
            },
            ru: {
                title: "Глобальная политика конфиденциальности",
                description:
                    "Эта Политика объясняет, как Atmos Studio обрабатывает информацию в Discord-приложениях, продуктах Minecraft, службах поддержки, на сайтах и в публикациях, распространяемых через Boosty, Modrinth, CurseForge и другие платформы.",
                metadata: [
                    "Действует с: 30 июля 2026 г.",
                    "Последнее обновление: 31 июля 2026 г.",
                    "Английский и русский"
                ],
                notice:
                    "<strong>Важно:</strong> эту Политику могут дополнять уведомления или условия для отдельных продуктов. Если специальное уведомление о конфиденциальности противоречит этому документу, для соответствующего продукта применяется специальное уведомление.",
                footer:
                    "На этой странице опубликована текущая версия Глобальной политики конфиденциальности Atmos Studio."
            }
        },
        "terms-of-use.html": {
            en: {
                title: "Terms of Use",
                description:
                    "These Terms govern access to and use of Atmos Studio Products, including Discord applications, Minecraft modpacks, Boosty subscription releases, public Builds, websites, downloads, and technical support services.",
                metadata: [
                    "Effective: July 30, 2026",
                    "Last updated: July 31, 2026",
                    "Version 1.0",
                    "English and Russian"
                ],
                notice:
                    "<strong>Important:</strong> these Terms apply together with the rules of the platform through which a Product is accessed or distributed. Platform rules, third-party licenses, and mandatory consumer law may take priority where legally required.",
                footer:
                    "This page contains the current version of the Atmos Studio Terms of Use."
            },
            ru: {
                title: "Условия использования",
                description:
                    "Настоящие Условия регулируют доступ к продуктам Atmos Studio и их использование, включая Discord-приложения, сборки Minecraft, выпуски по подписке Boosty, публичные сборки, сайты, загрузки и техническую поддержку.",
                metadata: [
                    "Действуют с: 30 июля 2026 г.",
                    "Последнее обновление: 31 июля 2026 г.",
                    "Версия 1.0",
                    "Английский и русский"
                ],
                notice:
                    "<strong>Важно:</strong> настоящие Условия применяются вместе с правилами платформы, через которую предоставляется или распространяется продукт. Правила платформы, сторонние лицензии и обязательные нормы защиты потребителей могут иметь приоритет, если этого требует закон.",
                footer:
                    "На этой странице опубликована текущая версия Условий использования Atmos Studio."
            }
        }
    };

    const getPageName = () => {
        const pageName = window.location.pathname.split("/").pop();
        return pageName || "index.html";
    };

    const localizeNavigation = (language) => {
        const labels = copy[language].navigation;

        document
            .querySelectorAll(".page-navigation a, .footer-navigation a")
            .forEach((link) => {
                const href = link.getAttribute("href");

                if (!href) {
                    return;
                }

                const fileName = href.split("/").pop().split(/[?#]/)[0];

                if (labels[fileName]) {
                    link.textContent = labels[fileName];
                }
            });
    };

    const localizeSharedPageContent = (language) => {
        const pageName = getPageName();
        const localizedPage = pageCopy[pageName]?.[language];

        if (!localizedPage) {
            return;
        }

        const hero = document.querySelector("main > .hero");
        const heroTitle = hero?.querySelector("h1");
        const heroDescription = hero?.querySelector(".hero-description");
        const metadata = hero?.querySelectorAll(".metadata .badge");
        const notice = document.querySelector("main > .notice");
        const footerParagraphs = document.querySelectorAll("footer > p");

        if (heroTitle) {
            heroTitle.textContent = localizedPage.title;
        }

        if (heroDescription) {
            heroDescription.textContent = localizedPage.description;
        }

        metadata?.forEach((badge, index) => {
            if (localizedPage.metadata[index]) {
                badge.textContent = localizedPage.metadata[index];
            }
        });

        if (notice) {
            notice.innerHTML = localizedPage.notice;
        }

        if (footerParagraphs.length > 1) {
            footerParagraphs[footerParagraphs.length - 1].textContent =
                localizedPage.footer;
        }

        document.title = `${localizedPage.title} — Atmos Studio`;
    };

    const syncSwitcher = (language) => {
        document.querySelectorAll("[data-language-button]").forEach((button) => {
            const isActive = button.dataset.languageButton === language;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        document.querySelectorAll(".language-switcher").forEach((switcher) => {
            switcher.setAttribute("aria-label", copy[language].switcherLabel);
        });

        const englishButton = document.querySelector('[data-language-button="en"]');
        const russianButton = document.querySelector('[data-language-button="ru"]');

        englishButton?.setAttribute("aria-label", copy[language].englishButton);
        russianButton?.setAttribute("aria-label", copy[language].russianButton);
    };

    const setLanguage = (language, persist = true) => {
        if (!supportedLanguages.has(language)) {
            return;
        }

        currentLanguage = language;
        document.documentElement.dataset.language = language;
        document.documentElement.lang = language;

        if (persist) {
            try {
                window.localStorage.setItem(storageKey, language);
            } catch {
                // The page still switches even when persistence is unavailable.
            }
        }

        localizeNavigation(language);
        localizeSharedPageContent(language);
        syncSwitcher(language);
    };

    const createSwitcher = () => {
        const socialNavigation = document.querySelector(".social-navigation");

        if (!socialNavigation || !document.querySelector("#english, #russian")) {
            return;
        }

        const switcher = document.createElement("div");
        switcher.className = "language-switcher";
        switcher.setAttribute("role", "group");

        switcher.innerHTML = `
            <button
                class="language-button"
                type="button"
                data-language-button="en"
            >EN</button>
            <button
                class="language-button"
                type="button"
                data-language-button="ru"
            >RU</button>
        `;

        switcher.addEventListener("click", (event) => {
            const button = event.target.closest("[data-language-button]");

            if (!button) {
                return;
            }

            setLanguage(button.dataset.languageButton);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        socialNavigation.prepend(switcher);
    };

    const initialize = () => {
        createSwitcher();
        setLanguage(currentLanguage, false);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, { once: true });
    } else {
        initialize();
    }
})();

