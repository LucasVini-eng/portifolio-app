function handleImageError() {
    const img = document.getElementById('profile-img');
    const fallback = document.getElementById('profile-fallback');
    if (img && fallback) {
        img.style.display = 'none';
        fallback.style.display = 'flex';
        }}
function clearAiSession() {
    const container = document.getElementById('ai-response-container');
    const placeholder = document.getElementById('ai-placeholder');
    const textEl = document.getElementById('ai-response-text');
    const input = document.getElementById('ai-prompt-input');
    const loader = document.getElementById('ai-loader');

            if (container && placeholder && textEl && input && loader) {
                container.classList.add('d-none');
                loader.classList.add('d-none');
                placeholder.classList.remove('d-none');
                textEl.innerHTML = '';
                input.value = '';
            }
        }

document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            id: 1,
            title: "Link Shortening System (LSS)",
            category: "software",
            status: "concluido",
            statusText: "Concluído",
            desc: "Sistema web de encurtamento de URLs gerando links curtos e seguros, com foco em simplicidade, segurança e rastreabilidade.",
            tech: ["Python", "Streamlit", "Validators", "Pyshorteners", "Streamlit Community Cloud"],
            codeUrl: "https://github.com/LucasVini-eng/Project-002-LinkShorteningSystem-LSS",
            demoUrl: "https://project-002-linkshorteningsystem-lss.streamlit.app/"},
        {
            id: 2,
            title: "Quote Monitor ($)",
            category: "automacao",
            status: "desenvolvimento",
            statusText: "Em Desenvolvimento",
            desc: "Robô de automação (RPA) para monitoramento contínuo de cotações, automatizando a coleta, processamento e disponibilização de informações estratégicas",
            tech: ["Python", "Selenium", "Google Cloud", "Google Sheets API"],
            codeUrl: "https://lucasvini-eng.github.io/project-announcement-1/",
            demoUrl: "https://lucasvini-eng.github.io/project-announcement-1/"},
        {
            id: 3,
            title: "Task Management API",
            category: "software",
            status: "concluído",
            statusText: "Concluído",
            desc: "O projeto que foi desenvolvido é uma API para gerenciar tarefas, utilizando Java e o framework Spring Boot. Primeiro, realiza-se o cadastro e a validação dos usuários e criptografia de senha no banco de dados H2. Depois, as tarefas são criadas e associadas aos seus respectivos usuários, podendo ser atualizadas e organizadas em listas. ",
            tech: ["Java", "Spring Boot", "API REST"],
            codeUrl: "https://github.com/LucasVini-eng/Project-005-TaskList-API",
            demoUrl: "https://www.linkedin.com/posts/lucas-vinicius-ds_projeto-gerenciamento-de-tarefas-por-api-ugcPost-7398842285439758336-AbWo/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADQ9xY4Bq9hbYyIilymoH1vo69oq8gsEDaE"},
        {
            id: 4,
            title: "Sistema NTS-e (BI)",
            category: "software",
            status: "desenvolvimento",
            statusText: "Em Desenvolvimento",
            desc: "Plataforma que automatiza o lançamento e a gestão de notas fiscais, centralizando informações financeiras em um único ambiente. Integra dashboards de Business Intelligence (BI) para acompanhamento de indicadores, análise de custos e suporte à tomada de decisões baseada em dados.",
            tech: ["Em definição"],
            codeUrl: "https://lucasvini-eng.github.io/project-announcement-2/",
            demoUrl: "https://lucasvini-eng.github.io/project-announcement-2/"},
        {
            id: 5,
            title: "Gestão de Dashboards (Power BI)",
            category: "dados",
            status: "concluido",
            statusText: "Concluído",
            desc: "Orquestração de visões analíticas interativas integradas a uma interface web personalizada, acelerando decisões baseadas em indicadores operacionais.",
            tech: ["Bootstrap", "JavaScript", "Power BI Embedded", "ETL"],
            codeUrl: "https://github.com/LucasVini-eng/lveProject-001-DashboardManager-PowerBI",
            demoUrl: "https://lucasvini-eng.github.io/lveProject-001-DashboardManager-PowerBI/"}
    ];

