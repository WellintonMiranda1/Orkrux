import React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, ArrowLeft, ArrowUp, Menu, MessageCircle, X } from 'lucide-react'
import './styles.css'


const services = [
  {
    number: '01',
    kicker: 'PRESENÇA DIGITAL',
    title: 'Sites profissionais',
    headline: 'Seu site precisa vender confiança antes mesmo de vender uma solução.',
    text: 'Criamos sites institucionais e páginas comerciais pensadas para posicionar sua empresa com clareza, apresentar sua oferta de forma profissional e conduzir o visitante até o próximo passo.',
    ideal: 'Empresas que precisam elevar a percepção da marca, organizar sua apresentação comercial ou transformar presença digital em oportunidade de contato.',
    deliverables: ['Sites institucionais', 'Landing pages', 'Catálogos e vitrines digitais', 'Experiência responsiva', 'Estrutura preparada para SEO'],
    outcome: 'Uma presença digital mais sólida, clara e preparada para apoiar o processo comercial.'
  },
  {
    number: '02',
    kicker: 'GESTÃO E OPERAÇÃO',
    title: 'Sistemas personalizados',
    headline: 'Quando planilhas, ferramentas genéricas e processos espalhados começam a limitar a operação.',
    text: 'Desenvolvemos sistemas e ferramentas internas a partir da rotina real da empresa. A solução nasce do processo, da informação que precisa ser organizada e da forma como sua equipe realmente trabalha.',
    ideal: 'Operações que precisam centralizar dados, padronizar rotinas, acompanhar informações e substituir ferramentas que não se encaixam no negócio.',
    deliverables: ['Painéis administrativos', 'Dashboards', 'Ferramentas internas', 'Cadastros e permissões', 'Relatórios e consultas'],
    outcome: 'Mais clareza operacional e uma ferramenta construída em torno das necessidades da sua equipe.'
  },
  {
    number: '03',
    kicker: 'EXPERIÊNCIA DIGITAL',
    title: 'Portais e plataformas',
    headline: 'Ambientes digitais que organizam a jornada de clientes, parceiros, equipes ou comunidades.',
    text: 'Criamos áreas logadas, portais e plataformas digitais para concentrar conteúdos, documentos, acessos, recursos e experiências específicas em um ambiente feito para o seu contexto.',
    ideal: 'Negócios que precisam entregar uma experiência recorrente e organizada para públicos que vão além de uma simples página institucional.',
    deliverables: ['Áreas do cliente', 'Portais de parceiros', 'Áreas de membros', 'Centrais de conteúdo', 'Ambientes com acesso restrito'],
    outcome: 'Uma experiência digital organizada, profissional e construída para a jornada específica do seu público.'
  },
  {
    number: '04',
    kicker: 'PROJETO ESPECIAL',
    title: 'Soluções sob medida',
    headline: 'Nem todo desafio cabe dentro de um produto pronto — e é justamente aí que entra o desenvolvimento sob medida.',
    text: 'Quando o projeto não se encaixa em uma categoria tradicional, transformamos a necessidade do negócio em uma solução digital própria, definindo experiência, funcionalidades e estrutura a partir do problema que precisa ser resolvido.',
    ideal: 'Empresas com uma ideia específica, um processo particular ou uma necessidade digital que não encontra resposta adequada em ferramentas prontas.',
    deliverables: ['Ferramentas especializadas', 'Interfaces personalizadas', 'MVPs e protótipos', 'Fluxos digitais específicos', 'Projetos especiais'],
    outcome: 'Tecnologia construída ao redor do desafio — e não o negócio adaptado às limitações de uma ferramenta genérica.'
  }
]

