(() => {
    const storageKey = "atmos-language";
    const supportedLanguages = new Set(["en", "ru"]);
    const boostyUrl = "https://boosty.to/atmos.studio";
    const discordUrl = "https://discord.gg/g9G3uHPzWQ";
    const telegramUrl = "https://t.me/atmos_studio";

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
                    "This Policy explains how Atmos Studio processes information across its Minecraft products, support services, websites, community channels, and publications distributed through Boosty, Modrinth, CurseForge, and other platforms.",
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
                    "Эта Политика объясняет, как Atmos Studio обрабатывает информацию в продуктах Minecraft, службах поддержки, на сайтах, в каналах сообщества и публикациях, распространяемых через Boosty, Modrinth, CurseForge и другие платформы.",
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
                    "These Terms govern access to and use of Atmos Studio Products, including Minecraft modpacks, Boosty subscription releases, public Builds, websites, community channels, downloads, and technical support services.",
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
                    "Настоящие Условия регулируют доступ к продуктам Atmos Studio и их использование, включая сборки Minecraft, выпуски по подписке Boosty, публичные сборки, сайты, каналы сообщества, загрузки и техническую поддержку.",
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

    const buildsTranslations = {
        "Atmos Studio Projects": "Проекты Atmos Studio",
        "Builds": "Сборки",
        "Browse Atmos Studio projects, current subscription releases, public builds, supported platforms, and official download locations.":
            "Здесь собраны проекты Atmos Studio, актуальные версии по подписке, публичные сборки, поддерживаемые платформы и официальные ссылки для загрузки.",
        "Projects in development": "Проекты в разработке",
        "Boosty current builds": "Актуальные сборки на Boosty",
        "Modrinth public releases": "Публичные версии на Modrinth",
        "CurseForge public releases": "Публичные версии на CurseForge",
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
        "Public Conflux releases may also be distributed through CurseForge when the relevant version becomes available.":
            "Публичные версии Conflux также могут распространяться через CurseForge после подготовки соответствующего выпуска.",
        "Open CurseForge": "Открыть CurseForge",
        "Important:": "Важно:",
        "use only official Atmos Studio links. Files published by unrelated websites, unofficial mirrors, reupload services, or other users may be outdated, modified, incomplete, or unsafe.":
            "используйте только официальные ссылки Atmos Studio. Файлы со сторонних сайтов, неофициальных зеркал, сервисов повторной загрузки или от других пользователей могут быть устаревшими, изменёнными, неполными или небезопасными.",
        "Release Process": "Процесс публикации",
        "Rolling distribution model": "Последовательная модель распространения",
        "How Atmos Studio builds are published": "Как публикуются сборки Atmos Studio",
        "Some products may follow the distribution process described below. Product-specific announcements may provide additional details.":
            "Некоторые продукты могут распространяться по описанной ниже схеме. Дополнительные сведения публикуются в объявлениях конкретного проекта.",
        "Current build": "Актуальная сборка",
        "The newest active version may first be published through Boosty for users with an eligible active subscription.":
            "Новейшая активная версия может сначала публиковаться на Boosty для пользователей с подходящей активной подпиской.",
        "Subscription updates": "Обновления по подписке",
        "During the active subscription period, a user may access eligible updates published for their subscription tier.":
            "В период активной подписки пользователь может получать подходящие обновления своего уровня подписки.",
        "Public release": "Публичная версия",
        "When a newer current build is released, the previous eligible version may later be published freely on Modrinth, CurseForge, or another official platform.":
            "После выхода новой актуальной сборки предыдущая подходящая версия может быть опубликована бесплатно на Modrinth, CurseForge или другой официальной платформе.",
        "Community": "Сообщество",
        "News and support": "Новости и поддержка",
        "Follow Atmos Studio development": "Следите за разработкой Atmos Studio",
        "Join the official Discord and Telegram communities for project announcements, development news, support, release information, and important updates.":
            "Подписывайтесь на Boosty и присоединяйтесь к официальным сообществам Discord и Telegram, чтобы получать новости разработки, поддержку, сведения о выпусках и важные обновления.",
        "Join Discord": "Открыть Discord",
        "Open Telegram": "Открыть Telegram",
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
            .querySelectorAll("a.social-button.discord")
            .forEach((link) => link.setAttribute("href", discordUrl));

        document
            .querySelectorAll("a.social-button.telegram")
            .forEach((link) => link.setAttribute("href", telegramUrl));

        document
            .querySelectorAll(".social-navigation, .footer-socials")
            .forEach((container) => {
                if (container.querySelector(".social-button.boosty")) {
                    return;
                }

                const boostyLink = document.createElement("a");
                boostyLink.className = "social-button boosty";
                boostyLink.href = boostyUrl;
                boostyLink.target = "_blank";
                boostyLink.rel = "noopener noreferrer";
                boostyLink.textContent = "Boosty";

                const firstSocialLink = container.querySelector("a.social-button");
                container.insertBefore(boostyLink, firstSocialLink);
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

        socialNavigation.prepend(switcher);
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
