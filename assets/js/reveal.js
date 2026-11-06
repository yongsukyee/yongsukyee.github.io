/**
 * reveal.js — scroll-reveal: fade + rise as elements enter the viewport.
 *
 * @author  Suk Yee Yong
 * Copyright (c) 2026 Suk Yee Yong. All rights reserved.
 *
 * The `.reveal` (hidden) class is added HERE, not in the HTML, so a JS-off /
 * crawler view shows everything. The observer reveals each block ONCE as it
 * scrolls in (then unobserves) — revealing once keeps the motion calm and
 * avoids the re-hide/replay flash you get from toggling on every scroll pass.
 * The home hero animates on load via CSS, so it's excluded here.
 * Honors prefers-reduced-motion by revealing instantly.
 * -------------------------------------------------------------------------
 */
(function () {
	'use strict';

	// One reveal target PER SECTION: the section's `.content` panel, revealed as
	// a single unit (targeting inner blocks too would double-animate the boxed
	// sections). `.section .content` excludes the home hero (`.hero`, which has
	// its own load animation), so every scrolled-to section flows the same.
	var SELECTORS = [
		'.section .content'
	];

	var nodes = [];

	function collect() {
		SELECTORS.forEach(function (sel) {
			document.querySelectorAll(sel).forEach(function (el) {
				if (nodes.indexOf(el) === -1) nodes.push(el);
			});
		});
	}

	function start() {
		collect();
		if (!nodes.length) return;

		nodes.forEach(function (el) { el.classList.add('reveal'); });

		var reduce = window.matchMedia &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reduce || !('IntersectionObserver' in window)) {
			nodes.forEach(function (el) { el.classList.add('is-visible'); });
			return;
		}

		// Reveal once, then stop watching. A small stagger between siblings that
		// land together gives a sense of order without dragging the whole page.
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry, i) {
				if (!entry.isIntersecting) return;
				var el = entry.target;
				el.style.setProperty('--reveal-delay', (i % 3) * 120 + 'ms');
				el.classList.add('is-visible');
				io.unobserve(el);
			});
		}, {
			// Trigger as soon as a sliver enters, biased so the reveal starts a
			// touch BEFORE the element is centred — so bottom-of-page items
			// (e.g. the contact social icons) don't wait for a full scroll.
			threshold: 0.08,
			rootMargin: '0px 0px -8% 0px'
		});

		nodes.forEach(function (el) { io.observe(el); });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', start);
	} else {
		start();
	}
})();
