/**
 * timeline.js — About-page career timeline, newest first.
 * `org`/`detail` may contain <a> links; `docs` (chips under the card) is optional.
 *
 *   { year: '2026 — now', role: 'Title',
 *     org: '<a href="…">Org</a> · team', detail: 'One line.',
 *     docs: [ { href: '…', label: 'PhD Thesis', icon: 'fas fa-book' } ] }
 *
 * Copyright (c) 2026 Suk Yee Yong. All rights reserved.
 */
window.TIMELINE = [
	{
		year: '2023 — now',
		role: 'AI & ML Specialist',
		org: '<a href="https://www.csiro.au/" target="_blank" rel="noopener">CSIRO</a> · Scientific Computing',
		detail: 'Enabling scientific discovery through applied AI and machine learning',
	},
	{
		year: '2022 — 23',
		role: 'ASTRO 3D Postdoctoral Fellow in Data Intensive Astronomy',
		org: 'Macquarie University &amp; Australian Astronomical Optics Data Central',
		detail: 'Advancing next-generation astronomy through scalable AI-driven data pipelines',
	},
	{
		year: '2020 — 22',
		role: 'Postdoctoral Fellow in ML and AI Future Science Platform',
		org: '<a href="https://research.csiro.au/mlai-fsp/postdoc-alumni/" target="_blank" rel="noopener">CSIRO</a> · <a href="https://research.csiro.au/mlai-fsp/" target="_blank" rel="noopener">ML &amp; AI Future Science Platform</a>, <a href="https://www.csiro.au/en/research/technology-space/astronomy-space" target="_blank" rel="noopener">Space &amp; Astronomy</a>',
		detail: 'Finding the unknowns in radio astronomy',
	},
	{
		year: '2016 - 2020',
		role: 'PhD in Astrophysics',
		org: '<a href="http://physics.unimelb.edu.au/" target="_blank" rel="noopener">University of Melbourne</a> · supervised by <a href="https://www.ph.unimelb.edu.au/~rwebster/website/index.html" target="_blank" rel="noopener">Prof. Rachel Webster</a>',
		detail: 'Exploring the observable properties of quasars using simulations, statistical methods, and machine learning',
		docs: [
			{ href: 'https://hdl.handle.net/11343/234190', label: 'PhD Thesis', icon: 'fas fa-book' },
			{ href: 'images/PhDCover_sukyee.pdf', label: 'PhD Cover', icon: 'fas fa-book-open' }
		]
	}
];
