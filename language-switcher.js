(() => {
    const storageKey = "atmos-language";
    const supportedLanguages = new Set(["en", "ru"]);
    const boostyUrl = "https://boosty.to/atmos.studio";
    const discordUrl = "https://discord.gg/g9G3uHPzWQ";
    const telegramUrl = "https://t.me/atmos_studio";
    const youtubeUrl = "https://www.youtube.com/@AtmosStudioTeam";
    const socialIcons = {
        boosty: `
            <svg class="boosty-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"></path>
                <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"></path>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"></path>
            </svg>
        `,
        discord: `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.54 5.34A16.3 16.3 0 0 0 15.44 4a11.4 11.4 0 0 0-.52 1.07 15.25 15.25 0 0 0-4.84 0A11.4 11.4 0 0 0 9.56 4a16.4 16.4 0 0 0-4.11 1.35C2.85 9.2 2.15 12.95 2.5 16.65a16.7 16.7 0 0 0 5.03 2.55c.41-.55.77-1.14 1.08-1.76a10.7 10.7 0 0 1-1.7-.82c.14-.1.28-.21.41-.32a11.7 11.7 0 0 0 10.36 0l.42.32c-.55.33-1.12.6-1.71.82.31.62.67 1.21 1.08 1.76a16.6 16.6 0 0 0 5.03-2.55c.41-4.29-.7-8-2.96-11.31ZM9.22 14.38c-1 0-1.82-.93-1.82-2.08s.8-2.08 1.82-2.08c1.02 0 1.84.94 1.82 2.08 0 1.15-.8 2.08-1.82 2.08Zm5.56 0c-1 0-1.82-.93-1.82-2.08s.8-2.08 1.82-2.08c1.02 0 1.84.94 1.82 2.08 0 1.15-.8 2.08-1.82 2.08Z"></path>
            </svg>
        `,
        telegram: `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21.7 3.2 18.6 20c-.23 1.19-.85 1.48-1.72.92l-4.72-3.48-2.28 2.19c-.25.25-.46.46-.95.46l.34-4.81 8.76-7.92c.38-.34-.08-.53-.59-.19L6.61 13.99l-4.67-1.46c-1.02-.32-1.04-1.02.21-1.51L20.42 3.98c.85-.31 1.59.19 1.28-.78Z"></path>
            </svg>
        `,
        youtube: `
            <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"></path>
            </svg>
        `
    };

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
                title: "Privacy Policy",
                description:
                    "This Policy explains how Atmos Studio processes information across its Minecraft products, support services, websites, community channels, and publications distributed through Boosty, Modrinth, CurseForge, and other platforms.",
                metadata: [
                    "Effective: July 30, 2026",
                    "Last updated: July 31, 2026"
                ],
                notice:
                    "<strong>Important:</strong> product-specific notices or terms may supplement this Policy. Where a product-specific privacy notice conflicts with this document, the product-specific notice takes priority for that product.",
                footer:
                    "This page contains the current version of the Atmos Studio Privacy Policy."
            },
            ru: {
                title: "Политика конфиденциальности",
                description:
                    "Эта Политика объясняет, как Atmos Studio обрабатывает информацию в продуктах Minecraft, службах поддержки, на сайтах, в каналах сообщества и публикациях, распространяемых через Boosty, Modrinth, CurseForge и другие платформы.",
                metadata: [
                    "Действуют с: 30 июля 2026 г.",
                    "Последнее обновление: 31 июля 2026 г."
                ],
                notice:
                    "<strong>Важно:</strong> эту Политику могут дополнять уведомления или условия для отдельных продуктов. Если специальное уведомление о конфиденциальности противоречит этому документу, для соответствующего продукта применяется специальное уведомление.",
                footer:
                    "На этой странице опубликована текущая версия Политики конфиденциальности Atmos Studio."
            }
        },
        "terms-of-use.html": {
            en: {
                title: "Terms of Use",
                description:
                    "These Terms govern access to and use of Atmos Studio Products, including Minecraft modpacks, Boosty subscription releases, public Builds, websites, community channels, downloads, and technical support services.",
                metadata: [
                    "Effective: July 30, 2026",
                    "Last updated: July 31, 2026"
                ],
                notice:
                    "<strong>Important:</strong> these Terms apply together with the rules of the platform through which a Product is accessed or distributed. Platform rules, third-party licenses, and mandatory consumer law may take priority where legally required.",
                footer:
                    "This page contains the current version of the Atmos Studio Terms of Use."
            },
            ru: {
                title: "Условия использования",
                description:
                    "Настоящие Условия регулируют доступ к продуктам Atmos Studio и их использование, включая сборки Minecraft, выпуски по подписке Boosty, публичные сборки, сайты, каналы сообщества, загрузки и техническую поддержку.",
                metadata: [
                    "Действуют с: 30 июля 2026 г.",
                    "Последнее обновление: 31 июля 2026 г."
                ],
                notice:
                    "<strong>Важно:</strong> настоящие Условия применяются вместе с правилами платформы, через которую предоставляется или распространяется продукт. Правила платформы, сторонние лицензии и обязательные нормы защиты потребителей могут иметь приоритет, если этого требует закон.",
                footer:
                    "На этой странице опубликована текущая версия Условий использования Atmos Studio."
            }
        }
    };

    const buildsTranslations = {
        "Atmos Studio Projects": "Проекты Atmos Studio",
        "Builds": "Сборки",
        "Browse Atmos Studio projects, current subscription releases, public builds, supported platforms, and official download locations.":
            "Здесь собраны проекты Atmos Studio, актуальные версии по подписке, публичные сборки, поддерживаемые платформы и официальные ссылки для загрузки.",
        "Projects in development": "Проекты в разработке",
        "Boosty current builds": "Актуальные версии сборок на Boosty",
        "Public releases on Modrinth and CurseForge":
            "Предыдущие версии сборок на Modrinth и CurseForge",
        "Featured Project": "Главный проект",
        "Minecraft modpack": "Minecraft-сборка",
        "Current Atmos Studio project": "Текущий проект Atmos Studio",
        "The information below describes the current development and distribution structure. Exact versions and download availability may change as development progresses.":
            "Ниже описана текущая структура разработки и распространения. Точные версии и доступность загрузок могут меняться по мере развития проекта.",
        "In active development": "В активной разработке",
        "A large-scale techno-magical Minecraft modpack combining industrial systems, dangerous caverns, structured progression, exploration, rituals, quests, custom scripts, and original content.":
            "Масштабная техно-магическая Minecraft-сборка, объединяющая промышленные системы, опасные пещеры, продуманное развитие, исследование, ритуалы, квесты, собственные скрипты и оригинальное содержимое.",
        "Conflux is designed as a cohesive experience rather than a simple collection of mods. Progression, resources, recipes, dimensions, quests, interfaces, visual identity, and technical systems are adjusted to support a unified long-term playthrough.":
            "Conflux создаётся как цельное игровое приключение, а не простой набор модов. Развитие, ресурсы, рецепты, измерения, квесты, интерфейсы, визуальный стиль и игровые системы настроены для единого продолжительного прохождения.",
        "Game": "Игра",
        "Project type": "Тип проекта",
        "Modpack": "Сборка",
        "Status": "Статус",
        "In development": "В разработке",
        "Distribution": "Распространение",
        "Boosty and public platforms": "Boosty и публичные платформы",
        "Industry": "Промышленность",
        "Large production systems, complex processing, machinery, resources, automation, and technological progression.":
            "Крупные производственные системы, сложная переработка, механизмы, ресурсы, автоматизация и технологическое развитие.",
        "Magic and Exploration": "Магия и исследование",
        "Rituals, dangerous dimensions, underground biomes, hidden locations, bosses, and exploration-focused progression.":
            "Ритуалы, опасные измерения, подземные биомы, скрытые места, боссы и развитие через исследование мира.",
        "Custom Development": "Собственная разработка",
        "Custom scripts, recipes, quests, balancing, interfaces, visual design, and original systems developed for the modpack.":
            "Собственные скрипты, рецепты, квесты, баланс, интерфейсы, визуальное оформление и оригинальные системы сборки.",
        "Current restricted build": "Текущая закрытая сборка",
        "Access the newest eligible Conflux builds and updates available to the relevant active subscription tier.":
            "Доступ к новейшим сборкам и обновлениям Conflux для соответствующего активного уровня подписки.",
        "Open Boosty": "Открыть Boosty",
        "Public release page": "Страница публичных версий",
        "Previous eligible versions may be published publicly after the release of a newer current build.":
            "Предыдущие подходящие версии могут публиковаться бесплатно после выхода новой актуальной сборки.",
        "Open Modrinth": "Открыть Modrinth",
        "Open CurseForge": "Открыть CurseForge",
        "Important:": "Важно:",
        "use only official Atmos Studio links. Files published by unrelated websites, unofficial mirrors, reupload services, or other users may be outdated, modified, incomplete, or unsafe.":
            "используйте только официальные ссылки Atmos Studio. Файлы со сторонних сайтов, неофициальных зеркал, сервисов повторной загрузки или от других пользователей могут быть устаревшими, изменёнными, неполными или небезопасными.",
        "Release Model": "Модель публикации",
        "Access and distribution": "Доступ и распространение",
        "Current builds first, public releases afterward":
            "Сначала актуальные сборки, затем публичные версии",
        "Some Atmos Studio products use a rolling release model. Subscribers receive access to the newest available builds, while previous eligible versions later become publicly available.":
            "Для некоторых продуктов Atmos Studio используется последовательная модель публикации. Подписчики получают доступ к новейшим сборкам, а предыдущие подходящие версии позднее становятся общедоступными.",
        "Current Builds": "Актуальные сборки",
        "The newest active builds may be published through Boosty. Users with an active eligible subscription can access the updates published during their subscription period.":
            "Новейшие активные сборки могут публиковаться через Boosty. Пользователи с подходящей активной подпиской получают доступ к обновлениям, опубликованным в период её действия.",
        "Current versions": "Актуальные версии",
        "Subscriber access": "Доступ подписчиков",
        "Public Builds": "Публичные сборки",
        "When a newer current build is released, the previous eligible version may be prepared for free publication through public distribution platforms.":
            "После выпуска новой актуальной сборки предыдущая подходящая версия может быть подготовлена для бесплатной публикации на общедоступных платформах.",
        "Public access": "Бесплатный доступ",
        "Community": "Сообщество",
        "News and support": "Новости и поддержка",
        "Follow Atmos Studio development": "Следите за разработкой Atmos Studio",
        "Follow Atmos Studio on Boosty and join the official Discord and Telegram communities for project announcements, development news, support, release information, and important updates.":
            "Подписывайтесь на Boosty и присоединяйтесь к официальным сообществам Discord и Telegram, чтобы получать новости разработки, поддержку, сведения о выпусках и важные обновления.",
        "© 2026 Atmos Studio. All rights reserved.":
            "© 2026 Atmos Studio. Все права защищены.",
        "Download Atmos Studio products only from official distribution pages.":
            "Загружайте продукты Atmos Studio только с официальных страниц распространения."
    };

    const buildsOriginalText = new WeakMap();

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
            const localizedMetadata = localizedPage.metadata[index];

            if (localizedMetadata) {
                badge.textContent = localizedMetadata;
            } else {
                badge.remove();
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

    const localizeBuildsPage = (language) => {
        if (getPageName() !== "builds.html") {
            return;
        }

        const root = document.querySelector("main");

        if (!root) {
            return;
        }

        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();

        while (node) {
            const parent = node.parentElement;
            const skipNode = parent?.closest(
                ".site-header, .footer-navigation, .footer-socials"
            );

            if (!skipNode && node.nodeValue.trim()) {
                if (!buildsOriginalText.has(node)) {
                    buildsOriginalText.set(node, node.nodeValue);
                }

                const originalText = buildsOriginalText.get(node);

                if (language === "en") {
                    node.nodeValue = originalText;
                } else {
                    const normalizedText = originalText
                        .replace(/\s+/g, " ")
                        .trim();
                    const translation = buildsTranslations[normalizedText];

                    if (translation) {
                        const leadingSpace = originalText.match(/^\s*/)?.[0] ?? "";
                        const trailingSpace = originalText.match(/\s*$/)?.[0] ?? "";
                        node.nodeValue =
                            `${leadingSpace}${translation}${trailingSpace}`;
                    }
                }
            }

            node = walker.nextNode();
        }

        document.title =
            language === "ru"
                ? "Сборки — Atmos Studio"
                : "Builds — Atmos Studio";
    };

    const ensureOfficialCommunityLinks = () => {
        document
            .querySelectorAll("a.social-button.boosty")
            .forEach((link) => link.setAttribute("href", boostyUrl));

        document
            .querySelectorAll("a.social-button.discord")
            .forEach((link) => link.setAttribute("href", discordUrl));

        document
            .querySelectorAll("a.social-button.telegram")
            .forEach((link) => link.setAttribute("href", telegramUrl));

        document
            .querySelectorAll("a.social-button.youtube")
            .forEach((link) => link.setAttribute("href", youtubeUrl));

        document
            .querySelectorAll(
                ".social-navigation, .footer-socials, .cta-actions",
            )
            .forEach((container) => {
                const isCommunityContainer =
                    container.matches(
                        ".social-navigation, .footer-socials",
                    ) ||
                    container.querySelector(
                        ".social-button.boosty, " +
                            ".social-button.discord, " +
                            ".social-button.telegram",
                    );

                if (!isCommunityContainer) {
                    return;
                }

                if (!container.querySelector(".social-button.boosty")) {
                    const boostyLink = document.createElement("a");
                    boostyLink.className = "social-button boosty";
                    boostyLink.href = boostyUrl;
                    boostyLink.target = "_blank";
                    boostyLink.rel = "noopener noreferrer";
                    boostyLink.innerHTML = `${socialIcons.boosty}Boosty`;

                    const firstSocialLink =
                        container.querySelector("a.social-button");
                    container.insertBefore(boostyLink, firstSocialLink);
                }

                let youtubeLink =
                    container.querySelector(".social-button.youtube");

                if (!youtubeLink) {
                    youtubeLink = document.createElement("a");
                    youtubeLink.className = "social-button youtube";
                }

                youtubeLink.href = youtubeUrl;
                youtubeLink.target = "_blank";
                youtubeLink.rel = "noopener noreferrer";
                youtubeLink.setAttribute("aria-label", "YouTube");
                youtubeLink.title = "YouTube";
                youtubeLink.innerHTML = `${socialIcons.youtube}YouTube`;

                const discordLink =
                    container.querySelector(".social-button.discord");

                if (discordLink) {
                    container.insertBefore(youtubeLink, discordLink);
                } else {
                    container.append(youtubeLink);
                }
            });

        Object.entries(socialIcons).forEach(([platform, icon]) => {
            document
                .querySelectorAll(`a.social-button.${platform}`)
                .forEach((link) => {
                    if (!link.querySelector("svg")) {
                        link.insertAdjacentHTML("afterbegin", icon);
                    }
                });
        });
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

        localizeBuildsPage(language);
        localizeNavigation(language);
        localizeSharedPageContent(language);
        syncSwitcher(language);
    };

    const createSwitcher = () => {
        const socialNavigation = document.querySelector(".social-navigation");

        const supportsLanguageSwitching =
            document.querySelector("#english, #russian") ||
            getPageName() === "builds.html";

        if (!socialNavigation || !supportsLanguageSwitching) {
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

        socialNavigation.before(switcher);
    };

    const initialize = () => {
        createSwitcher();
        ensureOfficialCommunityLinks();
        setLanguage(currentLanguage, false);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, { once: true });
    } else {
        initialize();
    }
})();
