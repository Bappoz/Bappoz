# Bappoz — portfólio pessoal (vitrine bilíngue)

É a minha vitrine pública: peso visual e performance importam mais que abstração.

## Stack
Vite + React + TypeScript · framer-motion (animação) · lenis (smooth scroll) · i18next + browser-languagedetector (PT/EN).

## Comandos
```bash
npm run dev      # vite
npm run build    # tsc --noEmit && vite build  (typecheck é parte do build)
npm run preview
```
`npm run build` verde antes de concluir qualquer mudança.

## Convenções
- Zero string hardcoded na UI: tudo por i18next, sempre PT **e** EN no mesmo commit.
- Animação com propósito: `transform`/`opacity` (composited), respeitar `prefers-reduced-motion`, nada de layout thrash em scroll.
- Asset otimizado antes de entrar em `public/` (dimensão real usada, formato moderno); imagem com `width`/`height` para não causar CLS.
- Conteúdo (projetos, textos) é dado, não JSX espalhado: mantenha na estrutura de dados existente em `src/`.
- Não trocar de framework/CSS lib nem adicionar dependência pesada para efeito que CSS + framer-motion já fazem.
- `dist/` é gerado — nunca editar à mão.
