/**
 * profile.js — personal details. Used by the About terminal and Contact card.
 *
 * NOTE: some fields are also hardcoded in the SEO block of index.html <head>
 * — sync them as needed.
 *
 * Copyright (c) 2026 Suk Yee Yong. All rights reserved.
 */
window.PROFILE = {
	name: 'Suk Yee Yong',
	role: 'AI & ML Specialist · Astrophysicist',   // plain text — Contact card
	roleHtml: 'AI &amp; ML Specialist @ <a href="https://www.csiro.au/" target="_blank" rel="noopener">CSIRO</a>',  // may include links — About terminal
	mission: 'bridging the gap between AI and domain science',
	status: 'open to collaboration',
	email: 'sukyee.yong@csiro.au',
	org: 'CSIRO IM&T',
	location: 'CSIRO Dutton Park, QLD 4102, Australia',
	badgeId: 'ID · YONG.S',
	socials: [
		{ href: 'https://github.com/yongsukyee', label: 'GitHub', icon: 'fab fa-github-square' },
		{ href: 'https://orcid.org/0000-0002-5204-2902', label: 'ORCID', icon: 'fab fa-orcid' },
		{ href: 'https://au.linkedin.com/in/suk-yee-yong-98518a20b', label: 'LinkedIn', icon: 'fab fa-linkedin' }
	]
};