function useMotionSystem() {
  React.useEffect(() => {
    const root = document.documentElement
    const header = document.querySelector('.site-header')
    const revealItems = [...document.querySelectorAll('[data-reveal]')]
    const parallaxItems = [...document.querySelectorAll('[data-parallax]')]
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointerFine = window.matchMedia('(pointer: fine)').matches
    const backToTop = document.querySelector('.back-to-top')

    if (reduceMotion) {
      revealItems.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.13, rootMargin: '0px 0px -8% 0px' })

    revealItems.forEach((el) => observer.observe(el))

    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY || window.pageYOffset
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, y / max))
      root.style.setProperty('--scroll-progress', progress.toFixed(4))
      root.style.setProperty('--scroll-pct', `${progress * 100}%`)
      root.style.setProperty('--portfolio-orb-y', `${progress * -90}px`)
      root.style.setProperty('--about-watermark-y', `${progress * -70}px`)
      root.style.setProperty('--cta-shift', `${progress * 160}%`)

      const hero = document.querySelector('.hero')
      const compactViewport = window.innerWidth <= 920
      if (hero) {
        const heroProgress = Math.min(1, Math.max(0, y / Math.max(hero.offsetHeight, 1)))
        root.style.setProperty('--hero-progress', heroProgress.toFixed(4))
        root.style.setProperty('--hero-y', compactViewport ? '0px' : `${heroProgress * 46}px`)
        root.style.setProperty('--hero-scale', compactViewport ? '1.025' : (1.018 + heroProgress * 0.055).toFixed(4))
        root.style.setProperty('--hero-content-y', compactViewport ? '0px' : `${heroProgress * -74}px`)
        root.style.setProperty('--hero-opacity', compactViewport ? '1' : Math.max(.08, 1 - heroProgress * 1.12).toFixed(4))
      }

      if (header) header.classList.toggle('is-scrolled', y > 46)
      if (backToTop) backToTop.classList.toggle('is-visible', y > 720)

      const sectionIds = ['inicio', 'solucoes', 'portfolio', 'sobre', 'contato']
      let currentId = 'inicio'
      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= y + 180) currentId = id
      })
      document.querySelectorAll('.main-nav a').forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${currentId}`
        link.classList.toggle('active', isCurrent)
        if (isCurrent) link.setAttribute('aria-current', 'page')
        else link.removeAttribute('aria-current')
      })

      parallaxItems.forEach((el) => {
        if (compactViewport) {
          el.style.setProperty('--parallax', '0')
          el.style.setProperty('--parallax-px', '0px')
          el.style.setProperty('--parallax-y', '0px')
          el.style.setProperty('--parallax-deg', '0deg')
          return
        }
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const viewportCenter = window.innerHeight / 2
        const distance = (center - viewportCenter) / Math.max(window.innerHeight, 1)
        const value = Math.max(-1, Math.min(1, distance))
        el.style.setProperty('--parallax', value.toFixed(4))
        el.style.setProperty('--parallax-px', `${value * 24}px`)
        el.style.setProperty('--parallax-y', `${value * -24}px`)
        el.style.setProperty('--parallax-deg', `${value * 1.35}deg`)
      })
    }

    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const onPointerMove = (event) => {
      if (!pointerFine) return
      root.style.setProperty('--pointer-x', `${event.clientX}px`)
      root.style.setProperty('--pointer-y', `${event.clientY}px`)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])
}

function Header() {
  const [open, setOpen] = React.useState(false)

  const closeMenu = () => setOpen(false)

  React.useEffect(() => {
    document.body.classList.toggle('menu-open', open)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth > 920) setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className={`site-header ${open ? 'menu-is-open' : ''}`}>
      <a className="brand" href="#inicio" aria-label="Orkrux - início" onClick={closeMenu}>
        <img src="/brand/orkrux-logo-horizontal.png" alt="Orkrux" width="1887" height="706" fetchPriority="high" decoding="async" />
      </a>

      {open && <button className="menu-backdrop" type="button" aria-label="Fechar menu" onClick={closeMenu} />}

      <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegação principal">
        <a className="active" href="#inicio" onClick={closeMenu}>Início</a>
        <a href="#solucoes" onClick={closeMenu}>Soluções</a>
        <a href="#portfolio" onClick={closeMenu}>Portfólio</a>
        <a href="#sobre" onClick={closeMenu}>Sobre</a>
        <a href="#contato" onClick={closeMenu}>Contato</a>
        <a className="mobile-nav-cta" href="#contato" onClick={closeMenu}>
          Solicitar orçamento <ArrowRight size={17} strokeWidth={1.8} />
        </a>
      </nav>

      <a className="header-cta" href="#contato">
        Solicitar orçamento <ArrowRight size={16} strokeWidth={1.8} />
      </a>

      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="main-navigation">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content shell">
        <div className="eyebrow-row" data-reveal="left">
          <span>TECNOLOGIA QUE IMPULSIONA NEGÓCIOS</span>
          <i />
        </div>

        <h1 data-reveal="left" style={{'--reveal-delay': '70ms'}}>
          Tecnologia sob<br />
          medida para<br />
          empresas que<br />
          querem <span>ir além.</span>
        </h1>

        <p data-reveal="left" style={{'--reveal-delay': '140ms'}}>
          Desenvolvemos sites, sistemas e soluções digitais sob medida para simplificar processos,
          organizar operações e transformar necessidades do seu negócio em experiências digitais.
        </p>

        <div className="hero-actions" data-reveal="left" style={{'--reveal-delay': '210ms'}}>
          <a className="button button-primary" href="#contato">
            Solicitar orçamento <ArrowRight size={18} strokeWidth={1.8} />
          </a>
          <a className="button button-secondary" href="#solucoes">Conheça nossas soluções</a>
        </div>
      </div>

      <a className="scroll-cue" href="#solucoes" aria-label="Rolar para soluções">
        <span>SCROLL</span><i><b /></i>
      </a>
    </section>
  )
}

function Services() {
  return (
    <section className="services services-expanded" id="solucoes">
      <div className="services-shell shell">
        <aside className="services-intro" data-reveal="left">
          <div className="section-label"><i /><span>SOLUÇÕES</span></div>
          <h2>Tecnologia pensada para o que o seu negócio <span>realmente precisa.</span></h2>
          <p>
            Não partimos de pacote pronto. Entendemos o objetivo, o contexto e a operação para desenvolver uma solução digital que faça sentido comercial e funcional para a empresa.
          </p>
          <div className="services-intro-note">
            <span>DO DESAFIO À SOLUÇÃO</span>
            <strong>Estratégia, experiência e desenvolvimento no mesmo projeto.</strong>
          </div>
        </aside>

        <div className="services-list">
          {services.map((service, index) => (
            <article className="service-card" key={service.number} data-reveal="up" style={{ '--reveal-delay': `${index * 70}ms` }}>
              <div className="service-card-head">
                <div className="service-number"><span>{service.number}</span><i /></div>
                <span className="service-kicker">{service.kicker}</span>
              </div>

              <div className="service-card-title">
                <h3>{service.title}</h3>
                <p>{service.headline}</p>
              </div>

              <p className="service-description">{service.text}</p>

              <div className="service-commercial-grid">
                <div className="service-fit">
                  <span>IDEAL PARA</span>
                  <p>{service.ideal}</p>
                </div>
                <div className="service-deliverables">
                  <span>O QUE PODE FAZER PARTE DO PROJETO</span>
                  <div>{service.deliverables.map(item => <em key={item}>{item}</em>)}</div>
                </div>
              </div>

              <div className="service-result">
                <span>OBJETIVO DO PROJETO</span>
                <p>{service.outcome}</p>
                <a href="#contato">Conversar sobre esta solução <ArrowRight size={15} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="partner-solutions shell" data-reveal="up">
        <div className="partner-intro">
          <span>PARCERIAS B2B</span>
          <h3>Desenvolvimento por trás da sua marca.</h3>
          <p>
            A Orkrux também pode atuar como braço técnico de agências, consultorias, designers e empresas que precisam entregar projetos digitais sem ampliar uma equipe interna de desenvolvimento.
          </p>
        </div>

        <div className="partner-models">
          <article className="partner-card" data-reveal="left">
            <div className="partner-card-top"><span>01</span><strong>WHITE LABEL</strong></div>
            <h4>Sua marca na frente. A Orkrux no desenvolvimento.</h4>
            <p>
              Desenvolvemos sites para parceiros que desejam vender a solução com a própria marca. A atuação pode acontecer de forma discreta, enquanto você mantém o relacionamento comercial e a entrega ao cliente final.
            </p>
            <div className="partner-fit">
              <span>INDICADO PARA</span>
              <p>Agências, profissionais de marketing, designers, consultorias e operações que querem ampliar o portfólio sem estruturar um time técnico próprio.</p>
            </div>
            <div className="partner-tags">
              <em>Sites institucionais</em><em>Landing pages</em><em>Demandas recorrentes</em><em>Entrega sob sua marca</em>
            </div>
            <a href="#contato">Conversar sobre White Label <ArrowRight size={15} /></a>
          </article>

          <article className="partner-card" data-reveal="right" style={{ '--reveal-delay': '90ms' }}>
            <div className="partner-card-top"><span>02</span><strong>PRIVATE LABEL</strong></div>
            <h4>Uma solução digital exclusiva para a sua operação ou marca.</h4>
            <p>
              Para empresas que precisam de uma experiência própria, desenvolvemos projetos digitais exclusivos a partir da identidade, do posicionamento e das necessidades específicas do negócio.
            </p>
            <div className="partner-fit">
              <span>INDICADO PARA</span>
              <p>Empresas que querem uma solução diferenciada, com estrutura, interface e funcionalidades definidas para o seu contexto, sem depender de um produto genérico de mercado.</p>
            </div>
            <div className="partner-tags">
              <em>Projeto exclusivo</em><em>Identidade própria</em><em>Escopo personalizado</em><em>Experiência sob medida</em>
            </div>
            <a href="#contato">Conversar sobre Private Label <ArrowRight size={15} /></a>
          </article>
        </div>
      </div>

      <div className="solutions-process shell" data-reveal="up">
        <div className="process-copy">
          <span>COMO TRABALHAMOS</span>
          <h3>Um processo claro do primeiro diagnóstico à entrega.</h3>
        </div>
        <div className="process-steps">
          <div><span>01</span><strong>Entendimento</strong><p>Objetivo, problema, público e contexto do negócio.</p></div>
          <div><span>02</span><strong>Definição</strong><p>Escopo, estrutura, funcionalidades e experiência.</p></div>
          <div><span>03</span><strong>Desenvolvimento</strong><p>Construção, validação e refinamento do projeto.</p></div>
          <div><span>04</span><strong>Entrega</strong><p>Publicação, ajustes finais e orientação de uso.</p></div>
        </div>
      </div>
    </section>
  )
}

const portfolioProjects = [
  {
    id: 'site',
    slug: 'site-institucional',
    eyebrow: 'PROJETO CONCEITUAL · SITE INSTITUCIONAL',
    title: <>Presença digital<br />que transmite<br /><em>confiança.</em></>,
    description: 'Conceito de site corporativo com foco em posicionamento, clareza e conversão.',
    tags: ['UI/UX', 'Responsivo', 'Performance'],
    visual: 'site'
  },
  {
    id: 'system',
    slug: 'sistema-personalizado',
    eyebrow: 'CONCEITO · SISTEMA PERSONALIZADO',
    title: <>Operação mais<br />clara, rápida<br /><em>e organizada.</em></>,
    description: 'Painel conceitual para centralizar informações, rotinas e indicadores de uma operação.',
    tags: ['Dashboard', 'Gestão', 'Dados'],
    visual: 'system'
  },
  {
    id: 'portal',
    slug: 'portal-digital',
    eyebrow: 'CONCEITO · PORTAL DIGITAL',
    title: <>Um ambiente<br />digital feito para<br /><em>cada jornada.</em></>,
    description: 'Portal conceitual com áreas organizadas, acesso a informações e uma experiência digital personalizada.',
    tags: ['Área logada', 'Experiência', 'Organização'],
    visual: 'portal'
  }
]

function SiteDemoVisual() {
  return (
    <div className="demo-ui demo-site" aria-hidden="true">
      <div className="demo-window">
        <div className="demo-window-top">
          <div className="window-dots"><i /><i /><i /></div>
          <span>empresa.com.br</span>
        </div>
        <div className="site-demo-nav"><b>EMPRESA</b><div><span>Serviços</span><span>Sobre</span><span>Contato</span></div></div>
        <div className="site-demo-hero">
          <small>ESTRATÉGIA DIGITAL</small>
          <strong>Uma presença à altura<br />do seu negócio.</strong>
          <p>Clareza, confiança e experiência em cada detalhe.</p>
          <button>Conhecer solução</button>
        </div>
        <div className="site-demo-cards"><i /><i /><i /></div>
      </div>
    </div>
  )
}

function SystemDemoVisual() {
  return (
    <div className="demo-ui demo-system" aria-hidden="true">
      <div className="system-shell">
        <aside>
          <b>O</b>
          <i className="active" /><i /><i /><i /><span />
        </aside>
        <div className="system-main">
          <div className="system-head"><div><small>VISÃO GERAL</small><strong>Dashboard</strong></div><i /></div>
          <div className="metric-grid"><div><small>OPERAÇÃO</small><strong>Organizada</strong><em>Visão central</em></div><div><small>ROTINAS</small><strong>Em dia</strong><em>Gestão clara</em></div><div><small>MÓDULOS</small><strong>Estruturados</strong><em>Áreas do sistema</em></div></div>
          <div className="system-lower">
            <div className="chart-card"><small>DESEMPENHO</small><div className="bars"><i /><i /><i /><i /><i /><i /><i /></div></div>
            <div className="activity-card"><small>ATIVIDADES</small><p><i /> Cadastro atualizado</p><p><i /> Novo registro criado</p><p><i /> Relatório revisado</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PortalDemoVisual() {
  return (
    <div className="demo-ui demo-portal" aria-hidden="true">
      <div className="portal-shell">
        <div className="portal-top">
          <div><small>ÁREA DO CLIENTE</small><strong>Bem-vindo à sua central.</strong></div>
          <span>WK</span>
        </div>
        <div className="portal-grid">
          <div className="portal-card portal-card-wide"><small>VISÃO GERAL</small><strong>Informações importantes em um só lugar.</strong><p>Uma experiência clara para acessar conteúdos, documentos e recursos.</p></div>
          <div className="portal-card"><small>DOCUMENTOS</small><strong>12 arquivos</strong><i /></div>
          <div className="portal-card"><small>PROJETOS</small><strong>03 ativos</strong><i /></div>
          <div className="portal-card portal-card-list"><small>ACESSO RÁPIDO</small><p>Perfil e dados <span>→</span></p><p>Central de arquivos <span>→</span></p><p>Suporte <span>→</span></p></div>
        </div>
      </div>
    </div>
  )
}

function ProjectVisual({ type }) {
  if (type === 'system') return <SystemDemoVisual />
  if (type === 'portal') return <PortalDemoVisual />
  return <SiteDemoVisual />
}

function PortfolioVisual() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const active = portfolioProjects[activeIndex]
  const otherProjects = portfolioProjects
    .map((project, index) => ({ project, index }))
    .filter(({ index }) => index !== activeIndex)

  const previous = () => setActiveIndex((activeIndex - 1 + portfolioProjects.length) % portfolioProjects.length)
  const next = () => setActiveIndex((activeIndex + 1) % portfolioProjects.length)

  return (
    <>
      <div className="project-showcase" aria-label="Projetos conceituais de soluções digitais">
        <div className="project-browser" key={active.id}>
          <div className="browser-top">
            <span className="demo-badge">ORKRUX / PROJETO</span>
            <div className="browser-links"><span>Projeto</span><span>Solução</span><span>Interface</span></div>
          </div>

          <div className="project-content">
            <div className="project-copy">
              <span>{active.eyebrow}</span>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <div className="project-tags">{active.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="project-visual-wrap">
              <ProjectVisual type={active.visual} />
            </div>
          </div>

          <div className="project-index"><strong>0{activeIndex + 1}</strong> / 0{portfolioProjects.length}</div>
        </div>

        <div className="project-side">
          {otherProjects.map(({ project, index }) => (
            <button
              className={`project-thumb project-thumb-${project.visual}`}
              key={project.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Abrir ${project.eyebrow.toLowerCase()}`}
            >
              <span>0{index + 1}</span>
              <strong>{project.visual === 'site' ? 'Site' : project.visual === 'system' ? 'Sistema' : 'Portal'}</strong>
              <i />
            </button>
          ))}
          <div className="project-arrows">
            <button type="button" onClick={previous} aria-label="Projeto anterior"><ArrowLeft size={18} /></button>
            <button type="button" onClick={next} aria-label="Próximo projeto"><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
    </>
  )
}

