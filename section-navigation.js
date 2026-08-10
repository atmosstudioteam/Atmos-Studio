(() => {
    const desktopQuery = window.matchMedia("(min-width: 1481px)");
    const copy = {
        en: {
            title: "Sections",
            open: "Open page sections",
            close: "Close page sections"
        },
        ru: {
            title: "Разделы",
            open: "Открыть разделы страницы",
            close: "Закрыть разделы страницы"
        }
    };

    let root = null;
    let list = null;
    let toggle = null;
    let trackedSections = [];
    let scheduledFrame = 0;
    let scrollFrame = 0;
    let activeSectionId = "";

    const getLanguage = () =>
        document.documentElement.dataset.language === "ru" ||
        document.documentElement.lang === "ru"
            ? "ru"
            : "en";

    const isVisible = (element) => element.getClientRects().length > 0;

    const normalizeSectionLabel = (value) =>
        value
            .replace(/^\s*\d+\.\s*/, "")
            .replace(/\s+/g, " ")
            .trim();

    const getSections = () => {
        const dividers = Array.from(
            document.querySelectorAll(".section-divider")
        ).filter(isVisible);

        if (dividers.length) {
            return dividers.map((element) => ({
                element,
                label: normalizeSectionLabel(
                    element.querySelector("span")?.textContent.trim() ||
                    element.textContent.trim()
                )
            }));
        }

        const activeDocument = Array.from(
            document.querySelectorAll(".document")
        ).find(isVisible);

        if (!activeDocument) {
            return [];
        }

        return Array.from(
            activeDocument.querySelectorAll(".policy-section > h3")
        )
            .filter(isVisible)
            .map((element) => ({
                element,
                label: element.textContent.trim()
            }));
    };

    const setExpanded = (expanded) => {
        if (!root || !toggle) {
            return;
        }

        const isExpanded = desktopQuery.matches || expanded;
        root.classList.toggle("is-open", isExpanded);
        toggle.setAttribute("aria-expanded", String(isExpanded));

        const localizedCopy = copy[getLanguage()];
        toggle.setAttribute(
            "aria-label",
            isExpanded ? localizedCopy.close : localizedCopy.open
        );
    };

    const ensureRoot = () => {
        if (root) {
            return;
        }

        root = document.createElement("aside");
        root.className = "section-navigator";
        root.setAttribute("aria-label", copy[getLanguage()].title);

        root.innerHTML = `
            <button
                class="section-navigator-toggle"
                type="button"
                aria-controls="section-navigator-list"
            >
                <span class="section-navigator-symbol" aria-hidden="true">≡</span>
                <span class="section-navigator-label"></span>
                <span class="section-navigator-chevron" aria-hidden="true">⌃</span>
            </button>
            <ol class="section-navigator-list" id="section-navigator-list"></ol>
        `;

        toggle = root.querySelector(".section-navigator-toggle");
        list = root.querySelector(".section-navigator-list");

        toggle.addEventListener("click", () => {
            if (!desktopQuery.matches) {
                setExpanded(!root.classList.contains("is-open"));
            }
        });

        root.addEventListener("click", (event) => {
            if (
                !desktopQuery.matches &&
                event.target.closest(".section-navigator-link")
            ) {
                setExpanded(false);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                !desktopQuery.matches &&
                root.classList.contains("is-open")
            ) {
                setExpanded(false);
                toggle.focus();
            }
        });

        document.body.append(root);
        setExpanded(false);
    };

    const syncListScroll = (activeLink) => {
        if (!list || !activeLink || list.clientHeight === 0) {
            return;
        }

        const listRect = list.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        const edgePadding = 16;
        const isVisibleInList =
            linkRect.top >= listRect.top + edgePadding &&
            linkRect.bottom <= listRect.bottom - edgePadding;

        if (isVisibleInList) {
            return;
        }

        const targetTop =
            list.scrollTop +
            linkRect.top -
            listRect.top -
            (list.clientHeight - linkRect.height) / 2;

        list.scrollTo({
            top: Math.max(0, targetTop),
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth"
        });
    };

    const updateActiveLink = () => {
        scrollFrame = 0;

        if (!root || !trackedSections.length) {
            return;
        }

        const marker = Math.min(240, window.innerHeight * 0.32);
        let activeSection = trackedSections[0];
        let activeLink = null;

        trackedSections.forEach((section) => {
            if (section.getBoundingClientRect().top <= marker) {
                activeSection = section;
            }
        });

        root.querySelectorAll(".section-navigator-link").forEach((link) => {
            const isActive = link.hash === `#${activeSection.id}`;
            link.classList.toggle("is-active", isActive);

            if (isActive) {
                activeLink = link;
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });

        if (activeSection.id !== activeSectionId) {
            activeSectionId = activeSection.id;
            syncListScroll(activeLink);
        }
    };

    const scheduleActiveLinkUpdate = () => {
        if (!scrollFrame) {
            scrollFrame = window.requestAnimationFrame(updateActiveLink);
        }
    };

    const rebuild = () => {
        scheduledFrame = 0;

        document
            .querySelectorAll("[data-section-navigation-id]")
            .forEach((element) => {
                element.removeAttribute("id");
                element.removeAttribute("data-section-navigation-id");
            });

        const sections = getSections();

        if (!sections.length) {
            root?.remove();
            root = null;
            list = null;
            toggle = null;
            trackedSections = [];
            activeSectionId = "";
            return;
        }

        ensureRoot();

        const localizedCopy = copy[getLanguage()];
        root.setAttribute("aria-label", localizedCopy.title);
        root.querySelector(".section-navigator-label").textContent =
            localizedCopy.title;

        list.replaceChildren();
        activeSectionId = "";
        trackedSections = sections.map(({ element, label }, index) => {
            const id = `page-section-${index + 1}`;
            element.id = id;
            element.setAttribute("data-section-navigation-id", "");

            const item = document.createElement("li");
            const link = document.createElement("a");
            const linkText = document.createElement("span");
            link.className = "section-navigator-link";
            link.href = `#${id}`;
            linkText.className = "section-navigator-link-text";
            linkText.textContent = label;
            link.append(linkText);
            item.append(link);
            list.append(item);

            return element;
        });

        setExpanded(root.classList.contains("is-open"));
        updateActiveLink();
    };

    const scheduleRebuild = () => {
        window.cancelAnimationFrame(scheduledFrame);
        scheduledFrame = window.requestAnimationFrame(rebuild);
    };

    const initialize = () => {
        rebuild();

        window.addEventListener("scroll", scheduleActiveLinkUpdate, {
            passive: true
        });
        window.addEventListener("resize", scheduleActiveLinkUpdate, {
            passive: true
        });

        const languageObserver = new MutationObserver(scheduleRebuild);
        languageObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-language", "lang"]
        });

        const handleDesktopChange = () => setExpanded(false);

        if (typeof desktopQuery.addEventListener === "function") {
            desktopQuery.addEventListener("change", handleDesktopChange);
        } else {
            desktopQuery.addListener(handleDesktopChange);
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, {
            once: true
        });
    } else {
        initialize();
    }
})();
