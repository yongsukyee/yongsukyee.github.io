/**
 * timeline-render.js — renders the About career timeline (ENGINE — no edits needed).
 *
 * @author  Suk Yee Yong
 * Copyright (c) 2026 Suk Yee Yong. All rights reserved.
 *
 * Reads window.TIMELINE (defined in content/timeline.js) and builds the cards
 * into #timeline. `org` / `detail` may contain HTML (author-controlled);
 * `docs` renders optional document chips under a card.
 * -------------------------------------------------------------------------
 */
(function () {
	'use strict';

	function start() {
		var root = document.getElementById('timeline');
		var data = window.TIMELINE;
		if (!root || !data) return;

		var frag = document.createDocumentFragment();
		data.forEach(function (item) {
			var wrap = document.createElement('div');
			wrap.className = 'tl-item';

			var card = document.createElement('div');
			card.className = 'tl-card';

			var head = document.createElement('div');
			head.className = 'tl-head';
			head.innerHTML = '<span class="chip chip-year">' + item.year + '</span>' +
				'<span class="tl-role">' + item.role + '</span>';
			card.appendChild(head);

			var org = document.createElement('div');
			org.className = 'tl-org';
			org.innerHTML = item.org;            // author-controlled (allows <a>)
			card.appendChild(org);

			if (item.detail) {
				var detail = document.createElement('p');
				detail.className = 'tl-detail';
				detail.innerHTML = item.detail;  // author-controlled
				card.appendChild(detail);
			}

			if (item.docs && item.docs.length) {
				var docs = document.createElement('div');
				docs.className = 'tl-docs';
				item.docs.forEach(function (d) {
					var a = document.createElement('a');
					a.className = 'tl-doc';
					a.href = d.href; a.target = '_blank'; a.rel = 'noopener';
					a.innerHTML = '<i class="' + d.icon + '"></i> ' + d.label;
					docs.appendChild(a);
				});
				card.appendChild(docs);
			}

			wrap.appendChild(card);
			frag.appendChild(wrap);
		});
		root.replaceChildren(frag);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', start);
	} else {
		start();
	}
})();
