/**
 * research.js — knowledge-graph topics. `left` = methods, `right` = sciences.
 * `match` lists project keywords the topic owns → drives "see related projects"
 * (shows projects whose own keywords include any of them).
 *
 *   { key: 'id',  // unique within the graph; internal handle only
 *     kind: 'method',  // kind: 'method' or 'science'
 *     label: 'Title', sub: 'subtitle',
 *     lead: 'One line description.',
 *     focus: ['point', 'point'],
 *     match: ['project', 'keywords'] }
 *
 * Copyright (c) 2026 Suk Yee Yong. All rights reserved.
 */
window.RESEARCH_GRAPH = {
	hub: 'AI × Science',
	left: [
		{
			key: 'mldl', kind: 'method',
			label: 'ML & Deep Learning', sub: 'cnn · transformers · autoencoder',
			lead: 'Designing and training models that learn structure from complex scientific data.',
			focus: ['Supervised & unsupervised learning', 'Representation & generative modelling'],
			match: ['deep learning', 'machine learning']
		},
		{
			key: 'llm', kind: 'method',
			label: 'LLMs & Agents', sub: 'fine-tuning · evaluation',
			lead: 'Building and assessing LLM systems that support scientific reasoning and analysis.',
			focus: ['Creating LLM agents', 'Retrieval-augmented workflows', 'Fine-tuning & evaluation'],
			match: ['llm']
		},
		{
			key: 'stats', kind: 'method',
			label: 'Statistics & Uncertainty', sub: 'conformal prediction · graphs',
			lead: 'Making model predictions more reliable, interpretable, and uncertainty-aware.',
			focus: ['Uncertainty quantification', 'Conformal prediction', 'Graph-based modelling'],
			match: ['graph', 'uncertainty quantification']
		},
		{
			key: 'anomaly', kind: 'method',
			label: 'Anomaly & Discovery', sub: 'rare signals · unexpected patterns',
			lead: 'Finding rare, unusual, and unexpected signals in large datasets.',
			focus: ['Anomaly & outlier detection', 'Data challenges'],
			match: ['anomaly detection']
		},
		{
			key: 'datatools', kind: 'method',
			label: 'Reproducible Workflows', sub: 'pipelines · apps · research software',
			lead: 'Turning research methods into reusable, transparent, and scalable tools.',
			focus: ['Data-intensive pipelines', 'Research software', 'Interactive applications'],
			match: ['app', 'pipeline', 'software']
		}
	],
	right: [
		{
			key: 'astro', kind: 'science',
			label: 'Astrophysics', sub: 'black holes · quasars',
			lead: 'Data-driven modelling and analysis of astrophysical data.',
			focus: ['Black hole mass estimation', 'Quasar disk-wind structure', 'Quasar orientation', 'Galaxy shape recovery'],
			match: ['black hole', 'disk-wind', 'galaxy', 'quasar', 'quasar orientation']
		},
		{
			key: 'biomed', kind: 'science',
			label: 'Biomedical & Health', sub: 'imaging · disease signals',
			lead: 'Medical imaging and health applications.',
			focus: ['Medical image analysis', 'Disease modelling'],
			match: ['biomedical']
		},
		{
			key: 'enviro', kind: 'science',
			label: 'Environmental', sub: 'climate · remote sensing',
			lead: 'Environmental monitoring and risk assessment.',
			focus: ['Climate risk & disclosure', 'Remote sensing & coastal mapping'],
			match: ['environment']
		},
		{
			key: 'biodiv', kind: 'science',
			label: 'Biodiversity', sub: 'eDNA · FAIR data',
			lead: 'Supporting biodiversity monitoring through better eDNA data and metadata workflows.',
			focus: ['Environmental DNA (eDNA)', 'FAIR data practices'],
			match: ['biodiversity']
		}
	]
};
