const zsxHeroEl = document.getElementById('zsxHero');
let wasScrolledDown = false;

function replayHeroAnimation() {
    if (!zsxHeroEl) return;
    zsxHeroEl.classList.remove('is-visible');
    void zsxHeroEl.offsetWidth;
    zsxHeroEl.classList.add('is-visible');
}

if (zsxHeroEl) {
    requestAnimationFrame(() => {
        zsxHeroEl.classList.add('is-visible');
    });

    zsxHeroEl.addEventListener('mousemove', (e) => {
        const rect = zsxHeroEl.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        zsxHeroEl.style.setProperty('--mx', mx.toFixed(3));
        zsxHeroEl.style.setProperty('--my', my.toFixed(3));
    });

    zsxHeroEl.addEventListener('mouseleave', () => {
        zsxHeroEl.style.setProperty('--mx', '0');
        zsxHeroEl.style.setProperty('--my', '0');
    });

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                replayHeroAnimation();
            } else {
                zsxHeroEl.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.2 });

    heroObserver.observe(zsxHeroEl);
}

window.addEventListener('scroll', () => {
    const sy = window.scrollY;

    // Progresso suave do hero para conectar com a tela scrolled
    if (zsxHeroEl) {
        const heroHeight = zsxHeroEl.offsetHeight || window.innerHeight;
        const progress = Math.min(1, Math.max(0, sy / (heroHeight * 0.75)));
        zsxHeroEl.style.setProperty('--hero-p', progress.toFixed(3));
    }

    // Zoom imediato assim que começar a rolar (mais de 5px)
    if (sy > 5) {
        document.body.classList.add('zooming');
    } else {
        document.body.classList.remove('zooming');
    }

    // Fixar e estilizar cabeçalho (sticky icons com vidro fosco)
    const headEl = document.getElementById('head');
    if (headEl) {
        if (sy > 30) {
            headEl.classList.add('header-scrolled');
        } else {
            headEl.classList.remove('header-scrolled');
        }
    }

    // Conecta a transição do hero para o estado scrolled e reativa o efeito ao voltar
    if (sy > 420) {
        if (!wasScrolledDown) {
            wasScrolledDown = true;
            document.body.classList.add('scrolled');
            if (zsxHeroEl) zsxHeroEl.classList.remove('is-visible');
        }
    } else {
        if (wasScrolledDown) {
            wasScrolledDown = false;
            document.body.classList.remove('scrolled');
            replayHeroAnimation();
        }
    }
});

// Efeito de subir e aparecer (slide up) toda vez que o elemento entra na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Pega todos os elementos que tiverem a classe "reveal" e observa eles
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ==========================================================================
// SISTEMA DE CARRINHO, PERFIL & MINHAS COMPRAS - ZSX OUTLET
// ==========================================================================

// Estado do Carrinho e Usuário
let cart = JSON.parse(localStorage.getItem('zsx_cart')) || [];
let userAddress = JSON.parse(localStorage.getItem('zsx_address')) || null;
let activeCoupon = null;
let currentPaymentMethod = 'credit';
let pendingCheckoutAfterAddress = false;
let currentOrderStatusFilter = 'pending';

// Pedidos Reais do Cliente (sem dados simulados)
const LEGACY_SEED_IDS = ['ZSX-84920', 'ZSX-74190', 'ZSX-69412', 'ZSX-51028'];
let rawStoredOrders = JSON.parse(localStorage.getItem('zsx_orders')) || [];
let orders = Array.isArray(rawStoredOrders)
    ? rawStoredOrders.filter(o => o && !LEGACY_SEED_IDS.includes(o.id))
    : [];
if (orders.length !== rawStoredOrders.length) {
    localStorage.setItem('zsx_orders', JSON.stringify(orders));
}

// Helper para ler configurações oficiais da loja definidas no Painel Admin
function getLiveStoreSettings() {
    const defaults = {
        freeShippingMin: 199.00,
        defaultShipping: 24.00,
        pixDiscount: 5,
        topBarText: 'FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 199',
        pixKey: '00020126580014br.gov.bcb.pix0136zsxoutlet-oficial5204000053039865802BR5910ZSX OUTLET6009SAO PAULO62070503***6304',
        whatsapp: '(71) 99289-0814',
        supportEmail: 'sac@zsxoutlet.com.br'
    };
    const saved = JSON.parse(localStorage.getItem('zsx_store_settings')) || {};
    // Remove o número antigo de exemplo caso tenha ficado salvo no cache do navegador
    if (saved.whatsapp && saved.whatsapp.includes('99999')) {
        saved.whatsapp = defaults.whatsapp;
        localStorage.setItem('zsx_store_settings', JSON.stringify({ ...defaults, ...saved }));
    }
    return { ...defaults, ...saved };
}

