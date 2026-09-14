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
  visual?: {
    src: string;
    kind:
      | "nexo-logo"
      | "farol-logo"
      | "screenshot"
      | "brand-logo"
      | "cover"
      | "figure";
  };
  coverTitle?: string;
  award?: string;
}

// Curated — prioritizing well-built, technically deep projects.
export const projects: Project[] = [
  {
    name: "Nexo",
    visual: { src: "projects/nexo-logo.webp", kind: "nexo-logo" },
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
    visual: { src: "projects/farol-logo.png", kind: "farol-logo" },
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
    visual: { src: "projects/bpmn-preview.webp", kind: "screenshot" },
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
    visual: { src: "projects/crianex-logo.webp", kind: "brand-logo" },
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
    coverTitle: "UTXO",
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
    visual: { src: "projects/colibri.png", kind: "brand-logo" },
    descPt:
      "Engine 2D/3D em Rust construída do zero: renderização de software, rasterização paralela, matemática 3D própria e entidades geracionais. Evolui por etapas testáveis em direção a uma arquitetura ECS.",
    descEn:
      "A 2D/3D Rust engine built from scratch: software rendering, parallel rasterization, custom 3D math and generational entities. Evolving through testable stages toward an ECS architecture.",
    tags: ["Rust", "Graphics", "Engine"],
    category: "systems",
    language: "Rust",
    href: "https://github.com/Bappoz/colibri",
  },
  {
    name: "image-compressor-quadtree",
    visual: { src: "projects/quadtree.webp", kind: "figure" },
    coverTitle: "Quadtree",
    descPt:
      "Compressor de imagens em escala de cinza sobre Quadtree: blocos homogêneos viram folhas com a cor média, heterogêneos são subdivididos por limiar de variância. Inclui busca espacial por pixel em O(profundidade) — com limiar 20, ~98% de redução mantendo PSNR acima de 30 dB. Trabalho de Estruturas de Dados 2.",
    descEn:
      "Grayscale image compressor built on a Quadtree: homogeneous blocks collapse into leaves holding the average color, heterogeneous ones are split by a variance threshold. Includes O(depth) spatial pixel lookup — at threshold 20, ~98% size reduction while keeping PSNR above 30 dB. Data Structures 2 course project.",
    tags: ["Python", "Data Structures", "Algorithms"],
    category: "systems",
    language: "Python",
    href: "https://github.com/Bappoz/image-compressor-quadtree",
  },
  {
    name: "fundus-classification",
    coverTitle: "Fundus",
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
    coverTitle: "VoxForge",
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
    name: "My-Claude-Skills",
    visual: { src: "logos/claude.svg", kind: "brand-logo" },
    coverTitle: "Claude Skills",
    descPt:
      "Coleção curada de 71 skills para Claude Code em 8 tópicos (design systems, engenharia, orquestração de agentes, produto). Cada skill é uma pasta autossuficiente com SKILL.md, gatilhos de ativação, tokens concretos e fontes externas reais para o modelo consultar antes de gerar output.",
    descEn:
      "A curated collection of 71 Claude Code skills across 8 topics (design systems, engineering, agent orchestration, product). Each skill is a self-contained folder with a SKILL.md, activation triggers, concrete tokens and real external sources the model pulls from before producing output.",
    tags: ["Claude Code", "AI Tooling", "Skills"],
    category: "ai",
    language: "Markdown",
    href: "https://github.com/Bappoz/My-Claude-Skills",
  },
  {
    name: "chess_readme_status",
    visual: { src: "projects/chess.webp", kind: "cover" },
    coverTitle: "Chess Stats",
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
    visual: { src: "projects/glioma.webp", kind: "figure" },
    coverTitle: "Glioma",
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
