// ============================================================
// CattleSense – Site Content
// Edit this file to update all text on the website.
// Components read from here; no hard-coded copy in components.
// "TODO" values render as a quiet "To be updated" chip.
// ============================================================

export const site = {
  name: "CattleSense",
  fullTitle: "Machine Learning Based Early Detection of Cattle Diseases",
  institute: "Sri Lanka Institute of Information Technology (SLIIT)",
  faculty: "Faculty of Computing",
  groupId: "R26-IT-045",
  liveUrl: "https://cattlesensesl.vercel.app/",
  summary:
    "A web platform for Sri Lankan smallholder dairy farmers that screens cattle for four diseases from phone photos and simple farm measurements, explains the result, and produces a bilingual report for the veterinarian.",
  seo: {
    description:
      "CattleSense is a machine learning platform for early detection of cattle diseases — Mastitis, FMD, LSD, and Milk Fever — built for Sri Lankan smallholder dairy farmers.",
    ogImage: "/assets/images/og-image.png",
    themeColor: "#0F766E",
  },
};

export const stats = [
  { value: "4", label: "Diseases", unit: "" },
  { value: "4", label: "ML Modules", unit: "" },
  { value: "2", label: "Languages", unit: "" },
  { value: "1", label: "Platform", unit: "" },
];

// ----------------------------------------------------------------
// MODULES – four disease detection modules
// ----------------------------------------------------------------
export const modules = [
  {
    id: "mastitis",
    slug: "mastitis",
    disease: "Mastitis",
    owner: "Perera L. C. C.",
    studentId: "IT22153036",
    tint: "teal",
    description:
      "Udder image analysis fused with milk biomarker data to detect mastitis early, with Grad-CAM explanations and severity staging.",
    models: ["ResNet50", "Decision Tree", "Grad-CAM"],
    metrics: [
      { label: "Image Model Accuracy", value: 87.01, unit: "%" },
      { label: "Image Model AUC", value: 0.9376, unit: "" },
      { label: "Biomarker Accuracy", value: 99.38, unit: "%" },
    ],
    inputs: [
      "Udder photograph (phone camera)",
      "Milk somatic cell count",
      "California Mastitis Test score",
      "Electrical conductivity reading",
    ],
    howItWorks:
      "A ResNet50 transfer-learning model classifies the udder image and produces a Grad-CAM heatmap highlighting the suspicious region. A decision tree model independently scores the milk biomarkers. Scores are fused to determine final severity stage.",
    outputs: [
      "Mastitis positive / negative result",
      "Severity stage (mild, moderate, severe)",
      "Grad-CAM visual explanation",
      "Bilingual PDF report (English & Sinhala)",
    ],
    image: "/assets/images/modules/mastitis.png",
  },
  {
    id: "fmd",
    slug: "fmd",
    disease: "Foot and Mouth Disease",
    shortDisease: "FMD",
    owner: "Sudasinghe D. D.",
    studentId: "IT22129512",
    tint: "amber",
    description:
      "EfficientNetB0 image model combined with clinical signs and real-time Open-Meteo weather data for robust FMD detection.",
    models: ["EfficientNetB0", "Weather API", "Clinical Fusion"],
    metrics: [
      { label: "Accuracy", value: 94.1, unit: "%" },
      { label: "AUC", value: 0.971, unit: "" },
    ],
    inputs: [
      "Lesion photograph (feet, mouth, tongue)",
      "Clinical signs checklist",
      "Farm GPS location (for weather data)",
    ],
    howItWorks:
      "EfficientNetB0 identifies FMD lesion patterns from images. Clinical signs data is encoded and merged with current Open-Meteo weather features (temperature, humidity) known to influence FMD spread. A fusion classifier produces the final prediction.",
    outputs: [
      "FMD positive / negative result",
      "Confidence score",
      "Recommended quarantine actions",
      "Bilingual PDF report",
    ],
    image: "/assets/images/modules/fmd.png",
  },
  {
    id: "lsd",
    slug: "lsd",
    disease: "Lumpy Skin Disease",
    shortDisease: "LSD",
    owner: "Manathunga M. A. A. S.",
    studentId: "IT22282422",
    tint: "leaf",
    description:
      "YOLOv8s real-time lesion detection combined with ResNet50 classification for accurate identification of lumpy skin disease.",
    models: ["YOLOv8s", "ResNet50", "Two-Stage Pipeline"],
    metrics: [
      { label: "Accuracy", value: 93.1, unit: "%" },
      { label: "AUC", value: 0.9637, unit: "" },
    ],
    inputs: [
      "Full body photograph of cattle",
      "Number of visible nodules",
      "Fever measurement",
    ],
    howItWorks:
      "YOLOv8s first runs real-time detection to locate and bound all skin lesions. Each detected region is then passed to a ResNet50 classifier that distinguishes LSD nodules from other skin conditions. Results are aggregated to produce a final diagnosis.",
    outputs: [
      "LSD positive / negative result",
      "Lesion bounding boxes on image",
      "Nodule count and severity",
      "Bilingual PDF report",
    ],
    image: "/assets/images/modules/lsd.png",
  },
  {
    id: "milk-fever",
    slug: "milk-fever",
    disease: "Milk Fever",
    shortDisease: "Milk Fever",
    owner: "Udawaththa M. P. A. M.",
    studentId: "IT22221728",
    tint: "rose",
    description:
      "Random Forest and XGBoost ensemble on clinical and production data achieves near-perfect accuracy for milk fever risk prediction.",
    models: ["Random Forest", "XGBoost", "Ensemble"],
    metrics: [
      { label: "Accuracy", value: 97.04, unit: "%" },
      { label: "AUC", value: 0.9986, unit: "" },
    ],
    inputs: [
      "Blood calcium level",
      "Days in milk",
      "Parity (number of calvings)",
      "Body condition score",
      "Milk yield history",
    ],
    howItWorks:
      "Clinical and production measurements are passed to an ensemble of Random Forest and XGBoost models. The ensemble vote is calibrated to produce a reliable probability score. High-risk cows are flagged before clinical signs appear.",
    outputs: [
      "Risk level (low / moderate / high)",
      "Probability score",
      "Preventive supplementation recommendations",
      "Bilingual PDF report",
    ],
    image: "/assets/images/modules/milk-fever.png",
  },
];