function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-grid shell">
        <div className="portfolio-copy" data-reveal="left" data-parallax>
          <div className="section-label"><i /><span>PROJETOS</span></div>
          <h2>Projetos que<br />transformam ideias<br /><span>em soluções.</span></h2>
          <p>
            Explore diferentes possibilidades de sites, sistemas e soluções digitais pensadas para necessidades reais de negócio.
          </p>
          <span className="portfolio-note">Selecione os projetos ao lado para visualizar cada conceito.</span>
        </div>
        <div data-reveal="scale" style={{'--reveal-delay': '100ms'}} data-parallax className="portfolio-visual-motion"><PortfolioVisual /></div>
      </div>
    </section>
  )
}

function About() {
  const principles = [
    {
      number: '01',
      title: 'Diagnóstico antes do desenvolvimento',
      text: 'Entendemos o objetivo, o público e o contexto do projeto antes de definir estrutura, tecnologia ou interface.'
    },
    {
      number: '02',
      title: 'Projeto sob medida',
      text: 'A solução é construída a partir da necessidade real. Evitamos forçar o negócio a caber em uma estrutura genérica.'
    },
    {
      number: '03',
      title: 'Comunicação direta',
      text: 'Escopo, decisões e andamento do projeto são tratados com clareza para reduzir ruído e manter o cliente próximo do desenvolvimento.'
    },
    {
      number: '04',
      title: 'Qualidade na entrega',
      text: 'Cuidamos de experiência, responsividade, organização visual e consistência técnica para entregar um produto digital profissional.'
    }
  ]

  return (
    <section className="about about-expanded" id="sobre">
      <div className="about-hero shell">
        <div className="about-hero-copy" data-reveal="left" data-parallax>
          <div className="section-label"><i /><span>POR QUE ORKRUX</span></div>
          <h2>Desenvolvimento com visão de negócio, <span>não apenas código.</span></h2>
          <p>
            A tecnologia precisa fazer sentido para quem usa, para quem vende e para quem opera. Por isso, cada projeto começa pelo entendimento do problema e evolui para uma solução digital clara, funcional e coerente com a marca.
          </p>
        </div>

        <div className="about-positioning" data-reveal="right">
          <span>NOSSO POSICIONAMENTO</span>
          <strong>Não somos uma fábrica de páginas prontas.</strong>
          <p>
            A Orkrux trabalha na interseção entre estratégia, experiência e desenvolvimento para construir produtos digitais que representem melhor a empresa e resolvam necessidades concretas.
          </p>
        </div>
      </div>

      <div className="about-principles shell">
        {principles.map((item, index) => (
          <article key={item.number} data-reveal="up" style={{ '--reveal-delay': `${index * 80}ms` }}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="about-fit shell" data-reveal="up">
        <div className="about-fit-copy">
          <span>PARA QUEM FAZ SENTIDO</span>
          <h3>Projetos digitais para empresas e parceiros que valorizam uma solução bem construída.</h3>
        </div>
        <div className="about-fit-list">
          <div><strong>Empresas</strong><p>Que precisam elevar presença digital, organizar uma operação ou criar uma solução própria.</p></div>
          <div><strong>Agências e parceiros</strong><p>Que querem contar com desenvolvimento White Label ou ampliar a capacidade de entrega técnica.</p></div>
          <div><strong>Projetos especiais</strong><p>Que não encontram resposta adequada em ferramentas prontas e precisam de uma construção específica.</p></div>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  const whatsappNumber = '5551994308399'

  const openWhatsApp = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const company = String(form.get('company') || '').trim()
    const project = String(form.get('project') || '').trim()
    const message = String(form.get('message') || '').trim()

    const lines = [
      'Olá! Vim pelo site da Orkrux e gostaria de conversar sobre um projeto.',
      name ? `Nome: ${name}` : '',
      company ? `Empresa: ${company}` : '',
      project ? `Tipo de projeto: ${project}` : '',
      message ? `Desafio / necessidade: ${message}` : ''
    ].filter(Boolean)

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="final-cta contact-section" id="contato">
      <div className="contact-shell shell">
        <div className="contact-copy" data-reveal="left">
          <div className="cta-kicker">VAMOS CONVERSAR? <i /></div>
          <h2>Seu próximo projeto pode <span>começar hoje.</span></h2>
          <p>Conte um pouco sobre o que sua empresa precisa. A conversa começa de forma simples e segue direto pelo WhatsApp.</p>

          <div className="contact-points">
            <div><span>01</span><strong>Conte o desafio</strong><p>Explique o que precisa ser criado, melhorado ou organizado.</p></div>
            <div><span>02</span><strong>Alinhamos o projeto</strong><p>Entendemos contexto, prioridade, escopo e melhor caminho para a solução.</p></div>
            <div><span>03</span><strong>Próximo passo claro</strong><p>Você recebe uma direção objetiva para avançar com o desenvolvimento.</p></div>
          </div>

          <a
            className="contact-whatsapp-direct"
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Vim pelo site da Orkrux e gostaria de conversar sobre um projeto.')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} strokeWidth={1.8} />
            <span>Falar direto no WhatsApp</span>
            <strong>+55 51 99430-8399</strong>
            <ArrowRight size={17} />
          </a>
        </div>

        <form className="contact-form" onSubmit={openWhatsApp} data-reveal="right">
          <div className="contact-form-head">
            <span>BRIEFING RÁPIDO</span>
            <strong>Vamos entender o seu projeto.</strong>
            <p>Preencha o essencial. Ao enviar, sua mensagem será montada automaticamente no WhatsApp.</p>
          </div>

          <div className="contact-field-grid">
            <label>
              <span>Seu nome</span>
              <input name="name" type="text" autoComplete="name" placeholder="Como podemos te chamar?" required />
            </label>
            <label>
              <span>Empresa</span>
              <input name="company" type="text" autoComplete="organization" placeholder="Nome da empresa ou projeto" />
            </label>
          </div>

          <label>
            <span>O que você precisa?</span>
            <select name="project" defaultValue="">
              <option value="" disabled>Selecione uma opção</option>
              <option>Site profissional</option>
              <option>Sistema personalizado</option>
              <option>Portal ou plataforma</option>
              <option>Solução sob medida</option>
              <option>Projeto White Label</option>
              <option>Projeto Private Label</option>
              <option>Ainda não sei — quero conversar</option>
            </select>
          </label>

          <label>
            <span>Conte seu desafio</span>
            <textarea name="message" rows="5" placeholder="Ex.: precisamos criar um site mais profissional, organizar um processo interno ou desenvolver uma solução própria..." required />
          </label>

          <button className="button button-primary contact-submit" type="submit">
            Enviar pelo WhatsApp <MessageCircle size={18} strokeWidth={1.8} />
          </button>

          <small>Nenhum e-mail é necessário. O contato segue diretamente pelo WhatsApp.</small>
        </form>
      </div>
    </section>
  )
}


function Footer() {
  const whatsappNumber = '5551994308399'
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-top shell">
        <div className="footer-brand" data-reveal="left">
          <a href="#inicio" aria-label="Orkrux - voltar ao início">
            <img src="/brand/orkrux-logo-horizontal.png" alt="Orkrux" width="1887" height="706" loading="lazy" decoding="async" />
          </a>
          <p>Tecnologia sob medida para empresas que querem transformar presença, operação e experiência digital.</p>
          <div className="footer-status"><i /><span>Disponível para novos projetos</span></div>
        </div>

        <div className="footer-links" data-reveal="up">
          <span>NAVEGAÇÃO</span>
          <a href="#inicio">Início</a>
          <a href="#solucoes">Soluções</a>
          <a href="#portfolio">Portfólio</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </div>

        <div className="footer-links" data-reveal="up" style={{ '--reveal-delay': '70ms' }}>
          <span>SOLUÇÕES</span>
          <a href="#solucoes">Sites profissionais</a>
          <a href="#solucoes">Sistemas personalizados</a>
          <a href="#solucoes">Portais e plataformas</a>
          <a href="#solucoes">White Label</a>
          <a href="#solucoes">Private Label</a>
        </div>

        <div className="footer-contact" data-reveal="right">
          <span>FALE COM A ORKRUX</span>
          <strong>Tem um projeto em mente?</strong>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Vim pelo site da Orkrux e gostaria de conversar sobre um projeto.')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={17} strokeWidth={1.8} />
            <span>+55 51 99430-8399</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className="footer-bottom shell">
        <span>© {year} ORKRUX. Todos os direitos reservados.</span>
        <span>Sites • Sistemas • Plataformas • Soluções sob medida</span>
      </div>

      <button className="back-to-top" type="button" aria-label="Voltar ao topo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowUp size={18} />
      </button>
    </footer>
  )
}

function HomePage() {
  useMotionSystem()
  return (
    <>
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
      <div className="scroll-progress" aria-hidden="true"><i /></div>
      <div className="cursor-light" aria-hidden="true" />
      <Header />
      <main id="conteudo-principal">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

function App() {
  React.useEffect(() => {
    if (window.location.pathname.startsWith('/projetos/')) {
      window.history.replaceState({}, '', '/#portfolio')
      requestAnimationFrame(() => document.getElementById('portfolio')?.scrollIntoView({ block: 'start' }))
    }
  }, [])
  return <HomePage />
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
