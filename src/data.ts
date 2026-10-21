export type Domain = "admin" | "import" | "web";
export type Filter = "all" | Domain;


export const profile = {
  name: "Feten Bejaoui",
  firstName: "Feten",
  lastName: "Bejaoui",
  role: "Chargée de Gestion Administrative & Opérations d'Import",
  tagline:
    "Plus de 7 ans d'expérience en gestion administrative, facturation et opérations d'importation — avec une vraie passion pour le développement web.",
  about:
    "Professionnelle polyvalente avec plus de 7 ans d'expérience au sein de STE Labidi Viandes, où j'ai développé une expertise solide en gestion administrative, facturation et suivi des opérations d'importation. Formée aux technologies de l'informatique, je conçois également des applications web modernes avec ReactJS — notamment le site web de l'entreprise.",
  email: "feten.bjeoui@gmail.com",
  phone: "+216 29 842 008",
  phoneHref: "tel:+21629842008",
  location: "Ariana, Tunisie",
  coordinates: "36.86° N · 10.19° E",
  linkedin: "https://www.linkedin.com/in/feten-bejaoui-b6988a1",
  linkedinLabel: "feten-bejaoui",
  availability: "Disponible pour de nouvelles opportunités",
  company: "STE Labidi Viandes",
  now: "Opérations d'importation et développement du site web de l'entreprise, depuis juin 2025.",
};

