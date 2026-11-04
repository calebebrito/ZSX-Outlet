// ==========================================================================
// TELA DEDICADA DE CATEGORIAS (CLASSES) - ZSX OUTLET
// ==========================================================================

// Metadados das Categorias
const categoriesMeta = {
    'all': {
        title: 'Todas as Peças',
        categoryName: 'Catálogo Geral',
        badge: 'COLEÇÃO COMPLETA • ZSX ARCHIVE',
        desc: 'Explore todo o acervo da ZSX Outlet: streetwear de alta qualidade, tecidos nobres e acabamentos exclusivos com os melhores descontos do Brasil.'
    },
    'camisas': {
        title: 'Camisas',
        categoryName: 'Camisas & Camisetas',
        badge: 'DROP EXCLUSIVO • STREETWEAR',
        desc: 'Camisetas oversized, boxy e vintage acid wash produzidas em algodão premium com estampas exclusivas e caimento streetwear impecável.'
    },
    'bermudas': {
        title: 'Bermudas',
        categoryName: 'Bermudas & Shorts',
        badge: 'ESSENTIALS COMFORT',
        desc: 'Bermudas cargo, moletom heavyweight e tecidos técnicos ripstop para máxima liberdade de movimento e atitude urbana.'
    },
    'bones': {
        title: 'Bonés',
        categoryName: 'Bonés & Acessórios',
        badge: 'HEADWEAR ARCHIVE',
        desc: 'Dad hats, bonés 5-panel, truckers e beanies com bordados em relevo e regulagens personalizadas ZSX.'
    },
    'jerseys': {
        title: 'Camisas de Time',
        categoryName: 'Jerseys & Esporte',
        badge: 'BLOCKCORE & RETRO SPORT',
        desc: 'Modelagens inspiradas na cultura futebolística e basquete com tecidos tecnológicos respiráveis e estampas de alta durabilidade.'
    },
    'calcados': {
        title: 'Calçados',
        categoryName: 'Calçados & Tênis',
        badge: 'FOOTWEAR LUXURY',
        desc: 'Chunky sneakers, clássicos de perfil baixo e slides com solados de alta absorção e design brutalista contemporâneo.'
    },
    'casacos': {
        title: 'Casacos',
        categoryName: 'Casacos & Moletons',
        badge: 'WINTER COLLECTION',
        desc: 'Moletons 420 GSM, jaquetas puffer acolchoadas e corta-ventos técnicos impermeáveis para compor sobreposições de impacto.'
    },
    'polos': {
        title: 'Camisas Polo',
        categoryName: 'Camisas Polo',
        badge: 'CLASSIC STREETWEAR',
        desc: 'Polos em piquet de algodão nobre com golas estruturadas que mantêm o alinhamento impecável em qualquer ocasião.'
    }
};

