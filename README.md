# Orkrux — V15 SEO, Performance e Acessibilidade

Atualização de preparação técnica para publicação, preservando o visual e as funcionalidades aprovadas.

## O que mudou
- favicon oficial derivado do símbolo ORKRUX;
- ícone para iPhone/Android e web manifest;
- Open Graph e Twitter Card para compartilhamento;
- imagem social 1200×630;
- meta title e description revisados;
- robots.txt preparado para indexação;
- hero convertido para WebP e versão otimizada para mobile;
- preload dos recursos críticos do primeiro viewport;
- carregamento das fontes movido do CSS para o head, com preconnect;
- dimensões explícitas nas logos para reduzir layout shift;
- lazy loading da marca no rodapé;
- skip link para teclado;
- aria-current na navegação ativa;
- melhorias de atributos ARIA e links externos;
- autocomplete no formulário.

## Observação para a publicação
Canonical URL, og:url, sitemap.xml e URLs absolutas de compartilhamento serão fechados na V16 assim que existir a URL final do Vercel/domínio.

## Rodar localmente
```bash
npm install
npm run dev
```

## Validar build
```bash
npm run build
```


## V16.1 — Home mobile
- Símbolo 3D oficial da Orkrux reaparece no hero mobile como camada visual.
- Background cinematográfico preservado, com enquadramento mobile recalibrado.
- Overlay refinado para manter legibilidade sem apagar a identidade visual.
- Desktop permanece inalterado.
