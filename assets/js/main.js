const API_BASE = 'https://linen-elephant-553617.hostingersite.com/api';
const IMAGE_BASE = 'https://linen-elephant-553617.hostingersite.com/upload/';

// Cache de usuarios e categorias
const usuariosCache = {};
const categoriasCache = {};

// Categorias
async function listarCategorias(options = {}) {
    const params = new URLSearchParams();
    if (options.filter) params.append('filter', options.filter);
    if (options.order) params.append('order', options.order);
    if (options.size) params.append('size', options.size);
    if (options.page) params.append('page', options.page);

    const url = `${API_BASE}/records/categorias?${params}`;
    const response = await fetch(url);
    return response.json();
}

async function buscarCategoria(id) {
    if (!id) return null;
    if (categoriasCache[id]) return categoriasCache[id];

    try {
        const response = await fetch(`${API_BASE}/records/categorias/${id}`);
        const cat = await response.json();
        categoriasCache[id] = cat;
        return cat;
    } catch (e) {
        return null;
    }
}

// Publicacoes
async function listarPublicacoes(options = {}) {
    const params = new URLSearchParams();
    if (options.filter) {
        for (const f of options.filter) {
            params.append('filter', f);
        }
    }
    if (options.order) params.append('order', options.order);
    if (options.size) params.append('size', options.size);
    if (options.page) params.append('page', options.page);
    if (options.join) {
        for (const j of options.join) {
            params.append('join', j);
        }
    }

    const url = `${API_BASE}/records/publicacao?${params}`;
    const response = await fetch(url);
    return response.json();
}

async function buscarPublicacao(id, options = {}) {
    const params = new URLSearchParams();
    if (options.join) {
        for (const j of options.join) {
            params.append('join', j);
        }
    }

    const url = `${API_BASE}/records/publicacao/${id}?${params}`;
    const response = await fetch(url);
    return response.json();
}

// Usuarios
async function buscarUsuario(id) {
    if (!id) return null;
    if (usuariosCache[id]) return usuariosCache[id];

    try {
        const response = await fetch(`${API_BASE}/records/user/${id}`);
        const user = await response.json();
        usuariosCache[id] = user;
        return user;
    } catch (e) {
        return null;
    }
}

// Estado da aplicacao
let categoriaAtual = null;
let categorias = [];

// Obter nome do autor
function obterNomeAutor(pub) {
    if (pub.created_by && typeof pub.created_by === 'object') {
        return pub.created_by.username || null;
    }
    return null;
}

// Obter nome da categoria
function obterNomeCategoria(pub) {
    if (pub.categoria && typeof pub.categoria === 'object') {
        return pub.categoria.nome || null;
    }
    return null;
}

// Renderizar categorias
function renderizarCategorias(container) {
    let html = '<div class="categorias-menu"><button class="categoria-btn active" data-id="">Todas</button>';
    for (const cat of categorias) {
        if (cat.status) {
            html += `<button class="categoria-btn" data-id="${cat.id}">${cat.nome}</button>`;
        }
    }
    html += '</div>';
    container.innerHTML = html;

    const botoes = container.querySelectorAll('.categoria-btn');
    for (const btn of botoes) {
        btn.addEventListener('click', async () => {
            for (const b of botoes) b.classList.remove('active');
            btn.classList.add('active');
            categoriaAtual = btn.dataset.id || null;
            await carregarPublicacoes();
        });
    }
}

// Renderizar tags
function renderizarTags(tagsString) {
    if (!tagsString) return '';
    const tags = tagsString.split(',').map(t => t.trim()).filter(t => t);
    if (!tags.length) return '';

    let html = '<div class="publicacao-tags">';
    for (const tag of tags) {
        html += `<span class="tag">${tag}</span>`;
    }
    html += '</div>';
    return html;
}

