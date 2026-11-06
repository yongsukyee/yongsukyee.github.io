/**
 * dark-mode-toggle.js — light/dark theme toggle.
 *
 * @author  Suk Yee Yong
 * Copyright (c) 2026 Suk Yee Yong. All rights reserved.
 *
 * Dark is the default; adding `body.light` switches to light. The choice is
 * remembered in localStorage and re-applied before paint on the next visit.
 * -------------------------------------------------------------------------
 */
(function () {
	'use strict';

	function isLight() { return localStorage.getItem('light-mode'); }
	function toggleClass() { document.body.classList.toggle('light'); }

	// Apply the saved preference on load.
	if (isLight()) toggleClass();

	var toggle = document.querySelector('.theme-icon');
	if (toggle) {
		toggle.addEventListener('click', function () {
			if (isLight()) localStorage.removeItem('light-mode');
			else localStorage.setItem('light-mode', 'set');
			toggleClass();
		});
	}
})();