// Formatador de Moeda BRL
function formatBRL(value) {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Atualizar Badge do Carrinho no Header
function updateCartBadge() {
    const badge = document.getElementById('cartCountBadge');
    if (!badge) return;
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    badge.textContent = totalCount;
    if (totalCount > 0) {
        badge.classList.add('visible');
    } else {
        badge.classList.remove('visible');
    }
}

// Salvar Carrinho no LocalStorage
function saveCart() {
    localStorage.setItem('zsx_cart', JSON.stringify(cart));
    updateCartBadge();
}

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    if (type === 'success') {
        iconSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><polyline points="20 6 9 17 4 12"/></svg>';
    } else if (type === 'error') {
        iconSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    }

    toast.innerHTML = `<span class="toast-icon">${iconSvg}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3200);
}

// Adicionar Item ao Carrinho
function addToCart(product, openDrawer = false) {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            image: product.image,
            size: product.size || 'M',
            color: product.color || 'Padrão',
            quantity: 1
        });
    }

    saveCart();
    renderCart();

    if (openDrawer) {
        openCartDrawer();
    } else {
        showToast(`"${product.name}" adicionado ao carrinho!`, 'success');
        const headerCart = document.getElementById('headerCartBtn');
        if (headerCart) {
            headerCart.style.transform = 'scale(1.25)';
            setTimeout(() => { headerCart.style.transform = 'scale(1)'; }, 250);
        }
    }
}

// Alterar Quantidade (+ e -)
window.changeCartQty = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
        showToast('Item removido do carrinho.', 'info');
    }
    saveCart();
    renderCart();
};

// Remover Item
window.removeCartItem = function(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
    showToast('Item removido do carrinho.', 'info');
};

// Renderizar o Carrinho
function renderCart() {
    const listContainer = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotal');
    const discountEl = document.getElementById('cartDiscount');
    const discountRow = document.getElementById('summaryDiscountRow');
    const totalEl = document.getElementById('cartTotal');
    const activeAddressCard = document.getElementById('activeAddressCard');
    const activeAddressText = document.getElementById('activeAddressText');
    const addressBtnText = document.getElementById('addressBtnText');

    if (!listContainer) return;

    if (cart.length === 0) {
        listContainer.innerHTML = `
            <div class="cart-empty-state">
                <span class="cart-empty-icon"><svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12L4 18v22a3 3 0 0 0 3 3h34a3 3 0 0 0 3-3V18l-4-6z"/><line x1="4" y1="18" x2="44" y2="18"/><path d="M30 24a6 6 0 0 1-12 0"/></svg></span>
                <h3>Seu carrinho está vazio</h3>
                <p>Nenhum item adicionado por enquanto. Confira nossas coleções!</p>
                <button type="button" class="modal-btn-confirm" onclick="closeCartDrawer()">Explorar Produtos</button>
            </div>
        `;
    } else {
        listContainer.innerHTML = cart.map(item => `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">${formatBRL(item.price * item.quantity)}</p>
                    <p class="cart-item-details">TAMANHO | ${item.size} &nbsp;&bull;&nbsp; COR | ${item.color}</p>
                    <div class="cart-item-quantity">
                        <button type="button" class="qty-btn" onclick="changeCartQty('${item.id}', -1)" aria-label="Diminuir quantidade">&minus;</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button type="button" class="qty-btn" onclick="changeCartQty('${item.id}', 1)" aria-label="Aumentar quantidade">&plus;</button>
                        <button type="button" class="cart-item-remove" onclick="removeCartItem('${item.id}')">Remover</button>
                    </div>
                </div>
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
            </div>
        `).join('');
    }

    // Cálculos Reais (Subtotal, Desconto de Cupom e Regra Oficial de Frete)
    const settings = getLiveStoreSettings();
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discount = 0;

    if (activeCoupon) {
        discount = subtotal * (activeCoupon.percent / 100);
        discountRow.style.display = 'flex';
        discountEl.textContent = `- ${formatBRL(discount)}`;
    } else {
        discountRow.style.display = 'none';
    }

    const afterDiscount = Math.max(0, subtotal - discount);
    const shippingFee = (cart.length === 0 || afterDiscount >= Number(settings.freeShippingMin))
        ? 0
        : Number(settings.defaultShipping);

    const shippingEl = document.getElementById('cartShipping');
    if (shippingEl) {
        if (shippingFee === 0) {
            shippingEl.textContent = 'Grátis';
            shippingEl.classList.add('text-free');
        } else {
            shippingEl.textContent = formatBRL(shippingFee);
            shippingEl.classList.remove('text-free');
        }
    }

    const total = afterDiscount + shippingFee;

    if (subtotalEl) subtotalEl.textContent = formatBRL(subtotal);
    if (totalEl) totalEl.textContent = formatBRL(total);

    // Endereço na tela do Carrinho
    if (userAddress) {
        if (activeAddressCard) activeAddressCard.style.display = 'block';
        if (activeAddressText) {
            activeAddressText.textContent = `${userAddress.street}, ${userAddress.number}${userAddress.comp ? ' - ' + userAddress.comp : ''} • ${userAddress.neighborhood}, ${userAddress.city}`;
        }
        if (addressBtnText) addressBtnText.textContent = 'Editar Endereço';
    } else {
        if (activeAddressCard) activeAddressCard.style.display = 'none';
        if (addressBtnText) addressBtnText.textContent = 'Adicionar Endereço';
    }
}

// Abrir e Fechar Drawer do Carrinho
function openCartDrawer() {
    renderCart();
    const overlay = document.getElementById('cartDrawerOverlay');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    const overlay = document.getElementById('cartDrawerOverlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Cupom de Desconto
function handleApplyCoupon() {
    const input = document.getElementById('couponInput');
    const msg = document.getElementById('couponMsg');
    if (!input || !msg) return;

    const code = input.value.trim().toUpperCase();
    if (!code) {
        msg.textContent = 'Digite um código de cupom.';
        msg.className = 'coupon-msg error';
        return;
    }

    const validCoupons = {
        'ZSX10': 10,
        'OFF20': 20,
        'VIP30': 30
    };
    const storedCoupons = JSON.parse(localStorage.getItem('zsx_coupons'));
    if (Array.isArray(storedCoupons)) {
        Object.keys(validCoupons).forEach(k => delete validCoupons[k]);
        storedCoupons.filter(c => c.active).forEach(c => {
            validCoupons[c.code.toUpperCase()] = Number(c.percent);
        });
    }

    if (validCoupons[code]) {
        activeCoupon = { code: code, percent: validCoupons[code] };
        msg.textContent = `Cupom "${code}" de ${validCoupons[code]}% OFF ativado!`;
        msg.className = 'coupon-msg success';
        renderCart();
        showToast(`Cupom de ${validCoupons[code]}% aplicado!`, 'success');
    } else {
        msg.textContent = 'Cupom inválido ou expirado.';
        msg.className = 'coupon-msg error';
    }
}

// Modal de Endereço
function openAddressModal() {
    const modal = document.getElementById('addressFormModal');
    if (!modal) return;

    const deleteBtn = document.getElementById('deleteAddressModalBtn');

    // Se já tiver endereço, preenche os campos e mostra botão de exclusão
    if (userAddress) {
        document.getElementById('addrCep').value = userAddress.cep || '';
        document.getElementById('addrStreet').value = userAddress.street || '';
        document.getElementById('addrNumber').value = userAddress.number || '';
        document.getElementById('addrComp').value = userAddress.comp || '';
        document.getElementById('addrNeighborhood').value = userAddress.neighborhood || '';
        document.getElementById('addrCity').value = userAddress.city || '';
        document.getElementById('addrName').value = userAddress.name || '';
        if (deleteBtn) deleteBtn.style.display = 'inline-block';
    } else {
        const form = document.getElementById('addressForm');
        if (form) form.reset();
        if (deleteBtn) deleteBtn.style.display = 'none';
    }

    modal.classList.add('active');
}

function closeAddressModal() {
    const modal = document.getElementById('addressFormModal');
    if (modal) modal.classList.remove('active');
}

// Remover Endereço
function removeUserAddress() {
    if (!userAddress) return;

    userAddress = null;
    localStorage.removeItem('zsx_address');

    const form = document.getElementById('addressForm');
    if (form) form.reset();

    const deleteBtn = document.getElementById('deleteAddressModalBtn');
    if (deleteBtn) deleteBtn.style.display = 'none';

    closeAddressModal();
    renderCart();
    showToast('Endereço removido com sucesso.', 'info');
}

// Busca CEP automática (ViaCEP)
async function searchCep() {
    const cepInput = document.getElementById('addrCep');
    if (!cepInput) return;
    const cleanCep = cepInput.value.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
        showToast('Digite um CEP válido com 8 dígitos.', 'error');
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        if (data.erro) {
            showToast('CEP não encontrado.', 'error');
            return;
        }

        document.getElementById('addrStreet').value = data.logradouro || '';
        document.getElementById('addrNeighborhood').value = data.bairro || '';
        document.getElementById('addrCity').value = `${data.localidade} - ${data.uf}`;
        showToast('Endereço carregado via CEP!', 'success');
        document.getElementById('addrNumber').focus();
    } catch (err) {
        showToast('Não foi possível buscar o CEP automaticamente.', 'error');
    }
}

// Salvar Endereço
function handleAddressSubmit(e) {
    e.preventDefault();
    userAddress = {
        cep: document.getElementById('addrCep').value.trim(),
        street: document.getElementById('addrStreet').value.trim(),
        number: document.getElementById('addrNumber').value.trim(),
        comp: document.getElementById('addrComp').value.trim(),
        neighborhood: document.getElementById('addrNeighborhood').value.trim(),
        city: document.getElementById('addrCity').value.trim(),
        name: document.getElementById('addrName').value.trim()
    };

    localStorage.setItem('zsx_address', JSON.stringify(userAddress));
    closeAddressModal();
    renderCart();
    showToast('Endereço salvo com sucesso!', 'success');

    // Se o usuário clicou em "Ir para o Pagamento" antes, abre o checkout direto!
    if (pendingCheckoutAfterAddress) {
        pendingCheckoutAfterAddress = false;
        openCheckoutModal();
    }
}

// Alerta de Endereço Obrigatório
function openAddressAlertModal() {
    const alertModal = document.getElementById('addressAlertModal');
    if (alertModal) alertModal.classList.add('active');
}

function closeAddressAlertModal() {
    const alertModal = document.getElementById('addressAlertModal');
    if (alertModal) alertModal.classList.remove('active');
}

// Ir para o Pagamento (com validação de endereço)
function handleGoToCheckout() {
    if (cart.length === 0) {
        showToast('Adicione produtos ao carrinho antes de continuar.', 'error');
        return;
    }

    // Validação: se NÃO houver endereço, exibe o popup avisando
    if (!userAddress) {
        openAddressAlertModal();
    } else {
        openCheckoutModal();
    }
}

// Cálculo Centralizado do Total Final de Checkout
function calculateCheckoutTotal(paymentMethod = currentPaymentMethod) {
    const settings = getLiveStoreSettings();
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = activeCoupon ? subtotal * (activeCoupon.percent / 100) : 0;
    const afterDiscount = Math.max(0, subtotal - discount);
    const shippingFee = (cart.length === 0 || afterDiscount >= Number(settings.freeShippingMin))
        ? 0
        : Number(settings.defaultShipping);

    let finalTotal = afterDiscount + shippingFee;
    if (paymentMethod === 'pix') {
        const pixPct = Number(settings.pixDiscount) || 0;
        finalTotal = (afterDiscount * (1 - pixPct / 100)) + shippingFee;
    }
    return finalTotal;
}

// Modal de Checkout / Pagamento
function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (!modal) return;

    const settings = getLiveStoreSettings();
    const finalTotal = calculateCheckoutTotal(currentPaymentMethod);

    const totalEl = document.getElementById('checkoutFinalTotal');
    const addrEl = document.getElementById('checkoutDeliveryAddress');
    const pixInput = document.getElementById('pixCodeInput');

    if (totalEl) totalEl.textContent = formatBRL(finalTotal);
    if (addrEl && userAddress) {
        addrEl.textContent = `${userAddress.street}, ${userAddress.number} - ${userAddress.city}`;
    }
    if (pixInput && settings.pixKey) {
        pixInput.value = settings.pixKey;
    }

    // Parcelamento Cartão de Crédito (1x até 6x sem juros)
    const creditTotal = calculateCheckoutTotal('credit');
    const select = document.getElementById('ccInstallments');
    if (select) {
        select.innerHTML = '';
        for (let i = 1; i <= 6; i++) {
            const installmentVal = (creditTotal / i);
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = `${i}x de ${formatBRL(installmentVal)} sem juros`;
            select.appendChild(opt);
        }
    }

    modal.classList.add('active');
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('active');
}

// Alternar Abas de Pagamento
function switchPaymentTab(tabName) {
    currentPaymentMethod = tabName;
    document.querySelectorAll('.payment-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    if (tabName === 'credit') document.getElementById('tabCredit').classList.add('active');
    if (tabName === 'debit') document.getElementById('tabDebit').classList.add('active');
    if (tabName === 'pix') document.getElementById('tabPix').classList.add('active');

    const finalTotal = calculateCheckoutTotal(tabName);
    const totalEl = document.getElementById('checkoutFinalTotal');
    if (totalEl) totalEl.textContent = formatBRL(finalTotal);
}

// Copiar Código PIX
function copyPixCode() {
    const input = document.getElementById('pixCodeInput');
    const btn = document.getElementById('btnCopyPix');
    if (!input) return;

    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value).then(() => {
        if (btn) {
            const originalText = btn.textContent;
            btn.innerHTML = 'Copiado! <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-left: 4px;"><polyline points="20 6 9 17 4 12"/></svg>';
            setTimeout(() => { btn.textContent = originalText; }, 2000);
        }
        showToast('Código PIX copiado para a área de transferência!', 'success');
    });
}

// Validação Real de Dados do Cartão (Crédito / Débito)
function validateCardFields(prefix) {
    const numEl = document.getElementById(`${prefix}Number`);
    const nameEl = document.getElementById(`${prefix}Name`);
    const expEl = document.getElementById(`${prefix}Expiry`);
    const cvvEl = document.getElementById(`${prefix}Cvv`);

    const cleanNum = (numEl?.value || '').replace(/\D/g, '');
    const cleanName = (nameEl?.value || '').trim();
    const cleanExp = (expEl?.value || '').trim();
    const cleanCvv = (cvvEl?.value || '').replace(/\D/g, '');

    if (cleanNum.length < 13 || cleanNum.length > 19) {
        showToast('Informe um número de cartão válido.', 'error');
        numEl?.focus();
        return false;
    }
    if (cleanName.length < 3) {
        showToast('Informe o nome completo impresso no cartão.', 'error');
        nameEl?.focus();
        return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(cleanExp)) {
        showToast('Informe a validade do cartão no formato MM/AA.', 'error');
        expEl?.focus();
        return false;
    }
    const [mm, yy] = cleanExp.split('/').map(Number);
    if (mm < 1 || mm > 12 || yy < 26) {
        showToast('A data de validade do cartão é inválida ou expirada.', 'error');
        expEl?.focus();
        return false;
    }
    if (cleanCvv.length < 3 || cleanCvv.length > 4) {
        showToast('Informe o código de segurança (CVV) de 3 ou 4 dígitos.', 'error');
        cvvEl?.focus();
        return false;
    }
    return true;
}

// Finalizar Pedido com Validação Real e Baixa Automática de Estoque
function handleFinishOrder() {
    if (currentPaymentMethod === 'credit' && !validateCardFields('cc')) return;
    if (currentPaymentMethod === 'debit' && !validateCardFields('deb')) return;

    closeCheckoutModal();
    closeCartDrawer();

    const successModal = document.getElementById('orderSuccessModal');
    const orderNumEl = document.getElementById('successOrderNum');
    const paymentMethodEl = document.getElementById('successPaymentMethod');
    const totalPaidEl = document.getElementById('successTotalPaid');

    const orderTimestamp = Date.now().toString().slice(-5);
    const realOrderCode = `ZSX-${orderTimestamp}`;
    if (orderNumEl) orderNumEl.textContent = `#${realOrderCode}`;

    const installmentsSel = document.getElementById('ccInstallments');
    const instCount = installmentsSel ? installmentsSel.value : '1';

    let methodLabel = `Cartão de Crédito (${instCount}x)`;
    if (currentPaymentMethod === 'debit') methodLabel = 'Cartão de Débito';
    if (currentPaymentMethod === 'pix') methodLabel = 'PIX';
    if (paymentMethodEl) paymentMethodEl.textContent = methodLabel;

    const finalTotal = calculateCheckoutTotal(currentPaymentMethod);
    if (totalPaidEl) totalPaidEl.textContent = formatBRL(finalTotal);

    // Baixa Real no Estoque de cada Produto Comprado
    const catalogOverrides = JSON.parse(localStorage.getItem('zsx_catalog_overrides')) || {};
    cart.forEach(cartItem => {
        // O ID no carrinho pode ser 'camisa-1' ou 'camisa-1-M-Preto'
        const baseIdMatch = String(cartItem.id).match(/^([a-z]+-\d+)/i);
        const prodId = baseIdMatch ? baseIdMatch[1] : cartItem.id;
        if (!catalogOverrides[prodId]) catalogOverrides[prodId] = {};
        const currentStock = catalogOverrides[prodId].stock !== undefined ? Number(catalogOverrides[prodId].stock) : 20;
        catalogOverrides[prodId].stock = Math.max(0, currentStock - (Number(cartItem.quantity) || 1));
    });
    localStorage.setItem('zsx_catalog_overrides', JSON.stringify(catalogOverrides));

    const orderStatus = (currentPaymentMethod === 'pix') ? 'pending' : 'confirmed';
    const orderStatusText = (currentPaymentMethod === 'pix')
        ? 'Aguardando Confirmação PIX'
        : 'Pagamento Aprovado - Em Separação';

    const customerAccount = JSON.parse(localStorage.getItem('zsx_customer_account')) || null;

    const newOrder = {
        id: realOrderCode,
        date: new Date().toLocaleDateString('pt-BR'),
        customerName: customerAccount?.name || userAddress?.name || 'Cliente',
        customerEmail: customerAccount?.email || '',
        address: userAddress ? `${userAddress.street}, ${userAddress.number} - ${userAddress.city} (${userAddress.cep})` : '',
        status: orderStatus,
        statusLabel: orderStatusText,
        paymentMethod: methodLabel,
        total: finalTotal,
        items: cart.map(i => ({ ...i }))
    };

    orders.unshift(newOrder);
    localStorage.setItem('zsx_orders', JSON.stringify(orders));
    updateOrderBadges();

    if (successModal) successModal.classList.add('active');

    // Limpa carrinho
    cart = [];
    activeCoupon = null;
    saveCart();
    renderCart();
}

