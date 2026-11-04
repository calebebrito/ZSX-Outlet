window.addEventListener('scroll', () => {
    // Zoom imediato assim que começar a rolar (mais de 5px)
    if (window.scrollY > 5) {
        document.body.classList.add('zooming');
    } else {
        document.body.classList.remove('zooming');
    }

    // Fixar e estilizar cabeçalho (sticky icons com vidro fosco)
    const headEl = document.getElementById('head');
    if (headEl) {
        if (window.scrollY > 30) {
            headEl.classList.add('header-scrolled');
        } else {
            headEl.classList.remove('header-scrolled');
        }
    }

    // Some a primeira imagem e revela o segundo body apenas depois de 450px
    if (window.scrollY > 450) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

// Efeito de subir e aparecer (slide up) quando o elemento entra na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

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

// Pedidos Seed Iniciais (se ainda não existirem no localStorage)
const defaultSeedOrders = [
    {
        id: 'ZSX-84920',
        date: '28/10/2026',
        status: 'pending',
        statusLabel: 'Aguardando Pagamento PIX',
        paymentMethod: 'PIX (5% OFF)',
        total: 208.90,
        items: [
            {
                name: 'Corta-Vento Nike Preto',
                price: 219.90,
                quantity: 1,
                size: 'G',
                color: 'Preto',
                image: '/images/products/corta-vento-nike.jpg'
            }
        ]
    },
    {
        id: 'ZSX-74190',
        date: '27/10/2026',
        status: 'confirmed',
        statusLabel: 'Pagamento Aprovado - Em Separação',
        paymentMethod: 'Cartão de Crédito (3x)',
        total: 259.80,
        items: [
            {
                name: 'Camisa Polo Branca e Verde',
                price: 129.90,
                quantity: 2,
                size: 'M',
                color: 'Verde/Branco',
                image: '/images/products/camisa-polo-branca-e-verde.png'
            }
        ]
    },
    {
        id: 'ZSX-69412',
        date: '25/10/2026',
        status: 'confirmed',
        statusLabel: 'A Caminho da Transportadora',
        paymentMethod: 'Cartão de Débito',
        total: 249.90,
        items: [
            {
                name: 'Blusão Moletom Adidas',
                price: 249.90,
                quantity: 1,
                size: 'GG',
                color: 'Mescla',
                image: '/images/products/blusao-adidas.jpg'
            }
        ]
    },
    {
        id: 'ZSX-51028',
        date: '15/10/2026',
        status: 'finished',
        statusLabel: 'Entregue com Sucesso',
        paymentMethod: 'PIX',
        total: 389.00,
        items: [
            {
                name: 'Casaco Puffer ZSX Winter',
                price: 389.00,
                quantity: 1,
                size: 'G',
                color: 'Preto Fosco',
                image: '/images/products/casaco-puffer.jpg'
            }
        ]
    }
];

let orders = JSON.parse(localStorage.getItem('zsx_orders'));
if (!orders || !Array.isArray(orders)) {
    orders = defaultSeedOrders;
    localStorage.setItem('zsx_orders', JSON.stringify(orders));
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
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
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
                <span class="cart-empty-icon">🛍️</span>
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

    // Cálculos
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discount = 0;

    if (activeCoupon) {
        discount = subtotal * (activeCoupon.percent / 100);
        discountRow.style.display = 'flex';
        discountEl.textContent = `- ${formatBRL(discount)}`;
    } else {
        discountRow.style.display = 'none';
    }

    const total = Math.max(0, subtotal - discount);

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

// Modal de Checkout / Pagamento
function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (!modal) return;

    // Calcular totais
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discount = activeCoupon ? subtotal * (activeCoupon.percent / 100) : 0;
    
    // Desconto extra de 5% no PIX se selecionado
    let finalTotal = Math.max(0, subtotal - discount);
    if (currentPaymentMethod === 'pix') {
        finalTotal *= 0.95;
    }

    const totalEl = document.getElementById('checkoutFinalTotal');
    const addrEl = document.getElementById('checkoutDeliveryAddress');

    if (totalEl) totalEl.textContent = formatBRL(finalTotal);
    if (addrEl && userAddress) {
        addrEl.textContent = `${userAddress.street}, ${userAddress.number} - ${userAddress.city}`;
    }

    // Parcelamento Cartão de Crédito
    const select = document.getElementById('ccInstallments');
    if (select) {
        select.innerHTML = '';
        for (let i = 1; i <= 12; i++) {
            const installmentVal = (finalTotal / i);
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

    // Recalcula total com desconto de PIX
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discount = activeCoupon ? subtotal * (activeCoupon.percent / 100) : 0;
    let finalTotal = Math.max(0, subtotal - discount);
    if (tabName === 'pix') {
        finalTotal *= 0.95;
    }
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
            btn.textContent = 'Copiado! ✓';
            setTimeout(() => { btn.textContent = originalText; }, 2000);
        }
        showToast('Código PIX copiado para a área de transferência!', 'success');
    });
}

// Finalizar Pedido
function handleFinishOrder() {
    closeCheckoutModal();
    closeCartDrawer();

    const successModal = document.getElementById('orderSuccessModal');
    const orderNumEl = document.getElementById('successOrderNum');
    const paymentMethodEl = document.getElementById('successPaymentMethod');
    const totalPaidEl = document.getElementById('successTotalPaid');

    const randomOrder = 'ZSX-' + Math.floor(10000 + Math.random() * 90000);
    if (orderNumEl) orderNumEl.textContent = `#${randomOrder}`;

    let methodLabel = 'Cartão de Crédito';
    if (currentPaymentMethod === 'debit') methodLabel = 'Cartão de Débito';
    if (currentPaymentMethod === 'pix') methodLabel = 'PIX (Aprovação Imediata)';
    if (paymentMethodEl) paymentMethodEl.textContent = methodLabel;

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discount = activeCoupon ? subtotal * (activeCoupon.percent / 100) : 0;
    let finalTotal = Math.max(0, subtotal - discount);
    if (currentPaymentMethod === 'pix') finalTotal *= 0.95;
    if (totalPaidEl) totalPaidEl.textContent = formatBRL(finalTotal);

    // Salvar nas Compras do Usuário
    const orderStatus = (currentPaymentMethod === 'pix') ? 'pending' : 'confirmed';
    const orderStatusText = (currentPaymentMethod === 'pix') 
        ? 'Aguardando Pagamento PIX' 
        : 'Pagamento Confirmado - Em Preparação';

    const newOrder = {
        id: randomOrder,
        date: new Date().toLocaleDateString('pt-BR'),
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
                <span class="orders-empty-icon">📦</span>
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
            showToast('Cupons ativos: ZSX10 (10%), OFF20 (20%) e VIP30 (30%)', 'success');
        });
    }

    const menuSupportBtn = document.getElementById('menuSupportBtn');
    if (menuSupportBtn) {
        menuSupportBtn.addEventListener('click', () => {
            closeProfileModal();
            openSupportModal();
        });
    }

    const menuLogoutBtn = document.getElementById('menuLogoutBtn');
    if (menuLogoutBtn) {
        menuLogoutBtn.addEventListener('click', () => {
            closeProfileModal();
            showToast('Você saiu da sua conta.', 'info');
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