// Catálogo Completo de Produtos por Categoria
const allProducts = [
    // --- CAMISAS ---
    {
        id: 'camisa-1',
        categoryKey: 'camisas',
        category: 'Camisas',
        name: 'Camiseta Oversized ZSX Graphic',
        price: 99.90,
        originalPrice: 149.90,
        discount: '33% OFF',
        installments: '3x de R$ 33,30 sem juros',
        badge: 'NEW DROP',
        sizes: ['P', 'M', 'G', 'GG'],
        image: '../images/shirts3d.png',
        popularity: 95
    },
    {
        id: 'camisa-2',
        categoryKey: 'camisas',
        category: 'Camisas',
        name: 'Camiseta Boxy Heavyweight Preta',
        price: 109.90,
        originalPrice: 159.90,
        discount: '31% OFF',
        installments: '3x de R$ 36,63 sem juros',
        badge: 'BESTSELLER',
        sizes: ['M', 'G', 'GG', 'XGG'],
        image: '../images/shirts.png',
        popularity: 98
    },
    {
        id: 'camisa-3',
        categoryKey: 'camisas',
        category: 'Camisas',
        name: 'Camiseta Acid Wash Vintage ZSX',
        price: 119.90,
        originalPrice: 169.90,
        discount: '29% OFF',
        installments: '3x de R$ 39,96 sem juros',
        badge: 'DROP LIMITADO',
        sizes: ['P', 'M', 'G'],
        image: '../images/shirts3d.png',
        popularity: 88
    },
    {
        id: 'camisa-4',
        categoryKey: 'camisas',
        category: 'Camisas',
        name: 'Camiseta Streetwear Off-White Minimal',
        price: 99.90,
        originalPrice: 149.90,
        discount: '33% OFF',
        installments: '3x de R$ 33,30 sem juros',
        badge: 'ESSENTIALS',
        sizes: ['P', 'M', 'G', 'GG'],
        image: '../images/shirts.png',
        popularity: 91
    },

    // --- BERMUDAS ---
    {
        id: 'bermuda-1',
        categoryKey: 'bermudas',
        category: 'Bermudas',
        name: 'Bermuda Cargo Streetwear Preta',
        price: 129.90,
        originalPrice: 189.90,
        discount: '31% OFF',
        installments: '4x de R$ 32,47 sem juros',
        badge: 'BESTSELLER',
        sizes: ['P', 'M', 'G', 'GG'],
        image: '../images/shorts3d.png',
        popularity: 97
    },
    {
        id: 'bermuda-2',
        categoryKey: 'bermudas',
        category: 'Bermudas',
        name: 'Bermuda Moletom Heavyweight Mescla',
        price: 119.90,
        originalPrice: 169.90,
        discount: '29% OFF',
        installments: '3x de R$ 39,96 sem juros',
        badge: 'COMFORT FIT',
        sizes: ['M', 'G', 'GG'],
        image: '../images/shorts.png',
        popularity: 89
    },
    {
        id: 'bermuda-3',
        categoryKey: 'bermudas',
        category: 'Bermudas',
        name: 'Bermuda Nylon Ripstop Utility',
        price: 139.90,
        originalPrice: 199.90,
        discount: '30% OFF',
        installments: '4x de R$ 34,97 sem juros',
        badge: 'WATER REPELLENT',
        sizes: ['P', 'M', 'G', 'GG', 'XGG'],
        image: '../images/shorts3d.png',
        popularity: 92
    },
    {
        id: 'bermuda-4',
        categoryKey: 'bermudas',
        category: 'Bermudas',
        name: 'Bermuda ZSX Sport Comfort',
        price: 109.90,
        originalPrice: 159.90,
        discount: '31% OFF',
        installments: '3x de R$ 36,63 sem juros',
        badge: 'ESSENTIALS',
        sizes: ['P', 'M', 'G'],
        image: '../images/shorts.png',
        popularity: 85
    },

    // --- BONÉS ---
    {
        id: 'bone-1',
        categoryKey: 'bones',
        category: 'Bonés',
        name: 'Boné Dad Hat ZSX Logo Bordado',
        price: 79.90,
        originalPrice: 119.90,
        discount: '33% OFF',
        installments: '2x de R$ 39,95 sem juros',
        badge: 'BESTSELLER',
        sizes: ['Único'],
        image: '../images/hats3d.png',
        popularity: 96
    },
    {
        id: 'bone-2',
        categoryKey: 'bones',
        category: 'Bonés',
        name: 'Boné 5 Panel Streetwear Preto',
        price: 89.90,
        originalPrice: 129.90,
        discount: '31% OFF',
        installments: '3x de R$ 29,96 sem juros',
        badge: 'NEW DROP',
        sizes: ['Único'],
        image: '../images/caps.png',
        popularity: 90
    },
    {
        id: 'bone-3',
        categoryKey: 'bones',
        category: 'Bonés',
        name: 'Boné Trucker Vintage ZSX Racing',
        price: 84.90,
        originalPrice: 119.90,
        discount: '29% OFF',
        installments: '2x de R$ 42,45 sem juros',
        badge: 'VINTAGE',
        sizes: ['Único'],
        image: '../images/hats3d.png',
        popularity: 84
    },
    {
        id: 'bone-4',
        categoryKey: 'bones',
        category: 'Bonés',
        name: 'Gorro Beanie Heavy Knit ZSX',
        price: 69.90,
        originalPrice: 99.90,
        discount: '30% OFF',
        installments: '2x de R$ 34,95 sem juros',
        badge: 'WINTER',
        sizes: ['Único'],
        image: '../images/caps.png',
        popularity: 88
    },

    // --- CAMISAS DE TIME (JERSEYS) ---
    {
        id: 'jersey-1',
        categoryKey: 'jerseys',
        category: 'Camisas de Time',
        name: 'Jersey Brasil ZSX Copa Street Edition',
        price: 159.90,
        originalPrice: 229.90,
        discount: '30% OFF',
        installments: '5x de R$ 31,98 sem juros',
        badge: 'COPA DO MUNDO',
        sizes: ['P', 'M', 'G', 'GG'],
        image: '../images/newRelease.png',
        popularity: 100
    },
    {
        id: 'jersey-2',
        categoryKey: 'jerseys',
        category: 'Camisas de Time',
        name: 'Jersey Vintage Retro Football Black',
        price: 149.90,
        originalPrice: 219.90,
        discount: '32% OFF',
        installments: '4x de R$ 37,47 sem juros',
        badge: 'RETRO DROP',
        sizes: ['M', 'G', 'GG'],
        image: '../images/jerseys3d.png',
        popularity: 94
    },
    {
        id: 'jersey-3',
        categoryKey: 'jerseys',
        category: 'Camisas de Time',
        name: 'Jersey Basketball Oversized ZSX 98',
        price: 139.90,
        originalPrice: 199.90,
        discount: '30% OFF',
        installments: '4x de R$ 34,97 sem juros',
        badge: 'STREET HOOPS',
        sizes: ['P', 'M', 'G', 'GG', 'XGG'],
        image: '../images/jerseys.png',
        popularity: 90
    },
    {
        id: 'jersey-4',
        categoryKey: 'jerseys',
        category: 'Camisas de Time',
        name: 'Jersey Streetwear Blockcore Edition',
        price: 149.90,
        originalPrice: 209.90,
        discount: '28% OFF',
        installments: '4x de R$ 37,47 sem juros',
        badge: 'BLOCKCORE',
        sizes: ['M', 'G', 'GG'],
        image: '../images/jerseys3d.png',
        popularity: 87
    },

    // --- CALÇADOS ---
    {
        id: 'calcado-1',
        categoryKey: 'calcados',
        category: 'Calçados',
        name: 'Tênis ZSX Chunky Runner 3D',
        price: 299.90,
        originalPrice: 449.90,
        discount: '33% OFF',
        installments: '6x de R$ 49,98 sem juros',
        badge: 'BESTSELLER',
        sizes: ['38', '39', '40', '41', '42', '43'],
        image: '../images/shoes3d.png',
        popularity: 99
    },
    {
        id: 'calcado-2',
        categoryKey: 'calcados',
        category: 'Calçados',
        name: 'Tênis Streetwear Low Profile Black',
        price: 279.90,
        originalPrice: 399.90,
        discount: '30% OFF',
        installments: '6x de R$ 46,65 sem juros',
        badge: 'MINIMAL LUXURY',
        sizes: ['39', '40', '41', '42'],
        image: '../images/shoes-original.png',
        popularity: 93
    },
    {
        id: 'calcado-3',
        categoryKey: 'calcados',
        category: 'Calçados',
        name: 'Tênis Skate Retro ZSX White',
        price: 259.90,
        originalPrice: 379.90,
        discount: '31% OFF',
        installments: '6x de R$ 43,31 sem juros',
        badge: 'SKATE ARCHIVE',
        sizes: ['38', '39', '40', '41', '42'],
        image: '../images/shoes-original.png',
        popularity: 89
    },
    {
        id: 'calcado-4',
        categoryKey: 'calcados',
        category: 'Calçados',
        name: 'Slide ZSX Cloud Sandal',
        price: 129.90,
        originalPrice: 179.90,
        discount: '28% OFF',
        installments: '4x de R$ 32,47 sem juros',
        badge: 'COMFORT CLOUD',
        sizes: ['37/38', '39/40', '41/42', '43/44'],
        image: '../images/shoes3d.png',
        popularity: 86
    },

    // --- CASACOS ---
    {
        id: 'casaco-1',
        categoryKey: 'casacos',
        category: 'Casacos',
        name: 'Moletom Adidas Preto Oversized',
        price: 189.90,
        originalPrice: 299.90,
        discount: '36% OFF',
        installments: '6x de R$ 31,65 sem juros',
        badge: 'BESTSELLER',
        sizes: ['P', 'M', 'G', 'GG', 'XGG'],
        image: '../images/products/blusao-adidas.jpg',
        popularity: 100
    },
    {
        id: 'casaco-2',
        categoryKey: 'casacos',
        category: 'Casacos',
        name: 'Corta-Vento ZSX Preto Ripstop',
        price: 219.90,
        originalPrice: 329.90,
        discount: '33% OFF',
        installments: '6x de R$ 36,65 sem juros',
        badge: 'WATER RESISTANT',
        sizes: ['P', 'M', 'G', 'GG'],
        image: '../images/products/corta-vento.jpg',
        popularity: 95
    },
    {
        id: 'casaco-3',
        categoryKey: 'casacos',
        category: 'Casacos',
        name: 'Jaqueta Puffer ZSX Winter Black',
        price: 249.90,
        originalPrice: 399.90,
        discount: '37% OFF',
        installments: '6x de R$ 41,65 sem juros',
        badge: 'WINTER LUXURY',
        sizes: ['M', 'G', 'GG', 'XGG'],
        image: '../images/products/bobojaco.jpg',
        popularity: 96
    },
    {
        id: 'casaco-4',
        categoryKey: 'casacos',
        category: 'Casacos',
        name: 'Suéter High Knit Streetwear',
        price: 199.90,
        originalPrice: 289.90,
        discount: '31% OFF',
        installments: '6x de R$ 33,31 sem juros',
        badge: 'EXCLUSIVE DROP',
        sizes: ['P', 'M', 'G', 'GG'],
        image: '../images/products/sueter.jpg',
        popularity: 91
    },
    {
        id: 'casaco-5',
        categoryKey: 'casacos',
        category: 'Casacos',
        name: 'Corta-Vento Nike Sport Preto',
        price: 219.90,
        originalPrice: 349.90,
        discount: '37% OFF',
        installments: '6x de R$ 36,65 sem juros',
        badge: 'ATHLETIC',
        sizes: ['P', 'M', 'G', 'GG'],
        image: '../images/products/corta-vento-nike.jpg',
        popularity: 94
    },

    // --- CAMISAS POLO ---
    {
        id: 'polo-1',
        categoryKey: 'polos',
        category: 'Camisas Polo',
        name: 'Camisa Polo ZSX Branca Premium',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        badge: 'BESTSELLER',
        sizes: ['P', 'M', 'G', 'GG'],
        image: '../images/products/Captura de tela 2026-09-24 113712.png',
        popularity: 94
    },
    {
        id: 'polo-2',
        categoryKey: 'polos',
        category: 'Camisas Polo',
        name: 'Camisa Polo ZSX Preta Night',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        badge: 'NIGHT DROP',
        sizes: ['P', 'M', 'G', 'GG'],
        image: '../images/products/Captura de tela 2026-09-24 113730.png',
        popularity: 92
    },
    {
        id: 'polo-3',
        categoryKey: 'polos',
        category: 'Camisas Polo',
        name: 'Camisa Polo ZSX Listrada Classic',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        badge: 'VINTAGE STRIPE',
        sizes: ['P', 'M', 'G', 'GG'],
        image: '../images/products/Captura de tela 2026-09-24 113712.png',
        popularity: 88
    },
    {
        id: 'polo-4',
        categoryKey: 'polos',
        category: 'Camisas Polo',
        name: 'Camisa Polo ZSX Dark Shadow',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        badge: 'SHADOW BLACK',
        sizes: ['M', 'G', 'GG'],
        image: '../images/products/Captura de tela 2026-09-24 113730.png',
        popularity: 87
    },
    {
        id: 'polo-5',
        categoryKey: 'polos',
        category: 'Camisas Polo',
        name: 'Camisa Polo ZSX White Elegance',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        badge: 'ELEGANCE',
        sizes: ['P', 'M', 'G', 'GG'],
        image: '../images/products/Captura de tela 2026-09-24 113712.png',
        popularity: 90
    }
];

