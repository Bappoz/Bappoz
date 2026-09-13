# Portfólio — Kodama Grove

Redesign do portfólio existente, preservando Vite, React, TypeScript e PT/EN. As alterações permanecem locais, sem commit ou publicação.

## Direção e referências

Os componentes foram adaptados ao código existente, com CSS e Framer Motion. Não foi instalado um template nem adicionado Next.js, Tailwind ou GSAP. Parte do código do registry do 21st exige autenticação; nesses casos, a implementação própria segue as prévias públicas e o comportamento descrito pelos autores.

| Elemento       | Referência                                                                                                                                            | Adaptação                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cores          | [Kodama Grove / Serafim](https://21st.dev/@serafimcloud/themes/kodama-grove), [tokens do tweakcn](https://tweakcn.com/r/themes/kodama-grove.json)     | Tokens de claro/escuro em `src/theme.css`; verde de contraste extraído dos próprios charts do tema.                                                   |
| Ícones         | [Catálogo 21st](https://21st.dev/community/icons)                                                                                                     | Lucide para interface; marcas do portfólio anterior para redes sociais.                                                                               |
| Bordas         | [Border components](https://21st.dev/community/components/s/border)                                                                                   | Linhas de um pixel, reflexo interno e sombra suave; sem brilho animado permanente.                                                                    |
| Tipografia     | [Text components](https://21st.dev/community/components/s/text)                                                                                       | Manrope nos títulos e DM Sans nos textos, fontes locais em WOFF2.                                                                                     |
| Navegação      | [Sterling Gate](https://21st.dev/@hardikkashiyani123456788/components/sterling-gate-kinetic-navigation)                                               | Menu em tela cheia, revelação escalonada, dialog nativo com contenção de foco e Escape.                                                               |
| Perfil         | [Profile Card Testimonial Carousel](https://21st.dev/@arunachalam/components/profile-card-testimonial-carousel)                                       | Foto e cartão sobreposto, um único perfil, sem carrossel.                                                                                             |
| Projetos       | [Elastic Gallery](https://21st.dev/@daiwiikharihar/components/elastic-gallery)                                                                        | Accordion horizontal no desktop e vertical no celular; hover, clique e teclado.                                                                       |
| Paginação      | [Pagination 13](https://21st.dev/@shadcnui-blocks/components/pagination-13)                                                                           | Três projetos por página, controles anterior/próximo, páginas numeradas e estado atual. Há apenas cinco páginas, sem necessidade de reticências.      |
| Colaboradores  | [Avatar Circles](https://21st.dev/@dillionverma/components/avatar-circles)                                                                            | Pessoas reais verificadas na API do GitHub, perfil clicável, expansão para equipes maiores e iniciais de fallback.                                    |
| Stack          | [Logo Carousel](https://21st.dev/@cult-ui/components/logo-carousel)                                                                                   | Seis posições que alternam logos com transição vertical; pausa manual, por foco/hover e fora da viewport.                                             |
| Vídeo e scroll | [Videos](https://21st.dev/community/components/s/video), [Scroll areas](https://21st.dev/community/components/s/scroll-area)                          | Apresentação real do Nexo em player sob demanda, zoom sutil na imagem do evento e entradas discretas. Nenhum vídeo decorativo pesado.                 |
| Redes          | [Favicon Badge](https://21st.dev/@edwinvakayil/components/favicon-badge)                                                                              | Badges circulares com os símbolos das redes e seus links reais.                                                                                       |
| Botões         | [Button with icon](https://21st.dev/@shadcnspace/components/button-witn-icon), [Origin Button](https://21st.dev/@lyanchouss/components/origin-button) | Botões com ícone, relevo discreto, foco visível e deslocamento breve no hover. O link de Origin não disponibilizou uma prévia utilizável na consulta. |
| Loading        | [Gooey Blobs](https://21st.dev/@animbits/components/loaders-gooey-blobs)                                                                              | Filtro SVG de união das formas, restrito a carregamentos reais.                                                                                       |
| Tooltip        | [Floating Tooltip](https://21st.dev/@unlumen/components/floating-tooltip)                                                                             | Tooltip acompanha o ponteiro com mola; também funciona com foco, Escape e limites da viewport.                                                        |

Todas as animações respeitam `prefers-reduced-motion`. O site não prende o scroll, esconde o cursor ou força uma introdução antes do conteúdo.

## Conteúdo e imagens

- Projetos e stacks: `src/data/projects.ts` e `src/data/skills.ts`.
- Traduções, trajetória e textos: `src/i18n/pt.json` e `src/i18n/en.json`.
- Colaboradores: `src/data/contributors.json`, consultados na API pública do GitHub em 11/09/2026. Bots foram excluídos. Bappoz aparece primeiro. Projetos individuais têm só seu avatar.
- Atualização manual dos colaboradores: `npm run sync:contributors`. O script pagina a API e mantém os dados anteriores se houver erro ou rate limit. Nunca expõe credenciais no browser.
- Retrato e fotos de eventos: arquivos que já existiam no portfólio.
- Logo do Nexo: `Hacktown-BSB/Nexo`, `client/public/logo-white.png`.
- Logo do Farol: `Bappoz/Farol`, `assets/farol-128.png`.
- Captura do BPMN Flow: `Bappoz/bpmn-flow`, `docs/media/execucao-passo-a-passo.png`.
- Logos de Rust, TypeScript, React, Python, Docker, PostgreSQL, Git e Linux: [Simple Icons](https://github.com/simple-icons/simple-icons), CC0.
- Logos de AWS, Claude, Cloudflare e OpenAI (Codex): [LobeHub Icons](https://github.com/lobehub/lobe-icons), MIT. Nomes e logos são marcas de seus respectivos titulares.
- Fontes: Manrope e DM Sans, via Fontsource, SIL Open Font License; licenças nos respectivos pacotes.

## Prévia e build

```sh
npm install
npm run dev
npm run build
npm run preview
```

A base permanece `/Bappoz/`, como no deploy atual. O build inclui `dist/404.html` usando a mesma entrada e assets absolutos. O React renderiza a página 404 em qualquer caminho desconhecido, inclusive caminhos aninhados. O endereço raiz e `index.html` renderizam o portfólio. A workflow existente do GitHub Pages continua válida.

Apenas atividade do GitHub, avatares, cards de xadrez e o player do YouTube usam a rede em tempo de navegação. Conteúdo, fontes, logos e imagens principais são locais. A atividade tem timeout, opção de tentar novamente e link de fallback; o vídeo só é criado quando solicitado e é removido ao fechar.

## Validação desta revisão

- Build de produção com TypeScript e instalação a partir do lockfile.
- Português e inglês com as mesmas chaves de tradução.
- Navegação, Escape e retorno de foco; abertura direta de fragmentos como `#stack`.
- Galeria com clique/teclado, filtros, primeira/última página e expansão dos sete colaboradores do Crianex.
- Farol com apenas o avatar de Bappoz.
- Temas claro/escuro e telas de 320 e 390 px sem transbordamento horizontal.
- Logos locais, pausa do carrossel e imagens dos projetos.
- Vídeo real do Nexo carregando no player; remoção do iframe ao fechar.
- Atividade real do GitHub e cópia do e-mail.
- Rota inexistente e retorno à página inicial; `dist/404.html` e suas URLs de assets.

As alterações não foram commitadas ou publicadas.

## Segunda edição — setembro de 2026

- Marca Zanetti e favicons derivados da logo transparente fornecida pelo usuário; versões de 32 e 180 px. O usuário também forneceu o cavalo de xadrez.
- Galeria: logo Crianex do README (`https://github.com/user-attachments/assets/6eb74023-5c3c-4284-a655-d0ce62751881`); Colibri (`docs/public/colibri.png`); Quadtree (`assets/screenshot-2026-04-05_21-00-09.png`); Glioma (`results/figures/explicabilidade_sam2.png`). Imagens locais em WebP.
- Claude Skills usa a marca Claude já disponível no projeto: o link da Adobe Stock fornecido abre uma busca, sem identificar um asset específico. Nenhuma imagem de stock foi licenciada ou comprada.
- Certificados em `src/data/certifications.ts`: sete registros encontrados na [versão pública indexada do LinkedIn](https://br.linkedin.com/in/lucas-andrade-zanetti), consultada em 11/09/2026. Os badges apontam para a seção de certificações do perfil; os links diretos de emissão não foram expostos pela fonte. IDs exibidos nos tooltips. Logos das páginas oficiais de Anthropic, UnB, Campus Party Brasil e Cambridge English.
- CrianexHub: cargo informado pelo usuário; descrição do produto, processo FDD + Kanban e organização confirmados no README e em `gh-pages/docusaurus/docs/visao/{equipe,cadencia,estrategias}`. A documentação de equipe e interação registra autoria de Lucas A. Zanetti.
- Menu modal lateral com movimento de entrada e saída. O botão de fechar usa o retângulo do acionador, mantém a posição e devolve o foco. Escape e clique fora fecham o drawer.
- Fontes anteriores aumentadas em 1 px por declaração. Ciclo de logos alterado de 3,8 para 2,6 segundos.
- [Ink Garden, por Serafim](https://21st.dev/@serafimcloud/components/ink-garden), MIT: vídeo original de 2,5 segundos, 426 KB, hospedado localmente, com poster, pausa, reprodução apenas em área visível e respeito a movimento reduzido. Fonte: `https://cdn.21st.dev/serafimcloud/ink-garden/default/video.1783762718846.mp4`.
- Contato com composição editorial, jardim, seleção de assunto real no `mailto:` e cópia do endereço.

### Laboratório de embarcados

Rota `/Bappoz/lab/`, também gerada como entrada estática no build. A preferência claro/escuro do portfólio principal é preservada ao trocar de atmosfera. Transição visual de 650 ms (omitida em movimento reduzido), sem fingir progresso de download. Hero com parallax discreto e estudos conceituais de percepção e arena orientados pela rolagem.

- ColorTracker: descrição corrigida pelo autor para Raspberry Pi 3. O texto e as tags de hardware refletem essa correção, que prevalece sobre a interpretação anterior do README.
- robo-sumo-sim: repositório privado acessível ao usuário; descrição fornecida no README, apresentada conforme pedido explícito de inclusão no portfólio. O link é identificado como restrito. A demonstração agora utiliza o vídeo e as imagens reais da simulação fornecidos pelo autor. Robôs e drones futuros são identificados como direções de pesquisa.
- Robô: [Pavel Danilyuk / Pexels](https://www.pexels.com/photo/robot-on-a-black-background-8438865/), licença Pexels, uso gratuito. Derivado de `https://images.pexels.com/photos/8438865/pexels-photo-8438865.jpeg`.
- Drone: [Alan Quirvan / Unsplash](https://unsplash.com/photos/black-and-gray-drone-in-black-background-1P7FgPKauAA), licença Unsplash, uso gratuito. Derivado de `https://images.unsplash.com/photo-1589510881543-dad95c5bef56`.
- Ambas as fotografias foram otimizadas para WebP (aproximadamente 52 KB somadas), com crédito visível.

### Verificação da segunda edição

Build de produção e TypeScript aprovados; `git diff --check` limpo. Entradas principal, laboratório e 404 têm assets locais existentes. Navegação testada em português e inglês; modo de laboratório acessível pelo drawer e por rota direta. Menu e fechar medidos com o mesmo retângulo (inclusive tamanho), com retorno de foco. Conferidos desktop 1440 px, celular 390 px e largura mínima de 320 px. Galeria, novas imagens, última página, sete badges, alternância dos capítulos, assunto do e-mail, reprodução e pausa do Ink Garden e retorno da 404 verificados na prévia. Movimento reduzido tratado em CSS e nos hooks de Framer Motion. Sem commit ou publicação.


## Demonstrações de embarcados e ajuste do GlassCard

- ColorTracker identificado como desenvolvido na Raspberry Pi 3 em PT/EN, com símbolo da Raspberry Pi obtido da página oficial: `https://www.raspberrypi.com/app/uploads/2022/02/COLOUR-Raspberry-Pi-Symbol-Registered.png`. A imagem identifica o hardware e aponta para raspberrypi.com. Raspberry Pi is a trademark of Raspberry Pi Ltd.
- `partida.mp4`, `painel-telemetria.svg` e `trajetorias.png` foram fornecidos diretamente pelo usuário. O vídeo foi copiado sem alterar seus 12,58 segundos; reprodução manual, controles nativos e pausa quando sai da área visível. Poster extraído do próprio vídeo.
- Trajetórias preservadas em WebP sem perdas, na resolução original. A legenda distingue a série de 10 rounds informada pelo autor dos rounds 1–5 visíveis neste gráfico.
- Painel SVG local e autocontido: fontes Fira Code incorporadas para não depender de rede no carregamento da imagem. Licença OFL em `public/lab/FiraCode-LICENSE.txt`. O painel é identificado como captura do round 3, não telemetria em tempo real.
- Painel e gráfico podem ser ampliados em diálogo nativo, com alternância entre ajuste à tela e tamanho real, rolagem, fechamento e retorno de foco ao acionador.
- GlassCard: altura de desktop reduzida de 340 para 305 px; 315 px no celular e 335 px na faixa intermediária estreita. Espaçamentos internos ajustados preservando os efeitos 3D.
- Verificado: vídeo reproduzindo (readyState 4), gráfico e painel carregados, zoom e retorno de foco, nenhuma sobreposição no card em 320/639/1440 px, paridade de traduções, TypeScript/build e `git diff --check`. Sem commit ou publicação.
