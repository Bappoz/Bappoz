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
    name: "perceptor",
    descPt:
      "Modelo ECS baseado na bevy-engine para visão computacional, explorando arquitetura de dados orientada a entidades em Rust.",
    descEn:
      "An ECS model based on the bevy-engine for computer vision, exploring entity-oriented data architecture in Rust.",
    tags: ["Rust", "ECS", "Computer Vision"],
    category: "systems",
    language: "Rust",
    href: "https://github.com/Bappoz/perceptor",
  },
  {
    name: "Rustic3dGameEngine",
    descPt:
      "Engine de jogo 3D em Rust, refatoração e evolução de um projeto anterior em C++.",
    descEn:
      "A 3D game engine in Rust — a refactor and evolution of an earlier C++ project.",
    tags: ["Rust", "Graphics", "Engine"],
    category: "systems",
    language: "Rust",
    href: "https://github.com/Bappoz/Rustic3dGameEngine",
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
    name: "smart-shopper-mcp-server",
    descPt:
      "Agente de IA assistente de compras em Python + Model Context Protocol (MCP) para gestão inteligente de wishlist e orçamento.",
    descEn:
      "A shopping-assistant AI agent in Python + Model Context Protocol (MCP) for smart wishlist and budget management.",
    tags: ["Python", "MCP", "AI Agent"],
    category: "ai",
    language: "Python",
    href: "https://github.com/Bappoz/smart-shopper-mcp-server",
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
];