export const nav = [
  { href: "#accueil", label: "Accueil" },
  { href: "#apropos", label: "À propos" },
  { href: "#experience", label: "Expérience" },
  { href: "#competences", label: "Compétences" },
  { href: "#projets", label: "Projets" },
  { href: "#formation", label: "Formation" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  { value: 7, suffix: "+", label: "années d'expérience" },
  { value: 3, suffix: "", label: "projets réalisés" },
  { value: 2, suffix: "", label: "domaines d'expertise" },
];

export const marquee = [
  "Facturation",
  "Import",
  "Incoterms",
  "Douanes",
  "OMMP",
  "ReactJS",
  "Odoo 10",
  "Relation client",
  "Archivage",
  "JavaScript",
  "Conformité",
];

export const pillars: {
  domain: Domain;
  index: string;
  title: string;
  text: string;
}[] = [
  {
    domain: "admin",
    index: "01",
    title: "Gestion & facturation",
    text: "Cycle complet des factures et avoirs, factures électroniques, relation client, recouvrement et archivage numérique.",
  },
  {
    domain: "import",
    index: "02",
    title: "Opérations d'import",
    text: "Expéditions, autorisations, assurance, APE, contrôles techniques, documents, Incoterms et demandes OMMP.",
  },
  {
    domain: "web",
    index: "03",
    title: "Interfaces web",
    text: "Site de l'entreprise en ReactJS, MoviesApp, et un logiciel de suivi des équipements développé sous Odoo 10.",
  },
];

export const milestones = [
  {
    year: "2015",
    title: "Baccalauréat informatique",
    place: "Lycée Sidi Thabet, Ariana",
  },
  {
    year: "2018",
    title: "Licence appliquée",
    place: "ISET Bizerte · PFE Anged Tunisie",
  },
  {
    year: "2019",
    title: "Gestion & facturation",
    place: "STE Labidi Viandes",
  },
  {
    year: "2020",
    title: "Certificat Front-End",
    place: "GoMyCode, Tunis",
  },
  {
    year: "2025",
    title: "Import & site web",
    place: "STE Labidi Viandes",
  },
];

export type ExperienceItem = {
  id: string;
  period: string;
  title: string;
  company: string;
  current?: boolean;
  domain: Domain;
  icon: "ship" | "code" | "file";
  points: string[];
  tags: string[];
  note?: string;
};

export const experience: ExperienceItem[] = [
  {
    id: "import",
    period: "Depuis juin 2025",
    title: "Opérations d'importation",
    company: "STE Labidi Viandes — Ariana, Tunisie",
    current: true,
    domain: "import",
    icon: "ship",
    points: [
      "Suivi des expéditions et tracking des marchandises",
      "Suivi des autorisations d'importation et des dossiers d'assurance",
      "Suivi des APE, contrôles techniques et déclarations",
      "Contrôle de la conformité des documents d'import (facture commerciale, connaissement, certificat d'origine…)",
      "Vérification du respect des Incoterms, des délais et des obligations légales",
      "Veille de conformité réglementaire (codes des douanes, restrictions, normes)",
      "Création et gestion des demandes pour l'OMMP",
    ],
    tags: ["Import", "Douanes", "Incoterms", "Logistique"],
    note: "OMMP : Office de la Marine Marchande et des Ports. Incoterms : règles internationales de répartition des coûts et des risques.",
  },
  {
    id: "web",
    period: "En parallèle",
    title: "Développement web",
    company: "STE Labidi Viandes",
    current: true,
    domain: "web",
    icon: "code",
    points: [
      "Conception et développement du site web de l'entreprise avec ReactJS",
      "Présentation de l'entreprise : activités, articles, promotions, clients et partenaires",
    ],
    tags: ["ReactJS", "JavaScript", "Front-end"],
  },
  {
    id: "admin",
    period: "2019 — 2024",
    title: "Gestion administrative & facturation",
    company: "STE Labidi Viandes — Ariana, Tunisie",
    domain: "admin",
    icon: "file",
    points: [
      "Gestion du cycle complet de la facturation",
      "Émission et suivi des avoirs pour garantir l'exactitude comptable",
      "Gestion de la relation client liée à la facturation et recouvrement",
      "Production et envoi des factures électroniques conformes aux normes",
      "Classement et archivage numérique des documents financiers",
    ],
    tags: ["Facturation", "Comptabilité", "Relation client"],
  },
];

export const skills: {
  domain: Domain;
  title: string;
  icon: "briefcase" | "ship" | "code" | "wrench";
  items: string[];
}[] = [
  {
    domain: "admin",
    title: "Gestion & administration",
    icon: "briefcase",
    items: ["Facturation & avoirs", "Relation client", "Recouvrement", "Archivage numérique", "Comptabilité"],
  },
  {
    domain: "import",
    title: "Opérations d'import",
    icon: "ship",
    items: ["Incoterms", "Conformité douanière", "Documents d'import", "Suivi des expéditions", "Demandes OMMP"],
  },
  {
    domain: "web",
    title: "Développement web",
    icon: "code",
    items: ["ReactJS", "JavaScript", "Python", "Odoo 10", "HTML / CSS"],
  },
  {
    domain: "admin",
    title: "Outils & bureautique",
    icon: "wrench",
    items: ["Microsoft 365", "Outlook", "Logiciels de gestion", "StarUML", "Scrumblr"],
  },
];

export const languages = [
  { name: "Français", level: "Courant", width: "90%" },
  { name: "Anglais", level: "Intermédiaire", width: "70%" },
];

export type ProjectItem = {
  id: string;
  title: string;
  period: string;
  place: string;
  description: string;
  points: string[];
  tech: string[];
  domain: Domain;
  image: "web" | "movies" | "erp";
};

export const projects: ProjectItem[] = [
  {
  id: "suivi-importations",
  title: "Application de suivi des opérations d’importation",
  period: "2026",
  place: "Projet personnel",
  description:
    "Conception d’une application web pour suivre les dossiers d’importation, de la commande jusqu’à l’arrivée des marchandises. Elle centralise les échéances, les formalités et l’avancement des documents.",
  points: [
    "Création et suivi des dossiers : fournisseur, pays d’origine, marchandise et statut.",
    "Suivi des transports, des dates de départ et d’arrivée prévues (ETD/ETA) et des retards.",
    "Contrôle des factures, connaissements, certificats d’origine, autorisations et assurances.",
    "Recherche, filtres, alertes visuelles et export des dossiers au format CSV.",
    "Enregistrement des dossiers dans PostgreSQL avec Drizzle ORM.",
  ],
  tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
  domain: "web",
  image: "web",
},
  
  {
    id: "labidi",
    title: "Site web — STE Labidi Viandes",
    period: "En cours",
    place: "STE Labidi Viandes",
    description:
      "Conception et développement du site vitrine de l'entreprise : présentation des activités, articles, promotions, clients et partenaires.",
    points: [
      "Présentation des activités, des articles et des promotions",
      "Mise en avant des clients et des partenaires",
      "Interface conçue et développée avec ReactJS",
    ],
    tech: ["ReactJS", "JavaScript", "Front-end"],
    domain: "web",
    image: "web",
  },
  {
    id: "movies",
    title: "MoviesApp",
    period: "2020",
    place: "GoMyCode",
    description:
      "Application web permettant d'afficher et rechercher des films, avec un système d'évaluation pour chaque film présenté.",
    points: [
      "Affichage d'un catalogue de films",
      "Recherche dans la sélection",
      "Système d'évaluation pour chaque film",
    ],
    tech: ["React", "JavaScript", "API"],
    domain: "web",
    image: "movies",
  },
  {
    id: "erp",
    title: "Suivi des équipements",
    period: "2018 · PFE",
    place: "Anged Tunisie",
    description:
      "Modules de gestion de parc d'équipements, de suivi des interventions et de gestion des réclamations — de l'analyse des besoins au développement.",
    points: [
      "Gestion du parc d'équipements",
      "Suivi des interventions",
      "Gestion des réclamations",
      "De l'analyse des besoins jusqu'au développement",
    ],
    tech: ["Odoo 10", "Python", "JavaScript", "StarUML"],
    domain: "web",
    image: "erp",
  },
];

export const education = [
  {
    period: "2020",
    title: "Certificat Front-End Developer",
    school: "GoMyCode — Tunis",
    icon: "award" as const,
  },
  {
    period: "2015 — 2018",
    title: "Licence appliquée en technologies de l'informatique",
    school: "ISET Bizerte — Tunisie",
    icon: "grad" as const,
  },
  {
    period: "2014 — 2015",
    title: "Baccalauréat informatique",
    school: "Lycée Sidi Thabet — Ariana",
    icon: "grad" as const,
  },
];

export const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Tout voir" },
  { id: "admin", label: "Administration" },
  { id: "import", label: "Import" },
  { id: "web", label: "Web" },
];

export const topics = [
  "Opportunité professionnelle",
  "Mission import / administration",
  "Projet web",
  "Autre",
];