// Estado da Tela de Categorias
let currentCategory = 'all';
let currentSizeFilter = 'all';
let currentSortOrder = 'popular';
let wishlistIds = JSON.parse(localStorage.getItem('zsx_wishlist')) || [];

// Formatar BRL
function formatMoneyBRL(val) {
    return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Obter Categoria da URL
function getCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (cat && categoriesMeta[cat]) {
        return cat;
    }
    return 'all';
}

// Atualizar Informações do Banner da Categoria
function updateCategoryHero(catKey) {
    const meta = categoriesMeta[catKey] || categoriesMeta['all'];

    document.title = `${meta.title} | ZSX Outlet`;

    const breadcrumbCat = document.getElementById('catBreadcrumbCurrent');
    const heroTitle = document.getElementById('catTitle');
    const heroBadge = document.getElementById('catHeroBadge');
    const heroDesc = document.getElementById('catDesc');

    if (breadcrumbCat) breadcrumbCat.textContent = meta.title;
    if (heroTitle) heroTitle.textContent = meta.title;
    if (heroBadge) heroBadge.textContent = meta.badge;
    if (heroDesc) heroDesc.textContent = meta.desc;

    // Atualiza botão de pílula ativo
    document.querySelectorAll('.cat-pill-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === catKey);
    });
}

