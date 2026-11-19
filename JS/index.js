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
        const nextStock = Math.max(0, currentStock - (Number(cartItem.quantity) || 1));
        catalogOverrides[prodId].stock = nextStock;
        if (window.ZSX_DB) window.ZSX_DB.updateProductStock(prodId, nextStock);
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
    if (window.ZSX_DB) window.ZSX_DB.insertOrder(newOrder);
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
// MODAL DE PERFIL, LOGIN E CADASTRO (OVERLAYS)
// ==========================================================================

function openProfileModal() {
    closeLoginModal();
    closeRegisterModal();
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.remove('active');
    const hasOtherActive = document.querySelector('.custom-modal-overlay.active, .cart-drawer-overlay.active');
    if (!hasOtherActive) document.body.style.overflow = '';
}

function openLoginModal() {
    closeRegisterModal();
    closeProfileModal();
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.remove('active');
    const hasOtherActive = document.querySelector('.custom-modal-overlay.active, .cart-drawer-overlay.active');
    if (!hasOtherActive) document.body.style.overflow = '';
}

function openRegisterModal() {
    closeLoginModal();
    closeProfileModal();
    const modal = document.getElementById('registerModal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) modal.classList.remove('active');
    const hasOtherActive = document.querySelector('.custom-modal-overlay.active, .cart-drawer-overlay.active');
    if (!hasOtherActive) document.body.style.overflow = '';
}

window.openProfileModal = openProfileModal;
window.closeProfileModal = closeProfileModal;
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.openRegisterModal = openRegisterModal;
window.closeRegisterModal = closeRegisterModal;

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

    // Ícone de Perfil no Header -> Abrir Login (se não autenticado) ou Perfil (se autenticado)
    const headerProfileBtn = document.getElementById('headerProfileBtn');
    if (headerProfileBtn) {
        headerProfileBtn.addEventListener('click', () => {
            const acc = JSON.parse(localStorage.getItem('zsx_customer_account'));
            if (!acc || !acc.email) {
                openLoginModal();
            } else {
                openProfileModal();
            }
        });
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

    // ==========================================================================
    // CONTROLES DOS OVERLAYS DE LOGIN & CADASTRO (FROSTED GLASS)
    // ==========================================================================

    // Botões de Fechar
    const closeLoginModalBtn = document.getElementById('closeLoginModalBtn');
    if (closeLoginModalBtn) closeLoginModalBtn.addEventListener('click', closeLoginModal);

    const closeRegisterModalBtn = document.getElementById('closeRegisterModalBtn');
    if (closeRegisterModalBtn) closeRegisterModalBtn.addEventListener('click', closeRegisterModal);

    // Fechar ao clicar fora (backdrop)
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) closeLoginModal();
        });
    }

    const registerModal = document.getElementById('registerModal');
    if (registerModal) {
        registerModal.addEventListener('click', (e) => {
            if (e.target === registerModal) closeRegisterModal();
        });
    }

    // Alternar entre Login e Cadastro
    const btnGoToRegister = document.getElementById('btnGoToRegister');
    if (btnGoToRegister) {
        btnGoToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            openRegisterModal();
        });
    }

    const btnGoToLogin = document.getElementById('btnGoToLogin');
    if (btnGoToLogin) {
        btnGoToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            openLoginModal();
        });
    }

    // Submissão do Formulário de Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('btnLoginSubmit');
            const origContent = btn ? btn.innerHTML : 'Entrar';
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<span>Verificando...</span>';
            }

            const rawIdentifier = (document.getElementById('loginEmail')?.value || '').trim();
            const identifierLower = rawIdentifier.toLowerCase();
            const isEmailLogin = identifierLower.includes('@');
            const phoneDigitsLogin = rawIdentifier.replace(/\D/g, '');
            const email = isEmailLogin ? identifierLower : `${phoneDigitsLogin}@phone.zsx`;
            const password = (document.getElementById('loginPassword')?.value || '').trim();

            if (!rawIdentifier || !password) {
                showToast('Informe seu e-mail ou telefone e a senha de acesso.', 'error');
                if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                return;
            }

            if (!isEmailLogin && phoneDigitsLogin.length < 10) {
                showToast('Informe um e-mail válido ou telefone completo com DDD.', 'error');
                if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                return;
            }

            const existingResendBox = document.getElementById('loginResendBox');
            if (existingResendBox) existingResendBox.remove();

            try {
                // 1A. Login por Telefone (valida na nuvem zsx_customers ou local)
                if (!isEmailLogin) {
                    let user = null;
                    if (window.ZSX_DB && window.ZSX_DB.isConfigured()) {
                        try {
                            user = typeof window.ZSX_DB.getCustomerByPhone === 'function'
                                ? await window.ZSX_DB.getCustomerByPhone(phoneDigitsLogin)
                                : await window.ZSX_DB.getCustomerByEmail(email);
                        } catch (dbErr) {
                            console.warn('[ZSX Login Phone DB]', dbErr);
                        }
                    }
                    if (!user) {
                        const localUsers = JSON.parse(localStorage.getItem('zsx_registered_customers')) || [];
                        user = localUsers.find(u =>
                            (u.phone && String(u.phone).replace(/\D/g, '') === phoneDigitsLogin) ||
                            (u.email && u.email.toLowerCase() === email)
                        ) || null;
                    }
                    if (!user) {
                        showToast('Nenhuma conta encontrada com este telefone. Cadastre-se!', 'error');
                        if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                        return;
                    }
                    const hashedInputPass = window.ZSX_DB?.hashCustomerPassword
                        ? window.ZSX_DB.hashCustomerPassword(password)
                        : password;
                    if (!user.password || (user.password !== hashedInputPass && user.password !== password)) {
                        showToast('Senha incorreta para este telefone.', 'error');
                        if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                        return;
                    }
                    const accData = {
                        id: user.id,
                        name: user.name || 'Cliente ZSX',
                        email: user.email || email,
                        phone: user.phone || rawIdentifier,
                        password: hashedInputPass,
                        avatar: user.avatar || user.address?._avatar || ''
                    };
                    localStorage.setItem('zsx_customer_account', JSON.stringify(accData));
                    if (user.address && (!userAddress || !userAddress.street)) {
                        userAddress = user.address;
                        localStorage.setItem('zsx_address', JSON.stringify(user.address));
                    }
                    closeLoginModal();
                    loginForm.reset();
                    refreshCustomerProfileUI();
                    showToast(`Bem-vindo de volta, ${accData.name}!`, 'success');
                    return;
                }

                // 1B. Autenticação oficial por E-mail via Supabase Auth (exige e-mail confirmado)
                if (window.ZSX_DB && window.ZSX_DB.isConfigured() && typeof window.ZSX_DB.authSignIn === 'function') {
                    const authRes = await window.ZSX_DB.authSignIn(email, password);

                    if (!authRes.ok) {
                        if (authRes.code === 'email_not_confirmed') {
                            showToast(authRes.message, 'error');
                            const resendBox = document.createElement('div');
                            resendBox.id = 'loginResendBox';
                            resendBox.className = 'auth-verify-inline';
                            resendBox.innerHTML = `
                                <span>Seu e-mail ainda não foi confirmado.</span>
                                <button type="button" id="btnInlineResend" class="auth-switch-link">Reenviar link de confirmação</button>
                            `;
                            loginForm.insertBefore(resendBox, loginForm.querySelector('.auth-switch-prompt'));
                            document.getElementById('btnInlineResend')?.addEventListener('click', async () => {
                                const resendBtn = document.getElementById('btnInlineResend');
                                if (resendBtn) { resendBtn.disabled = true; resendBtn.textContent = 'Reenviando...'; }
                                const r = await window.ZSX_DB.authResendConfirmation(email);
                                showToast(r.message, r.ok ? 'success' : 'error');
                                if (resendBtn) { resendBtn.disabled = false; resendBtn.textContent = 'Reenviar link de confirmação'; }
                            });
                            if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                            return;
                        }

                        showToast(authRes.message || 'E-mail ou senha incorretos.', 'error');
                        if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                        return;
                    }

                    // Login aprovado pelo Supabase Auth! Busca ou sincroniza perfil em zsx_customers
                    const authUser = authRes.user || {};
                    const meta = authUser.user_metadata || {};
                    let dbProfile = null;
                    try {
                        dbProfile = await window.ZSX_DB.getCustomerByEmail(email);
                    } catch (e) {}

                    const hashedInputPass = window.ZSX_DB.hashCustomerPassword(password);
                    const accData = {
                        id: dbProfile?.id || authUser.id || `cust-${Date.now()}`,
                        name: dbProfile?.name || meta.name || email.split('@')[0],
                        email: email,
                        phone: dbProfile?.phone || meta.phone || '',
                        password: hashedInputPass,
                        avatar: dbProfile?.avatar || dbProfile?.address?._avatar || '',
                        verified: true
                    };

                    if (!dbProfile) {
                        await window.ZSX_DB.saveCustomer({ ...accData, address: userAddress || {} });
                    } else if (dbProfile.address && (!userAddress || !userAddress.street)) {
                        userAddress = dbProfile.address;
                        localStorage.setItem('zsx_address', JSON.stringify(dbProfile.address));
                    }

                    localStorage.setItem('zsx_customer_account', JSON.stringify(accData));

                    try {
                        const cloudOrders = await window.ZSX_DB.fetchCustomerOrders(email);
                        if (Array.isArray(cloudOrders) && cloudOrders.length > 0) {
                            const localOrders = JSON.parse(localStorage.getItem('zsx_orders')) || [];
                            const merged = [...cloudOrders];
                            localOrders.forEach(lo => {
                                if (!merged.some(mo => mo.id === lo.id)) merged.push(lo);
                            });
                            orders = merged;
                            localStorage.setItem('zsx_orders', JSON.stringify(orders));
                            updateOrderBadges();
                        }
                    } catch (orderErr) {
                        console.warn('[ZSX Login Orders Sync]', orderErr);
                    }

                    closeLoginModal();
                    loginForm.reset();
                    refreshCustomerProfileUI();
                    showToast(`Bem-vindo de volta, ${accData.name}!`, 'success');
                    return;
                }

                // 2. Fallback caso o Supabase não esteja configurado (modo offline local)
                const localUsers = JSON.parse(localStorage.getItem('zsx_registered_customers')) || [];
                const user = localUsers.find(u => u.email && u.email.toLowerCase() === email) || null;
                if (!user) {
                    showToast('Conta não encontrada. Verifique o e-mail ou cadastre-se.', 'error');
                    if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                    return;
                }
                const hashedInputPass = window.ZSX_DB?.hashCustomerPassword
                    ? window.ZSX_DB.hashCustomerPassword(password)
                    : password;
                if (!user.password || (user.password !== hashedInputPass && user.password !== password)) {
                    showToast('Senha incorreta para este e-mail.', 'error');
                    if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                    return;
                }
                localStorage.setItem('zsx_customer_account', JSON.stringify(user));
                closeLoginModal();
                loginForm.reset();
                refreshCustomerProfileUI();
                showToast(`Bem-vindo de volta, ${user.name || 'Cliente'}!`, 'success');
            } catch (err) {
                console.error('[ZSX Login Error]', err);
                showToast('Falha ao autenticar. Tente novamente.', 'error');
            } finally {
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = origContent;
                }
            }
        });
    }

    // Validação de E-mail Real (bloqueia descartáveis e alerta erros de digitação)
    const DISPOSABLE_EMAIL_DOMAINS = new Set([
        'tempmail.com', 'temp-mail.org', '10minutemail.com', 'guerrillamail.com',
        'mailinator.com', 'yopmail.com', 'trashmail.com', 'sharklasers.com',
        'getnada.com', 'mohmal.com', 'dispostable.com', 'fakeinbox.com',
        'maildrop.cc', 'throwawaymail.com', 'emailondeck.com', 'mintemail.com'
    ]);
    const TYPO_EMAIL_DOMAINS = {
        'gamil.com': 'gmail.com',
        'gmial.com': 'gmail.com',
        'gnail.com': 'gmail.com',
        'gmal.com': 'gmail.com',
        'gmail.con': 'gmail.com',
        'gmail.com.br': 'gmail.com',
        'hotmal.com': 'hotmail.com',
        'hotmial.com': 'hotmail.com',
        'hotmail.con': 'hotmail.com',
        'outlok.com': 'outlook.com',
        'outloo.com': 'outlook.com',
        'yaho.com': 'yahoo.com',
        'icloud.con': 'icloud.com'
    };

    function validateRealEmail(email) {
        const clean = String(email || '').trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(clean)) {
            return { valid: false, message: 'Digite um endereço de e-mail válido.' };
        }
        const domain = clean.split('@')[1];
        if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
            return { valid: false, message: 'E-mails temporários não são permitidos. Use seu e-mail pessoal.' };
        }
        if (TYPO_EMAIL_DOMAINS[domain]) {
            return { valid: false, message: `Verifique o domínio do e-mail: você quis dizer @${TYPO_EMAIL_DOMAINS[domain]}?` };
        }
        return { valid: true };
    }

    function showRegisterConfirmationScreen(email) {
        const regModalCard = document.querySelector('#registerModal .auth-modal-card');
        if (!regModalCard || !registerForm) return;
        let verifyBox = document.getElementById('registerVerifyNotice');
        if (!verifyBox) {
            verifyBox = document.createElement('div');
            verifyBox.id = 'registerVerifyNotice';
            verifyBox.className = 'auth-verify-panel';
            regModalCard.appendChild(verifyBox);
        }
        registerForm.style.display = 'none';
        verifyBox.style.display = 'flex';
        verifyBox.innerHTML = `
            <div class="auth-verify-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
            </div>
            <h3 class="auth-verify-title">VERIFIQUE SEU E-MAIL</h3>
            <p class="auth-verify-desc">
                Enviamos um link de confirmação para <strong>${email}</strong>.
                Abra sua caixa de entrada (ou pasta de spam) e clique no link para ativar sua conta.
            </p>
            <button type="button" id="btnVerifyGoLogin" class="btn-auth-submit">
                <span>Já confirmei, Fazer Login</span>
            </button>
            <button type="button" id="btnVerifyResend" class="auth-switch-link">
                Não recebeu? Reenviar e-mail de confirmação
            </button>
        `;

        document.getElementById('btnVerifyGoLogin')?.addEventListener('click', () => {
            verifyBox.style.display = 'none';
            registerForm.style.display = '';
            closeRegisterModal();
            openLoginModal();
            const loginEmailInput = document.getElementById('loginEmail');
            if (loginEmailInput) loginEmailInput.value = email;
        });

        document.getElementById('btnVerifyResend')?.addEventListener('click', async () => {
            const resendBtn = document.getElementById('btnVerifyResend');
            if (resendBtn) { resendBtn.disabled = true; resendBtn.textContent = 'Reenviando...'; }
            const r = await window.ZSX_DB.authResendConfirmation(email);
            showToast(r.message, r.ok ? 'success' : 'error');
            if (resendBtn) { resendBtn.disabled = false; resendBtn.textContent = 'Não recebeu? Reenviar e-mail de confirmação'; }
        });
    }

    // Restaura formulário de cadastro se o usuário fechar e abrir novamente
    document.getElementById('closeRegisterModalBtn')?.addEventListener('click', () => {
        const verifyBox = document.getElementById('registerVerifyNotice');
        if (verifyBox) verifyBox.style.display = 'none';
        if (registerForm) registerForm.style.display = '';
    });

    // Seletor de método de cadastro (E-mail ou Telefone) + máscara de telefone
    let currentRegisterMethod = 'email';
    const regMethodEmailBtn = document.getElementById('regMethodEmailBtn');
    const regMethodPhoneBtn = document.getElementById('regMethodPhoneBtn');
    const regEmailGroup = document.getElementById('regEmailGroup');
    const regPhoneGroup = document.getElementById('regPhoneGroup');
    const regEmailInput = document.getElementById('registerEmail');
    const regPhoneInput = document.getElementById('registerPhone');

    function setRegisterMethod(method) {
        currentRegisterMethod = method === 'phone' ? 'phone' : 'email';
        if (regMethodEmailBtn) regMethodEmailBtn.classList.toggle('active', currentRegisterMethod === 'email');
        if (regMethodPhoneBtn) regMethodPhoneBtn.classList.toggle('active', currentRegisterMethod === 'phone');
        if (regEmailGroup) regEmailGroup.style.display = currentRegisterMethod === 'email' ? '' : 'none';
        if (regPhoneGroup) regPhoneGroup.style.display = currentRegisterMethod === 'phone' ? '' : 'none';
        if (regEmailInput) regEmailInput.required = currentRegisterMethod === 'email';
        if (regPhoneInput) regPhoneInput.required = currentRegisterMethod === 'phone';
    }

    if (regMethodEmailBtn) regMethodEmailBtn.addEventListener('click', () => setRegisterMethod('email'));
    if (regMethodPhoneBtn) regMethodPhoneBtn.addEventListener('click', () => setRegisterMethod('phone'));

    if (regPhoneInput) {
        regPhoneInput.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').substring(0, 11);
            if (v.length > 6) {
                v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
            } else if (v.length > 2) {
                v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
            } else if (v.length > 0) {
                v = `(${v}`;
            }
            e.target.value = v;
        });
    }

    // Submissão do Formulário de Cadastro (E-mail com verificação real OU Telefone)
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('btnRegisterSubmit');
            const origContent = btn ? btn.innerHTML : 'Criar Minha Conta';
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<span>Criando conta...</span>';
            }

            const name = (document.getElementById('registerName')?.value || '').trim();
            const email = (document.getElementById('registerEmail')?.value || '').trim().toLowerCase();
            const phone = (document.getElementById('registerPhone')?.value || '').trim();
            const phoneDigits = phone.replace(/\D/g, '');
            const password = (document.getElementById('registerPassword')?.value || '').trim();

            if (!name) {
                showToast('Informe seu nome completo.', 'error');
                if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                return;
            }

            if (password.length < 6) {
                showToast('A senha deve ter no mínimo 6 caracteres.', 'error');
                if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                return;
            }

            try {
                // MODO TELEFONE
                if (currentRegisterMethod === 'phone') {
                    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
                        showToast('Digite um número de telefone válido com DDD (10 ou 11 dígitos).', 'error');
                        if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                        return;
                    }

                    const phoneEmailKey = `${phoneDigits}@phone.zsx`;
                    let existingPhoneUser = null;
                    if (window.ZSX_DB && window.ZSX_DB.isConfigured()) {
                        existingPhoneUser = typeof window.ZSX_DB.getCustomerByPhone === 'function'
                            ? await window.ZSX_DB.getCustomerByPhone(phoneDigits)
                            : await window.ZSX_DB.getCustomerByEmail(phoneEmailKey);
                    }
                    if (!existingPhoneUser) {
                        const localUsers = JSON.parse(localStorage.getItem('zsx_registered_customers')) || [];
                        existingPhoneUser = localUsers.find(u =>
                            (u.phone && String(u.phone).replace(/\D/g, '') === phoneDigits) ||
                            (u.email && u.email.toLowerCase() === phoneEmailKey)
                        ) || null;
                    }
                    if (existingPhoneUser) {
                        showToast('Este telefone já está cadastrado. Faça login!', 'info');
                        closeRegisterModal();
                        openLoginModal();
                        const loginEmailInput = document.getElementById('loginEmail');
                        if (loginEmailInput) loginEmailInput.value = phone;
                        if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                        return;
                    }

                    const hashedRegPass = window.ZSX_DB?.hashCustomerPassword
                        ? window.ZSX_DB.hashCustomerPassword(password)
                        : password;
                    const accData = {
                        id: `cust-${Date.now()}`,
                        name,
                        email: phoneEmailKey,
                        phone,
                        password: hashedRegPass,
                        avatar: '',
                        address: userAddress || {}
                    };

                    if (window.ZSX_DB && window.ZSX_DB.isConfigured()) {
                        const saved = await window.ZSX_DB.saveCustomer(accData);
                        if (saved && saved.id) accData.id = saved.id;
                    }

                    const localUsers = JSON.parse(localStorage.getItem('zsx_registered_customers')) || [];
                    localUsers.push(accData);
                    localStorage.setItem('zsx_registered_customers', JSON.stringify(localUsers));
                    localStorage.setItem('zsx_customer_account', JSON.stringify(accData));

                    closeRegisterModal();
                    registerForm.reset();
                    setRegisterMethod('email');
                    refreshCustomerProfileUI();
                    showToast(`Conta criada com sucesso! Bem-vindo, ${name}!`, 'success');
                    return;
                }

                // MODO E-MAIL (com verificação real via Supabase Auth)
                if (!email) {
                    showToast('Informe seu e-mail.', 'error');
                    if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                    return;
                }

                const emailCheck = validateRealEmail(email);
                if (!emailCheck.valid) {
                    showToast(emailCheck.message, 'error');
                    if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                    return;
                }

                if (window.ZSX_DB && window.ZSX_DB.isConfigured() && typeof window.ZSX_DB.authSignUp === 'function') {
                    const signUpRes = await window.ZSX_DB.authSignUp({ email, password, name, phone: '' });

                    if (!signUpRes.ok) {
                        if (signUpRes.code === 'already_registered') {
                            showToast(signUpRes.message, 'info');
                            closeRegisterModal();
                            openLoginModal();
                            const loginEmailInput = document.getElementById('loginEmail');
                            if (loginEmailInput) loginEmailInput.value = email;
                        } else {
                            showToast(signUpRes.message, 'error');
                        }
                        if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                        return;
                    }

                    if (signUpRes.needsConfirmation) {
                        registerForm.reset();
                        showRegisterConfirmationScreen(email);
                        showToast('Link de confirmação enviado! Verifique seu e-mail.', 'success');
                        if (btn) { btn.disabled = false; btn.innerHTML = origContent; }
                        return;
                    }

                    const hashedRegPass = window.ZSX_DB.hashCustomerPassword(password);
                    const accData = {
                        id: signUpRes.user?.id || `cust-${Date.now()}`,
                        name,
                        email,
                        phone: '',
                        password: hashedRegPass,
                        avatar: '',
                        address: userAddress || {}
                    };
                    await window.ZSX_DB.saveCustomer(accData);
                    localStorage.setItem('zsx_customer_account', JSON.stringify(accData));
                    closeRegisterModal();
                    registerForm.reset();
                    refreshCustomerProfileUI();
                    showToast(`Conta criada com sucesso! Bem-vindo, ${name}!`, 'success');
                    return;
                }

                // Fallback local (apenas se Supabase não estiver configurado)
                const localUsers = JSON.parse(localStorage.getItem('zsx_registered_customers')) || [];
                if (localUsers.some(u => u.email && u.email.toLowerCase() === email)) {
                    showToast('Este e-mail já possui cadastro. Faça login!', 'info');
                    closeRegisterModal();
                    openLoginModal();
                    return;
                }
                const hashedRegPass = window.ZSX_DB?.hashCustomerPassword
                    ? window.ZSX_DB.hashCustomerPassword(password)
                    : password;
                const accData = { name, email, phone: '', password: hashedRegPass, avatar: '', address: userAddress || {} };
                localUsers.push(accData);
                localStorage.setItem('zsx_registered_customers', JSON.stringify(localUsers));
                localStorage.setItem('zsx_customer_account', JSON.stringify(accData));
                closeRegisterModal();
                registerForm.reset();
                refreshCustomerProfileUI();
                showToast(`Conta criada com sucesso! Bem-vindo, ${name}!`, 'success');
            } catch (err) {
                console.error('[ZSX Register Error]', err);
                showToast('Erro ao criar conta. Tente novamente.', 'error');
            } finally {
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = origContent;
                }
            }
        });
    }

    // Retorno automático quando o cliente clica no link de confirmação enviado por e-mail
    (async function handleEmailConfirmationCallback() {
        const hash = window.location.hash || '';
        if (!hash.includes('access_token=')) return;
        const params = new URLSearchParams(hash.replace(/^#/, ''));
        const accessToken = params.get('access_token');
        if (!accessToken || !window.ZSX_DB || typeof window.ZSX_DB.authGetUserFromToken !== 'function') return;

        const user = await window.ZSX_DB.authGetUserFromToken(accessToken);
        if (user && user.email) {
            const meta = user.user_metadata || {};
            const accData = {
                id: user.id,
                name: meta.name || user.email.split('@')[0],
                email: user.email.toLowerCase(),
                phone: meta.phone || '',
                verified: true
            };
            await window.ZSX_DB.saveCustomer({ ...accData, address: userAddress || {} });
            localStorage.setItem('zsx_customer_account', JSON.stringify(accData));
            refreshCustomerProfileUI();
            showToast(`E-mail confirmado com sucesso! Bem-vindo, ${accData.name}!`, 'success');
        }
        // Limpa o token da barra de endereço por segurança
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    })();

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

    // Modal de Cupons Disponíveis (Vidro Fosco Obsidian & Crimson)
    function renderCouponsModal() {
        const listEl = document.getElementById('couponsModalList');
        if (!listEl) return;

        const cList = JSON.parse(localStorage.getItem('zsx_coupons')) || [
            { code: 'ZSX10', percent: 10, desc: '10% OFF Primeira Compra', active: true },
            { code: 'OFF20', percent: 20, desc: '20% OFF Campanha Streetwear', active: true },
            { code: 'VIP30', percent: 30, desc: '30% OFF Clientes VIP ZSX', active: true }
        ];
        const activeCoupons = cList.filter(c => c && c.active !== false);

        if (activeCoupons.length === 0) {
            listEl.innerHTML = `
                <div class="coupons-empty-state">
                    <p>Nenhum cupom disponível no momento. Fique de olho nas novidades da ZSX!</p>
                </div>
            `;
            return;
        }

        listEl.innerHTML = activeCoupons.map(c => {
            const safeCode = String(c.code || '').toUpperCase();
            const pct = Number(c.percent) || 10;
            const desc = c.desc || `${pct}% de desconto em toda a loja`;
            return `
                <div class="coupon-modal-item">
                    <div class="coupon-modal-left">
                        <div class="coupon-modal-top">
                            <span class="coupon-modal-code">${safeCode}</span>
                            <span class="coupon-modal-pct">${pct}% OFF</span>
                        </div>
                        <p class="coupon-modal-desc">${desc}</p>
                    </div>
                    <div class="coupon-modal-actions">
                        <button type="button" class="btn-coupon-copy" onclick="copyCouponCode('${safeCode}')">Copiar</button>
                        <button type="button" class="btn-coupon-apply" onclick="applyCouponFromModal('${safeCode}')">Aplicar</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    function openCouponsModal() {
        closeProfileModal();
        renderCouponsModal();
        const modal = document.getElementById('couponsModal');
        if (modal) modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCouponsModal() {
        const modal = document.getElementById('couponsModal');
        if (modal) modal.classList.remove('active');
        const hasOtherActive = document.querySelector('.custom-modal-overlay.active, .cart-drawer-overlay.active');
        if (!hasOtherActive) document.body.style.overflow = '';
    }

    window.openCouponsModal = openCouponsModal;
    window.closeCouponsModal = closeCouponsModal;

    window.copyCouponCode = function(code) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).catch(() => {});
        }
        showToast(`Cupom ${code} copiado!`, 'success');
    };

    window.applyCouponFromModal = function(code) {
        const couponInput = document.getElementById('couponInput');
        if (couponInput) {
            couponInput.value = code;
            handleApplyCoupon();
        } else {
            const cList = JSON.parse(localStorage.getItem('zsx_coupons')) || [];
            const match = cList.find(c => c.active && String(c.code).toUpperCase() === code);
            if (match) {
                activeCoupon = { code, percent: Number(match.percent) };
                showToast(`Cupom ${code} (${match.percent}% OFF) aplicado!`, 'success');
            }
        }
        closeCouponsModal();
        if (Array.isArray(cart) && cart.length > 0 && typeof openCartDrawer === 'function') {
            openCartDrawer();
        }
    };

    const closeCouponsModalBtn = document.getElementById('closeCouponsModalBtn');
    if (closeCouponsModalBtn) closeCouponsModalBtn.addEventListener('click', closeCouponsModal);

    const couponsModal = document.getElementById('couponsModal');
    if (couponsModal) {
        couponsModal.addEventListener('click', (e) => {
            if (e.target === couponsModal) closeCouponsModal();
        });
    }

    const menuMyCouponsBtn = document.getElementById('menuMyCouponsBtn');
    if (menuMyCouponsBtn) {
        menuMyCouponsBtn.addEventListener('click', openCouponsModal);
    }

    const menuSupportBtn = document.getElementById('menuSupportBtn');
    if (menuSupportBtn) {
        menuSupportBtn.addEventListener('click', () => {
            closeProfileModal();
            openSupportModal();
        });
    }

    // Foto de Perfil do Cliente (Upload com recorte quadrado e compressão)
    const DEFAULT_PROFILE_AVATAR = '../images/profile-icon-removebg-preview.png';

    function applyCustomerAvatarUI(acc) {
        const avatarSrc = (acc && acc.avatar) ? acc.avatar : '';
        const profileImg = document.getElementById('profileAvatarImg') || document.querySelector('.profile-avatar-img');
        const headerImg = document.querySelector('#headerProfileBtn img');

        if (profileImg) {
            profileImg.src = avatarSrc || DEFAULT_PROFILE_AVATAR;
            profileImg.classList.toggle('has-custom-avatar', Boolean(avatarSrc));
        }
        if (headerImg) {
            headerImg.src = avatarSrc || DEFAULT_PROFILE_AVATAR;
            headerImg.classList.toggle('has-custom-avatar', Boolean(avatarSrc));
        }
    }

    const profileAvatarTrigger = document.getElementById('profileAvatarTrigger');
    const profileAvatarInput = document.getElementById('profileAvatarInput');

    if (profileAvatarTrigger && profileAvatarInput) {
        profileAvatarTrigger.addEventListener('click', () => {
            const acc = JSON.parse(localStorage.getItem('zsx_customer_account'));
            if (!acc || !acc.email) {
                closeProfileModal();
                openLoginModal();
                showToast('Entre na sua conta para adicionar uma foto de perfil.', 'info');
                return;
            }
            profileAvatarInput.click();
        });

        profileAvatarInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) {
                showToast('Selecione um arquivo de imagem válido (JPG, PNG ou WebP).', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = async () => {
                    const size = 220;
                    const canvas = document.createElement('canvas');
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext('2d');
                    const minSide = Math.min(img.width, img.height);
                    const sx = (img.width - minSide) / 2;
                    const sy = (img.height - minSide) / 2;
                    ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);

                    const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
                    const acc = JSON.parse(localStorage.getItem('zsx_customer_account')) || {};
                    acc.avatar = dataUrl;
                    localStorage.setItem('zsx_customer_account', JSON.stringify(acc));

                    // Atualiza cache local de usuários cadastrados também
                    const localUsers = JSON.parse(localStorage.getItem('zsx_registered_customers')) || [];
                    const idx = localUsers.findIndex(u => u.email && acc.email && u.email.toLowerCase() === acc.email.toLowerCase());
                    if (idx >= 0) {
                        localUsers[idx].avatar = dataUrl;
                        localStorage.setItem('zsx_registered_customers', JSON.stringify(localUsers));
                    }

                    applyCustomerAvatarUI(acc);
                    showToast('Foto de perfil atualizada!', 'success');

                    if (window.ZSX_DB && window.ZSX_DB.isConfigured() && acc.email) {
                        try {
                            await window.ZSX_DB.saveCustomer({ ...acc, address: userAddress || {} });
                        } catch (err) {
                            console.warn('[ZSX Avatar Sync]', err);
                        }
                    }
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
            profileAvatarInput.value = '';
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
        const titleEl = document.getElementById('custFormTitle');
        const submitBtn = document.getElementById('submitAccountBtn');

        // Exibe botão do Painel Admin apenas se houver sessão de administrador ativa
        const adminSession = JSON.parse(sessionStorage.getItem('zsx_admin_session'));
        if (adminBtn) {
            adminBtn.style.display = (adminSession && adminSession.authenticated) ? 'flex' : 'none';
        }

        applyCustomerAvatarUI(acc);

        if (acc && acc.name) {
            const isPhonePlaceholder = acc.email && acc.email.endsWith('@phone.zsx');
            const displayContact = isPhonePlaceholder ? (acc.phone || '') : (acc.email || acc.phone || '');
            if (nameEl) nameEl.textContent = acc.name;
            if (emailEl) emailEl.textContent = displayContact;
            if (badgeEl) badgeEl.textContent = 'ATIVO';
            if (descEl) descEl.textContent = `${acc.name} • Editar informações`;
            if (titleEl) titleEl.textContent = 'Editar Dados da Conta';
            if (submitBtn) submitBtn.textContent = 'Salvar Alterações';
            if (logoutBtn) logoutBtn.style.display = 'flex';
        } else {
            if (nameEl) nameEl.textContent = 'Minha Conta ZSX';
            if (emailEl) emailEl.textContent = 'Entre ou crie sua conta para salvar seus pedidos';
            if (badgeEl) badgeEl.textContent = 'CONTA';
            if (descEl) descEl.textContent = 'Entrar ou criar conta com e-mail ou telefone';
            if (titleEl) titleEl.textContent = 'Acessar ou Criar Conta';
            if (submitBtn) submitBtn.textContent = 'Entrar / Cadastrar';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    refreshCustomerProfileUI();

    // Sincronizar dados do cliente salvos na nuvem (Supabase) ao carregar
    (function syncLoggedCustomer() {
        const acc = JSON.parse(localStorage.getItem('zsx_customer_account'));
        if (!acc || !acc.email || !window.ZSX_DB) return;
        window.ZSX_DB.getCustomerByEmail(acc.email).then(remote => {
            if (remote) {
                acc.name = remote.name || acc.name;
                acc.phone = remote.phone || acc.phone;
                acc.id = remote.id || acc.id;
                if ((remote.avatar || remote.address?._avatar) && !acc.avatar) {
                    acc.avatar = remote.avatar || remote.address._avatar;
                }
                localStorage.setItem('zsx_customer_account', JSON.stringify(acc));
                if (remote.address && (!userAddress || !userAddress.street)) {
                    userAddress = remote.address;
                    localStorage.setItem('zsx_address', JSON.stringify(remote.address));
                }
                refreshCustomerProfileUI();
            }
        });
        window.ZSX_DB.fetchCustomerOrders(acc.email).then(cloudOrders => {
            if (Array.isArray(cloudOrders) && cloudOrders.length > 0) {
                const localOrders = JSON.parse(localStorage.getItem('zsx_orders')) || [];
                const merged = [...cloudOrders];
                localOrders.forEach(lo => {
                    if (!merged.some(mo => mo.id === lo.id)) merged.push(lo);
                });
                orders = merged;
                localStorage.setItem('zsx_orders', JSON.stringify(orders));
                updateOrderBadges();
            }
        });
    })();

    const menuEditAccountBtn = document.getElementById('menuEditAccountBtn');
    const customerAccountForm = document.getElementById('customerAccountForm');
    const cancelAccountEditBtn = document.getElementById('cancelAccountEditBtn');

    if (menuEditAccountBtn && customerAccountForm) {
        menuEditAccountBtn.addEventListener('click', () => {
            const acc = JSON.parse(localStorage.getItem('zsx_customer_account')) || {};
            if (!acc || !acc.email) {
                closeProfileModal();
                openLoginModal();
                return;
            }
            const nameIn = document.getElementById('custNameInput');
            const emailIn = document.getElementById('custEmailInput');
            const phoneIn = document.getElementById('custPhoneInput');
            const passIn = document.getElementById('custPassInput');

            if (nameIn) nameIn.value = acc.name || '';
            if (emailIn) emailIn.value = acc.email || '';
            if (phoneIn) phoneIn.value = acc.phone || '';
            if (passIn) passIn.value = acc.password || '';

            customerAccountForm.style.display = customerAccountForm.style.display === 'none' ? 'block' : 'none';
        });
    }

    if (cancelAccountEditBtn && customerAccountForm) {
        cancelAccountEditBtn.addEventListener('click', () => {
            customerAccountForm.style.display = 'none';
        });
    }

    if (customerAccountForm) {
        customerAccountForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submitAccountBtn');
            const origText = submitBtn ? submitBtn.textContent : 'Salvar';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Salvando...';
            }

            const name = document.getElementById('custNameInput').value.trim();
            const email = document.getElementById('custEmailInput').value.trim().toLowerCase();
            const phone = document.getElementById('custPhoneInput')?.value.trim() || '';
            const password = document.getElementById('custPassInput')?.value.trim() || '';

            let accData = { name, email, phone, password };

            // Se conectado ao Supabase, verifica se usuário já existe ou cria/atualiza
            if (window.ZSX_DB) {
                try {
                    const existing = await window.ZSX_DB.getCustomerByEmail(email);
                    if (existing) {
                        accData.id = existing.id;
                        accData.name = name || existing.name;
                        accData.phone = phone || existing.phone;
                        if (existing.address && (!userAddress || !userAddress.street)) {
                            userAddress = existing.address;
                            localStorage.setItem('zsx_address', JSON.stringify(existing.address));
                        }
                    }
                    accData.address = userAddress || {};
                    await window.ZSX_DB.saveCustomer(accData);

                    // Sincroniza pedidos anteriores do cliente a partir da nuvem
                    const cloudOrders = await window.ZSX_DB.fetchCustomerOrders(email);
                    if (Array.isArray(cloudOrders) && cloudOrders.length > 0) {
                        orders = cloudOrders;
                        localStorage.setItem('zsx_orders', JSON.stringify(orders));
                        updateOrderBadges();
                    }
                } catch (err) {
                    console.warn('[ZSX] Erro ao sincronizar cliente:', err);
                }
            }

            localStorage.setItem('zsx_customer_account', JSON.stringify(accData));
            customerAccountForm.style.display = 'none';
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = origText;
            }
            refreshCustomerProfileUI();
            showToast(`Bem-vindo, ${accData.name}! Conta sincronizada com sucesso.`, 'success');
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
    function syncStoreSettingsToUI() {
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
    }
    syncStoreSettingsToUI();

    if (window.ZSX_DB && window.ZSX_DB.isConfigured()) {
        window.ZSX_DB.syncFromCloud().then(synced => {
            if (!synced) return;
            orders = JSON.parse(localStorage.getItem('zsx_orders')) || [];
            updateOrderBadges();
            syncStoreSettingsToUI();
        });
    }

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

    // Renderização Dinâmica das Seções da Home conforme produtos adicionados pelo dono
    (function renderDynamicHomeCatalog() {
        const topContainer = document.getElementById('dynamicHomeSectionsTop');
        const bottomContainer = document.getElementById('dynamicHomeSectionsBottom');
        if (!topContainer && !bottomContainer) return;

        const customProducts = JSON.parse(localStorage.getItem('zsx_custom_products')) || [];
        const overrides = JSON.parse(localStorage.getItem('zsx_catalog_overrides')) || {};
        const deletedIds = JSON.parse(localStorage.getItem('zsx_deleted_products')) || [];

        const CATEGORY_META = {
            polos: { title: 'Camisas Polo', secId: 'secPolos' },
            casacos: { title: 'Casacos', secId: 'secCasacos' },
            camisas: { title: 'Camisas', secId: 'secCamisas' },
            bermudas: { title: 'Bermudas', secId: 'secBermudas' },
            bones: { title: 'Bonés', secId: 'secBones' },
            jerseys: { title: 'Camisas de Time', secId: 'secJerseys' },
            calcados: { title: 'Calçados', secId: 'secCalcados' }
        };

        const grouped = {};
        customProducts.forEach(rawProd => {
            if (!rawProd || !rawProd.id || deletedIds.includes(rawProd.id)) return;
            const ov = overrides[rawProd.id] || {};
            const merged = { ...rawProd, ...ov };
            if (merged.active === false) return;

            const catKey = merged.categoryKey || 'camisas';
            if (!grouped[catKey]) grouped[catKey] = [];
            grouped[catKey].push(merged);
        });

        const buildSectionNodes = (catKey, products) => {
            const meta = CATEGORY_META[catKey] || {
                title: products[0]?.category || catKey,
                secId: `sec-${catKey}`
            };

            const headerDiv = document.createElement('div');
            headerDiv.className = 'classe1container';
            headerDiv.id = meta.secId;
            headerDiv.innerHTML = `
                <h2 class="classe1 sans">${meta.title}</h2>
                <p class="verTudo1 sans" onclick="window.location.href='category.html?cat=${encodeURIComponent(catKey)}'" style="cursor: pointer;" title="Ver todos de ${meta.title}">Ver tudo &gt;</p>
            `;

            const gradeDiv = document.createElement('div');
            gradeDiv.className = 'grade reveal';

            products.slice(0, 5).forEach(prod => {
                const isOut = prod.stock !== undefined && Number(prod.stock) <= 0;
                const defaultSize = Array.isArray(prod.sizes) && prod.sizes.length > 0 ? prod.sizes[0] : 'M';
                const card = document.createElement('div');
                card.className = 'prods';
                card.dataset.id = prod.id;
                card.dataset.name = prod.name;
                card.dataset.price = String(prod.price);
                card.dataset.image = prod.image;
                card.dataset.size = defaultSize;
                card.dataset.color = prod.color || 'Padrão';

                card.innerHTML = `
                    <img src="${prod.image}" alt="${prod.name}">
                    <h3 class="prod-nome sans">${prod.name}</h3>
                    <p class="prod-preco sans">${isOut ? 'ESGOTADO' : formatBRL(prod.price)}</p>
                    <div class="prod-actions">
                        <button type="button" class="btn-action btn-buy" title="Comprar" aria-label="Comprar">
                            <span class="btn-bg"></span>
                            <svg class="btn-icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                        </button>
                        <button type="button" class="btn-action btn-add-cart" title="Adicionar ao Carrinho" aria-label="Adicionar ao Carrinho">
                            <span class="btn-bg"></span>
                            <svg class="btn-icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                <line x1="12" y1="9" x2="16" y2="9"></line>
                                <line x1="14" y1="7" x2="14" y2="11"></line>
                            </svg>
                        </button>
                    </div>
                `;
                gradeDiv.appendChild(card);
            });

            return { headerDiv, gradeDiv };
        };

        Object.keys(grouped).forEach(catKey => {
            const items = grouped[catKey];
            if (!items || items.length === 0) return;

            const targetContainer = (catKey === 'polos' && topContainer) ? topContainer : (bottomContainer || topContainer);
            if (!targetContainer) return;

            const { headerDiv, gradeDiv } = buildSectionNodes(catKey, items);
            targetContainer.appendChild(headerDiv);
            targetContainer.appendChild(gradeDiv);
            observer.observe(gradeDiv);
        });
    })();

    // Fallback inteligente nos links do header caso a seção dinâmica ainda não exista na Home
    document.querySelectorAll('.hero-nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const hash = link.getAttribute('href');
            if (!hash || hash.length <= 1) return;
            const targetEl = document.querySelector(hash);
            if (!targetEl) {
                e.preventDefault();
                if (hash === '#secPolos') window.location.href = 'category.html?cat=polos';
                if (hash === '#secCasacos') window.location.href = 'category.html?cat=casacos';
            }
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

    // Modal Institucional (Políticas & Termos)
    const closeLegalModalBtn = document.getElementById('closeLegalModalBtn');
    if (closeLegalModalBtn) closeLegalModalBtn.addEventListener('click', closeLegalModal);

    const legalInfoModal = document.getElementById('legalInfoModal');
    if (legalInfoModal) {
        legalInfoModal.addEventListener('click', (e) => {
            if (e.target === legalInfoModal) closeLegalModal();
        });
    }
});

// ==========================================================================
// MODAL INSTITUCIONAL (TROCAS, ENVIO, PRIVACIDADE LGPD & TERMOS)
// ==========================================================================

const LEGAL_CONTENTS = {
    trocas: {
        title: 'Trocas e Devoluções',
        html: `
            <h4>Direito de Arrependimento (7 dias)</h4>
            <p>Conforme o Art. 49 do Código de Defesa do Consumidor, você tem até <strong>7 dias corridos</strong> após o recebimento do pedido para solicitar a devolução por arrependimento, sem custos adicionais.</p>
            <h4>Troca por Tamanho ou Defeito (até 30 dias)</h4>
            <p>Caso a peça não sirva ou apresente defeito de fabricação, entre em contato pelo nosso WhatsApp de suporte informando o número do pedido. A peça deve estar sem sinais de uso, lavagem e com a etiqueta original intacta.</p>
            <h4>Reembolso</h4>
            <p>O estorno é realizado em até 5 dias úteis após o recebimento e conferência da peça em nosso centro de distribuição (via PIX ou estorno no cartão utilizado).</p>
        `
    },
    envio: {
        title: 'Política de Envio e Prazos',
        html: `
            <h4>Despacho Rápido</h4>
            <p>Pedidos com pagamento aprovado até as 14h (dias úteis) são preparados e despachados em até <strong>1 a 2 dias úteis</strong>.</p>
            <h4>Frete Grátis</h4>
            <p>Compras acima de <strong>R$ 199,00</strong> contam com frete grátis automático para todo o Brasil na modalidade padrão.</p>
            <h4>Rastreamento</h4>
            <p>Assim que o pedido for postado, você receberá o código de rastreamento via WhatsApp ou e-mail para acompanhar cada etapa até a entrega.</p>
        `
    },
    privacidade: {
        title: 'Política de Privacidade (LGPD)',
        html: `
            <h4>Coleta e Uso de Dados</h4>
            <p>Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), seus dados cadastrais (nome, e-mail, telefone e endereço) são utilizados exclusivamente para processar pedidos, emitir entregas e prestar suporte.</p>
            <h4>Segurança</h4>
            <p>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins publicitários. Dados de pagamento são processados em ambiente criptografado.</p>
            <h4>Seus Direitos</h4>
            <p>Você pode solicitar a atualização ou exclusão dos seus dados a qualquer momento pelo e-mail de suporte oficial da loja.</p>
        `
    },
    termos: {
        title: 'Termos de Uso',
        html: `
            <h4>Aceitação</h4>
            <p>Ao navegar e realizar pedidos na <strong>ZSX Outlet</strong>, você concorda com as condições descritas neste site.</p>
            <h4>Preços, Cupons e Estoque</h4>
            <p>Os preços, promoções e disponibilidade de estoque podem ser atualizados sem aviso prévio. O desconto de 5% no PIX é aplicado automaticamente na etapa de pagamento.</p>
            <h4>Atendimento</h4>
            <p>Qualquer dúvida ou solicitação pode ser tratada diretamente pelos nossos canais oficiais de atendimento listados no rodapé e no ícone de suporte.</p>
        `
    }
};

window.openLegalModal = function(type) {
    const modal = document.getElementById('legalInfoModal');
    const titleEl = document.getElementById('legalModalTitle');
    const bodyEl = document.getElementById('legalModalBody');
    const data = LEGAL_CONTENTS[type];
    if (!modal || !data) return;

    if (titleEl) titleEl.textContent = data.title;
    if (bodyEl) bodyEl.innerHTML = data.html;
    modal.classList.add('active');
};

window.closeLegalModal = function() {
    const modal = document.getElementById('legalInfoModal');
    if (modal) modal.classList.remove('active');
};

// ==========================================================================
// NEVE NATALINA LENTA E SUTIL EM TODA A TELA (CANVAS LEVE)
// ==========================================================================
(function initChristmasSnow() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    function startSnow() {
        const canvas = document.getElementById('zsxSnowCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        let flakes = [];
        let animId = null;

        function createFlake(startRandomY) {
            const radius = 1.2 + Math.random() * 2.3;
            return {
                x: Math.random() * width,
                y: startRandomY ? Math.random() * height : -10 - Math.random() * 30,
                r: radius,
                vy: 0.24 + Math.random() * 0.40, // Queda bem lenta e suave
                vxBase: (Math.random() - 0.5) * 0.16,
                phase: Math.random() * Math.PI * 2,
                driftSpeed: 0.004 + Math.random() * 0.007,
                driftAmp: 0.18 + Math.random() * 0.28,
                opacity: 0.24 + Math.random() * 0.40
            };
        }

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const targetCount = width < 768 ? 34 : 58;
            if (flakes.length < targetCount) {
                while (flakes.length < targetCount) {
                    flakes.push(createFlake(true));
                }
            } else if (flakes.length > targetCount) {
                flakes.length = targetCount;
            }
        }

        function renderFrame() {
            if (!document.hidden) {
                ctx.clearRect(0, 0, width, height);
                for (let i = 0; i < flakes.length; i++) {
                    const f = flakes[i];
                    f.phase += f.driftSpeed;
                    f.y += f.vy;
                    f.x += f.vxBase + Math.sin(f.phase) * f.driftAmp;

                    if (f.y > height + 10) {
                        flakes[i] = createFlake(false);
                        continue;
                    }
                    if (f.x < -10) f.x = width + 10;
                    if (f.x > width + 10) f.x = -10;

                    ctx.beginPath();
                    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 250, 252, ${f.opacity.toFixed(2)})`;
                    ctx.fill();
                }
            }
            animId = window.requestAnimationFrame(renderFrame);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });
        if (animId) window.cancelAnimationFrame(animId);
        renderFrame();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startSnow);
    } else {
        startSnow();
    }
})();
