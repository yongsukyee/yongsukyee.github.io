/**
 * projects-render.js — project showcase renderer.
 *
 * @author  Suk Yee Yong
 * Copyright (c) 2026 Suk Yee Yong. All rights reserved.
 *
 * Reads window.PROJECTS, renders a card grid, powers the live search +
 * keyword-tag filtering, and shows a custom HUD modal with the full abstract
 * + links. Self-contained: a single delegated click handler on the persistent
 * grid + one reusable modal, so re-rendering the cards on every keystroke
 * never breaks interactivity.
 *
 * Also exposes window.showRelatedProjects() for the research graph, and supports
 * deep-linking — index.html#<project-id> opens that project's modal.
 * -------------------------------------------------------------------------
 */
(function () {
	'use strict';

	// Fixed label + order for links. Only keys present on a project render.
	var LINK_LABELS = [
		['preprint', 'Preprint'],
		['doi', 'DOI'],
		['github', 'GitHub'],
		['app', 'App'],
		['data', 'Data'],
		['code', 'Code'],
		['overview', 'Overview']
	];

	// `related` holds keywords from a Research-graph node (OR-matched) and
	// `relatedLabel` the topic name for the banner; set via window.showRelatedProjects,
	// both null when not in "related" mode.
	var state = { query: '', activeTags: new Set(), related: null, relatedLabel: null };
	var ALL = [];
	var VISIBLE = [];      // currently-rendered list (for modal prev/next)
	var currentIndex = -1; // index into VISIBLE of the open modal
	var els = {};

	function init() {
		var projects = window.PROJECTS;
		if (!projects || !projects.length) return;

		els.grid = document.getElementById('project-grid');
		els.tags = document.getElementById('project-tags');
		els.search = document.getElementById('project-search');
		els.empty = document.getElementById('project-empty');
		els.clear = document.getElementById('project-clear');
		els.related = document.getElementById('project-related');
		if (!els.grid) return;

		// Newest first.
		ALL = projects.slice().sort(function (a, b) { return b.year - a.year; });

		buildTagChips();
		if (els.search) {
			els.search.addEventListener('input', function (e) {
				state.related = null; state.relatedLabel = null;   // manual search exits "related" mode
				state.query = e.target.value.trim().toLowerCase();
				apply();
			});
			setupCaret();
		}
		if (els.clear) {
			els.clear.addEventListener('click', clearAll);
		}
		if (els.related) {
			els.related.querySelector('.pr-clear').addEventListener('click', clearAll);
		}

		buildModal();
		els.grid.addEventListener('click', onGridClick);

		render(ALL);

		// Deep-link: index.html#<project-id> opens that project's modal, on load
		// and whenever the hash changes. Non-project hashes (#about, …) are ignored.
		openFromHash();
		window.addEventListener('hashchange', openFromHash);
	}

	// Open the modal for the project whose id matches the current URL hash.
	function openFromHash() {
		var id = location.hash.slice(1);
		if (!id) return;
		var p = ALL.filter(function (x) { return x.id === id; })[0];
		if (!p) return;
		currentIndex = VISIBLE.indexOf(p);
		openModal(p);
	}

	// Exposed for the Research graph's "see related projects" link.
	window.showRelatedProjects = showRelatedProjects;

	// ---- Robotic blinking caret -----------------------------------------
	// The native caret is faint and easy to miss, so we draw our own block
	// caret that tracks the real insertion point. A hidden mirror span
	// measures the text width up to the caret so it sits in the right place.
	function setupCaret() {
		var wrap = els.search.parentNode; // .project-search-wrap
		if (!wrap) return;

		var caret = document.createElement('span');
		caret.className = 'search-caret';
		caret.setAttribute('aria-hidden', 'true');

		var mirror = document.createElement('span');
		mirror.className = 'search-mirror';
		mirror.setAttribute('aria-hidden', 'true');

		wrap.appendChild(caret);
		wrap.appendChild(mirror);
		els.caret = caret;
		els.mirror = mirror;

		function position() {
			var val = els.search.value;
			var pos = els.search.selectionStart;
			if (pos === null || pos === undefined) pos = val.length;
			// Mirror the text before the caret (preserve spaces).
			mirror.textContent = val.slice(0, pos).replace(/ /g, ' ');
			caret.style.left = (els.search.offsetLeft + mirror.offsetWidth) + 'px';
		}

		function blink(on) { caret.classList.toggle('is-active', on); }

		['input', 'click', 'keyup', 'keydown', 'select'].forEach(function (ev) {
			els.search.addEventListener(ev, position);
		});
		els.search.addEventListener('focus', function () { blink(true); position(); });
		els.search.addEventListener('blur', function () { blink(false); });
		window.addEventListener('resize', position);
		position();
	}

	// ---- Tag chips -------------------------------------------------------

	function uniqueKeywords() {
		var set = new Set();
		ALL.forEach(function (p) {
			(p.keywords || []).forEach(function (k) { set.add(k); });
		});
		return Array.from(set).sort();
	}

	function buildTagChips() {
		if (!els.tags) return;
		var frag = document.createDocumentFragment();

		uniqueKeywords().forEach(function (tag) {
			var chip = document.createElement('button');
			chip.type = 'button';
			chip.className = 'tag-chip';
			chip.textContent = tag;
			chip.setAttribute('aria-pressed', 'false');
			chip.addEventListener('click', function () {
				state.related = null; state.relatedLabel = null;   // manual tag click exits "related" mode
				if (state.activeTags.has(tag)) {
					state.activeTags.delete(tag);
					chip.classList.remove('active');
					chip.setAttribute('aria-pressed', 'false');
				} else {
					state.activeTags.add(tag);
					chip.classList.add('active');
					chip.setAttribute('aria-pressed', 'true');
				}
				apply();
			});
			frag.appendChild(chip);
		});

		els.tags.appendChild(frag);
	}

	// Clear search box + de-activate every tag chip (shared reset).
	function resetControls() {
		state.activeTags.clear();
		state.query = '';
		if (els.search) els.search.value = '';
		if (els.tags) {
			els.tags.querySelectorAll('.tag-chip.active').forEach(function (c) {
				c.classList.remove('active');
				c.setAttribute('aria-pressed', 'false');
			});
		}
	}

	// Clear control (beside search) + the banner ✕: reset everything.
	function clearAll() {
		resetControls();
		state.related = null;
		state.relatedLabel = null;
		apply();
	}

	// Public hook for the Research graph's "see related projects" link: filter the
	// showcase to projects matching ANY of `keywords`; `label` names the topic in
	// the banner. Resets the other controls so the related set shows cleanly.
	function showRelatedProjects(keywords, label) {
		resetControls();
		state.related = (keywords || []).slice();
		state.relatedLabel = label || null;
		apply();
	}

	// Show/hide the "related projects" banner to match the current state.
	// Lead text states the count + topic; the matched keywords show as chips.
	function renderRelatedBanner(count) {
		if (!els.related) return;
		if (state.related && state.related.length) {
			var label = state.relatedLabel ? ' to ' + state.relatedLabel : '';
			els.related.querySelector('.pr-text').textContent =
				count + ' project' + (count === 1 ? '' : 's') + ' related' + label;
			var chips = els.related.querySelector('.pr-chips');
			chips.replaceChildren();
			state.related.forEach(function (kw) {
				var c = document.createElement('span');
				c.className = 'chip';
				c.textContent = kw;
				chips.appendChild(c);
			});
			els.related.hidden = false;
		} else {
			els.related.hidden = true;
		}
	}

	// ---- Filtering -------------------------------------------------------

	function matches(p) {
		var kws = p.keywords || [];
		// "Related projects" from a Research node: OR-match any of its keywords.
		if (state.related && state.related.length) {
			var any = state.related.some(function (t) { return kws.indexOf(t) !== -1; });
			if (!any) return false;
		}
		if (state.activeTags.size) {
			var allPresent = true;
			state.activeTags.forEach(function (t) {
				if (kws.indexOf(t) === -1) allPresent = false;
			});
			if (!allPresent) return false;
		}
		if (state.query) {
			var hay = (p.title + ' ' + p.shortTitle + ' ' + kws.join(' ')).toLowerCase();
			if (hay.indexOf(state.query) === -1) return false;
		}
		return true;
	}

	function apply() {
		var list = ALL.filter(matches);
		render(list);
		renderRelatedBanner(list.length);
	}

	// ---- Rendering -------------------------------------------------------

	function render(list) {
		VISIBLE = list;
		els.grid.replaceChildren();
		if (els.empty) els.empty.hidden = list.length !== 0;
		if (!list.length) return;

		var frag = document.createDocumentFragment();
		list.forEach(function (p) { frag.appendChild(cardEl(p)); });
		els.grid.appendChild(frag);
	}

	function cardEl(p) {
		var card = document.createElement('article');
		card.className = 'project-card';
		card.id = p.id;
		card.tabIndex = 0;
		card.setAttribute('role', 'button');
		card.setAttribute('aria-label', p.shortTitle);
		card._project = p; // referenced by the delegated click handler

		// Decorative HUD corner brackets.
		['tl', 'tr', 'bl', 'br'].forEach(function (corner) {
			var c = document.createElement('span');
			c.className = 'corner corner-' + corner;
			c.setAttribute('aria-hidden', 'true');
			card.appendChild(c);
		});

		var media = document.createElement('div');
		media.className = 'card-media';
		var img = document.createElement('img');
		img.src = p.image;
		img.alt = p.shortTitle;
		img.loading = 'lazy';
		media.appendChild(img);

		// Title overlaid on the image bottom (on a glass scrim, see .card-overlay).
		// A card title is content/data (the project name), not a section heading —
		// so it's a plain element, not an <h3>. Keeps the heading hue reserved for
		// real sub-headers (modal title, Contact labels, Research entries).
		var overlay = document.createElement('div');
		overlay.className = 'card-overlay';
		var title = document.createElement('div');
		title.className = 'card-title';
		title.textContent = p.shortTitle;
		overlay.appendChild(title);
		media.appendChild(overlay);
		card.appendChild(media);

		// Slim foot strip: year + a few smaller keyword chips.
		var foot = document.createElement('div');
		foot.className = 'card-foot';

		var year = document.createElement('span');
		year.className = 'chip chip-year';
		year.textContent = p.year;
		foot.appendChild(year);

		(p.keywords || []).slice(0, 3).forEach(function (k) {
			var chip = document.createElement('span');
			chip.className = 'chip';
			chip.textContent = k;
			foot.appendChild(chip);
		});

		card.appendChild(foot);
		return card;
	}

	// ---- Modal -----------------------------------------------------------

	function onGridClick(e) {
		var card = e.target.closest('.project-card');
		if (card && card._project) {
			currentIndex = VISIBLE.indexOf(card._project);
			openModal(card._project);
		}
	}

	// Step to the previous/next project within the currently-visible list.
	function navModal(delta) {
		if (!VISIBLE.length || currentIndex < 0) return;
		var n = VISIBLE.length;
		currentIndex = (currentIndex + delta + n) % n; // wrap around
		fillModal(VISIBLE[currentIndex]);
	}

	function buildModal() {
		if (document.getElementById('project-modal')) return;

		var overlay = document.createElement('div');
		overlay.id = 'project-modal';
		overlay.className = 'project-modal';
		overlay.hidden = true;
		overlay.setAttribute('role', 'dialog');
		overlay.setAttribute('aria-modal', 'true');
		overlay.setAttribute('aria-labelledby', 'project-modal-title');

		var panel = document.createElement('div');
		panel.className = 'modal-panel';

		var close = document.createElement('button');
		close.type = 'button';
		close.className = 'modal-close';
		close.setAttribute('aria-label', 'Close');
		close.innerHTML = '&times;';
		close.addEventListener('click', closeModal);

		var prev = document.createElement('button');
		prev.type = 'button';
		prev.className = 'modal-nav modal-prev';
		prev.setAttribute('aria-label', 'Previous project');
		prev.innerHTML = '&#8249;';
		prev.addEventListener('click', function () { navModal(-1); });

		var next = document.createElement('button');
		next.type = 'button';
		next.className = 'modal-nav modal-next';
		next.setAttribute('aria-label', 'Next project');
		next.innerHTML = '&#8250;';
		next.addEventListener('click', function () { navModal(1); });

		var year = document.createElement('span');
		year.className = 'chip chip-year modal-year';

		var title = document.createElement('h3');
		title.id = 'project-modal-title';
		title.className = 'modal-title';

		var media = document.createElement('div');
		media.className = 'modal-media';
		var img = document.createElement('img');
		img.className = 'modal-img';
		img.alt = '';
		media.appendChild(img);

		var collab = document.createElement('p');
		collab.className = 'modal-collab';
		collab.hidden = true;

		var abstract = document.createElement('p');
		abstract.className = 'modal-abstract';

		var links = document.createElement('div');
		links.className = 'modal-links';

		var tags = document.createElement('div');
		tags.className = 'modal-tags';

		panel.appendChild(close);
		panel.appendChild(prev);
		panel.appendChild(next);
		panel.appendChild(year);
		panel.appendChild(title);
		panel.appendChild(media);
		panel.appendChild(collab);
		panel.appendChild(abstract);
		panel.appendChild(links);
		panel.appendChild(tags);
		overlay.appendChild(panel);
		document.body.appendChild(overlay);

		overlay.addEventListener('click', function (e) {
			if (e.target === overlay) closeModal();
		});
		document.addEventListener('keydown', function (e) {
			if (overlay.hidden) return;
			if (e.key === 'Escape') closeModal();
			else if (e.key === 'ArrowLeft') navModal(-1);
			else if (e.key === 'ArrowRight') navModal(1);
		});

		els.modal = overlay;
		els.modalPanel = panel;
		els.modalPrev = prev;
		els.modalNext = next;
		els.modalYear = year;
		els.modalImg = img;
		els.modalTitle = title;
		els.modalCollab = collab;
		els.modalAbstract = abstract;
		els.modalLinks = links;
		els.modalTags = tags;
		els.modalClose = close;
	}

	// Populate the (already-built) modal with a project's content.
	function fillModal(p) {
		els.modalTitle.textContent = p.title;
		if (els.modalYear) els.modalYear.textContent = p.year;
		if (els.modalImg) {
			els.modalImg.src = p.image;
			els.modalImg.alt = p.shortTitle;
		}

		if (p.collaborators) {
			els.modalCollab.innerHTML = p.collaborators;
			els.modalCollab.hidden = false;
		} else {
			els.modalCollab.hidden = true;
		}

		els.modalAbstract.innerHTML = p.abstract; // author-controlled (allows <i>)

		els.modalLinks.replaceChildren();
		LINK_LABELS.forEach(function (pair) {
			var key = pair[0], label = pair[1];
			if (p.links && p.links[key]) {
				var a = document.createElement('a');
				a.className = 'modal-link';
				a.href = p.links[key];
				a.target = '_blank';
				a.rel = 'noopener';
				a.textContent = label;
				els.modalLinks.appendChild(a);
			}
		});

		els.modalTags.replaceChildren();
		(p.keywords || []).forEach(function (k) {
			var chip = document.createElement('span');
			chip.className = 'chip';
			chip.textContent = k;
			els.modalTags.appendChild(chip);
		});

		// Prev/next only make sense when more than one project is visible.
		var multi = VISIBLE.length > 1;
		if (els.modalPrev) els.modalPrev.hidden = !multi;
		if (els.modalNext) els.modalNext.hidden = !multi;

		// Scroll back to top + replay the content fade when navigating.
		if (els.modalPanel) {
			els.modalPanel.scrollTop = 0;
			els.modalPanel.classList.remove('modal-swap');
			// force reflow so the animation can restart
			void els.modalPanel.offsetWidth;
			els.modalPanel.classList.add('modal-swap');
		}
	}

	function openModal(p) {
		fillModal(p);
		els.modal.hidden = false;
		document.body.classList.add('modal-open');
		els.modalClose.focus();
	}

	function closeModal() {
		if (!els.modal) return;
		els.modal.hidden = true;
		document.body.classList.remove('modal-open');
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
