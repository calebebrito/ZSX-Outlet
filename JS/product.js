// ==========================================================================
// TELA DEDICADA DE PRODUTO (PDP) - ZSX OUTLET
// ==========================================================================

// Catálogo Completo de Produtos da Loja
const productsDB = {
    'casaco-1': {
        id: 'casaco-1',
        name: 'Moletom Adidas Preto Oversized',
        category: 'Casacos & Moletons',
        tag: 'NEW ARRIVAL • BESTSELLER',
        price: 189.90,
        originalPrice: 299.90,
        discount: '36% OFF',
        installments: '6x de R$ 31,65 sem juros',
        rating: 4.9,
        reviewsCount: 165,
        image: '../images/products/blusao-adidas.jpg',
        gallery: [
            '../images/products/blusao-adidas.jpg',
            '../images/products/corta-vento.jpg',
            '../images/products/bobojaco.jpg',
            '../images/products/sueter.jpg'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Cinza Mescla', hex: '#6b7280' },
            { name: 'Off-White', hex: '#ebe7df' },
            { name: 'Bege Areia', hex: '#c5b6a3' }
        ],
        sizes: ['P', 'M', 'G', 'GG', 'XGG'],
        description: 'Moletom heavyweight confeccionado em algodão premium 420 GSM felpado. Modelagem oversized com caimento caído nos ombros, capuz duplo estruturado e bolso canguru com costuras reforçadas. O equilíbrio definitivo entre conforto térmico e atitude streetwear contemporânea.',
        specs: [
            'Modelagem Streetwear Oversized autêntica',
            'Tecido 100% Algodão Heavyweight Penteado 420 GSM',
            'Capuz anatômico duplo com ilhós e cordão premium',
            'Punhos e barra canelados com elastano de alta retenção',
            'Costuras duplas reforçadas nos ombros e cavas',
            'Unissex com caimento estruturado e fluido'
        ],
        materialsText: 'Confeccionado com fio 100% algodão penteado de fibra longa, pré-encolhido e com acabamento peletizado de toque ultra aveludado. A gramatura de 420 GSM garante isolamento térmico elevado sem perder a maleabilidade.',
        fitText: 'Modelagem ampla e moderna (oversized). Se você prefere o visual tradicional caído com atitude urbana, escolha o seu tamanho padrão. Para um caimento mais alinhado ao corpo, recomendamos um tamanho menor.',
        shippingText: 'Envio expresso para todo o Brasil em até 24 horas úteis após a confirmação do pagamento. Rastreamento em tempo real via WhatsApp e e-mail. Primeira troca 100% gratuita em até 30 dias.'
    },

    'casaco-2': {
        id: 'casaco-2',
        name: 'Corta-Vento ZSX Preto Ripstop',
        category: 'Casacos & Jaquetas',
        tag: 'WATER RESISTANT',
        price: 219.90,
        originalPrice: 329.90,
        discount: '33% OFF',
        installments: '6x de R$ 36,65 sem juros',
        rating: 4.8,
        reviewsCount: 112,
        image: '../images/products/corta-vento.jpg',
        gallery: [
            '../images/products/corta-vento.jpg',
            '../images/products/corta-vento-nike.jpg',
            '../images/products/blusao-adidas.jpg',
            '../images/products/bobojaco.jpg'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Verde Militar', hex: '#374151' },
            { name: 'Azul Petróleo', hex: '#1e293b' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Jaqueta corta-vento produzida em tecido técnico ripstop com acabamento repelente a água e vento. Zíper frontal tratorado com puxador emborrachado, capuz com cordões elásticos ajustáveis e forro respirável interno.',
        specs: [
            'Tecido Ripstop impermeável e resistente a rasgos',
            'Forro interno em mesh dry respirável',
            'Zíper frontal reforçado tratorado bidirecional',
            'Ajustes elásticos com stopper no capuz e barra',
            'Bolsos laterais com zíper invisível de segurança',
            'Leveza e proteção para o dia a dia urbano'
        ],
        materialsText: 'Composição 100% poliamida com membrana hidrofóbica DWR (Durable Water Repellent). Bloqueia ventos fortes e garoas leves mantendo o corpo seco.',
        fitText: 'Modelagem regular fit ergonômica com espaço confortável para usar por cima de camisetas ou moletons leves.',
        shippingText: 'Entrega rápida com seguro total contra extravios. Código de rastreamento enviado automaticamente.'
    },

    'casaco-3': {
        id: 'casaco-3',
        name: 'Jaqueta Puffer ZSX Winter Black',
        category: 'Casacos & Jaquetas',
        tag: 'WINTER EDITION • LUXURY',
        price: 249.90,
        originalPrice: 399.90,
        discount: '37% OFF',
        installments: '6x de R$ 41,65 sem juros',
        rating: 5.0,
        reviewsCount: 210,
        image: '../images/products/bobojaco.jpg',
        gallery: [
            '../images/products/bobojaco.jpg',
            '../images/products/blusao-adidas.jpg',
            '../images/products/corta-vento.jpg',
            '../images/products/sueter.jpg'
        ],
        colors: [
            { name: 'Preto Fosco', hex: '#18181b' },
            { name: 'Cinza Chumbo', hex: '#3f3f46' },
            { name: 'Off-White', hex: '#e4e4e7' }
        ],
        sizes: ['M', 'G', 'GG', 'XGG'],
        description: 'Jaqueta puffer acolchoada com isolamento térmico ultra leve e gola alta protetora. Acabamento externo fosco acetinado, punhos elásticos anatômicos e bolsos laterais embutidos com forro térmico especial.',
        specs: [
            'Enchimento sintético featherless de alta densidade',
            'Gola alta estruturada com protetor de queixo',
            'Tecido externo fosco acetinado com toque macio',
            'Bolsos internos para carteira e smartphone',
            'Punhos internos com elástico corta-vento',
            'Design clean brutalista sem costuras aparentes na frente'
        ],
        materialsText: 'Exterior 100% poliéster fosco de alta gramatura. Forro térmico em tafetá e enchimento térmico antialérgico de rápida recuperação de volume.',
        fitText: 'Caimento boxy puffer moderno. Perfeito para compor sobreposições de inverno com camisetas e moletons.',
        shippingText: 'Produto embalado em caixa reforçada com capa protetora de tecido ZSX.'
    },

    'casaco-4': {
        id: 'casaco-4',
        name: 'Suéter High Knit Streetwear',
        category: 'Casacos & Tricôs',
        tag: 'EXCLUSIVE DROP',
        price: 199.90,
        originalPrice: 289.90,
        discount: '31% OFF',
        installments: '6x de R$ 33,31 sem juros',
        rating: 4.7,
        reviewsCount: 78,
        image: '../images/products/sueter.jpg',
        gallery: [
            '../images/products/sueter.jpg',
            '../images/products/blusao-adidas.jpg',
            '../images/products/corta-vento.jpg',
            '../images/products/bobojaco.jpg'
        ],
        colors: [
            { name: 'Estampado Street', hex: '#27272a' },
            { name: 'Grafite ZSX', hex: '#52525b' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Suéter em tricô jacquard encorpado com padrões gráficos de alta definição. Fio de algodão de toque ultra macio, gola redonda reforçada e caimento solto no corpo para um estilo high fashion autêntico.',
        specs: [
            'Trama jacquard densa em ponto inglês',
            'Fio nobre anti-pilling (não forma bolinhas)',
            'Gola careca reforçada com costura invisível',
            'Barra e punhos com elasticidade permanente',
            'Toque térmico e respirável para meia-estação e inverno'
        ],
        materialsText: 'Composição: 70% algodão nobre e 30% poliacrílico termossensível.',
        fitText: 'Modelagem relaxada com mangas amplas e ombros deslocados.',
        shippingText: 'Envio imediato com garantia de devolução sem burocracia.'
    },

    'casaco-5': {
        id: 'casaco-5',
        name: 'Corta-Vento Nike Sport Preto',
        category: 'Casacos & Jaquetas',
        tag: 'ICONIC ATHLETIC',
        price: 219.90,
        originalPrice: 349.90,
        discount: '37% OFF',
        installments: '6x de R$ 36,65 sem juros',
        rating: 4.9,
        reviewsCount: 184,
        image: '../images/products/corta-vento-nike.jpg',
        gallery: [
            '../images/products/corta-vento-nike.jpg',
            '../images/products/corta-vento.jpg',
            '../images/products/blusao-adidas.jpg',
            '../images/products/bobojaco.jpg'
        ],
        colors: [
            { name: 'Preto Athletic', hex: '#09090b' },
            { name: 'Preto e Branco', hex: '#27272a' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Corta-vento técnico de alta mobilidade com tecido corta-vento ultra leve, design dinâmico e logos termocolados de alta durabilidade. Ideal para transição entre treinos e uso urbano moderno.',
        specs: [
            'Tecido corta-vento ultraleve de secagem rápida',
            'Zíper selado frontal com acabamento refletivo',
            'Capuz ergonômico ajustável em múltiplos pontos',
            'Abertura posterior para ventilação estratégica',
            'Punhos elásticos de perfil baixo'
        ],
        materialsText: '100% poliéster reciclado de alta tenacidade.',
        fitText: 'Modelagem atlética com liberdade de movimentos.',
        shippingText: 'Frete Grátis com envio rastreado para todo o país.'
    },

    'polo-1': {
        id: 'polo-1',
        name: 'Camisa Polo ZSX Branca Premium',
        category: 'Camisas Polo',
        tag: 'CLÁSSICO STREETWEAR',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        rating: 4.8,
        reviewsCount: 94,
        image: '../images/products/Captura de tela 2026-09-24 113712.png',
        gallery: [
            '../images/products/Captura de tela 2026-09-24 113712.png',
            '../images/products/Captura de tela 2026-09-24 113730.png',
            '../images/products/blusao-adidas.jpg',
            '../images/products/corta-vento.jpg'
        ],
        colors: [
            { name: 'Branco Puro', hex: '#ffffff' },
            { name: 'Off-White', hex: '#f4f4f5' },
            { name: 'Preto ZSX', hex: '#18181b' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Camisa polo confeccionada em piquet 100% algodão de fibra longa, gola e punhos canelados estruturados e peitilho com botões personalizados ZSX.',
        specs: [
            'Tecido Piquet 100% Algodão penteado nobre',
            'Gola firme que não enrola após a lavagem',
            'Peitilho com botões foscos personalizados',
            'Fendas laterais na barra para melhor caimento',
            'Bordado sutil de alta definição'
        ],
        materialsText: '100% algodão penteado de fibra longa.',
        fitText: 'Modelagem custom fit equilibrada.',
        shippingText: 'Envio imediato.'
    },

    'polo-2': {
        id: 'polo-2',
        name: 'Camisa Polo ZSX Preta Night',
        category: 'Camisas Polo',
        tag: 'MAIS VENDIDO',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        rating: 4.9,
        reviewsCount: 128,
        image: '../images/products/Captura de tela 2026-09-24 113730.png',
        gallery: [
            '../images/products/Captura de tela 2026-09-24 113730.png',
            '../images/products/Captura de tela 2026-09-24 113712.png',
            '../images/products/blusao-adidas.jpg',
            '../images/products/sueter.jpg'
        ],
        colors: [
            { name: 'Preto Onix', hex: '#09090b' },
            { name: 'Grafite Escuro', hex: '#27272a' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Polo minimalista preta com caimento sob medida, tecido piquet respirável pré-encolhido que não desbota após as lavagens.',
        specs: [
            'Tingimento reativo preto profundo',
            'Piquet respirável pré-encolhido',
            'Costuras duplas reforçadas'
        ],
        materialsText: '100% algodão piquet nobre.',
        fitText: 'Modelagem regular alinhada.',
        shippingText: 'Envio expresso.'
    },

    'polo-3': {
        id: 'polo-3',
        name: 'Camisa Polo ZSX Listrada Classic',
        category: 'Camisas Polo',
        tag: 'DROP LIMITADO',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        rating: 4.8,
        reviewsCount: 65,
        image: '../images/products/Captura de tela 2026-09-24 113712.png',
        gallery: [
            '../images/products/Captura de tela 2026-09-24 113712.png',
            '../images/products/Captura de tela 2026-09-24 113730.png',
            '../images/products/bobojaco.jpg',
            '../images/products/corta-vento-nike.jpg'
        ],
        colors: [
            { name: 'Listrada Branco/Preto', hex: '#e4e4e7' },
            { name: 'Preto ZSX', hex: '#18181b' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Polo listrada com referência retrô contemporânea, bordado discreto no tórax e toque extremamente macio.',
        specs: [
            'Listras tecidas fio a fio',
            'Piquet premium de alta durabilidade',
            'Caimento impecável'
        ],
        materialsText: '100% algodão.',
        fitText: 'Modelagem regular.',
        shippingText: 'Entrega rápida em todo o Brasil.'
    },

    'polo-4': {
        id: 'polo-4',
        name: 'Camisa Polo ZSX Dark Shadow',
        category: 'Camisas Polo',
        tag: 'DROP NOTURNO',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        rating: 4.7,
        reviewsCount: 51,
        image: '../images/products/Captura de tela 2026-09-24 113730.png',
        gallery: [
            '../images/products/Captura de tela 2026-09-24 113730.png',
            '../images/products/Captura de tela 2026-09-24 113712.png',
            '../images/products/blusao-adidas.jpg',
            '../images/products/corta-vento.jpg'
        ],
        colors: [
            { name: 'Preto ZSX', hex: '#111111' },
            { name: 'Cinza Carvão', hex: '#374151' }
        ],
        sizes: ['M', 'G', 'GG'],
        description: 'Polo com tingimento reativo que preserva o preto profundo, gola reforçada e costuras duplas nos ombros.',
        specs: [
            'Gola firme e estruturada',
            'Piquet 100% algodão',
            'Toque macio e respirável'
        ],
        materialsText: '100% algodão.',
        fitText: 'Modelagem alinhada.',
        shippingText: 'Envio seguro e rastreado.'
    },

    'polo-5': {
        id: 'polo-5',
        name: 'Camisa Polo ZSX White Elegance',
        category: 'Camisas Polo',
        tag: 'ESSENTIALS',
        price: 89.90,
        originalPrice: 139.90,
        discount: '35% OFF',
        installments: '3x de R$ 29,96 sem juros',
        rating: 4.9,
        reviewsCount: 88,
        image: '../images/products/Captura de tela 2026-09-24 113712.png',
        gallery: [
            '../images/products/Captura de tela 2026-09-24 113712.png',
            '../images/products/Captura de tela 2026-09-24 113730.png',
            '../images/products/corta-vento.jpg',
            '../images/products/sueter.jpg'
        ],
        colors: [
            { name: 'Branco Puro', hex: '#ffffff' },
            { name: 'Areia', hex: '#d4c7b8' }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        description: 'Polo clássica branca de alfaiataria casual, corte alinhado ao corpo sem apertar, proporcionando elegância no visual streetwear.',
        specs: [
            'Algodão piquet peletizado',
            'Acabamento acetinado sutil',
            'Alta durabilidade'
        ],
        materialsText: '100% algodão de fibra longa.',
        fitText: 'Modelagem confortável.',
        shippingText: 'Entrega garantida para todo o Brasil.'
    }
};

// Estado da Página do Produto
let currentProduct = null;
let selectedColor = '';
let selectedSize = '';
let currentQuantity = 1;
let currentActiveImgIndex = 0;
let isWishlisted = false;

// Formatador BRL
function formatMoneyBRL(val) {
    return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Obter ID do Produto da URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id && productsDB[id]) {
        return id;
    }
    // Padrão: casaco-1 (Moletom Adidas Preto, similar à foto de inspiração)
    return 'casaco-1';
}

// Carregar e Renderizar o Produto
function loadProductPage() {
    const prodId = getProductIdFromUrl();
    currentProduct = productsDB[prodId];
    if (!currentProduct) return;

    // Atualiza título da aba do navegador
    document.title = `${currentProduct.name} | ZSX Outlet`;

    // Breadcrumb
    const breadcrumbCat = document.getElementById('pdpBreadcrumbCategory');
    const breadcrumbCurrent = document.getElementById('pdpBreadcrumbCurrent');
    if (breadcrumbCat) breadcrumbCat.textContent = currentProduct.category;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = currentProduct.name;

    // Badge
    const tagBadge = document.getElementById('pdpTagBadge');
    if (tagBadge) tagBadge.textContent = currentProduct.tag;

    // Categoria e Título
    const catLabel = document.getElementById('pdpCategoryLabel');
    const titleEl = document.getElementById('pdpProductTitle');
    if (catLabel) catLabel.textContent = `ZSX OUTLET • ${currentProduct.category.toUpperCase()}`;
    if (titleEl) titleEl.textContent = currentProduct.name;

    // Avaliações
    const ratingScore = document.getElementById('pdpRatingScore');
    const ratingCount = document.getElementById('pdpRatingCount');
    if (ratingScore) ratingScore.textContent = currentProduct.rating.toFixed(1);
    if (ratingCount) ratingCount.textContent = `(${currentProduct.reviewsCount} avaliações)`;

    // Preços
    const currentPriceEl = document.getElementById('pdpCurrentPrice');
    const originalPriceEl = document.getElementById('pdpOriginalPrice');
    const discountBadgeEl = document.getElementById('pdpDiscountBadge');
    const installmentEl = document.getElementById('pdpInstallmentText');

    if (currentPriceEl) currentPriceEl.textContent = formatMoneyBRL(currentProduct.price);
    if (originalPriceEl) originalPriceEl.textContent = formatMoneyBRL(currentProduct.originalPrice);
    if (discountBadgeEl) discountBadgeEl.textContent = currentProduct.discount;
    
    const pixPrice = currentProduct.price * 0.95;
    if (installmentEl) {
        installmentEl.innerHTML = `em até <strong>${currentProduct.installments}</strong> ou <strong class="pdp-pix-discount">${formatMoneyBRL(pixPrice)} no PIX (-5%)</strong>`;
    }

    // Descrição
    const descEl = document.getElementById('pdpDescription');
    if (descEl) descEl.textContent = currentProduct.description;

    // Cores
    const colorsContainer = document.getElementById('pdpColorsContainer');
    const selectedColorLabel = document.getElementById('pdpSelectedColor');
    if (colorsContainer && currentProduct.colors.length > 0) {
        selectedColor = currentProduct.colors[0].name;
        if (selectedColorLabel) selectedColorLabel.textContent = selectedColor;

        colorsContainer.innerHTML = currentProduct.colors.map((c, idx) => `
            <button type="button" class="pdp-color-swatch ${idx === 0 ? 'active' : ''}" 
                    style="background-color: ${c.hex};" 
                    data-color-name="${c.name}"
                    title="${c.name}"
                    aria-label="${c.name}">
            </button>
        `).join('');

        colorsContainer.querySelectorAll('.pdp-color-swatch').forEach(btn => {
            btn.addEventListener('click', () => {
                colorsContainer.querySelectorAll('.pdp-color-swatch').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedColor = btn.dataset.colorName;
                if (selectedColorLabel) selectedColorLabel.textContent = selectedColor;
            });
        });
    }

    // Tamanhos
    const sizesContainer = document.getElementById('pdpSizesContainer');
    const selectedSizeLabel = document.getElementById('pdpSelectedSize');
    if (sizesContainer && currentProduct.sizes.length > 0) {
        // Seleciona tamanho padrão (M se houver, ou o primeiro)
        selectedSize = currentProduct.sizes.includes('M') ? 'M' : currentProduct.sizes[0];
        if (selectedSizeLabel) selectedSizeLabel.textContent = selectedSize;

        sizesContainer.innerHTML = currentProduct.sizes.map(s => `
            <button type="button" class="pdp-size-btn ${s === selectedSize ? 'active' : ''}" data-size="${s}">
                ${s}
            </button>
        `).join('');

        sizesContainer.querySelectorAll('.pdp-size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                sizesContainer.querySelectorAll('.pdp-size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedSize = btn.dataset.size;
                if (selectedSizeLabel) selectedSizeLabel.textContent = selectedSize;
            });
        });
    }

    // Galeria de Fotos e Hero Image
    renderGallery();

    // Abas de Detalhes
    renderTabContents();

    // Produtos Relacionados
    renderRelatedProducts();
}

// Renderizar Galeria de Miniaturas e Hero
function renderGallery() {
    const thumbsStrip = document.getElementById('pdpThumbsStrip');
    const heroImg = document.getElementById('pdpHeroImg');
    if (!thumbsStrip || !heroImg) return;

    currentActiveImgIndex = 0;
    heroImg.src = currentProduct.gallery[0];
    heroImg.alt = currentProduct.name;

    thumbsStrip.innerHTML = currentProduct.gallery.map((imgSrc, idx) => `
        <button type="button" class="pdp-thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Visualizar foto ${idx + 1}">
            <img src="${imgSrc}" alt="${currentProduct.name} - Ângulo ${idx + 1}">
        </button>
    `).join('');

    thumbsStrip.querySelectorAll('.pdp-thumb-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index, 10);
            currentActiveImgIndex = idx;
            thumbsStrip.querySelectorAll('.pdp-thumb-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Troca suave da foto principal
            heroImg.style.opacity = '0.3';
            setTimeout(() => {
                heroImg.src = currentProduct.gallery[idx];
                heroImg.style.opacity = '1';
            }, 120);
        });
    });
}

// Renderizar Textos das Abas
function renderTabContents() {
    const tabDesc = document.getElementById('pdpTabDescParagraph');
    const specsList = document.getElementById('pdpSpecsList');
    const visualCardImg = document.getElementById('pdpDetailVisualImg');
    const visualCardBadge = document.getElementById('pdpDetailBadgeTitle');

    if (tabDesc) tabDesc.textContent = currentProduct.description;

    if (specsList && currentProduct.specs) {
        specsList.innerHTML = currentProduct.specs.map(spec => `
            <li class="pdp-spec-item">
                <span class="pdp-spec-icon">✦</span>
                <span>${spec}</span>
            </li>
        `).join('');
    }

    if (visualCardImg) {
        // Usa a foto de close ou a primeira foto
        visualCardImg.src = currentProduct.gallery[1] || currentProduct.image;
        visualCardImg.alt = currentProduct.name;
    }

    if (visualCardBadge) {
        visualCardBadge.textContent = 'ZSX CRAFTSMANSHIP';
    }

    // Abas de Materiais, Caimento e Envio
    const materialsP = document.getElementById('pdpTabMaterialsText');
    if (materialsP) materialsP.textContent = currentProduct.materialsText;

    const fitP = document.getElementById('pdpTabFitText');
    if (fitP) fitP.textContent = currentProduct.fitText;

    const shippingP = document.getElementById('pdpTabShippingText');
    if (shippingP) shippingP.textContent = currentProduct.shippingText;
}

// Renderizar Produtos Relacionados
function renderRelatedProducts() {
    const grid = document.getElementById('pdpRelatedGrid');
    if (!grid) return;

    // Seleciona 4 produtos diferentes do produto atual
    const relatedIds = Object.keys(productsDB).filter(id => id !== currentProduct.id).slice(0, 4);

    grid.innerHTML = relatedIds.map(id => {
        const p = productsDB[id];
        return `
            <div class="pdp-related-card" onclick="window.location.href='product.html?id=${p.id}'">
                <div class="pdp-related-img-box">
                    <img src="${p.image}" alt="${p.name}">
                </div>
                <div class="pdp-related-info">
                    <h4 class="pdp-related-name">${p.name}</h4>
                    <p class="pdp-related-price">${formatMoneyBRL(p.price)}</p>
                    <div class="pdp-related-actions">
                        <button type="button" class="btn-related-view">Ver Detalhes</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Alterar Quantidade (+ e -)
function setupQuantityControls() {
    const minusBtn = document.getElementById('pdpQtyMinus');
    const plusBtn = document.getElementById('pdpQtyPlus');
    const valEl = document.getElementById('pdpQtyValue');

    if (!minusBtn || !plusBtn || !valEl) return;

    minusBtn.addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            valEl.textContent = currentQuantity;
        }
    });

    plusBtn.addEventListener('click', () => {
        if (currentQuantity < 10) {
            currentQuantity++;
            valEl.textContent = currentQuantity;
        } else {
            showToast('Limite de 10 unidades por pedido.', 'info');
        }
    });
}

// Alternar Abas Informativas
function setupTabs() {
    document.querySelectorAll('.pdp-tab-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const tabName = trigger.dataset.tab;
            document.querySelectorAll('.pdp-tab-trigger').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.pdp-tab-pane').forEach(p => p.classList.remove('active'));

            trigger.classList.add('active');
            const targetPane = document.getElementById(`tabPane-${tabName}`);
            if (targetPane) targetPane.classList.add('active');
        });
    });
}

// Modais: Guia de Medidas & Zoom
function setupModals() {
    // Guia de Medidas
    const openGuideBtn = document.getElementById('btnOpenSizeGuide');
    const guideModal = document.getElementById('sizeGuideModal');
    const closeGuideBtn = document.getElementById('closeSizeGuideBtn');

    if (openGuideBtn && guideModal) {
        openGuideBtn.addEventListener('click', () => {
            guideModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeGuideBtn && guideModal) {
        closeGuideBtn.addEventListener('click', () => {
            guideModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (guideModal) {
        guideModal.addEventListener('click', (e) => {
            if (e.target === guideModal) {
                guideModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Modal de Zoom em Tela Cheia
    const zoomBtn = document.getElementById('btnZoomImg');
    const zoomModal = document.getElementById('zoomModal');
    const zoomImg = document.getElementById('zoomModalImg');
    const closeZoomBtn = document.getElementById('closeZoomBtn');

    if (zoomBtn && zoomModal && zoomImg) {
        zoomBtn.addEventListener('click', () => {
            zoomImg.src = currentProduct.gallery[currentActiveImgIndex] || currentProduct.image;
            zoomModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeZoomBtn && zoomModal) {
        closeZoomBtn.addEventListener('click', () => {
            zoomModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (zoomModal) {
        zoomModal.addEventListener('click', (e) => {
            if (e.target === zoomModal) {
                zoomModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Wishlist Toggle
    const wishlistBtn = document.getElementById('pdpWishlistBtn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            isWishlisted = !isWishlisted;
            wishlistBtn.classList.toggle('active', isWishlisted);
            if (isWishlisted) {
                showToast(`"${currentProduct.name}" adicionado aos seus favoritos!`, 'success');
            } else {
                showToast(`Item removido dos favoritos.`, 'info');
            }
        });
    }
}

// Botões de Compra (Adicionar ao Carrinho & Comprar Agora)
function setupPurchaseButtons() {
    const btnAddCart = document.getElementById('btnAddCartPdp');
    const btnBuyNow = document.getElementById('btnBuyNowPdp');

    if (btnAddCart) {
        btnAddCart.addEventListener('click', () => {
            if (!currentProduct) return;

            const productData = {
                id: `${currentProduct.id}-${selectedSize}-${selectedColor}`,
                name: currentProduct.name,
                price: currentProduct.price,
                image: currentProduct.image,
                size: selectedSize,
                color: selectedColor
            };

            // Adiciona a quantidade selecionada
            for (let i = 0; i < currentQuantity; i++) {
                addToCart(productData, false);
            }

            showToast(`${currentQuantity}x "${currentProduct.name}" (${selectedSize} / ${selectedColor}) adicionado ao carrinho!`, 'success');
        });
    }

    if (btnBuyNow) {
        btnBuyNow.addEventListener('click', () => {
            if (!currentProduct) return;

            const productData = {
                id: `${currentProduct.id}-${selectedSize}-${selectedColor}`,
                name: currentProduct.name,
                price: currentProduct.price,
                image: currentProduct.image,
                size: selectedSize,
                color: selectedColor
            };

            for (let i = 0; i < currentQuantity; i++) {
                addToCart(productData, false);
            }

            // Abre o checkout direto se tiver endereço, senão abre o carrinho
            if (userAddress) {
                openCheckoutModal();
            } else {
                openCartDrawer();
            }
        });
    }
}

// Inicialização da Página
document.addEventListener('DOMContentLoaded', () => {
    loadProductPage();
    setupQuantityControls();
    setupTabs();
    setupModals();
    setupPurchaseButtons();
});

