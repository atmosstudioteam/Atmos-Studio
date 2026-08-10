(() => {
    const storageKey = "atmos-language";
    const supportedLanguages = new Set(["en", "ru"]);
    const kofiUrl = "https://ko-fi.com/atmos_studio";
    const discordUrl = "https://discord.gg/g9G3uHPzWQ";
    const telegramUrl = "https://t.me/atmos_studio";
    const youtubeUrl = "https://www.youtube.com/@AtmosStudioTeam";
    const socialIcons = {
        // Font Awesome Free Ko-fi icon (CC BY 4.0).
        kofi: `
            <svg class="kofi-icon" viewBox="0 0 512 512" aria-hidden="true">
                <path d="M249.8 75c89.8 0 113 1.1 146.3 4.4 78.1 7.8 123.6 56 123.6 125.2l0 8.9c0 64.3-47.1 116.9-110.8 122.4-5 16.6-12.8 33.2-23.3 49.9-24.4 37.7-73.1 85.3-162.9 85.3l-17.7 0c-73.1 0-129.7-31.6-163.5-89.2-29.9-50.4-33.8-106.4-33.8-181.2 0-73.7 44.4-113.6 96.4-120.2 39.3-5 88.1-5.5 145.7-5.5zm0 41.6c-60.4 0-103.6 .5-136.3 5.5-46 6.7-64.3 32.7-64.3 79.2l.2 25.7c1.2 57.3 7.1 97.1 27.5 134.5 26.6 49.3 74.8 68.2 129.7 68.2l17.2 0c72 0 107-34.9 126.3-65.4 9.4-15.5 17.7-32.7 22.2-54.3l3.3-13.8 19.9 0c44.3 0 82.6-36 82.6-82l0-8.3c0-51.5-32.2-78.7-88.1-85.3-31.6-2.8-50.4-3.9-140.2-3.9zM267 169.2c38.2 0 64.8 31.6 64.8 67 0 32.7-18.3 61-42.1 83.1-15 15-39.3 30.5-55.9 40.5-4.4 2.8-10 4.4-16.7 4.4-5.5 0-10.5-1.7-15.5-4.4-16.6-10-41-25.5-56.5-40.5-21.8-20.8-39.2-46.9-41.3-77l-.2-6.1c0-35.5 25.5-67 64.3-67 22.7 0 38.8 11.6 49.3 27.7 11.6-16.1 27.2-27.7 49.9-27.7zm122.5-3.9c28.3 0 43.8 16.6 43.8 43.2s-15.5 42.7-43.8 42.7c-8.9 0-13.8-5-13.8-11.7l0-62.6c0-6.7 5-11.6 13.8-11.6z"></path>
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
                    "This Policy explains how Atmos Studio processes information across its Minecraft products, support services, websites, community channels, and publications distributed through Ko-fi, Modrinth, CurseForge, and other platforms.",
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
                    "Эта Политика объясняет, как Atmos Studio обрабатывает информацию в продуктах Minecraft, службах поддержки, на сайтах, в каналах сообщества и публикациях, распространяемых через Ko-fi, Modrinth, CurseForge и другие платформы.",
                metadata: [
                    "Действует с: 30 июля 2026 г.",
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
                    "These Terms govern access to and use of Atmos Studio Products, including Minecraft modpacks, Ko-fi subscription releases, public Builds, websites, community channels, downloads, and technical support services.",
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
                    "Настоящие Условия регулируют доступ к продуктам Atmos Studio и их использование, включая сборки Minecraft, выпуски по подписке Ko-fi, публичные сборки, сайты, каналы сообщества, загрузки и техническую поддержку.",
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
        "Ko-fi current builds": "Актуальные сборки на Ko-fi",
        "Public releases on Modrinth and CurseForge":
            "Публичные версии на Modrinth и CurseForge",
        "Featured Project": "Главный проект",
        "Other Projects": "Другие проекты",
        "Free Minecraft mods": "Бесплатные моды Minecraft",
        "Tools for modpack creators": "Инструменты для создателей сборок",
        "Standalone Atmos Studio mods available free on Modrinth and CurseForge.":
            "Самостоятельные моды Atmos Studio, доступные бесплатно на Modrinth и CurseForge.",
        "World generation control": "Управление генерацией мира",
        "Disables Overworld ore generation using a configurable block tag":
            "Отключает генерацию руд в Верхнем мире с помощью настраиваемого тега блоков",
        "Multiblock customization": "Настройка мультиблоков",
        "Customize Modern Industrialization multiblocks with KubeJS":
            "Настраивайте мультиблоки Modern Industrialization с помощью KubeJS",
        "Published": "Опубликован",
        "Minecraft modpack": "Minecraft-сборка",
        "Current Atmos Studio project": "Текущий проект Atmos Studio",
        "The information below describes the current development and distribution structure. Exact versions and download availability may change as development progresses.":
            "Ниже описана текущая структура разработки и распространения. Точные версии и доступность загрузок могут меняться по мере развития проекта.",
        "In active development": "В активной разработке",
        "A large-scale techno-magical Minecraft modpack combining industrial systems, structured progression, exploration, rituals, quests, custom scripts, and original content.":
            "Масштабная техно-магическая Minecraft-сборка, объединяющая промышленные системы, продуманное развитие, исследование, ритуалы, квесты, собственные скрипты и оригинальное содержимое.",
        "Version": "Версия",
        "Mod loader": "Загрузчик",
        "Status": "Статус",
        "In development": "В разработке",
        "Distribution": "Распространение",
        "Ko-fi, Modrinth and CurseForge":
            "Ko-fi, Modrinth и CurseForge",
        "Technologies": "Технологии",
        "Large production systems, complex processing, machinery, resources, automation, and technological progression.":
            "Крупные производственные системы, сложная переработка, механизмы, ресурсы, автоматизация и технологическое развитие.",
        "Magic": "Магия",
        "Arcane rituals, powerful spells, mysterious dungeons, ancient secrets, magical puzzles, and progression through hidden knowledge.":
            "Магические ритуалы, могущественные заклинания, загадочные подземелья, древние тайны, магические головоломки и развитие через скрытые знания.",
        "Exploration": "Исследование",
        "Varied dungeons, updated caves, hidden locations, dangerous dimensions, powerful bosses, and rewards for exploring the world.":
            "Разнообразные данжи и подземелья, обновлённые пещеры, скрытые локации, опасные измерения, сильные боссы и награды за исследование мира.",
        "Custom Development": "Собственная разработка",
        "Custom scripts, recipes, quests, balancing, interfaces, visual design, and original systems developed for the modpack.":
            "Собственные скрипты, рецепты, квесты, баланс, интерфейсы, визуальное оформление и оригинальные системы сборки.",
        "Mods": "Моды",
        "Current restricted build": "Текущая закрытая сборка",
        "Access the newest eligible Conflux builds and updates available to the relevant active subscription tier.":
            "Доступ к новейшим сборкам и обновлениям Conflux для соответствующего активного уровня подписки.",
        "Open Ko-fi": "Открыть Ko-fi",
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
        "The newest active builds may be published through Ko-fi. Users with an active eligible subscription can access the updates published during their subscription period.":
            "Новейшие активные сборки могут публиковаться через Ko-fi. Пользователи с подходящей активной подпиской получают доступ к обновлениям, опубликованным в период её действия.",
        "Current versions": "Актуальные версии",
        "Subscriber access": "Доступ подписчиков",
        "Public Builds": "Публичные сборки",
        "When a newer current build is released, the previous eligible version may be prepared for free publication through public distribution platforms.":
            "После выпуска новой актуальной сборки предыдущая подходящая версия может быть подготовлена для бесплатной публикации на общедоступных платформах.",
        "Public access": "Бесплатный доступ",
        "Community": "Сообщество",
        "News and support": "Новости и поддержка",
        "Follow Atmos Studio development": "Следите за разработкой Atmos Studio",
        "Follow Atmos Studio on Ko-fi and join the official Discord and Telegram communities for project announcements, development news, support, release information, and important updates.":
            "Подписывайтесь на Ko-fi и присоединяйтесь к официальным сообществам Discord и Telegram, чтобы получать новости разработки, поддержку, сведения о выпусках и важные обновления.",
        "© 2026 Atmos Studio. All rights reserved.":
            "© 2026 Atmos Studio. Все права защищены.",
        "Download Atmos Studio products only from official distribution pages.":
            "Загружайте продукты Atmos Studio только с официальных страниц распространения."
    };

    const footerTranslations = {
        "© 2026 Atmos Studio. All rights reserved.":
            "© 2026 Atmos Studio. Все права защищены.",
        "Independent studio creating Minecraft projects and modpacks.":
            "Независимая студия, создающая Minecraft-проекты и сборки.",
        "Download Atmos Studio products only from official distribution pages.":
            "Загружайте продукты Atmos Studio только с официальных страниц распространения.",
        "This page contains the current version of the Atmos Studio Privacy Policy.":
            "На этой странице опубликована текущая версия Политики конфиденциальности Atmos Studio.",
        "This page contains the current version of the Atmos Studio Terms of Use.":
            "На этой странице опубликована текущая версия Условий использования Atmos Studio."
    };

    const buildsOriginalText = new WeakMap();
    const footerOriginalText = new WeakMap();

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

    const localizeFooter = (language) => {
        const footer = document.querySelector("footer");

        if (!footer) {
            return;
        }

        const walker = document.createTreeWalker(
            footer,
            NodeFilter.SHOW_TEXT
        );
        let node = walker.nextNode();

        while (node) {
            const parent = node.parentElement;
            const skipNode = parent?.closest(
                ".footer-navigation, .footer-socials"
            );

            if (!skipNode && node.nodeValue.trim()) {
                if (!footerOriginalText.has(node)) {
                    footerOriginalText.set(node, node.nodeValue);
                }

                const originalText = footerOriginalText.get(node);

                if (language === "en") {
                    node.nodeValue = originalText;
                } else {
                    const normalizedText = originalText
                        .replace(/\s+/g, " ")
                        .trim();
                    const translation =
                        footerTranslations[normalizedText];

                    if (translation) {
                        const leadingSpace =
                            originalText.match(/^\s*/)?.[0] ?? "";
                        const trailingSpace =
                            originalText.match(/\s*$/)?.[0] ?? "";
                        node.nodeValue =
                            `${leadingSpace}${translation}${trailingSpace}`;
                    }
                }
            }

            node = walker.nextNode();
        }
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
                ".site-header, footer"
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
            .querySelectorAll("a.social-button.kofi")
            .forEach((link) => link.setAttribute("href", kofiUrl));

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
                        ".social-button.kofi, " +
                            ".social-button.discord, " +
                            ".social-button.telegram",
                    );

                if (!isCommunityContainer) {
                    return;
                }

                if (!container.querySelector(".social-button.kofi")) {
                    const kofiLink = document.createElement("a");
                    kofiLink.className = "social-button kofi";
                    kofiLink.href = kofiUrl;
                    kofiLink.target = "_blank";
                    kofiLink.rel = "noopener noreferrer";
                    kofiLink.innerHTML = `${socialIcons.kofi}Ko-fi`;

                    const firstSocialLink =
                        container.querySelector("a.social-button");
                    container.insertBefore(kofiLink, firstSocialLink);
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
                    if (!link.querySelector("svg, img")) {
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
        localizeFooter(language);
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
