/**
 * projects.js — project showcase data. Sorted by year (newest first) at render.
 *
 *   { id: 'project-slug',               // unique; deep-link: index.html#project-slug opens this card
 *     title: 'Full title (modal)',
 *     shortTitle: 'Card label',
 *     image: 'images/project/x.png',
 *     year: 2026,
 *     abstract: '[problem / motivation / need]. [method / approach]. [contribution / value / impact]. (may include <i>…</i>).',
 *     keywords: ['lowercase', 'tags'],  // power search + filters + research links
 *     links: { preprint, doi, github, app, data, code, overview },  // only present keys show
 *     collaborators: 'optional HTML' }
 *
 * Copyright (c) 2026 Suk Yee Yong. All rights reserved.
 */
window.PROJECTS = [
	{
		id: 'project-causolyst',
		title: 'Causolyst: CAUSal Open Llm anaLYST',
		shortTitle: 'Causolyst',
		image: 'images/project/causolyst.png',
		year: 2026,
		abstract: 'Scientific papers often contain rich causal knowledge, but tracing mechanisms and evidence across documents remains slow and manual. Causolyst ingests research PDFs, extracts causal relations into a persistent knowledge graph, and supports interactive reasoning through ranked paths, relation tables, graph exploration, and multi-turn chat. Built for document-grounded analysis, it runs locally with open-weight models and also supports major LLM providers.',
		keywords: ['app', 'llm'],
		links: {
			preprint: 'https://openreview.net/forum?id=tu91gS5jZO',
		}
	},
	{
		id: 'project-fairefier',
		title: 'FAIRe-fier: FAIR eDNA metadata verifier',
		shortTitle: 'FAIRe-fier',
		image: 'images/project/fairefier.png',
		year: 2025,
		abstract: 'High-quality metadata is essential for making environmental DNA datasets reusable, but checking metadata quality can be inconsistent and time-consuming. FAIRe-fier validates metadata completeness and consistency against FAIR data principles through a web-based interface that requires no scripting. The tool helps researchers produce more standardised, discoverable, reusable, and interoperable biodiversity data.',
		keywords: ['app', 'biodiversity', 'software'],
		links: {
			doi: 'http://hdl.handle.net/102.100.100/706519',
			app: 'https://shiny.csiro.au/FAIRe-fier',
			code: 'http://hdl.handle.net/102.100.100/734538'
		}
	},
	{
		id: 'project-sandybeachdl',
		title: 'Regional-Scale Image Segmentation of Sandy Beaches in Southeastern Australia',
		shortTitle: 'Sandy Beach Image Segmentation',
		image: 'images/project/sandybeachmappingdl_pipeline.jpg',
		year: 2024,
		abstract: 'Reliable beach maps are critical for coastal risk assessment, but manually mapping sandy shorelines across large regions is difficult to scale. This pipeline uses deep learning-based image segmentation to detect sandy beach outlines across southeastern Australia. The resulting maps support coastal vulnerability assessment, environmental monitoring, and shoreline management.',
		keywords: ['deep learning', 'environment', 'pipeline', 'software'],
		links: {
			doi: 'https://doi.org/10.3390/rs16183534',
			code: 'http://hdl.handle.net/102.100.100/636534'
		}
	},
	{
		id: 'project-galaxyshape',
		title: 'Galaxy 3D Shape Recovery using Mixture Density Network',
		shortTitle: 'Galaxy 3D Shape using Deep Learning',
		image: 'images/project/galaxyshape_mdn.png',
		year: 2024,
		abstract: 'Galaxies are observed in projection, making their intrinsic 3D shapes difficult to recover from two-dimensional data. This approach uses mixture density networks to infer galaxy shapes from projected stellar kinematics and flux distributions while estimating uncertainty. The model improves recovery for complex prolate and triaxial systems.',
		keywords: ['galaxy', 'machine learning', 'pipeline'],
		links: {
			preprint: 'https://arxiv.org/abs/2404.04491',
			doi: 'https://doi.org/10.1017/pasa.2024.32',
			overview: 'https://adacs.org.au/project/shaping-a-galaxy-an-internship-success-story/'
		}
	},
	{
		id: 'project-uqmbh',
		title: 'Uncertainty Quantification of the Virial Black Hole Mass with Conformal Prediction',
		shortTitle: 'Black Hole Mass with Conformal Prediction',
		image: 'images/project/uqmbh_pipeline.png',
		year: 2023,
		abstract: 'Black hole masses are difficult to measure directly at high redshift, making uncertainty-aware estimates essential for reliable inference. This method applies conformalised quantile regression to machine-learning-based virial mass estimates. It produces adaptive prediction intervals that better capture variation across black hole mass and quasar properties.',
		keywords: ['black hole', 'machine learning', 'quasar', 'uncertainty quantification', 'pipeline'],
		links: {
			preprint: 'https://arxiv.org/abs/2307.04993',
			doi: 'https://doi.org/10.1093/mnras/stad2080',
			github: 'https://github.com/yongsukyee/uncertain_blackholemass'
		}
	},
	{
		id: 'project-sparkesx',
		title: 'SPARKESX: Single-dish PARKES data sets for finding the uneXpected — A data challenge',
		shortTitle: 'SPARKESX Data Challenge',
		image: 'images/project/sparkesx_multi.png',
		year: 2022,
		abstract: 'Unexpected astronomical signals are often hidden in large radio datasets, where detection depends on robust and adaptable algorithms. SPARKESX provides real and simulated high-time-resolution observations from the Parkes Murriyang radio telescope as a community data challenge. The dataset supports algorithm development for transient, anomalous, and unusual source detection.',
		keywords: ['anomaly detection', 'extraterrestrial intelligence', 'transient'],
		links: {
			preprint: 'https://arxiv.org/abs/2209.03080',
			doi: 'https://doi.org/10.1093/mnras/stac2558',
			data: 'https://doi.org/10.25919/fd4f-0g20'
		}
	},
	{
		id: 'project-qsoorientation',
		title: 'Determining Quasar Orientation',
		shortTitle: 'Quasar Orientation Indicator',
		image: 'images/project/diffv+ratiofwhm_orientation.png',
		year: 2020,
		abstract: 'Quasar properties depend strongly on viewing angle, but practical orientation indicators remain difficult to establish. This analysis identifies a correlation between ultraviolet-optical emission-line velocity shifts and line widths as a simple orientation diagnostic. The result supports orientation-based interpretations of quasar and active galactic nucleus structure.',
		keywords: ['disk-wind', 'quasar', 'quasar orientation'],
		links: {
			preprint: 'https://arxiv.org/abs/1910.13597',
			doi: 'https://doi.org/10.1093/mnras/stz3074'
		}
	},
	{
		id: 'project-eyedl',
		title: 'The Eyes and the Sky: Medical Image Analysis with Astrophysics Supercomputing',
		shortTitle: 'Retinal Imaging with Deep Learning',
		image: 'images/project/eye_dr.png',
		year: 2020,
		abstract: 'Medical imaging often lacks large labelled datasets, limiting the use of conventional supervised learning approaches. This work uses autoencoders to learn compact spectral representations from hyperspectral retinal images without labelled training data. The approach enables feature discovery and offers a scalable path toward anomaly detection in complex biomedical images.',
		keywords: ['anomaly detection', 'biomedical', 'deep learning', 'machine learning'],
		links: {},
		collaborators: 'In collaboration with <a href="https://www.cera.org.au/" target="_blank" rel="noopener">Centre for Eye Research Australia (CERA)</a> and <a href="https://www.swinburne.edu.au/research/centres-groups-clinics/centre-for-astrophysics-supercomputing/" target="_blank" rel="noopener">Centre for Astrophysics &amp; Supercomputing, Swinburne University of Technology</a>'
	},
	{
		id: 'project-balq',
		title: 'Using the Properties of Broad Absorption Line Quasars to Illuminate Quasar Structure',
		shortTitle: 'Broad Absorption Line Quasars with Machine Learning',
		image: 'images/project/agnwind.png',
		year: 2018,
		abstract: 'Broad absorption line quasars offer important clues about quasar outflows, but their relationship to non-BAL quasars remains debated. Statistical analysis and supervised machine learning are used to test whether continuum and emission-line properties can distinguish the two populations. The results challenge narrow disk-wind models and support a broader, clumpy outflow structure.',
		keywords: ['disk-wind', 'machine learning', 'quasar', 'quasar orientation'],
		links: {
			preprint: 'https://arxiv.org/abs/1806.07090',
			doi: 'https://doi.org/10.1093/mnras/sty1540'
		}
	},
	{
		id: 'project-kinematicdw',
		title: 'The Kinematics of Quasar Broad Emission Line Region Using a Disk-wind Model',
		shortTitle: 'Quasar Disk-wind Modelling',
		image: 'images/project/kinematic_dw.png',
		year: 2017,
		abstract: 'The shapes and variability of quasar broad emission lines encode information about the geometry and motion of gas near the central black hole. This model combines wind geometry, orientation, emission-region structure, and radiative transfer in the Sobolev limit. It reproduces key line-profile shapes and reverberation behaviours observed in quasar broad line regions.',
		keywords: ['disk-wind', 'quasar', 'quasar orientation'],
		links: {
			preprint: 'https://arxiv.org/abs/1708.07237',
			doi: 'https://doi.org/10.1017/pasa.2017.37'
		}
	},
	{
		id: 'project-mbhestimate',
		title: 'Black Hole Mass Estimation: How Good is the Virial Estimate?',
		shortTitle: 'Virial Black Hole Mass Estimate',
		image: 'images/project/mbh.png',
		year: 2016,
		abstract: 'Virial black hole mass estimates are widely used for distant active galaxies, but their accuracy depends on uncertain assumptions about broad-line-region structure. A dynamical disk-wind model is used to test how geometry, inclination, emission-region location, and line-width measurement affect the virial scale factor. The results highlight key sources of bias in black hole mass inference.',
		keywords: ['black hole', 'disk-wind', 'quasar'],
		links: {
			preprint: 'https://arxiv.org/abs/1602.04672',
			doi: 'https://doi.org/10.1017/pasa.2016.8'
		}
	},
];