function closeSuccessModal() {
    const successModal = document.getElementById('orderSuccessModal');
    if (successModal) successModal.classList.remove('active');
}

// ==========================================================================
// MODAL DE PERFIL (OVERLAY DE OPÇÕES)
// ==========================================================================

function openProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================================================
// MODAL DE MINHAS COMPRAS (ABAS & BOLINHAS VERMELHAS)
// ==========================================================================

function updateOrderBadges() {
    const badgePending = document.getElementById('badgePendingOrders');
    const badgeConfirmed = document.getElementById('badgeConfirmedOrders');
    const badgeFinished = document.getElementById('badgeFinishedOrders');

    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const confirmedCount = orders.filter(o => o.status === 'confirmed').length;
    const finishedCount = orders.filter(o => o.status === 'finished').length;

    if (badgePending) badgePending.textContent = pendingCount;
    if (badgeConfirmed) badgeConfirmed.textContent = confirmedCount;
    if (badgeFinished) badgeFinished.textContent = finishedCount;
}

function renderOrders(statusFilter = currentOrderStatusFilter) {
    const container = document.getElementById('ordersListContainer');
    if (!container) return;

    const filtered = orders.filter(o => o.status === statusFilter);

    if (filtered.length === 0) {
        let emptyMsg = 'Nenhum pedido nesta aba.';
        if (statusFilter === 'pending') emptyMsg = 'Você não possui pedidos aguardando pagamento.';
        if (statusFilter === 'confirmed') emptyMsg = 'Nenhum pedido confirmado no momento.';
        if (statusFilter === 'finished') emptyMsg = 'Você ainda não possui pedidos finalizados.';

        container.innerHTML = `
            <div class="orders-empty-state">
                <span class="orders-empty-icon"><svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M42 32V16a4 4 0 0 0-2-3.46l-14-8a4 4 0 0 0-4 0l-14 8A4 4 0 0 0 6 16v16a4 4 0 0 0 2 3.46l14 8a4 4 0 0 0 4 0l14-8A4 4 0 0 0 42 32z"/><polyline points="6.54 13.92 24 24.02 41.46 13.92"/><line x1="24" y1="44.16" x2="24" y2="24"/></svg></span>
                <h4>Nenhum Pedido Encontrado</h4>
                <p>${emptyMsg}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(order => {
        let pillClass = 'status-pending';
        let actionBtnHtml = '';

        if (order.status === 'pending') {
            pillClass = 'status-pending';
            actionBtnHtml = `
                <button type="button" class="order-card-btn btn-order-action" onclick="copyOrderPix('${order.id}')">Pagar com PIX</button>
                <button type="button" class="order-card-btn btn-order-secondary" onclick="cancelOrder('${order.id}')">Cancelar</button>
            `;
        } else if (order.status === 'confirmed') {
            pillClass = 'status-confirmed';
            actionBtnHtml = `
                <button type="button" class="order-card-btn btn-order-action" onclick="trackOrder('${order.id}')">Rastrear Encomenda</button>
            `;
        } else if (order.status === 'finished') {
            pillClass = 'status-finished';
            actionBtnHtml = `
                <button type="button" class="order-card-btn btn-order-action" onclick="reorderItems('${order.id}')">Comprar Novamente</button>
            `;
        }

        const itemsHtml = order.items.map(it => `
            <div class="order-item-row">
                <img src="${it.image}" alt="${it.name}" class="order-item-thumb">
                <div class="order-item-info">
                    <h5 class="order-item-name">${it.name}</h5>
                    <p class="order-item-sub">Qtd: ${it.quantity} &bull; Tam: ${it.size || 'M'}</p>
                </div>
                <div class="order-item-price">${formatBRL(it.price * it.quantity)}</div>
            </div>
        `).join('');

        return `
            <div class="order-card">
                <div class="order-card-header">
                    <div class="order-id-date">
                        <span class="order-code">#${order.id}</span>
                        <span class="order-date">${order.date}</span>
                    </div>
                    <span class="order-status-pill ${pillClass}">${order.statusLabel}</span>
                </div>
                <div class="order-items-list">
                    ${itemsHtml}
                </div>
                <div class="order-card-footer">
                    <div class="order-payment-method">
                        <span>Pagamento: <strong>${order.paymentMethod}</strong></span>
                    </div>
                    <div class="order-footer-right">
                        <div class="order-total-block">
                            <span class="order-total-label">Total:</span>
                            <span class="order-total-value">${formatBRL(order.total)}</span>
                        </div>
                        ${actionBtnHtml}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function openSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function switchOrderStatusTab(status) {
    currentOrderStatusFilter = status;
    document.querySelectorAll('.orders-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.orderStatus === status);
    });
    renderOrders(status);
}

function openOrdersModal() {
    updateOrderBadges();
    renderOrders(currentOrderStatusFilter);
    const modal = document.getElementById('ordersModal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrdersModal() {
    const modal = document.getElementById('ordersModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Ações nos Pedidos
window.copyOrderPix = function(orderId) {
    showToast(`Código PIX do pedido #${orderId} copiado com sucesso!`, 'success');
};

window.trackOrder = function(orderId) {
    showToast(`Pedido #${orderId} em transporte. Código: BR982147321BR`, 'info');
};

window.cancelOrder = function(orderId) {
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('zsx_orders', JSON.stringify(orders));
    updateOrderBadges();
    renderOrders(currentOrderStatusFilter);
    showToast(`Pedido #${orderId} cancelado com sucesso.`, 'info');
};

window.reorderItems = function(orderId) {
    const found = orders.find(o => o.id === orderId);
    if (found && found.items) {
        found.items.forEach(item => {
            addToCart(item, false);
        });
        closeOrdersModal();
        openCartDrawer();
        showToast('Itens readicionados ao carrinho!', 'success');
    }
};

// ==========================================================================
// INICIALIZAÇÃO DE EVENTOS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    updateOrderBadges();
    renderCart();

    // Abrir carrinho pelo ícone do header
    const headerCartBtn = document.getElementById('headerCartBtn');
    if (headerCartBtn) {
        headerCartBtn.addEventListener('click', openCartDrawer);
    }

    // Fechar carrinho
    const closeCartBtn = document.getElementById('closeCartBtn');
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);

    // Fechar ao clicar no overlay escuro do carrinho
    const cartOverlay = document.getElementById('cartDrawerOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) closeCartDrawer();
        });
    }

    // Ícone de Perfil no Header -> Abrir Overlay de Perfil
    const headerProfileBtn = document.getElementById('headerProfileBtn');
    if (headerProfileBtn) {
        headerProfileBtn.addEventListener('click', openProfileModal);
    }

    // Fechar Modal de Perfil
    const closeProfileBtn = document.getElementById('closeProfileBtn');
    if (closeProfileBtn) closeProfileBtn.addEventListener('click', closeProfileModal);

    const profileModal = document.getElementById('profileModal');
    if (profileModal) {
        profileModal.addEventListener('click', (e) => {
            if (e.target === profileModal) closeProfileModal();
        });
    }

    // Opções do Perfil
    const menuMyOrdersBtn = document.getElementById('menuMyOrdersBtn');
    if (menuMyOrdersBtn) {
        menuMyOrdersBtn.addEventListener('click', () => {
            closeProfileModal();
            openOrdersModal();
        });
    }

    const menuMyAddressesBtn = document.getElementById('menuMyAddressesBtn');
    if (menuMyAddressesBtn) {
        menuMyAddressesBtn.addEventListener('click', () => {
            closeProfileModal();
            openAddressModal();
        });
    }

    const menuMyCouponsBtn = document.getElementById('menuMyCouponsBtn');
    if (menuMyCouponsBtn) {
        menuMyCouponsBtn.addEventListener('click', () => {
            const cList = JSON.parse(localStorage.getItem('zsx_coupons')) || [
                { code: 'ZSX10', percent: 10, active: true },
                { code: 'OFF20', percent: 20, active: true },
                { code: 'VIP30', percent: 30, active: true }
            ];
            const activeStr = cList.filter(c => c.active).map(c => `${c.code} (${c.percent}%)`).join(', ');
            showToast(activeStr ? `Cupons ativos: ${activeStr}` : 'Nenhum cupom ativo no momento.', 'success');
        });
    }

    const menuSupportBtn = document.getElementById('menuSupportBtn');
    if (menuSupportBtn) {
        menuSupportBtn.addEventListener('click', () => {
            closeProfileModal();
            openSupportModal();
        });
    }

    // Gestão Real da Conta do Cliente no Modal de Perfil
    function refreshCustomerProfileUI() {
        const acc = JSON.parse(localStorage.getItem('zsx_customer_account'));
        const nameEl = document.getElementById('profileUserName');
        const emailEl = document.getElementById('profileUserEmail');
        const badgeEl = document.querySelector('.profile-badge-status');
        const descEl = document.getElementById('menuAccountDesc');
        const logoutBtn = document.getElementById('menuLogoutBtn');
        const adminBtn = document.getElementById('menuAdminPanelBtn');

        // Exibe botão do Painel Admin apenas se houver sessão de administrador ativa
        const adminSession = JSON.parse(sessionStorage.getItem('zsx_admin_session'));
        if (adminBtn) {
            adminBtn.style.display = (adminSession && adminSession.authenticated) ? 'flex' : 'none';
        }

        if (acc && acc.name) {
            if (nameEl) nameEl.textContent = acc.name;
            if (emailEl) emailEl.textContent = acc.email || acc.phone || '';
            if (badgeEl) badgeEl.textContent = 'ATIVO';
            if (descEl) descEl.textContent = `${acc.name} • Editar informações`;
            if (logoutBtn) logoutBtn.style.display = 'flex';
        } else {
            if (nameEl) nameEl.textContent = 'Minha Conta ZSX';
            if (emailEl) emailEl.textContent = 'Cadastre seus dados para agilizar seus pedidos';
            if (badgeEl) badgeEl.textContent = 'CONTA';
            if (descEl) descEl.textContent = 'Clique para cadastrar seu nome, e-mail e WhatsApp';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    refreshCustomerProfileUI();

    const menuEditAccountBtn = document.getElementById('menuEditAccountBtn');
    const customerAccountForm = document.getElementById('customerAccountForm');
    const cancelAccountEditBtn = document.getElementById('cancelAccountEditBtn');

    if (menuEditAccountBtn && customerAccountForm) {
        menuEditAccountBtn.addEventListener('click', () => {
            const acc = JSON.parse(localStorage.getItem('zsx_customer_account')) || {};
            document.getElementById('custNameInput').value = acc.name || '';
            document.getElementById('custEmailInput').value = acc.email || '';
            document.getElementById('custPhoneInput').value = acc.phone || '';
            customerAccountForm.style.display = customerAccountForm.style.display === 'none' ? 'block' : 'none';
        });
    }

    if (cancelAccountEditBtn && customerAccountForm) {
        cancelAccountEditBtn.addEventListener('click', () => {
            customerAccountForm.style.display = 'none';
        });
    }

    if (customerAccountForm) {
        customerAccountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const accData = {
                name: document.getElementById('custNameInput').value.trim(),
                email: document.getElementById('custEmailInput').value.trim(),
                phone: document.getElementById('custPhoneInput').value.trim()
            };
            localStorage.setItem('zsx_customer_account', JSON.stringify(accData));
            customerAccountForm.style.display = 'none';
            refreshCustomerProfileUI();
            showToast('Dados da sua conta salvos com sucesso!', 'success');
        });
    }

    const menuLogoutBtn = document.getElementById('menuLogoutBtn');
    if (menuLogoutBtn) {
        menuLogoutBtn.addEventListener('click', () => {
            localStorage.removeItem('zsx_customer_account');
            sessionStorage.removeItem('zsx_admin_session');
            refreshCustomerProfileUI();
            closeProfileModal();
            showToast('Você desconectou da sua conta.', 'info');
        });
    }

    // Máscaras Automáticas para Cartão de Crédito e Débito
    ['ccNumber', 'debNumber'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '').substring(0, 16);
                e.target.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
            });
        }
    });

    ['ccExpiry', 'debExpiry'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '').substring(0, 4);
                if (v.length >= 3) v = v.substring(0, 2) + '/' + v.substring(2, 4);
                e.target.value = v;
            });
        }
    });

    ['ccCvv', 'debCvv'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
            });
        }
    });

    // Sincronizar Contatos de Suporte, WhatsApp e Barra de Topo com as Configurações do Painel Admin
    (function syncStoreSettingsToUI() {
        const s = getLiveStoreSettings();
        if (s.whatsapp) {
            const cleanDigits = s.whatsapp.replace(/\D/g, '');
            const waUrl = `https://wa.me/55${cleanDigits}`;
            document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
                a.href = waUrl;
                const valSpan = a.querySelector('.support-contact-val');
                if (valSpan) valSpan.textContent = s.whatsapp;
            });
        }
        if (s.supportEmail) {
            document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
                a.href = `mailto:${s.supportEmail}`;
                const valSpan = a.querySelector('.support-contact-val');
                if (valSpan) valSpan.textContent = s.supportEmail;
            });
        }
    })();

    // Ícone de Suporte no Header
    const headerSupportBtn = document.getElementById('headerSupportBtn');
    if (headerSupportBtn) {
        headerSupportBtn.addEventListener('click', () => {
            openSupportModal();
        });
    }

    // Botão para fechar o modal de suporte
    const closeSupportBtn = document.getElementById('closeSupportBtn');
    if (closeSupportBtn) {
        closeSupportBtn.addEventListener('click', closeSupportModal);
    }

    const supportModal = document.getElementById('supportModal');
    if (supportModal) {
        supportModal.addEventListener('click', (e) => {
            if (e.target === supportModal) closeSupportModal();
        });
    }

    // Modal de Minhas Compras (Fechar e Abas)
    const closeOrdersBtn = document.getElementById('closeOrdersBtn');
    if (closeOrdersBtn) closeOrdersBtn.addEventListener('click', closeOrdersModal);

    const ordersModal = document.getElementById('ordersModal');
    if (ordersModal) {
        ordersModal.addEventListener('click', (e) => {
            if (e.target === ordersModal) closeOrdersModal();
        });
    }

    document.querySelectorAll('.orders-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchOrderStatusTab(tab.dataset.orderStatus);
        });
    });

    // Sincronizar Cards da Home com Edições do Painel Administrativo
    const adminOverrides = JSON.parse(localStorage.getItem('zsx_catalog_overrides')) || {};
    const adminDeleted = JSON.parse(localStorage.getItem('zsx_deleted_products')) || [];

    document.querySelectorAll('.prods').forEach(prodEl => {
        const rawId = prodEl.dataset.id;
        if (rawId && adminDeleted.includes(rawId)) {
            prodEl.style.display = 'none';
            return;
        }
        if (rawId && adminOverrides[rawId]) {
            const ov = adminOverrides[rawId];
            if (ov.active === false) {
                prodEl.style.display = 'none';
                return;
            }
            if (ov.name) {
                prodEl.dataset.name = ov.name;
                const nameEl = prodEl.querySelector('.prod-nome');
                if (nameEl) nameEl.textContent = ov.name;
            }
            if (ov.price !== undefined) {
                prodEl.dataset.price = String(ov.price);
                const priceEl = prodEl.querySelector('.prod-preco');
                if (priceEl) priceEl.textContent = formatBRL(ov.price);
            }
            if (ov.image) {
                prodEl.dataset.image = ov.image;
                const imgEl = prodEl.querySelector('img');
                if (imgEl) imgEl.src = ov.image;
            }
            if (ov.stock !== undefined && Number(ov.stock) <= 0) {
                const priceEl = prodEl.querySelector('.prod-preco');
                if (priceEl) priceEl.textContent = 'ESGOTADO';
            }
        }
    });

    // Atalho de Teclado Exclusivo (Ctrl + Shift + A) para abrir o Painel Administrativo
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
            e.preventDefault();
            window.location.href = 'admin.html';
        }
    });

    // Botões dos Produtos (Comprar e Adicionar ao Carrinho)
    document.querySelectorAll('.prods').forEach(prodEl => {
        const id = prodEl.dataset.id || 'prod-' + Math.random();
        const name = prodEl.dataset.name || prodEl.querySelector('.prod-nome')?.textContent || 'Produto ZSX';
        const price = prodEl.dataset.price || (prodEl.querySelector('.prod-preco')?.textContent.replace(/[^0-9,.]/g, '').replace(',', '.') || '89.90');
        const img = prodEl.dataset.image || prodEl.querySelector('img')?.getAttribute('src') || '';
        const size = prodEl.dataset.size || 'M';
        const color = prodEl.dataset.color || 'Padrão';

        const productData = { id, name, price, image: img, size, color };

        const btnBuy = prodEl.querySelector('.btn-buy');
        const btnAdd = prodEl.querySelector('.btn-add-cart');

        if (btnBuy) {
            btnBuy.addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(productData, true); // Adiciona e abre o carrinho direto!
            });
        }

        if (btnAdd) {
            btnAdd.addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(productData, false); // Adiciona e mostra feedback!
            });
        }

        // Clique no card do produto redireciona para a tela dedicada do produto
        prodEl.addEventListener('click', (e) => {
            if (!e.target.closest('.prod-actions')) {
                window.location.href = `product.html?id=${encodeURIComponent(id)}`;
            }
        });
    });

    // Cupom
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    if (applyCouponBtn) applyCouponBtn.addEventListener('click', handleApplyCoupon);

    // Endereço
    const openAddressBtn = document.getElementById('openAddressBtn');
    if (openAddressBtn) openAddressBtn.addEventListener('click', openAddressModal);

    const editAddressBtn = document.getElementById('editAddressBtn');
    if (editAddressBtn) editAddressBtn.addEventListener('click', openAddressModal);

    const removeAddressBtn = document.getElementById('removeAddressBtn');
    if (removeAddressBtn) removeAddressBtn.addEventListener('click', removeUserAddress);

    const deleteAddressModalBtn = document.getElementById('deleteAddressModalBtn');
    if (deleteAddressModalBtn) deleteAddressModalBtn.addEventListener('click', removeUserAddress);

    const closeAddressFormBtn = document.getElementById('closeAddressFormBtn');
    if (closeAddressFormBtn) closeAddressFormBtn.addEventListener('click', closeAddressModal);

    const cancelAddressBtn = document.getElementById('cancelAddressBtn');
    if (cancelAddressBtn) cancelAddressBtn.addEventListener('click', closeAddressModal);

    const addressForm = document.getElementById('addressForm');
    if (addressForm) addressForm.addEventListener('submit', handleAddressSubmit);

    const btnSearchCep = document.getElementById('btnSearchCep');
    if (btnSearchCep) btnSearchCep.addEventListener('click', searchCep);

    // Alerta de Endereço Faltante
    const alertGoToAddressBtn = document.getElementById('alertGoToAddressBtn');
    if (alertGoToAddressBtn) {
        alertGoToAddressBtn.addEventListener('click', () => {
            closeAddressAlertModal();
            pendingCheckoutAfterAddress = true;
            openAddressModal();
        });
    }

    const alertCloseBtn = document.getElementById('alertCloseBtn');
    if (alertCloseBtn) alertCloseBtn.addEventListener('click', closeAddressAlertModal);

    // Ir para Checkout
    const goToCheckoutBtn = document.getElementById('goToCheckoutBtn');
    if (goToCheckoutBtn) goToCheckoutBtn.addEventListener('click', handleGoToCheckout);

    // Fechar Checkout
    const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
    if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckoutModal);

    // Abas de Pagamento
    document.querySelectorAll('.payment-tab').forEach(tab => {
        tab.addEventListener('click', () => switchPaymentTab(tab.dataset.tab));
    });

    // Copiar PIX
    const btnCopyPix = document.getElementById('btnCopyPix');
    if (btnCopyPix) btnCopyPix.addEventListener('click', copyPixCode);

    // Finalizar Pedido
    const btnFinishOrder = document.getElementById('btnFinishOrder');
    if (btnFinishOrder) btnFinishOrder.addEventListener('click', handleFinishOrder);

    // Continuar Comprando (Sucesso)
    const btnContinueShopping = document.getElementById('btnContinueShopping');
    if (btnContinueShopping) btnContinueShopping.addEventListener('click', closeSuccessModal);

    // Máscara simples de CEP
    const cepInput = document.getElementById('addrCep');
    if (cepInput) {
        cepInput.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 5) v = v.substring(0, 5) + '-' + v.substring(5, 8);
            e.target.value = v;
        });
    }
});
