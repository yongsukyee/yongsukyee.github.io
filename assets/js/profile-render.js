/**
 * profile-render.js — renders personal details into the page (ENGINE — no edits needed).
 *
 * @author  Suk Yee Yong
 * Copyright (c) 2026 Suk Yee Yong. All rights reserved.
 *
 * Reads window.PROFILE (defined in content/profile.js) and fills any element
 * carrying data-profile="<key>" with the matching value (email, socials, and
 * roleHtml are handled specially). Both the About whoami terminal and the
 * Contact ID card render from this.
 * -------------------------------------------------------------------------
 */
(function () {
	'use strict';

	function render() {
		var PROFILE = window.PROFILE;
		if (!PROFILE) return;
		document.querySelectorAll('[data-profile]').forEach(function (el) {
			var k = el.getAttribute('data-profile');
			if (k === 'emailLink') { el.href = 'mailto:' + PROFILE.email; el.textContent = PROFILE.email; }
			else if (k === 'socials') {
				PROFILE.socials.forEach(function (s) {
					var a = document.createElement('a');
					a.href = s.href; a.target = '_blank'; a.rel = 'noopener';
					a.setAttribute('aria-label', s.label);
					a.innerHTML = '<i class="' + s.icon + '"></i>';
					el.appendChild(a);
				});
			}
			else if (k === 'roleHtml') { el.innerHTML = PROFILE.roleHtml; }   // allows the inline CSIRO link
			else if (PROFILE[k] !== undefined) { el.textContent = PROFILE[k]; }
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', render);
	} else {
		render();
	}
})();
