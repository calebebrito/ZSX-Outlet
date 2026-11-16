// ==========================================================================
// CAMADA DE BANCO DE DADOS EM NUVEM (SUPABASE REST API) - ZSX OUTLET
// Preencha SUPABASE_URL e SUPABASE_ANON_KEY após criar o projeto no Supabase.
// Enquanto estiverem vazios, a loja opera em modo local (localStorage).
// ==========================================================================

const ZSX_SUPABASE_CONFIG = {
    url: 'https://lxcptcbsaxrfxybcgaaw.supabase.co',
    anonKey: 'sb_publishable_AKpVs3GKy4b-djXSHlb2Yg_iBLznvW1'
};

const ZSX_DB = (function() {
    function isConfigured() {
        return Boolean(ZSX_SUPABASE_CONFIG.url && ZSX_SUPABASE_CONFIG.anonKey);
    }

    function getHeaders(extra = {}) {
        return {
            'apikey': ZSX_SUPABASE_CONFIG.anonKey,
            'Authorization': `Bearer ${ZSX_SUPABASE_CONFIG.anonKey}`,
            'Content-Type': 'application/json',
            ...extra
        };
    }

    async function request(path, options = {}) {
        if (!isConfigured()) return null;
        const baseUrl = ZSX_SUPABASE_CONFIG.url.replace(/\/+$/, '');
        const res = await fetch(`${baseUrl}/rest/v1/${path}`, {
            ...options,
            headers: getHeaders(options.headers || {})
        });
        if (!res.ok) {
            const errText = await res.text().catch(() => '');
            throw new Error(`Supabase HTTP ${res.status}: ${errText}`);
        }
        if (res.status === 204) return null;
        const text = await res.text();
        return text ? JSON.parse(text) : null;
    }

    function mapDbProductToLocal(row) {
        return {
            id: row.id,
            categoryKey: row.category_key,
            category: row.category,
            name: row.name,
            price: Number(row.price),
            originalPrice: row.original_price !== null ? Number(row.original_price) : Number(row.price),
            discount: row.discount || '',
            installments: row.installments || '',
            badge: row.badge || 'NEW DROP',
            sizes: Array.isArray(row.sizes) ? row.sizes : ['P', 'M', 'G', 'GG'],
            image: row.image || '../images/shirts3d.png',
            stock: Number(row.stock ?? 20),
            active: row.active !== false,
            popularity: Number(row.popularity ?? 90),
            description: row.description || ''
        };
    }

    function mapLocalProductToDb(prod, isCustom = false, isDeleted = false) {
        return {
            id: prod.id,
            category_key: prod.categoryKey || 'camisas',
            category: prod.category || 'Camisas',
            name: prod.name || 'Produto ZSX',
            price: Number(prod.price) || 0,
            original_price: prod.originalPrice !== undefined ? Number(prod.originalPrice) : Number(prod.price) || 0,
            discount: prod.discount || '',
            installments: prod.installments || '',
            badge: prod.badge || 'NEW DROP',
            sizes: Array.isArray(prod.sizes) ? prod.sizes : ['P', 'M', 'G', 'GG'],
            image: prod.image || '../images/shirts3d.png',
            stock: prod.stock !== undefined ? Number(prod.stock) : 20,
            active: prod.active !== false,
            is_custom: Boolean(isCustom),
            is_deleted: Boolean(isDeleted),
            popularity: Number(prod.popularity ?? 90),
            description: prod.description || '',
            updated_at: new Date().toISOString()
        };
    }

    async function syncFromCloud() {
        if (!isConfigured()) return false;
        try {
            const [products, orders, coupons, settingsRows] = await Promise.all([
                request('zsx_products?select=*'),
                request('zsx_orders?select=*&order=created_at.desc'),
                request('zsx_coupons?select=*'),
                request('zsx_settings?id=eq.1&select=*')
            ]);

            if (Array.isArray(products)) {
                const customList = [];
                const overrides = {};
                const deletedIds = [];

                products.forEach(row => {
                    if (row.is_deleted) {
                        deletedIds.push(row.id);
                        return;
                    }
                    const mapped = mapDbProductToLocal(row);
                    if (row.is_custom) {
                        customList.push(mapped);
                    }
                    overrides[row.id] = {
                        name: mapped.name,
                        categoryKey: mapped.categoryKey,
                        category: mapped.category,
                        badge: mapped.badge,
                        originalPrice: mapped.originalPrice,
                        price: mapped.price,
                        discount: mapped.discount,
                        installments: mapped.installments,
                        stock: mapped.stock,
                        active: mapped.active,
                        image: mapped.image,
                        sizes: mapped.sizes,
                        description: mapped.description
                    };
                });

                localStorage.setItem('zsx_custom_products', JSON.stringify(customList));
                localStorage.setItem('zsx_catalog_overrides', JSON.stringify(overrides));
                localStorage.setItem('zsx_deleted_products', JSON.stringify(deletedIds));
            }

            if (Array.isArray(orders)) {
                const mappedOrders = orders.map(o => ({
                    id: o.id,
                    date: o.date,
                    customerName: o.customer_name || 'Cliente',
                    customerEmail: o.customer_email || '',
                    address: o.address || '',
                    status: o.status || 'pending',
                    statusLabel: o.status_label || 'Aguardando Pagamento',
                    paymentMethod: o.payment_method || 'PIX',
                    total: Number(o.total) || 0,
                    items: Array.isArray(o.items) ? o.items : []
                }));
                localStorage.setItem('zsx_orders', JSON.stringify(mappedOrders));
            }

            if (Array.isArray(coupons) && coupons.length > 0) {
                const mappedCoupons = coupons.map(c => ({
                    code: c.code,
                    percent: Number(c.percent),
                    active: c.active !== false,
                    desc: c.description || ''
                }));
                localStorage.setItem('zsx_coupons', JSON.stringify(mappedCoupons));
            }

            if (Array.isArray(settingsRows) && settingsRows[0]) {
                const s = settingsRows[0];
                localStorage.setItem('zsx_store_settings', JSON.stringify({
                    storeName: s.store_name || 'ZSX Outlet',
                    whatsapp: s.whatsapp || '(71) 99289-0814',
                    supportEmail: s.support_email || 'suporte@zsxoutlet.com.br',
                    pixDiscount: Number(s.pix_discount ?? 5),
                    freeShippingMin: Number(s.free_shipping_min ?? 199),
                    defaultShipping: Number(s.default_shipping ?? 19.90),
                    pixKey: s.pix_key || ''
                }));
            }

            window.dispatchEvent(new CustomEvent('zsx:cloud-synced'));
            return true;
        } catch (err) {
            console.warn('[ZSX_DB] Falha na sincronização com Supabase:', err.message);
            return false;
        }
    }

    async function upsertProduct(prod, isCustom = false) {
        if (!isConfigured() || !prod || !prod.id) return;
        try {
            await request('zsx_products?on_conflict=id', {
                method: 'POST',
                headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
                body: JSON.stringify(mapLocalProductToDb(prod, isCustom, false))
            });
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao salvar produto:', err.message);
        }
    }

    async function upsertProductsBulk(productsList, customIdsSet = new Set()) {
        if (!isConfigured() || !Array.isArray(productsList) || productsList.length === 0) return;
        try {
            const payload = productsList.map(p => mapLocalProductToDb(p, customIdsSet.has(p.id), false));
            await request('zsx_products?on_conflict=id', {
                method: 'POST',
                headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao salvar produtos em lote:', err.message);
        }
    }

    async function markProductDeleted(prod) {
        if (!isConfigured() || !prod || !prod.id) return;
        try {
            await request('zsx_products?on_conflict=id', {
                method: 'POST',
                headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
                body: JSON.stringify(mapLocalProductToDb(prod, false, true))
            });
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao marcar produto como excluído:', err.message);
        }
    }

    async function updateProductStock(prodId, newStock) {
        if (!isConfigured() || !prodId) return;
        try {
            await request(`zsx_products?id=eq.${encodeURIComponent(prodId)}`, {
                method: 'PATCH',
                headers: { 'Prefer': 'return=minimal' },
                body: JSON.stringify({
                    stock: Math.max(0, Number(newStock) || 0),
                    updated_at: new Date().toISOString()
                })
            });
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao atualizar estoque:', err.message);
        }
    }

    async function insertOrder(order) {
        if (!isConfigured() || !order || !order.id) return;
        try {
            await request('zsx_orders', {
                method: 'POST',
                headers: { 'Prefer': 'return=minimal' },
                body: JSON.stringify({
                    id: order.id,
                    date: order.date,
                    customer_name: order.customerName || 'Cliente',
                    customer_email: order.customerEmail || '',
                    address: order.address || '',
                    status: order.status || 'pending',
                    status_label: order.statusLabel || 'Aguardando Pagamento',
                    payment_method: order.paymentMethod || 'PIX',
                    total: Number(order.total) || 0,
                    items: Array.isArray(order.items) ? order.items : []
                })
            });
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao gravar pedido:', err.message);
        }
    }

    async function updateOrderStatus(orderId, status, statusLabel) {
        if (!isConfigured() || !orderId) return;
        try {
            await request(`zsx_orders?id=eq.${encodeURIComponent(orderId)}`, {
                method: 'PATCH',
                headers: { 'Prefer': 'return=minimal' },
                body: JSON.stringify({ status, status_label: statusLabel })
            });
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao atualizar status do pedido:', err.message);
        }
    }

    async function deleteOrder(orderId) {
        if (!isConfigured() || !orderId) return;
        try {
            await request(`zsx_orders?id=eq.${encodeURIComponent(orderId)}`, {
                method: 'DELETE'
            });
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao excluir pedido:', err.message);
        }
    }

    async function saveCoupon(coupon) {
        if (!isConfigured() || !coupon || !coupon.code) return;
        try {
            await request('zsx_coupons?on_conflict=code', {
                method: 'POST',
                headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
                body: JSON.stringify({
                    code: coupon.code,
                    percent: Number(coupon.percent),
                    active: coupon.active !== false,
                    description: coupon.desc || ''
                })
            });
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao salvar cupom:', err.message);
        }
    }

    async function deleteCoupon(code) {
        if (!isConfigured() || !code) return;
        try {
            await request(`zsx_coupons?code=eq.${encodeURIComponent(code)}`, {
                method: 'DELETE'
            });
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao excluir cupom:', err.message);
        }
    }

    async function saveSettings(settings) {
        if (!isConfigured() || !settings) return;
        try {
            await request('zsx_settings?on_conflict=id', {
                method: 'POST',
                headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
                body: JSON.stringify({
                    id: 1,
                    store_name: settings.storeName || 'ZSX Outlet',
                    whatsapp: settings.whatsapp || '(71) 99289-0814',
                    support_email: settings.supportEmail || 'suporte@zsxoutlet.com.br',
                    pix_discount: Number(settings.pixDiscount ?? 5),
                    free_shipping_min: Number(settings.freeShippingMin ?? 199),
                    default_shipping: Number(settings.defaultShipping ?? 19.90),
                    pix_key: settings.pixKey || ''
                })
            });
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao salvar configurações:', err.message);
        }
    }

    // ==========================================================================
    // GESTÃO DE CLIENTES / CONTAS DE USUÁRIOS
    // ==========================================================================

    async function saveCustomer(cust) {
        if (!isConfigured() || !cust || !cust.email) return cust;
        const cleanEmail = cust.email.trim().toLowerCase();
        const custId = cust.id || `cust-${Date.now()}`;
        const payload = {
            id: custId,
            name: cust.name || 'Cliente ZSX',
            email: cleanEmail,
            phone: cust.phone || '',
            password: cust.password || '',
            address: cust.address || (JSON.parse(localStorage.getItem('zsx_address')) || {}),
            updated_at: new Date().toISOString()
        };

        try {
            await request('zsx_customers?on_conflict=email', {
                method: 'POST',
                headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
                body: JSON.stringify(payload)
            });
            return payload;
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao salvar cliente na nuvem:', err.message);
            return payload;
        }
    }

    async function getCustomerByEmail(email) {
        if (!isConfigured() || !email) return null;
        try {
            const clean = email.trim().toLowerCase();
            const rows = await request(`zsx_customers?email=eq.${encodeURIComponent(clean)}&select=*`);
            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0];
            }
            return null;
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao buscar cliente:', err.message);
            return null;
        }
    }

    async function fetchCustomerOrders(email) {
        if (!isConfigured() || !email) return [];
        try {
            const clean = email.trim().toLowerCase();
            const rows = await request(`zsx_orders?customer_email=eq.${encodeURIComponent(clean)}&order=created_at.desc&select=*`);
            if (Array.isArray(rows)) {
                return rows.map(o => ({
                    id: o.id,
                    date: o.date,
                    customerName: o.customer_name || 'Cliente',
                    customerEmail: o.customer_email || '',
                    address: o.address || '',
                    status: o.status || 'pending',
                    statusLabel: o.status_label || 'Aguardando Pagamento',
                    paymentMethod: o.payment_method || 'PIX',
                    total: Number(o.total) || 0,
                    items: Array.isArray(o.items) ? o.items : []
                }));
            }
            return [];
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao buscar pedidos do cliente:', err.message);
            return [];
        }
    }

    return {
        isConfigured,
        syncFromCloud,
        upsertProduct,
        upsertProductsBulk,
        markProductDeleted,
        updateProductStock,
        insertOrder,
        updateOrderStatus,
        deleteOrder,
        saveCoupon,
        deleteCoupon,
        saveSettings,
        saveCustomer,
        getCustomerByEmail,
        fetchCustomerOrders
    };
})();

window.ZSX_DB = ZSX_DB;
