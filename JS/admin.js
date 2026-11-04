// ==========================================================================
// PAINEL ADMINISTRATIVO & GESTÃO COMPLETA - ZSX OUTLET (JS/ADMIN.JS)
// Acesso Exclusivo: Você (Desenvolvedor) e Dono da Loja
// ==========================================================================

const baseStoreProducts = [
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

// Mapa de nomes de categorias
const CATEGORY_LABELS = {
    'camisas': 'Camisas',
    'bermudas': 'Bermudas',
    'bones': 'Bonés',
    'jerseys': 'Camisas de Time',
    'calcados': 'Calçados',
    'casacos': 'Casacos',
    'polos': 'Camisas Polo'
};

// Credenciais Padrão (Você e o Dono da Loja)
const defaultCredentials = {
    devEmail: 'dev@zsxoutlet.com.br',
    devPass: 'zsx2026',
    devName: 'Você (Desenvolvedor Master)',
    ownerEmail: 'dono@zsxoutlet.com.br',
    ownerPass: 'owner2026',
    ownerName: 'Proprietário ZSX Outlet'
};

// Cupons Padrão
const defaultCoupons = [
    { code: 'ZSX10', percent: 10, desc: '10% OFF Primeira Compra', active: true },
    { code: 'OFF20', percent: 20, desc: '20% OFF Campanha Streetwear', active: true },
    { code: 'VIP30', percent: 30, desc: '30% OFF Clientes VIP ZSX', active: true }
];

// Configurações Padrão da Loja
const defaultStoreSettings = {
    freeShippingMin: 199.00,
    defaultShipping: 24.00,
    pixDiscount: 5,
    topBarText: 'FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 199',
    whatsapp: '(11) 99999-9999'
};

// Estado em Memória
let adminCredentials = JSON.parse(localStorage.getItem('zsx_admin_credentials')) || defaultCredentials;
let catalogOverrides = JSON.parse(localStorage.getItem('zsx_catalog_overrides')) || {};
let customProducts = JSON.parse(localStorage.getItem('zsx_custom_products')) || [];
let deletedProducts = JSON.parse(localStorage.getItem('zsx_deleted_products')) || [];
let storeCoupons = JSON.parse(localStorage.getItem('zsx_coupons')) || defaultCoupons;
let storeSettings = JSON.parse(localStorage.getItem('zsx_store_settings')) || defaultStoreSettings;
let storeOrders = JSON.parse(localStorage.getItem('zsx_orders')) || [];
let currentOrderFilter = 'all';

// Inicializa Cupons e Settings no localStorage caso ainda não existam
if (!localStorage.getItem('zsx_coupons')) {
    localStorage.setItem('zsx_coupons', JSON.stringify(storeCoupons));
}
if (!localStorage.getItem('zsx_store_settings')) {
    localStorage.setItem('zsx_store_settings', JSON.stringify(storeSettings));
}

// Formatador BRL
function formatBRL(val) {
    return Number(val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Cálculo automático de Desconto e Parcelas
function computePricingMeta(price, originalPrice) {
    const p = parseFloat(price) || 0;
    const orig = parseFloat(originalPrice) || p;
    let discountStr = '';
    if (orig > p && orig > 0) {
        const pct = Math.round(((orig - p) / orig) * 100);
        if (pct > 0) discountStr = `${pct}% OFF`;
    }
    const instVal = (p / 3).toFixed(2).replace('.', ',');
    const installmentsStr = `3x de R$ ${instVal} sem juros`;
    return { discountStr, installmentsStr };
}

// Obter lista consolidada de produtos (Base + Customizados + Overrides - Deletados)
function getMergedCatalog() {
    const merged = [];

    baseStoreProducts.forEach((prod, index) => {
        if (deletedProducts.includes(prod.id)) return;
        const ov = catalogOverrides[prod.id] || {};
        const defaultStock = (index % 7 === 0) ? 4 : (index % 11 === 0 ? 2 : 18);
        const finalPrice = ov.price !== undefined ? parseFloat(ov.price) : prod.price;
        const finalOrig = ov.originalPrice !== undefined ? parseFloat(ov.originalPrice) : prod.originalPrice;
        const { discountStr, installmentsStr } = computePricingMeta(finalPrice, finalOrig);

        merged.push({
            ...prod,
            ...ov,
            price: finalPrice,
            originalPrice: finalOrig,
            discount: discountStr || prod.discount || '0% OFF',
            installments: installmentsStr,
            stock: ov.stock !== undefined ? parseInt(ov.stock, 10) : defaultStock,
            active: ov.active !== undefined ? ov.active : true
        });
    });

    customProducts.forEach(customProd => {
        if (deletedProducts.includes(customProd.id)) return;
        const ov = catalogOverrides[customProd.id] || {};
        const finalPrice = ov.price !== undefined ? parseFloat(ov.price) : parseFloat(customProd.price);
        const finalOrig = ov.originalPrice !== undefined ? parseFloat(ov.originalPrice) : parseFloat(customProd.originalPrice);
        const { discountStr, installmentsStr } = computePricingMeta(finalPrice, finalOrig);

        merged.push({
            ...customProd,
            ...ov,
            price: finalPrice,
            originalPrice: finalOrig,
            discount: discountStr || 'NOVO',
            installments: installmentsStr,
            stock: ov.stock !== undefined ? parseInt(ov.stock, 10) : (customProd.stock !== undefined ? parseInt(customProd.stock, 10) : 15),
            active: ov.active !== undefined ? ov.active : true,
            isCustom: true
        });
    });

    return merged;
}

// Salvar Overrides no LocalStorage
function saveCatalogOverrides() {
    localStorage.setItem('zsx_catalog_overrides', JSON.stringify(catalogOverrides));
    localStorage.setItem('zsx_custom_products', JSON.stringify(customProducts));
    localStorage.setItem('zsx_deleted_products', JSON.stringify(deletedProducts));
    refreshAllViews();
}

// Toast Notification Admin (Com Ícone SVG Linear)
function showAdminToast(message) {
    const container = document.getElementById('adminToastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'admin-toast';
    toast.innerHTML = `
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#d3c8bd" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
}

// ==========================================================================
// AUTENTICAÇÃO EXCLUSIVA (VOCÊ & DONO DA LOJA)
// ==========================================================================

window.selectQuickRole = function(role) {
    const emailInput = document.getElementById('adminLoginEmail');
    const passInput = document.getElementById('adminLoginPass');
    const btnDev = document.getElementById('quickRoleDev');
    const btnOwner = document.getElementById('quickRoleOwner');

    if (role === 'dev') {
        emailInput.value = adminCredentials.devEmail;
        passInput.value = adminCredentials.devPass;
        btnDev.classList.add('active');
        btnOwner.classList.remove('active');
    } else {
        emailInput.value = adminCredentials.ownerEmail;
        passInput.value = adminCredentials.ownerPass;
        btnOwner.classList.add('active');
        btnDev.classList.remove('active');
    }
};

function checkAuthSession() {
    const session = JSON.parse(sessionStorage.getItem('zsx_admin_session'));
    const overlay = document.getElementById('adminAuthOverlay');
    if (session && session.authenticated) {
        if (overlay) overlay.classList.add('hidden');
        document.getElementById('activeAdminRole').textContent = session.roleLabel;
        document.getElementById('activeAdminName').textContent = session.name;
    } else {
        if (overlay) overlay.classList.remove('hidden');
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    const email = document.getElementById('adminLoginEmail').value.trim().toLowerCase();
    const pass = document.getElementById('adminLoginPass').value.trim();
    const errorEl = document.getElementById('adminAuthError');

    if ((email === adminCredentials.devEmail.toLowerCase() || email === 'dev' || email === 'admin') && pass === adminCredentials.devPass) {
        const sessionData = {
            authenticated: true,
            role: 'dev',
            roleLabel: 'Acesso Master • Dev',
            name: adminCredentials.devName
        };
        sessionStorage.setItem('zsx_admin_session', JSON.stringify(sessionData));
        errorEl.classList.remove('visible');
        checkAuthSession();
        showAdminToast('Bem-vindo ao Painel Master, Desenvolvedor!');
    } else if ((email === adminCredentials.ownerEmail.toLowerCase() || email === 'dono' || email === 'proprietario') && pass === adminCredentials.ownerPass) {
        const sessionData = {
            authenticated: true,
            role: 'owner',
            roleLabel: 'Proprietário da Loja',
            name: adminCredentials.ownerName
        };
        sessionStorage.setItem('zsx_admin_session', JSON.stringify(sessionData));
        errorEl.classList.remove('visible');
        checkAuthSession();
        showAdminToast('Bem-vindo ao Painel, Proprietário ZSX!');
    } else {
        errorEl.classList.add('visible');
    }
}

// ==========================================================================
// NAVEGAÇÃO ENTRE SEÇÕES
// ==========================================================================

window.switchAdminSection = function(sectionKey) {
    document.querySelectorAll('.sidebar-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionKey);
    });

    document.querySelectorAll('.admin-section').forEach(sec => {
        sec.classList.toggle('active', sec.id === `section-${sectionKey}`);
    });

    const titles = {
        dashboard: ['Visão Geral da Operação', 'Acompanhe faturamento, estoque crítico e pedidos em tempo real.'],
        products: ['Gestão de Produtos, Preços, Descontos & Estoque', 'Altere preços, aplique promoções e controle a disponibilidade de cada peça.'],
        orders: ['Gestão de Pedidos & Logística', 'Aprove pagamentos e atualize o status de entrega dos clientes.'],
        coupons: ['Cupons de Desconto & Campanhas', 'Crie e desative cupons promocionais válidos no carrinho da loja.'],
        settings: ['Configurações da Loja & Credenciais', 'Defina regras de frete grátis, desconto PIX e senhas de acesso.']
    };

    if (titles[sectionKey]) {
        document.getElementById('adminPageTitle').textContent = titles[sectionKey][0];
        document.getElementById('adminPageSubtitle').textContent = titles[sectionKey][1];
    }
};

// ==========================================================================
// RENDERIZAÇÃO DO DASHBOARD
// ==========================================================================

function renderDashboard() {
    const catalog = getMergedCatalog();
    storeOrders = JSON.parse(localStorage.getItem('zsx_orders')) || [];

    const totalRevenue = storeOrders.reduce((acc, o) => acc + (parseFloat(o.total) || 0), 0);
    const avgTicket = storeOrders.length > 0 ? totalRevenue / storeOrders.length : 0;
    const pendingCount = storeOrders.filter(o => o.status === 'pending').length;
    const totalUnits = catalog.reduce((acc, p) => acc + (p.stock || 0), 0);
    const lowStockItems = catalog.filter(p => p.stock <= 5);

    document.getElementById('kpiTotalRevenue').textContent = formatBRL(totalRevenue);
    document.getElementById('kpiAvgTicket').textContent = `Ticket médio: ${formatBRL(avgTicket)}`;
    document.getElementById('kpiTotalOrders').textContent = storeOrders.length;
    document.getElementById('kpiPendingOrders').textContent = `${pendingCount} aguardando pagamento`;
    document.getElementById('kpiTotalProducts').textContent = catalog.length;
    document.getElementById('kpiTotalUnits').textContent = `${totalUnits} unidades totais em estoque`;
    document.getElementById('kpiLowStockCount').textContent = lowStockItems.length;

    document.getElementById('navBadgeProducts').textContent = catalog.length;
    document.getElementById('navBadgeOrders').textContent = pendingCount > 0 ? `${pendingCount} pend.` : storeOrders.length;
    document.getElementById('navBadgeCoupons').textContent = storeCoupons.filter(c => c.active).length;

    const catBarsEl = document.getElementById('dashboardCategoryBars');
    if (catBarsEl) {
        const cats = Object.keys(CATEGORY_LABELS);
        catBarsEl.innerHTML = cats.map(catKey => {
            const items = catalog.filter(p => p.categoryKey === catKey);
            const units = items.reduce((a, b) => a + (b.stock || 0), 0);
            const val = items.reduce((a, b) => a + ((b.price || 0) * (b.stock || 0)), 0);
            const pct = Math.min(100, Math.round((units / Math.max(1, totalUnits)) * 280));
            return `
                <div class="cat-stat-row">
                    <div class="cat-stat-top">
                        <span>${CATEGORY_LABELS[catKey]} (${items.length} peças • ${units} un.)</span>
                        <span>${formatBRL(val)} em estoque</span>
                    </div>
                    <div class="cat-stat-bar-bg">
                        <div class="cat-stat-bar-fill" style="width: ${pct}%;"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    const lowListEl = document.getElementById('dashboardLowStockList');
    if (lowListEl) {
        if (lowStockItems.length === 0) {
            lowListEl.innerHTML = `<p style="font-size: 13px; color: #16a34a; font-weight: 700;">Todos os produtos estão com estoque saudável acima de 5 unidades.</p>`;
        } else {
            lowListEl.innerHTML = lowStockItems.slice(0, 6).map(item => `
                <div class="low-stock-item">
                    <div class="low-stock-left">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <div class="low-stock-name">${item.name}</div>
                            <div class="low-stock-count">${item.stock === 0 ? 'ESGOTADO (0 un.)' : `Apenas ${item.stock} un. restantes`}</div>
                        </div>
                    </div>
                    <button type="button" class="btn-quick-restock" onclick="adjustProductStock('${item.id}', 10)">+10 un.</button>
                </div>
            `).join('');
        }
    }

    const recentOrdersEl = document.getElementById('dashboardRecentOrders');
    if (recentOrdersEl) {
        recentOrdersEl.innerHTML = storeOrders.slice(0, 3).map(order => renderOrderRowHTML(order)).join('');
    }
}

// ==========================================================================
// RENDERIZAÇÃO E CONTROLE DE PRODUTOS, PREÇOS, DESCONTOS & ESTOQUE
// ==========================================================================

function renderProductsTable() {
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    const searchVal = (document.getElementById('adminProductSearch')?.value || '').trim().toLowerCase();
    const catFilter = document.getElementById('adminCategoryFilter')?.value || 'all';
    const stockFilter = document.getElementById('adminStockFilter')?.value || 'all';

    let list = getMergedCatalog();

    if (catFilter !== 'all') {
        list = list.filter(p => p.categoryKey === catFilter);
    }

    if (searchVal) {
        list = list.filter(p =>
            p.name.toLowerCase().includes(searchVal) ||
            p.id.toLowerCase().includes(searchVal) ||
            (p.badge && p.badge.toLowerCase().includes(searchVal))
        );
    }

    if (stockFilter === 'ok') list = list.filter(p => p.stock > 5);
    if (stockFilter === 'low') list = list.filter(p => p.stock > 0 && p.stock <= 5);
    if (stockFilter === 'out') list = list.filter(p => p.stock === 0);

    tbody.innerHTML = list.map(prod => {
        let stockBadgeClass = 'in-stock';
        let stockBadgeText = 'Em Estoque';
        if (prod.stock === 0) {
            stockBadgeClass = 'out-stock';
            stockBadgeText = 'Esgotado';
        } else if (prod.stock <= 5) {
            stockBadgeClass = 'low-stock';
            stockBadgeText = 'Estoque Baixo';
        }

        if (!prod.active) {
            stockBadgeClass = 'out-stock';
            stockBadgeText = 'Pausado';
        }

        return `
            <tr>
                <td>
                    <div class="prod-cell-info">
                        <img src="${prod.image}" alt="${prod.name}" class="prod-cell-thumb">
                        <div class="prod-cell-meta">
                            <span class="prod-cell-name">${prod.name}</span>
                            <span class="prod-cell-id">ID: ${prod.id} • ${prod.badge || 'PADRÃO'}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="cat-tag-pill">${CATEGORY_LABELS[prod.categoryKey] || prod.category}</span>
                </td>
                <td>
                    <div class="inline-price-group">
                        <span class="inline-currency">R$</span>
                        <input type="number" step="0.01" class="inline-price-input" value="${Number(prod.originalPrice).toFixed(2)}"
                            onchange="updateProductOriginalPrice('${prod.id}', this.value)" title="Preço Original (De)">
                    </div>
                </td>
                <td>
                    <div class="inline-price-group">
                        <span class="inline-currency">R$</span>
                        <input type="number" step="0.01" class="inline-price-input" value="${Number(prod.price).toFixed(2)}"
                            onchange="updateProductPrice('${prod.id}', this.value)" title="Preço Final de Venda (Por)">
                    </div>
                </td>
                <td>
                    <div class="discount-quick-wrap">
                        <span class="discount-badge-pill">${prod.discount || '0% OFF'}</span>
                        <div class="discount-mini-btns">
                            <button type="button" class="btn-mini-disc" onclick="applyQuickDiscount('${prod.id}', 10)">-10%</button>
                            <button type="button" class="btn-mini-disc" onclick="applyQuickDiscount('${prod.id}', 20)">-20%</button>
                            <button type="button" class="btn-mini-disc" onclick="applyQuickDiscount('${prod.id}', 35)">-35%</button>
                            <button type="button" class="btn-mini-disc" onclick="applyQuickDiscount('${prod.id}', 50)">-50%</button>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="stock-stepper">
                        <button type="button" class="stock-step-btn" onclick="adjustProductStock('${prod.id}', -1)">-</button>
                        <input type="number" min="0" class="stock-step-input" value="${prod.stock}"
                            onchange="setProductStock('${prod.id}', this.value)">
                        <button type="button" class="stock-step-btn" onclick="adjustProductStock('${prod.id}', 1)">+</button>
                    </div>
                </td>
                <td>
                    <span class="stock-status-tag ${stockBadgeClass}">${stockBadgeText}</span>
                </td>
                <td>
                    <div class="row-actions">
                        <button type="button" class="btn-icon-action" title="Editar Detalhes Completos" onclick="openProductModal('${prod.id}')">
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button type="button" class="btn-icon-action" title="${prod.active ? 'Pausar / Ocultar Produto' : 'Ativar Produto'}" onclick="toggleProductActive('${prod.id}')">
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                ${prod.active
                                    ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
                                    : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'}
                            </svg>
                        </button>
                        <button type="button" class="btn-icon-action delete" title="Excluir Produto" onclick="deleteProduct('${prod.id}')">
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

window.updateProductPrice = function(id, newPriceVal) {
    const val = Math.max(1, parseFloat(newPriceVal) || 0);
    if (!catalogOverrides[id]) catalogOverrides[id] = {};
    catalogOverrides[id].price = Number(val.toFixed(2));
    saveCatalogOverrides();
    showAdminToast(`Preço de venda atualizado para ${formatBRL(val)}!`);
};

window.updateProductOriginalPrice = function(id, newOrigVal) {
    const val = Math.max(1, parseFloat(newOrigVal) || 0);
    if (!catalogOverrides[id]) catalogOverrides[id] = {};
    catalogOverrides[id].originalPrice = Number(val.toFixed(2));
    saveCatalogOverrides();
    showAdminToast(`Preço original atualizado para ${formatBRL(val)}!`);
};

window.applyQuickDiscount = function(id, discountPercent) {
    const catalog = getMergedCatalog();
    const prod = catalog.find(p => p.id === id);
    if (!prod) return;

    const baseOrig = prod.originalPrice > prod.price ? prod.originalPrice : prod.price;
    const newPrice = Number((baseOrig * (1 - discountPercent / 100)).toFixed(2));

    if (!catalogOverrides[id]) catalogOverrides[id] = {};
    catalogOverrides[id].originalPrice = baseOrig;
    catalogOverrides[id].price = newPrice;
    saveCatalogOverrides();
    showAdminToast(`Desconto de ${discountPercent}% aplicado em "${prod.name}" (${formatBRL(newPrice)})!`);
};

window.adjustProductStock = function(id, delta) {
    const catalog = getMergedCatalog();
    const prod = catalog.find(p => p.id === id);
    if (!prod) return;

    const nextStock = Math.max(0, (prod.stock || 0) + delta);
    if (!catalogOverrides[id]) catalogOverrides[id] = {};
    catalogOverrides[id].stock = nextStock;
    saveCatalogOverrides();
    showAdminToast(`Estoque de "${prod.name}": ${nextStock} un.`);
};

window.setProductStock = function(id, val) {
    const nextStock = Math.max(0, parseInt(val, 10) || 0);
    if (!catalogOverrides[id]) catalogOverrides[id] = {};
    catalogOverrides[id].stock = nextStock;
    saveCatalogOverrides();
    showAdminToast(`Estoque atualizado para ${nextStock} unidades.`);
};

window.toggleProductActive = function(id) {
    const catalog = getMergedCatalog();
    const prod = catalog.find(p => p.id === id);
    if (!prod) return;

    if (!catalogOverrides[id]) catalogOverrides[id] = {};
    catalogOverrides[id].active = !prod.active;
    saveCatalogOverrides();
    showAdminToast(catalogOverrides[id].active ? `"${prod.name}" ativado na loja!` : `"${prod.name}" ocultado da loja.`);
};

window.deleteProduct = function(id) {
    const catalog = getMergedCatalog();
    const prod = catalog.find(p => p.id === id);
    if (!prod) return;

    if (!deletedProducts.includes(id)) {
        deletedProducts.push(id);
    }
    saveCatalogOverrides();
    showAdminToast(`Produto "${prod.name}" removido do catálogo.`);
};

window.applyBulkCategoryDiscount = function() {
    const cat = document.getElementById('bulkCategorySelect').value;
    const pct = Math.min(90, Math.max(0, parseFloat(document.getElementById('bulkDiscountInput').value) || 0));
    const catalog = getMergedCatalog();

    let count = 0;
    catalog.forEach(prod => {
        if (cat === 'all' || prod.categoryKey === cat) {
            const baseOrig = prod.originalPrice >= prod.price ? prod.originalPrice : prod.price;
            const discounted = Number((baseOrig * (1 - pct / 100)).toFixed(2));
            if (!catalogOverrides[prod.id]) catalogOverrides[prod.id] = {};
            catalogOverrides[prod.id].originalPrice = baseOrig;
            catalogOverrides[prod.id].price = discounted;
            count++;
        }
    });

    saveCatalogOverrides();
    showAdminToast(`Desconto de ${pct}% OFF aplicado em ${count} produtos!`);
};

window.applyBulkRestock = function(amount) {
    const cat = document.getElementById('bulkCategorySelect').value;
    const catalog = getMergedCatalog();

    let count = 0;
    catalog.forEach(prod => {
        if (cat === 'all' || prod.categoryKey === cat) {
            if (!catalogOverrides[prod.id]) catalogOverrides[prod.id] = {};
            catalogOverrides[prod.id].stock = (prod.stock || 0) + amount;
            count++;
        }
    });

    saveCatalogOverrides();
    showAdminToast(`+${amount} unidades adicionadas em ${count} produtos!`);
};

// ==========================================================================
// MODAL DE CRIAR / EDITAR PRODUTO COMPLETO
// ==========================================================================

window.openProductModal = function(prodId = null) {
    const modal = document.getElementById('adminProductModal');
    const titleEl = document.getElementById('productModalTitle');
    const form = document.getElementById('adminProductForm');

    if (prodId) {
        const prod = getMergedCatalog().find(p => p.id === prodId);
        if (!prod) return;
        titleEl.textContent = `Editar Produto: ${prod.name}`;
        document.getElementById('editProdId').value = prod.id;
        document.getElementById('editProdName').value = prod.name;
        document.getElementById('editProdCategoryKey').value = prod.categoryKey || 'camisas';
        document.getElementById('editProdBadge').value = prod.badge || 'NEW DROP';
        document.getElementById('editProdOriginalPrice').value = prod.originalPrice;
        document.getElementById('editProdPrice').value = prod.price;
        document.getElementById('editProdStock').value = prod.stock;
        document.getElementById('editProdImage').value = prod.image;
        document.getElementById('editProdDesc').value = prod.description || 'Peça confeccionada com padrão de qualidade superior ZSX Outlet.';

        const sizeCheckboxes = document.querySelectorAll('#editProdSizesBox input[type="checkbox"]');
        sizeCheckboxes.forEach(cb => {
            cb.checked = (prod.sizes || ['P', 'M', 'G', 'GG']).includes(cb.value);
        });
    } else {
        titleEl.textContent = 'Adicionar Novo Produto ao Catálogo';
        form.reset();
        document.getElementById('editProdId').value = '';
        document.getElementById('editProdOriginalPrice').value = '199.90';
        document.getElementById('editProdPrice').value = '139.90';
        document.getElementById('editProdStock').value = '25';
        document.getElementById('editProdBadge').value = 'NEW DROP';
        document.getElementById('editProdImage').value = '../images/shirts3d.png';
    }

    modal.classList.add('open');
};

window.closeProductModal = function() {
    document.getElementById('adminProductModal')?.classList.remove('open');
};

function handleProductFormSubmit(e) {
    e.preventDefault();
    const existingId = document.getElementById('editProdId').value.trim();
    const name = document.getElementById('editProdName').value.trim();
    const categoryKey = document.getElementById('editProdCategoryKey').value;
    const badge = document.getElementById('editProdBadge').value.trim() || 'NEW DROP';
    const originalPrice = parseFloat(document.getElementById('editProdOriginalPrice').value) || 149.90;
    const price = parseFloat(document.getElementById('editProdPrice').value) || 99.90;
    const stock = parseInt(document.getElementById('editProdStock').value, 10) || 0;
    const image = document.getElementById('editProdImage').value.trim() || '../images/shirts3d.png';
    const description = document.getElementById('editProdDesc').value.trim();

    const selectedSizes = [];
    document.querySelectorAll('#editProdSizesBox input[type="checkbox"]:checked').forEach(cb => {
        selectedSizes.push(cb.value);
    });
    if (selectedSizes.length === 0) selectedSizes.push('M', 'G');

    const { discountStr, installmentsStr } = computePricingMeta(price, originalPrice);

    if (existingId) {
        if (!catalogOverrides[existingId]) catalogOverrides[existingId] = {};
        Object.assign(catalogOverrides[existingId], {
            name,
            categoryKey,
            category: CATEGORY_LABELS[categoryKey] || 'Camisas',
            badge,
            originalPrice,
            price,
            discount: discountStr,
            installments: installmentsStr,
            stock,
            image,
            sizes: selectedSizes,
            description
        });
        showAdminToast(`Produto "${name}" atualizado com sucesso!`);
    } else {
        const newId = `${categoryKey}-${Date.now().toString().slice(-4)}`;
        const newProdObj = {
            id: newId,
            categoryKey,
            category: CATEGORY_LABELS[categoryKey] || 'Camisas',
            name,
            price,
            originalPrice,
            discount: discountStr || 'NOVO',
            installments: installmentsStr,
            badge,
            sizes: selectedSizes,
            image,
            stock,
            active: true,
            popularity: 95,
            description: description || 'Peça exclusiva da nova coleção ZSX Outlet.'
        };
        customProducts.unshift(newProdObj);
        showAdminToast(`Novo produto "${name}" publicado na loja!`);
    }

    saveCatalogOverrides();
    closeProductModal();
}

// ==========================================================================
// GESTÃO DE PEDIDOS & LOGÍSTICA
// ==========================================================================

function renderOrderRowHTML(order) {
    const itemsSummary = (order.items || []).map(i => `${i.quantity}x ${i.name} (${i.size || 'M'})`).join(' • ');
    return `
        <div class="order-admin-card">
            <div class="order-admin-left">
                <div class="order-admin-id-row">
                    <span class="order-admin-id">#${order.id}</span>
                    <span class="order-status-pill ${order.status}">${order.statusLabel}</span>
                    <span style="font-size: 12px; color: #787064;">Data: ${order.date} • ${order.paymentMethod}</span>
                </div>
                <div class="order-admin-items-text">${itemsSummary || 'Itens do pedido ZSX'}</div>
            </div>

            <div class="order-admin-right">
                <span class="order-admin-total">${formatBRL(order.total)}</span>

                <select class="admin-select" style="width: auto; padding: 8px 12px; font-size: 12.5px; font-weight: 700;"
                    onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Aguardando Pagamento</option>
                    <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmado / Em Separação</option>
                    <option value="finished" ${order.status === 'finished' ? 'selected' : ''}>Finalizado / Entregue</option>
                </select>

                <button type="button" class="btn-icon-action delete" title="Remover Pedido" onclick="deleteAdminOrder('${order.id}')">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

function renderOrdersSection() {
    const container = document.getElementById('adminOrdersContainer');
    if (!container) return;

    storeOrders = JSON.parse(localStorage.getItem('zsx_orders')) || [];
    let filtered = storeOrders;
    if (currentOrderFilter !== 'all') {
        filtered = storeOrders.filter(o => o.status === currentOrderFilter);
    }

    if (filtered.length === 0) {
        container.innerHTML = `<div class="admin-panel-card"><p style="font-size: 14px; color: #6e6659;">Nenhum pedido encontrado neste filtro.</p></div>`;
        return;
    }

    container.innerHTML = filtered.map(o => renderOrderRowHTML(o)).join('');
}

window.filterAdminOrders = function(status, btnEl) {
    currentOrderFilter = status;
    document.querySelectorAll('.order-filter-pill').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    renderOrdersSection();
};

window.updateOrderStatus = function(orderId, newStatus) {
    storeOrders = JSON.parse(localStorage.getItem('zsx_orders')) || [];
    const target = storeOrders.find(o => o.id === orderId);
    if (!target) return;

    target.status = newStatus;
    if (newStatus === 'pending') target.statusLabel = 'Aguardando Pagamento';
    if (newStatus === 'confirmed') target.statusLabel = 'Pagamento Aprovado - Em Separação';
    if (newStatus === 'finished') target.statusLabel = 'Entregue com Sucesso';

    localStorage.setItem('zsx_orders', JSON.stringify(storeOrders));
    refreshAllViews();
    showAdminToast(`Status do pedido #${orderId} atualizado para "${target.statusLabel}"!`);
};

window.deleteAdminOrder = function(orderId) {
    storeOrders = (JSON.parse(localStorage.getItem('zsx_orders')) || []).filter(o => o.id !== orderId);
    localStorage.setItem('zsx_orders', JSON.stringify(storeOrders));
    refreshAllViews();
    showAdminToast(`Pedido #${orderId} removido.`);
};

// ==========================================================================
// GESTÃO DE CUPONS DE DESCONTO
// ==========================================================================

function renderCouponsSection() {
    const container = document.getElementById('adminCouponsList');
    if (!container) return;

    container.innerHTML = storeCoupons.map(c => `
        <div class="coupon-card">
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span class="coupon-code-badge">${c.code}</span>
                    <span class="stock-status-tag ${c.active ? 'in-stock' : 'out-stock'}">${c.active ? 'Ativo' : 'Pausado'}</span>
                </div>
                <div style="font-size: 22px; font-weight: 900; color: #111111;">${c.percent}% DE DESCONTO</div>
                <p style="font-size: 12.5px; color: #6e6659; margin-top: 4px;">${c.desc || 'Válido em todo o carrinho ZSX'}</p>
            </div>
            <div style="display: flex; gap: 8px;">
                <button type="button" class="btn-secondary-admin" style="flex: 1; justify-content: center;" onclick="toggleCouponStatus('${c.code}')">
                    ${c.active ? 'Pausar' : 'Ativar'}
                </button>
                <button type="button" class="btn-icon-action delete" onclick="deleteCoupon('${c.code}')">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

function handleCreateCoupon(e) {
    e.preventDefault();
    const code = document.getElementById('newCouponCode').value.trim().toUpperCase();
    const percent = Math.min(90, Math.max(1, parseInt(document.getElementById('newCouponPercent').value, 10) || 10));
    const desc = document.getElementById('newCouponDesc').value.trim() || `${percent}% OFF em toda a loja`;

    if (!code) return;
    const existing = storeCoupons.find(c => c.code === code);
    if (existing) {
        existing.percent = percent;
        existing.desc = desc;
        existing.active = true;
    } else {
        storeCoupons.push({ code, percent, desc, active: true });
    }

    localStorage.setItem('zsx_coupons', JSON.stringify(storeCoupons));
    e.target.reset();
    refreshAllViews();
    showAdminToast(`Cupom ${code} (${percent}% OFF) ativo na loja!`);
}

window.toggleCouponStatus = function(code) {
    const target = storeCoupons.find(c => c.code === code);
    if (!target) return;
    target.active = !target.active;
    localStorage.setItem('zsx_coupons', JSON.stringify(storeCoupons));
    refreshAllViews();
    showAdminToast(`Cupom ${code} ${target.active ? 'ativado' : 'pausado'}.`);
};

window.deleteCoupon = function(code) {
    storeCoupons = storeCoupons.filter(c => c.code !== code);
    localStorage.setItem('zsx_coupons', JSON.stringify(storeCoupons));
    refreshAllViews();
    showAdminToast(`Cupom ${code} excluído.`);
};

// ==========================================================================
// CONFIGURAÇÕES DA LOJA & CREDENCIAIS
// ==========================================================================

function loadSettingsIntoInputs() {
    document.getElementById('settingFreeShippingMin').value = storeSettings.freeShippingMin;
    document.getElementById('settingDefaultShipping').value = storeSettings.defaultShipping;
    document.getElementById('settingPixDiscount').value = storeSettings.pixDiscount;
    document.getElementById('settingTopBarText').value = storeSettings.topBarText;
    document.getElementById('settingWhatsapp').value = storeSettings.whatsapp;

    document.getElementById('credDevEmail').value = adminCredentials.devEmail;
    document.getElementById('credDevPass').value = adminCredentials.devPass;
    document.getElementById('credOwnerEmail').value = adminCredentials.ownerEmail;
    document.getElementById('credOwnerPass').value = adminCredentials.ownerPass;
}

function handleSaveStoreSettings(e) {
    e.preventDefault();
    storeSettings = {
        freeShippingMin: parseFloat(document.getElementById('settingFreeShippingMin').value) || 199,
        defaultShipping: parseFloat(document.getElementById('settingDefaultShipping').value) || 24,
        pixDiscount: parseInt(document.getElementById('settingPixDiscount').value, 10) || 5,
        topBarText: document.getElementById('settingTopBarText').value.trim(),
        whatsapp: document.getElementById('settingWhatsapp').value.trim()
    };
    localStorage.setItem('zsx_store_settings', JSON.stringify(storeSettings));
    showAdminToast('Configurações de frete, PIX e avisos salvas!');
}

function handleSaveCredentials(e) {
    e.preventDefault();
    adminCredentials.devEmail = document.getElementById('credDevEmail').value.trim();
    adminCredentials.devPass = document.getElementById('credDevPass').value.trim();
    adminCredentials.ownerEmail = document.getElementById('credOwnerEmail').value.trim();
    adminCredentials.ownerPass = document.getElementById('credOwnerPass').value.trim();

    localStorage.setItem('zsx_admin_credentials', JSON.stringify(adminCredentials));
    showAdminToast('Credenciais de acesso atualizadas com segurança!');
}

window.resetAllStoreData = function() {
    localStorage.removeItem('zsx_catalog_overrides');
    localStorage.removeItem('zsx_custom_products');
    localStorage.removeItem('zsx_deleted_products');
    localStorage.removeItem('zsx_coupons');
    localStorage.removeItem('zsx_store_settings');

    catalogOverrides = {};
    customProducts = [];
    deletedProducts = [];
    storeCoupons = [...defaultCoupons];
    storeSettings = { ...defaultStoreSettings };

    localStorage.setItem('zsx_coupons', JSON.stringify(storeCoupons));
    localStorage.setItem('zsx_store_settings', JSON.stringify(storeSettings));

    loadSettingsIntoInputs();
    refreshAllViews();
    showAdminToast('Catálogo, preços e estoques restaurados para o padrão de fábrica!');
};

function refreshAllViews() {
    renderDashboard();
    renderProductsTable();
    renderOrdersSection();
    renderCouponsSection();
}

// ==========================================================================
// INICIALIZAÇÃO DO PAINEL
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    checkAuthSession();
    loadSettingsIntoInputs();
    refreshAllViews();

    document.getElementById('adminLoginForm')?.addEventListener('submit', handleAdminLogin);

    document.getElementById('btnAdminLogout')?.addEventListener('click', () => {
        sessionStorage.removeItem('zsx_admin_session');
        checkAuthSession();
    });

    document.querySelectorAll('.sidebar-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchAdminSection(btn.dataset.section));
    });

    document.getElementById('adminProductSearch')?.addEventListener('input', renderProductsTable);
    document.getElementById('adminCategoryFilter')?.addEventListener('change', renderProductsTable);
    document.getElementById('adminStockFilter')?.addEventListener('change', renderProductsTable);

    document.getElementById('adminProductForm')?.addEventListener('submit', handleProductFormSubmit);
    document.getElementById('createCouponForm')?.addEventListener('submit', handleCreateCoupon);
    document.getElementById('storeSettingsForm')?.addEventListener('submit', handleSaveStoreSettings);
    document.getElementById('credentialsForm')?.addEventListener('submit', handleSaveCredentials);
});
