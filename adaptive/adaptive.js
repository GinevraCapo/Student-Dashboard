// /adaptive/adaptive.js
document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.nav-list');
    if (!navMenu) return;
    const navItems = navMenu.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.innerText.trim();
            const storageKey = `layout_priority:${id}`;
            const count = parseInt(localStorage.getItem(storageKey), 10) || 0;
            localStorage.setItem(storageKey, count + 1);

            console.log(`System: ${id} clicked ${count + 1} times.`);

            if (count + 1 >= 5) {
                prioritizeItem(item);
            }
        });
    });

    function prioritizeItem(element) {
        if (!navMenu || navMenu.firstElementChild === element) return;
        console.log('Adaptive Action: Moving frequent item to top.');

        element.style.transition = 'background 0.5s ease';
        element.style.backgroundColor = '#d1e7dd';

        navMenu.prepend(element);

        if (!element.querySelector('.auto-tag')) {
            const tag = document.createElement('span');
            tag.className = 'auto-tag';
            tag.innerText = ' (Quick Access)';
            tag.style.fontSize = '10px';
            tag.style.color = 'green';
            element.appendChild(tag);
        }
    }

    function loadPriorities() {
        let topItem = null;
        let maxClicks = 0;

        navItems.forEach(item => {
            const id = item.innerText.trim();
            const clicks = parseInt(localStorage.getItem(`layout_priority:${id}`), 10) || 0;
            if (clicks > maxClicks) {
                maxClicks = clicks;
                topItem = item;
            }
        });

        if (topItem && maxClicks >= 5) {
            navMenu.prepend(topItem);
        }
    }

    loadPriorities();
});
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu-item').forEach(item => {
        const key = `menu_clicks:${item.id || item.dataset.key || item.textContent.trim()}`;

        // Initialize from storage and apply persisted adaptation
        let count = parseInt(localStorage.getItem(key), 10) || 0;
        if (count > 5) {
            item.style.border = '2px solid gold';
            item.style.fontWeight = 'bold';
        }

        // Track clicks and trigger adaptation
        item.addEventListener('click', () => {
            count = parseInt(localStorage.getItem(key), 10) || 0;
            const newCount = count + 1;
            localStorage.setItem(key, newCount);
            console.log(`Adaptive System: ${item.id} clicked ${newCount} times.`);

            if (newCount > 5) {
                item.style.border = '2px solid gold';
                item.style.fontWeight = 'bold';
            }
        });
    });
});
// Adaptive interaction tracking and runtime adaptation
(function(){
    const interactiveEls = [
        ...document.getElementsByClassName('nav-link'),
        ...document.getElementsByClassName('menu-item')
    ];

    interactiveEls.forEach(el => {
        el.addEventListener('click', () => {
            const id = el.dataset.key || el.id || el.textContent.trim();
            const storageKey = `adaptive_hits:${id}`;
            let hits = parseInt(localStorage.getItem(storageKey), 10) || 0;
            hits += 1;
            localStorage.setItem(storageKey, hits);
            console.info(`AdaptiveTracker: "${id}" -> ${hits}`);
            runAdaptation();
        });
    });

    function runAdaptation() {
        interactiveEls.forEach(el => {
            const id = el.dataset.key || el.id || el.textContent.trim();
            const storageKey = `adaptive_hits:${id}`;
            const hits = parseInt(localStorage.getItem(storageKey), 10) || 0;

            if (hits > 5) {
                el.style.backgroundColor = '#f6fffa';
                el.style.boxShadow = 'inset 6px 0 0 #28a745';
                el.style.fontWeight = '700';

                if (!el.querySelector('.adaptive-badge')) {
                    const badge = document.createElement('span');
                    badge.className = 'adaptive-badge';
                    badge.textContent = '★';
                    badge.style.marginLeft = '6px';
                    badge.style.color = '#28a745';
                    el.appendChild(badge);
                }
            }
        });
    }

    window.addEventListener('load', runAdaptation);
})();