// Filtrar e Ordenar Produtos
function getFilteredAndSortedProducts() {
    let list = [...allProducts];

    // Filtrar por Categoria
    if (currentCategory !== 'all') {
        list = list.filter(p => p.categoryKey === currentCategory);
    }

    // Filtrar por Tamanho
    if (currentSizeFilter !== 'all') {
        list = list.filter(p => p.sizes.includes(currentSizeFilter));
    }

    // Ordenação
    if (currentSortOrder === 'popular') {
        list.sort((a, b) => b.popularity - a.popularity);
    } else if (currentSortOrder === 'price-asc') {
        list.sort((a, b) => a.price - b.price);
    } else if (currentSortOrder === 'price-desc') {
        list.sort((a, b) => b.price - a.price);
    } else if (currentSortOrder === 'discount') {
        list.sort((a, b) => {
            const discA = parseFloat(a.discount) || 0;
            const discB = parseFloat(b.discount) || 0;
            return discB - discA;
        });
    }

    return list;
}

// Renderizar Grade de Produtos
function renderCategoryProducts() {
    const grid = document.getElementById('catProductsGrid');
    const countBadge = document.getElementById('catCountBadge');
    if (!grid) return;

    const products = getFilteredAndSortedProducts();

    if (countBadge) {
        countBadge.textContent = `${products.length} ${products.length === 1 ? 'peça encontrada' : 'peças encontradas'}`;
    }

    if (products.length === 0) {
        grid.innerHTML = `
            <div class="cat-empty-state">
                <span class="cat-empty-icon"><svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12L4 18v22a3 3 0 0 0 3 3h34a3 3 0 0 0 3-3V18l-4-6z"/><line x1="4" y1="18" x2="44" y2="18"/><path d="M30 24a6 6 0 0 1-12 0"/></svg></span>
                <h3 class="cat-empty-title">Nenhuma peça encontrada</h3>
                <p class="cat-empty-desc">Tente alterar os filtros de tamanho ou selecionar outra categoria.</p>
                <button type="button" class="btn-related-view" onclick="resetFilters()" style="max-width: 220px; margin: 0 auto;">Ver Todas as Peças</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = products.map(prod => {
        const isFav = wishlistIds.includes(prod.id);
        return `
            <div class="cat-prod-card" data-id="${prod.id}">
                <div class="cat-card-img-box" onclick="goToProduct('${prod.id}')">
                    <span class="cat-card-badge">${prod.badge}</span>
                    <button type="button" class="cat-card-wishlist ${isFav ? 'active' : ''}" 
                            data-wish-id="${prod.id}" 
                            onclick="toggleWishlist(event, '${prod.id}', '${prod.name}')" 
                            title="Salvar nos Favoritos"
                            aria-label="Favoritar">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="${isFav ? '#e11d48' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <img src="${prod.image}" alt="${prod.name}">
                </div>
                <div class="cat-card-body" onclick="goToProduct('${prod.id}')">
                    <span class="cat-card-category">${prod.category}</span>
                    <h3 class="cat-card-title">${prod.name}</h3>
                    <div class="cat-card-prices">
                        <span class="cat-card-price-current">${formatMoneyBRL(prod.price)}</span>
                        <span class="cat-card-price-original">${formatMoneyBRL(prod.originalPrice)}</span>
                        <span class="cat-card-discount-tag">${prod.discount}</span>
                    </div>
                    <p class="cat-card-installments">ou ${prod.installments}</p>
                    <div class="cat-card-actions">
                        <button type="button" class="btn-cat-view" onclick="event.stopPropagation(); goToProduct('${prod.id}')">
                            Ver Detalhes
                        </button>
                        <button type="button" class="btn-cat-add-cart" 
                                onclick="event.stopPropagation(); quickAddToCart('${prod.id}')" 
                                title="Adicionar ao Carrinho"
                                aria-label="Adicionar ao Carrinho">
                            <span class="btn-bg-sweep"></span>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.3">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Redirecionar para o Produto
window.goToProduct = function(prodId) {
    window.location.href = `product.html?id=${encodeURIComponent(prodId)}`;
};

// Adicionar Rápido ao Carrinho a partir do Card
window.quickAddToCart = function(prodId) {
    const prod = allProducts.find(p => p.id === prodId);
    if (!prod) return;

    const defaultSize = prod.sizes.includes('M') ? 'M' : prod.sizes[0];
    const productData = {
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        size: defaultSize,
        color: 'Padrão ZSX'
    };

    addToCart(productData, false);
    showToast(`"${prod.name}" adicionado ao carrinho!`, 'success');
};

// Alternar Favorito
window.toggleWishlist = function(event, prodId, prodName) {
    event.stopPropagation();
    const btn = event.currentTarget;
    const exists = wishlistIds.includes(prodId);

    if (exists) {
        wishlistIds = wishlistIds.filter(id => id !== prodId);
        btn.classList.remove('active');
        const svg = btn.querySelector('svg');
        if (svg) svg.setAttribute('fill', 'none');
        showToast(`Item removido dos favoritos.`, 'info');
    } else {
        wishlistIds.push(prodId);
        btn.classList.add('active');
        const svg = btn.querySelector('svg');
        if (svg) svg.setAttribute('fill', '#e11d48');
        showToast(`"${prodName}" adicionado aos favoritos!`, 'success');
    }

    localStorage.setItem('zsx_wishlist', JSON.stringify(wishlistIds));
};

// Resetar Filtros
window.resetFilters = function() {
    currentCategory = 'all';
    currentSizeFilter = 'all';
    currentSortOrder = 'popular';
    
    // Atualiza botões
    document.querySelectorAll('.cat-pill-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.category === 'all'));
    document.querySelectorAll('.cat-size-pill').forEach(btn => btn.classList.toggle('active', btn.dataset.size === 'all'));
    const sortSel = document.getElementById('catSortSelect');
    if (sortSel) sortSel.value = 'popular';

    // Atualiza URL
    const url = new URL(window.location);
    url.searchParams.set('cat', 'all');
    window.history.pushState({}, '', url);

    updateCategoryHero('all');
    renderCategoryProducts();
};

// Configurar Eventos da Página
function setupCategoryEvents() {
    // Cliques nas Pílulas de Categoria
    document.querySelectorAll('.cat-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.category;
            currentCategory = cat;

            // Atualiza URL sem recarregar a página
            const url = new URL(window.location);
            url.searchParams.set('cat', cat);
            window.history.pushState({}, '', url);

            updateCategoryHero(cat);
            renderCategoryProducts();
            window.scrollTo({ top: 120, behavior: 'smooth' });
        });
    });

    // Filtros de Tamanho
    document.querySelectorAll('.cat-size-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-size-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSizeFilter = btn.dataset.size;
            renderCategoryProducts();
        });
    });

    // Ordenação
    const sortSelect = document.getElementById('catSortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSortOrder = e.target.value;
            renderCategoryProducts();
        });
    }

    // Suporte ao botão voltar/avançar do navegador (popstate)
    window.addEventListener('popstate', () => {
        currentCategory = getCategoryFromUrl();
        updateCategoryHero(currentCategory);
        renderCategoryProducts();
    });
}