const grid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('project-search');

    function renderProjects(filterValue = 'all', searchQuery = '') {
        if (!grid) return;
        grid.innerHTML = '';
            const filtered = projects.filter(p => {
            const matchesCategory = filterValue === 'all' || p.category === filterValue;
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
                    return matchesCategory && matchesSearch;
                });

                if (filtered.length === 0) {
                    grid.innerHTML = `
                        <div class="col-12 text-center py-5">
                            <p class="text-secondary fs-5 mb-0">Nenhum projeto encontrado com os termos pesquisados.</p>
                        </div>
                    `;
                    return;
                }

                filtered.forEach((p, index) => {
                    const col = document.createElement('div');
                    col.className = 'col animate-slide-up';
                    col.style.animationDelay = `${index * 0.1}s`;

                    let statusClass = 'status-concluido';
                    if (p.status === 'producao') statusClass = 'status-producao';
                    if (p.status === 'desenvolvimento') statusClass = 'status-desenvolvimento';

                    const techSpans = p.tech.map(t => 
                        `<span class="badge bg-white bg-opacity-10 text-white font-mono fw-normal py-1 px-2 me-1 mb-1">${t}</span>`
                    ).join('');

                    col.innerHTML = `
                        <div class="project-card h-100 p-4 d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <span class="status-badge ${statusClass}">
                                <span class="status-dot"></span> ${p.statusText}
                                </span>
                            </div>
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <h3 class="h5 fw-bold text-white mb-0">${p.title}</h3>
                            </div>

                            <p class="text-secondary small mb-4 flex-grow-1 leading-relaxed">${p.desc}</p>
                            
                            <div class="d-flex gap-2 mb-4">
                                <a href="${p.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-custom w-50 d-inline-flex align-items-center justify-content-center gap-2 py-2" title="Código fonte no GitHub">
                                    <i class="ph ph-github-logo"></i> Código
                                </a>
                                <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-accent w-50 d-inline-flex align-items-center justify-content-center gap-2 py-2" title="Visualizar Live Demo">
                                    <i class="ph ph-arrow-square-out"></i> Acessar
                                </a>
                            </div>

                            <div class="pt-3 border-top border-white border-opacity-10 mt-auto">
                                ${techSpans}
                            </div>
                        </div>
                    `;
                    grid.appendChild(col);
                });
            }

            renderProjects('all');

            function updateHeroStats() {
                const completedCount = projects.filter(p => p.status === 'concluido').length;
                const productionCount = projects.filter(p => p.status === 'producao').length;
                
                const completedEl = document.getElementById('hero-completed-count');
                const productionEl = document.getElementById('hero-production-count');
                
                if (completedEl) completedEl.textContent = completedCount;
                if (productionEl) productionEl.textContent = productionCount;
            }
            updateHeroStats();

            filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    const filter = e.target.getAttribute('data-filter');
                    renderProjects(filter, searchInput.value.trim());
                });
            });

            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const activeFilterBtn = document.querySelector('.filter-btn.active');
                    const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
                    renderProjects(activeFilter, e.target.value.trim());
                });
            }

document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = this;
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = form.querySelector('button[type="submit"]');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  const originalBtnHtml = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Enviando... <i class="ph ph-spinner"></i>';

  try {
    const response = await fetch('https://formsubmit.co/ajax/vinidev.eng@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
        _subject: `Novo contato de ${nameInput.value}`
      })
    });

    if (!response.ok) throw new Error('Falha no envio');

    toastMessage.textContent = 'Mensagem enviada com sucesso!';
    toast.classList.add('show');

    form.reset();
    form.classList.remove('was-validated');

  } catch (error) {
    toastMessage.textContent = 'Erro ao enviar. Tente novamente.';
    toast.classList.add('show');
    console.error(error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHtml;

    setTimeout(() => toast.classList.remove('show'), 4000);
  }
});


  document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = this;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = form.querySelector('button[type="submit"]');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Enviando... <i class="ph ph-spinner"></i>';

    try {
        const response = await fetch('https://formsubmit.co/ajax/vinidev.eng@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value,
                _subject: `Novo contato de ${nameInput.value}`
            })
        });

        if (!response.ok) throw new Error('Falha no envio');

        toast.classList.remove('error');
        toastMessage.textContent = 'Mensagem enviada com sucesso!';
        toast.classList.add('show');

        form.reset();
        form.classList.remove('was-validated');

    } catch (error) {
        toast.classList.add('error');
        toastMessage.textContent = 'Erro ao enviar. Tente novamente.';
        toast.classList.add('show');
        console.error(error);

    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
});
            const header = document.querySelector('header');
            const backToTopBtn = document.getElementById('back-to-top');
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('shadow');
                } else {
                    header.classList.remove('shadow');
                }

                if (window.scrollY > 400) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }

                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    if (window.scrollY >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active-section');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active-section');
                    }
                });
            });

            const menuToggle = document.getElementById('navbarNav');
            if (menuToggle) {
                const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
                navLinks.forEach((link) => {
                    link.addEventListener('click', () => {
                        if (window.innerWidth < 992) {
                            bsCollapse.hide();
                        }
                    });
                });
            }});