// ----------------------------------------------------------------
// DOMAIN SECTION
// ----------------------------------------------------------------
export const domain = {
  literatureSurvey: {
    body: "Cattle disease causes significant economic losses for smallholder dairy farmers in Sri Lanka. Existing approaches rely on manual veterinary inspection, which is expensive, slow, and unavailable in rural areas. Prior machine learning research has addressed individual diseases in isolation, typically in large-scale Western farming contexts. No integrated multi-disease platform existed for Sri Lankan smallholders prior to this project.",
  },
  researchGap: {
    intro:
      "A structured review of prior work identified the following gaps that CattleSense addresses:",
    table: [
      { capability: "Multi-disease detection in a single platform", prior: false, cattlesense: true },
      { capability: "Designed for smallholder farmers", prior: false, cattlesense: true },
      { capability: "Phone-based image capture", prior: false, cattlesense: true },
      { capability: "Explainable AI (Grad-CAM)", prior: false, cattlesense: true },
      { capability: "Bilingual output (English & Sinhala)", prior: false, cattlesense: true },
      { capability: "Weather data integration", prior: false, cattlesense: true },
      { capability: "Severity staging", prior: false, cattlesense: true },
      { capability: "Automated vet report generation", prior: false, cattlesense: true },
    ],
  },
  researchProblem:
    "Sri Lankan smallholder dairy farmers lack access to timely, affordable, and accurate disease detection for their cattle. Manual veterinary inspection is costly and infrequent, leading to late diagnosis and significant economic and animal welfare impacts. There is no digital, AI-powered platform suited to the local context, language, and farming conditions.",
  mainObjective:
    "To develop an integrated machine learning platform (CattleSense) that enables early and accurate detection of four economically significant cattle diseases — Mastitis, Foot and Mouth Disease, Lumpy Skin Disease, and Milk Fever — using images and simple measurements captured by farmers via a smartphone, with explainable results and bilingual reporting.",
  subObjectives: [
    {
      module: "Mastitis",
      objective:
        "Develop a dual-model system combining ResNet50 udder image analysis with a decision tree biomarker model, fused with Grad-CAM explanations and severity staging.",
    },
    {
      module: "Foot and Mouth Disease",
      objective:
        "Build an EfficientNetB0 image classifier augmented with clinical signs and Open-Meteo real-time weather features for contextually-aware FMD detection.",
    },
    {
      module: "Lumpy Skin Disease",
      objective:
        "Create a two-stage pipeline using YOLOv8s for lesion localisation followed by ResNet50 classification of detected regions.",
    },
    {
      module: "Milk Fever",
      objective:
        "Implement a Random Forest and XGBoost ensemble on clinical and production data to predict milk fever risk before clinical signs appear.",
    },
  ],
  methodology:
    "Each module followed a standard ML pipeline: data collection and augmentation, model selection and training, hyperparameter tuning, evaluation on held-out test sets, and integration into the shared Flask microservice API. Fusion strategies (score-level and feature-level) were applied where multiple models contribute to a single prediction. The system architecture uses Docker Compose for local orchestration and deploys to AWS EC2 with Nginx as a reverse proxy.",
  tools: {
    Frontend: ["React", "Vite", "Tailwind CSS"],
    Backend: ["Flask", "API Gateway", "Nginx"],
    "Machine Learning": ["TensorFlow / Keras", "scikit-learn", "XGBoost", "YOLOv8"],
    Data: ["Neon PostgreSQL", "Open-Meteo API"],
    Deployment: ["Docker Compose", "AWS EC2", "Vercel"],
  },
};