// Sincronizar Catálogo com Painel Administrativo (LocalStorage)
function syncCategoryCatalogWithAdmin() {
    const overrides = JSON.parse(localStorage.getItem('zsx_catalog_overrides')) || {};
    const customList = JSON.parse(localStorage.getItem('zsx_custom_products')) || [];
    const deletedIds = JSON.parse(localStorage.getItem('zsx_deleted_products')) || [];

    // Remove deletados ou inativos
    for (let i = allProducts.length - 1; i >= 0; i--) {
        const pid = allProducts[i].id;
        if (deletedIds.includes(pid) || (overrides[pid] && overrides[pid].active === false)) {
            allProducts.splice(i, 1);
            continue;
        }
        if (overrides[pid]) {
            const ov = overrides[pid];
            Object.assign(allProducts[i], ov);
            const p = parseFloat(allProducts[i].price) || 0;
            const orig = parseFloat(allProducts[i].originalPrice) || p;
            if (orig > p && orig > 0) {
                allProducts[i].discount = `${Math.round(((orig - p) / orig) * 100)}% OFF`;
            }
            allProducts[i].installments = `3x de R$ ${(p / 3).toFixed(2).replace('.', ',')} sem juros`;
        }
    }

    // Adiciona novos produtos criados no painel
    customList.forEach(customProd => {
        if (deletedIds.includes(customProd.id)) return;
        const ov = overrides[customProd.id] || {};
        const merged = { ...customProd, ...ov };
        if (merged.active === false) return;
        if (!allProducts.some(p => p.id === merged.id)) {
            allProducts.unshift(merged);
        }
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    syncCategoryCatalogWithAdmin();
    currentCategory = getCategoryFromUrl();
    updateCategoryHero(currentCategory);
    setupCategoryEvents();
    renderCategoryProducts();
});

