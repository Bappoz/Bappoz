export type Category = "systems" | "ai" | "web";

export interface Project {
  name: string;
  descPt: string;
  descEn: string;
  tags: string[];
  category: Category;
  language: string;
  href: string; // code repo
  live?: string; // live product (overrides primary CTA target)
  featured?: boolean;
  award?: string;
}

// Curated — prioritizing well-built, technically deep projects.
export const projects: Project[] = [
  {
    name: "Nexo",
    descPt:
      "Plataforma de IA que transforma repositórios do GitHub em documentação interativa — análise automatizada, visualização de tech stack e podcasts explicando qualquer codebase. Premiado no MLH International Hacktown.",
    descEn:
      "AI platform that turns GitHub repositories into interactive documentation — automated analysis, tech-stack visualizations and podcasts explaining any codebase. MLH International Hacktown winner.",
    tags: ["TypeScript", "AI", "MLH Winner"],
    category: "ai",
    language: "TypeScript",
    href: "https://github.com/Hacktown-BSB/Nexo",
    featured: true,
    award: "MLH Hacktown Winner",
  },
  {
    name: "Farol",
    descPt:
      "Central de carreira local-first: coleta vagas remotas em seis portais, pontua cada uma contra o perfil do usuário, acompanha o pipeline de candidaturas, gera currículos direcionados em PDF e calcula o roadmap de estudos. Servidor em 127.0.0.1, dados em SQLite, nada sai da máquina.",
    descEn:
      "Local-first career hub: scrapes remote jobs from six boards, scores each one against the user's profile, tracks the application pipeline, generates targeted PDF resumes and computes a study roadmap. Server bound to 127.0.0.1, SQLite storage, nothing leaves the machine.",
    tags: ["Python", "FastAPI", "Local-first"],
    category: "web",
    language: "Python",
    href: "https://github.com/Bappoz/Farol",
    featured: true,
  },
  {
    name: "bpmn-flow",
    descPt:
      "Biblioteca modular que transforma diagramas BPMN 2.0 em automação de processos: parser para modelo normalizado, motor de execução por tokens (gateways, eventos de borda, subprocessos, terminate) e viewer interativo. Monorepo com core, viewer, server, CLI e playground.",
    descEn:
      "Modular library that turns BPMN 2.0 diagrams into process automation: parser to a normalized model, token-based execution engine (gateways, boundary events, subprocesses, terminate) and an interactive viewer. Monorepo with core, viewer, server, CLI and playground.",
    tags: ["TypeScript", "Monorepo", "Workflow Engine"],
    category: "web",
    language: "TypeScript",
    href: "https://github.com/Bappoz/bpmn-flow",
    live: "https://bappoz.github.io/bpmn-flow/",
    featured: true,
  },
  {
    name: "Crusty",
    descPt:
      "Compilador escrito em Rust, desenvolvido para a disciplina de Compiladores 1. Lexer, parser e análise semântica com foco em corretude.",
    descEn:
      "A compiler written in Rust, built for the Compilers 1 course. Lexer, parser and semantic analysis with a focus on correctness.",
    tags: ["Rust", "Compiler"],
    category: "systems",
    language: "Rust",
    href: "https://github.com/Bappoz/Crusty",
    featured: true,
  },
  {
    name: "Crianex",
    descPt:
      "Projeto da disciplina de Engenharia de Requisitos (REQ-T2), construído em Svelte. Produto completo com processo de requisitos documentado.",
    descEn:
      "Requirements Engineering course project (REQ-T2), built in Svelte. A complete product with a documented requirements process.",
    tags: ["Svelte", "Product", "Requirements"],
    category: "web",
    language: "Svelte",
    href: "https://github.com/mdsreq-fga-unb/REQ-2026.1-T02-Crianex-",
    live: "https://mdsreq-fga-unb.github.io/REQ-2026.1-T02-Crianex-/",
    featured: true,
  },
  {
    name: "utxo-blockchain",
    descPt:
      "Blockchain robusta e segura usando o modelo UTXO do Bitcoin, construída em Rust.",
    descEn:
      "A robust and secure blockchain using Bitcoin's UTXO model, built in Rust.",
    tags: ["Rust", "Blockchain"],
    category: "systems",
    language: "Rust",
    href: "https://github.com/Bappoz/utxo-blockchain",
    featured: true,
  },
  {
    name: "Colibri",
    descPt:
      "Engine de jogo 3D em Rust, refatoração e evolução de um projeto anterior em C++.",
    descEn:
      "A 3D game engine in Rust — a refactor and evolution of an earlier C++ project.",
    tags: ["Rust", "Graphics", "Engine"],
    category: "systems",
    language: "Rust",
    href: "https://github.com/Bappoz/colibri",
  },
  {
    name: "fundus-classification",
    descPt:
      "Pipeline de Deep Learning para detecção automática de retinopatia hipertensiva em imagens de fundoscopia ocular.",
    descEn:
      "A Deep Learning pipeline for automatic detection of hypertensive retinopathy in ocular fundus images.",
    tags: ["Python", "Deep Learning", "Medical"],
    category: "ai",
    language: "Python",
    href: "https://github.com/Bappoz/fundus-classification",
    featured: true,
  },
  {
    name: "voxForge-3d-assistant",
    descPt:
      "Modelagem 3D de formas com visualização e assistente de voz por IA para criação de shapes.",
    descEn:
      "3D shape modeling with visualization and an AI voice assistant for creating shapes.",
    tags: ["TypeScript", "3D", "AI Voice"],
    category: "ai",
    language: "TypeScript",
    href: "https://github.com/Bappoz/voxForge-3d-assistant",
  },
  {
    name: "chess_readme_status",
    descPt:
      "Ferramenta que gera cards de status com estatísticas de xadrez da Chess.com (rapid, blitz, bullet, daily) com múltiplos templates.",
    descEn:
      "A tool that generates status cards with Chess.com stats (rapid, blitz, bullet, daily) across multiple templates.",
    tags: ["JavaScript", "Tooling", "SVG"],
    category: "web",
    language: "JavaScript",
    href: "https://github.com/Bappoz/chess_readme_status",
  },
  
  {
    name: "Glioma Segmentation and Graduation",
    descPt:
      "Pipeline de duas etapas acopladas que (A) segmenta as sub-regiões do tumor (necrose/NCR, edema/ED, tumor ativo/ET) e (B) gradua a lesão (LGG × HGG) a partir da máscara segmentada.",
    descEn:
      "A coupled two-stage pipeline that (A) segments tumor sub-regions (necrosis/NCR, edema/ED, active tumor/ET) and (B) grades the lesion (LGG vs. HGG) based on the segmented mask.",
    tags: ["Python", "Computer Vision", "Machine Learning", "Math"],
    category: "ai",
    language: "Python",
    href: "https://github.com/Bappoz/glioma-seg-grad",
  },
];

