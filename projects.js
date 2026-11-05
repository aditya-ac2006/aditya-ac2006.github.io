// Only publish contact details explicitly supplied for this portfolio.
// Empty values stay hidden. Email and GitHub were supplied by the owner for Contact.
window.portfolioContact = {
  email: 'aditya.ac2006@gmail.com',
  linkedin: '',
  github: 'https://github.com/aditya-ac2006'
};

// Current work only. Future directions live in window.portfolioNext below.
window.portfolioProjects = [
  {
    id: 'cmm', category: 'engineering', type: 'Formula Student', status: 'In development',
    title: 'From contact patch to suspension.',
    short: 'Tyre modelling and suspension-kinematics tools for CMM, built in MATLAB.',
    tags: ['MATLAB', 'Tyre modelling', 'Suspension kinematics'], visual: 'curve',
    heading: 'CMM / Tyres & suspension',
    sections: [
      ['The question', 'How do we turn tyre data and suspension geometry into useful, explainable vehicle-dynamics tools?'],
      ['Tyre modelling', 'A MATLAB workflow for validating raw inputs, checking sweeps, characterising operating conditions, fitting a lateral tyre model, and reviewing its limits. Raw data, characterisation, and model evaluation remain separate.'],
      ['Suspension design & kinematics', 'Alongside the tyre work, I’m building a MATLAB-based suspension workflow: audit imported geometry, check static link definitions, and explore front-suspension kinematics. The aim is to make geometry decisions easier to inspect and reduce dependence on Optimum Kinematics.'],
      ['My focus', 'Traceable inputs, clear conventions, repeatable checks, and graphs that help the team understand what a model can — and cannot — tell us.'],
      ['Status & boundaries', 'This is ongoing development, not a claim that the whole vehicle or suspension has been physically validated. The website’s slider uses synthetic data, not private TTC measurements or the validated CMM model.'],
      ['Photo context', 'The Formula Student photograph is a credited reference from another team’s car, not a picture of CMM or my own design.']
    ]
  },
  {
    id: 'dgx', category: 'compute', type: 'Campus learning', status: 'Hands-on learning',
    title: 'Learning on campus DGX.',
    short: 'Exploring GPU computing through my campus AI/ML workshop and DGX access.',
    tags: ['GPU computing', 'Linux', 'Containers', 'Run:AI'], visual: 'compute',
    heading: 'Campus DGX / AI & GPU workflows',
    sections: [
      ['The experience', 'Working with my campus DGX computing environment as part of an AI/ML and GPU-acceleration learning experience at Manipal, Bengaluru.'],
      ['What I’m learning', 'Linux fundamentals, container images and volumes, submitting workloads through Run:AI, and how GPU resources fit into a machine-learning workflow.'],
      ['Why it matters to me', 'It connects the code I write on my laptop with the infrastructure used for larger computational tasks. My focus is on understanding the workflow, not just running a command.'],
      ['Scope', 'Hands-on student learning. I’m not claiming production ML deployments, distributed-training expertise, or benchmark results.'],
      ['Photo context', 'The photograph shows a DGX-family B200/HGX board as a hardware reference. It is not a photograph of my campus machine and does not establish the model installed on campus.']
    ]
  },
  {
    id: 'portfolio', category: 'web', type: 'Web development', status: 'Evolving',
    title: 'A place to learn in public.',
    short: 'An evolving portfolio for projects, experiments, and the next thing I want to understand.',
    tags: ['HTML / CSS', 'JavaScript', 'Interaction'], visual: 'type',
    heading: 'Portfolio / Built to evolve',
    sections: [
      ['The idea', 'A personal home for projects that grows alongside my web-development skills.'],
      ['What works today', 'Responsive layouts, project filtering, native project dialogs, accessible chart values, and a synthetic tyre-response experiment.'],
      ['How I’m approaching it', 'A place to learn HTML, CSS, JavaScript, and interaction design through gradual improvements. The upcoming ASL project is a separate learn-by-building goal, not another finished product.'],
      ['Design approach', 'Clear typography, comfortable controls, honest project status, purposeful motion, and respect for system accessibility preferences.']
    ]
  }
];

window.portfolioNext = [
  {
    id: 'finance', label: 'Finance × language models', status: 'Early exploration',
    title: 'A custom LLM for everyday finance.',
    description: 'I’m exploring how to adapt and train an existing language model on curated finance knowledge, then build a platform for common money questions and foundational concepts.',
    difference: 'The aim isn’t to outsmart Astra or Opus. It’s to learn domain adaptation and build a focused finance-literacy experience with clear explanations, reference sources, and a defined set of questions to evaluate.',
    next: 'Curate a small finance FAQ dataset and held-out test set, compare retrieval with fine-tuning, and build a first Q&A prototype.',
    notes: [
      ['A different layer from agentic AI', 'Fine-tuning adapts a model’s behaviour. Agentic systems use models and tools to plan and act. My proposed first version is a focused question-answering platform, not an autonomous trader or money manager.'],
      ['What I want to test', 'Use retrieval to supply reference material and explore fine-tuning for answer style and task behaviour. Check answers against held-out questions instead of assuming domain training makes them more accurate.'],
      ['Current scope', 'An early learning project: no trained model, benchmark advantage, or deployed product claimed yet. Intended for financial education, not personalised investment advice.']
    ],
    references: [
      ['Model customisation & grounding', 'https://docs.cloud.google.com/docs/ai-ml/generative-ai/develop-generative-ai-application'],
      ['How agentic systems differ', 'https://www.anthropic.com/research/building-effective-agents']
    ],
    tags: ['Python', 'LLM fine-tuning', 'Financial literacy']
  },
  {
    id: 'asl', label: 'Language × web', status: 'Planned',
    title: 'Learn ASL. Build the practice.',
    description: 'A practice website for American Sign Language, built step by step as I learn both ASL and web development.',
    next: 'Learn the fundamentals, use reliable learning material, and build the first practice flow myself.',
    tags: ['American Sign Language', 'Web development', 'Learn by building']
  }
];