// Renderizar publicacoes
function renderizarPublicacoes(publicacoes, container) {
    const ativas = publicacoes.filter(p => p.status);

    if (!ativas.length) {
        container.innerHTML = '<p class="sem-publicacoes">Nenhuma publicacao encontrada.</p>';
        return;
    }

    let html = '<div class="publicacoes-lista">';
    for (const pub of ativas) {
        const data = new Date(pub.created_at).toLocaleDateString('pt-BR');
        const imagem = pub.image ? `<div class="publicacao-img"><img src="${IMAGE_BASE}${pub.image}" alt="${pub.titulo || ''}"></div>` : '';
        const tags = renderizarTags(pub.tags);
        const autor = obterNomeAutor(pub);
        const autorHtml = autor ? `<span class="publicacao-autor">${autor}</span>` : '';

        html += `
            <article class="publicacao-card" data-id="${pub.id}">
                ${imagem}
                <div class="publicacao-info">
                    <h3>${pub.titulo || 'Sem titulo'}</h3>
                    <p>${pub.descricao || ''}</p>
                    ${tags}
                    <div class="publicacao-meta">
                        <span class="publicacao-data">${data}</span>
                        ${autorHtml}
                    </div>
                </div>
            </article>
        `;
    }
    html += '</div>';
    container.innerHTML = html;

    const cards = container.querySelectorAll('.publicacao-card');
    for (const card of cards) {
        card.addEventListener('click', () => abrirPublicacao(card.dataset.id));
    }
}

// Renderizar publicacao completa
async function renderizarPublicacaoCompleta(pub, container) {
    const data = new Date(pub.created_at).toLocaleDateString('pt-BR');
    const imagem = pub.image ? `<div class="publicacao-img-completa"><img src="${IMAGE_BASE}${pub.image}" alt="${pub.titulo || ''}"></div>` : '';
    const tags = renderizarTags(pub.tags);

    const autor = obterNomeAutor(pub);
    const autorHtml = autor ? `<span class="publicacao-autor">Por ${autor}</span>` : '';

    const categoriaNome = obterNomeCategoria(pub);
    const categoriaHtml = categoriaNome ? `<span class="publicacao-categoria">${categoriaNome}</span>` : '';

    container.innerHTML = `
        <article class="publicacao-completa">
            <button class="voltar-btn">Voltar</button>
            ${imagem}
            <h1>${pub.titulo || 'Sem titulo'}</h1>
            <div class="publicacao-meta">
                ${categoriaHtml}
                <span class="publicacao-data">${data}</span>
                ${autorHtml}
            </div>
            ${tags}
            <div class="publicacao-conteudo">${pub.texto || pub.descricao || ''}</div>
        </article>
    `;

    container.querySelector('.voltar-btn').addEventListener('click', () => {
        inicializarBlog();
    });
}

// Carregar publicacoes
async function carregarPublicacoes() {
    const container = document.getElementById('publicacoes-container');
    container.innerHTML = '<p class="carregando">Carregando...</p>';

    const options = {
        order: 'created_at,desc',
        filter: ['status,eq,1'],
        join: ['created_by']
    };

    if (categoriaAtual) {
        options.filter.push(`categoria,eq,${categoriaAtual}`);
    }

    const data = await listarPublicacoes(options);
    renderizarPublicacoes(data.records || [], container);
}

// Abrir publicacao
async function abrirPublicacao(id) {
    const appContainer = document.getElementById('blog-app');
    appContainer.innerHTML = '<p class="carregando">Carregando...</p>';

    const pub = await buscarPublicacao(id, { join: ['created_by', 'categoria'] });

    if (!pub.status) {
        appContainer.innerHTML = '<p class="sem-publicacoes">Publicacao nao encontrada.</p>';
        return;
    }

    await renderizarPublicacaoCompleta(pub, appContainer);
}

// Inicializar blog
async function inicializarBlog() {
    const appContainer = document.getElementById('blog-app');
    if (!appContainer) return;

    appContainer.innerHTML = `
        <div id="categorias-container"></div>
        <div id="publicacoes-container"><p class="carregando">Carregando...</p></div>
    `;

    const catData = await listarCategorias({ filter: 'status,eq,1' });
    categorias = catData.records || [];
    renderizarCategorias(document.getElementById('categorias-container'));

    await carregarPublicacoes();
}

// Exportar funcoes
export {
    listarCategorias,
    buscarCategoria,
    listarPublicacoes,
    buscarPublicacao,
    buscarUsuario,
    inicializarBlog
};
