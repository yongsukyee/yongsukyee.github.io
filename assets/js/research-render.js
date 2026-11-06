/**
 * research-render.js — interactive Research pipeline graph (ENGINE — no edits needed).
 *
 * @author  Suk Yee Yong
 * Copyright (c) 2026 Suk Yee Yong. All rights reserved.
 *
 * Reads window.RESEARCH_GRAPH (defined in content/research.js) and builds the
 * methods ▸ core ▸ sciences graph: nodes render into the two columns, and
 * hovering/tapping a node fills the fixed centre panel with its detail. Each
 * node's `match` keywords are intersected with project keywords (from
 * projects.js) to drive the "see related projects" link.
 * -------------------------------------------------------------------------
 */
(function () {
	'use strict';

	function start() {
		var RESEARCH_GRAPH = window.RESEARCH_GRAPH;
		if (!RESEARCH_GRAPH) return;
		var grid = document.getElementById('kgrid');
		var panel = document.getElementById('kpanel');
		var colLeft = document.getElementById('kcol-left');
		var colRight = document.getElementById('kcol-right');
		if (!grid || !panel || !colLeft || !colRight) return;

		var pinned = null;
		var byKey = {};

		// Project keyword sets, read from the shared projects.js data.
		var PROJECT_KEYWORDS = (window.PROJECTS || []).map(function (p) { return p.keywords || []; });

		function countRelated(match) {
			if (!match || !match.length) return 0;
			return PROJECT_KEYWORDS.filter(function (kws) {
				return match.some(function (m) { return kws.indexOf(m) !== -1; });
			}).length;
		}

		function buildColumn(side, col) {
			RESEARCH_GRAPH[side].forEach(function (item, i) {
				var btn = document.createElement('button');
				btn.type = 'button';
				btn.className = 'knode';
				btn.setAttribute('data-key', item.key);
				btn.style.animationDelay = (0.15 + i * 0.07) + 's';
				btn.innerHTML = '<span class="kn-title">' + item.label + '</span>' +
					'<span class="kn-sub">' + item.sub + '</span>';
				col.appendChild(btn);
				byKey[item.key] = { item: item, node: btn };
			});
		}

		function show(node) {
			var rec = byKey[node.getAttribute('data-key')]; if (!rec) return;
			var d = rec.item;
			panel.querySelector('.kp-kind').textContent = d.kind;
			panel.querySelector('.kp-title').textContent = d.label;
			panel.querySelector('.kp-lead').textContent = d.lead;
			var list = panel.querySelector('.kp-list'); list.replaceChildren();
			(d.focus || []).forEach(function (f) {
				var li = document.createElement('li'); li.textContent = f; list.appendChild(li);
			});

			// "see related projects" — count derived by intersecting this node's
			// `match` keywords with each project's own keywords; the link filters
			// the Project showcase (window.showRelatedProjects, from projects-render).
			var related = panel.querySelector('.kp-related');
			var n = countRelated(d.match);
			if (n > 0) {
				related.hidden = false;
				related.textContent = 'see ' + n + ' related project' + (n > 1 ? 's' : '') + ' →';
				// keywords + topic label read by the delegated click handler below
				related.dataset.match = JSON.stringify(d.match || []);
				related.dataset.label = d.label;
			} else { related.hidden = true; }

			panel.classList.add('active');
			grid.classList.add('dim');
			Object.keys(byKey).forEach(function (k) {
				byKey[k].node.classList.toggle('active', byKey[k].node === node);
			});
		}
		function doHide() {
			panel.classList.remove('active');
			grid.classList.remove('dim');
			Object.keys(byKey).forEach(function (k) { byKey[k].node.classList.remove('active'); });
		}
		// Brief close delay so the cursor can travel from a node into the panel
		// (to click its link) without the panel closing through the gap.
		var hideTimer = null;
		function scheduleHide() {
			if (pinned) return;
			clearTimeout(hideTimer);
			hideTimer = setTimeout(doHide, 220);
		}
		function cancelHide() { clearTimeout(hideTimer); }
		function bind(node) {
			node.addEventListener('mouseenter', function () { cancelHide(); if (!pinned) show(node); });
			node.addEventListener('mouseleave', scheduleHide);
			node.addEventListener('focus', function () { cancelHide(); show(node); });
			node.addEventListener('blur', scheduleHide);
			node.addEventListener('click', function (e) {
				e.stopPropagation();
				if (pinned === node) { pinned = null; doHide(); }
				else { pinned = node; show(node); }
			});
		}

		buildColumn('left', colLeft);
		buildColumn('right', colRight);
		Object.keys(byKey).forEach(function (k) { bind(byKey[k].node); });

		// "see related projects" — one delegated handler on the panel. Filters the
		// showcase; the anchor's href="#project" handles navigation. stopPropagation
		// keeps the document dismiss handler (below) from closing the panel first.
		var relatedLink = panel.querySelector('.kp-related');
		if (relatedLink) {
			relatedLink.addEventListener('click', function (e) {
				e.stopPropagation();
				var match = [];
				try { match = JSON.parse(relatedLink.dataset.match || '[]'); } catch (err) {}
				if (typeof window.showRelatedProjects === 'function') {
					window.showRelatedProjects(match, relatedLink.dataset.label);
				}
				// release any pin so hovering elsewhere behaves normally afterwards
				pinned = null;
			});
		}

		// Keep the panel open while hovered (so its links are clickable), and treat
		// a click on it as "not clicking away".
		panel.addEventListener('mouseenter', cancelHide);
		panel.addEventListener('mouseleave', scheduleHide);
		panel.addEventListener('click', function (e) { e.stopPropagation(); });
		// Click anywhere else dismisses a pinned panel.
		document.addEventListener('click', function () { if (pinned) { pinned = null; doHide(); } });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', start);
	} else {
		start();
	}
})();