// ----------------------------------------------------------------
// MILESTONES
// ----------------------------------------------------------------
export const milestones = [
  { title: "Project Proposal", date: "TODO", marks: "TODO", status: "TODO" },
  { title: "Progress Presentation 1", date: "TODO", marks: "TODO", status: "TODO" },
  { title: "Progress Presentation 2", date: "TODO", marks: "TODO", status: "TODO" },
  { title: "Research Paper", date: "TODO", marks: "TODO", status: "TODO" },
  { title: "Final Presentation and Viva", date: "TODO", marks: "TODO", status: "TODO" },
  { title: "Final Report", date: "TODO", marks: "TODO", status: "TODO" },
  { title: "Website", date: "TODO", marks: "TODO", status: "TODO" },
];

// ----------------------------------------------------------------
// DOCUMENTS
// ----------------------------------------------------------------
export const documents = [
  {
    id: "project-charter",
    title: "Project Charter",
    description: "Scope, objectives, stakeholders, and timeline for CattleSense.",
    file: "/assets/documents/project-charter.pdf",
    type: "PDF",
    available: false,
  },
  {
    id: "proposal-documents",
    title: "Proposal Documents",
    description: "Full research proposal submitted to the faculty.",
    file: "/assets/documents/proposal-documents.zip",
    type: "ZIP",
    available: false,
  },
  {
    id: "checklist-documents",
    title: "Checklist Documents",
    description: "Project milestone checklist and deliverable tracking documents.",
    file: "/assets/documents/checklist-documents.zip",
    type: "ZIP",
    available: false,
  },
  {
    id: "final-reports",
    title: "Final Reports",
    description: "Complete final project report including all individual module reports.",
    file: "/assets/documents/final-reports.zip",
    type: "ZIP",
    available: false,
  },
  {
    id: "research-paper",
    title: "Research Paper",
    description: "Peer-reviewed research paper submitted for publication.",
    file: "/assets/documents/research-paper.pdf",
    type: "PDF",
    available: false,
  },
];

// ----------------------------------------------------------------
// PRESENTATIONS
// ----------------------------------------------------------------
export const presentations = [
  {
    id: "proposal-presentation",
    title: "Proposal Presentation",
    description: "Initial research proposal presented to the panel.",
    file: "/assets/documents/proposal-presentation.pdf",
    type: "PDF",
    available: false,
  },
  {
    id: "progress-presentation-1",
    title: "Progress Presentation 1",
    description: "First progress review — data collection and initial model results.",
    file: "/assets/documents/progress-presentation-1.pdf",
    type: "PDF",
    available: false,
  },
  {
    id: "progress-presentation-2",
    title: "Progress Presentation 2",
    description: "Second progress review — refined models and system integration.",
    file: "/assets/documents/progress-presentation-2.pdf",
    type: "PDF",
    available: false,
  },
  {
    id: "final-presentation",
    title: "Final Presentation",
    description: "Final viva presentation covering the complete CattleSense system.",
    file: "/assets/documents/final-presentation.pdf",
    type: "PDF",
    available: false,
  },
];

// ----------------------------------------------------------------
// TEAM
// ----------------------------------------------------------------
export const team = {
  supervisors: [
    {
      id: "supervisor",
      name: "TODO",
      title: "TODO",
      department: "TODO",
      email: "TODO",
      role: "Supervisor",
    },
    {
      id: "cosupervisor",
      name: "TODO",
      title: "TODO",
      department: "TODO",
      email: "TODO",
      role: "Co-supervisor",
    },
  ],
  members: [
    {
      id: "it22153036",
      name: "Perera L. C. C.",
      studentId: "IT22153036",
      component: "Mastitis Detection",
      email: "TODO",
      linkedin: "TODO",
      github: "TODO",
      photo: "/assets/images/team/it22153036.jpg",
    },
    {
      id: "it22129512",
      name: "Sudasinghe D. D.",
      studentId: "IT22129512",
      component: "FMD Detection",
      email: "TODO",
      linkedin: "TODO",
      github: "TODO",
      photo: "/assets/images/team/it22129512.jpg",
    },
    {
      id: "it22282422",
      name: "Manathunga M. A. A. S.",
      studentId: "IT22282422",
      component: "LSD Detection",
      email: "TODO",
      linkedin: "TODO",
      github: "TODO",
      photo: "/assets/images/team/it22282422.jpg",
    },
    {
      id: "it22221728",
      name: "Udawaththa M. P. A. M.",
      studentId: "IT22221728",
      component: "Milk Fever Detection",
      email: "TODO",
      linkedin: "TODO",
      github: "TODO",
      photo: "/assets/images/team/it22221728.jpg",
    },
  ],
};

// ----------------------------------------------------------------
// CONTACT
// ----------------------------------------------------------------
export const contact = {
  groupEmail: "TODO",
  inviteText:
    "Have questions about the research, want to collaborate, or are you a veterinarian interested in the system? We'd love to hear from you.",
};
