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
    function sha256Ascii(ascii) {
        function rightRotate(value, amount) { return (value >>> amount) | (value << (32 - amount)); }
        const mathPow = Math.pow, maxWord = mathPow(2, 32), lengthProperty = 'length';
        let i, j, result = '';
        const words = [], asciiBitLength = ascii[lengthProperty] * 8;
        let hash = [], k = [];
        let primeCounter = 0;
        const isComposite = {};
        for (let candidate = 2; primeCounter < 64; candidate++) {
            if (!isComposite[candidate]) {
                for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
                hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
                k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
            }
        }
        ascii += '\x80';
        while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
        for (i = 0; i < ascii[lengthProperty]; i++) {
            j = ascii.charCodeAt(i);
            words[i >> 2] |= j << ((3 - i) % 4) * 8;
        }
        words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
        words[words[lengthProperty]] = (asciiBitLength);
        for (j = 0; j < words[lengthProperty];) {
            const w = words.slice(j, j += 16), oldHash = hash;
            hash = hash.slice(0, 8);
            for (i = 0; i < 64; i++) {
                const w15 = w[i - 15], w2 = w[i - 2];
                const a = hash[0], e = hash[4];
                const temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | 0);
                const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
                hash = [(temp1 + temp2) | 0].concat(hash);
                hash[4] = (hash[4] + temp1) | 0;
            }
            for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
        }
        for (i = 0; i < 8; i++) {
            for (j = 3; j + 1; j--) {
                const b = (hash[i] >> (j * 8)) & 255;
                result += ((b < 16) ? 0 : '') + b.toString(16);
            }
        }
        return result;
    }

    function sha256(str) {
        return sha256Ascii(unescape(encodeURIComponent(String(str || ''))));
    }

    function hashAdminPassword(rawPass) {
        return sha256('zsx-admin-v2-salt:' + String(rawPass || '').trim());
    }

    function hashCustomerPassword(rawPass) {
        const clean = String(rawPass || '').trim();
        if (/^[a-f0-9]{64}$/i.test(clean)) return clean.toLowerCase();
        return sha256('zsx-cust-v1-salt:' + clean);
    }

    function isConfigured() {
        return Boolean(ZSX_SUPABASE_CONFIG.url && ZSX_SUPABASE_CONFIG.anonKey);
    }

    function getHeaders(extra = {}) {
        let authBearer = ZSX_SUPABASE_CONFIG.anonKey;
        let adminHash = '';
        try {
            const adminJwt = sessionStorage.getItem('zsx_admin_jwt');
            if (adminJwt) authBearer = adminJwt;
            const adminSession = JSON.parse(sessionStorage.getItem('zsx_admin_session') || 'null');
            if (adminSession && adminSession.tokenHash) {
                adminHash = adminSession.tokenHash;
            }
        } catch (e) {}

        const headers = {
            'apikey': ZSX_SUPABASE_CONFIG.anonKey,
            'Authorization': `Bearer ${authBearer}`,
            'Content-Type': 'application/json',
            ...extra
        };
        if (adminHash) {
            headers['x-zsx-admin-hash'] = adminHash;
        }
        return headers;
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
        const cleanStock = Math.max(0, Number(newStock) || 0);
        try {
            await request('rpc/sync_product_stock', {
                method: 'POST',
                body: JSON.stringify({ p_id: prodId, p_stock: cleanStock })
            });
        } catch (rpcErr) {
            try {
                await request(`zsx_products?id=eq.${encodeURIComponent(prodId)}`, {
                    method: 'PATCH',
                    headers: { 'Prefer': 'return=minimal' },
                    body: JSON.stringify({
                        stock: cleanStock,
                        updated_at: new Date().toISOString()
                    })
                });
            } catch (err) {
                console.warn('[ZSX_DB] Erro ao atualizar estoque:', err.message);
            }
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
    // AUTENTICAÇÃO ADMINISTRATIVA BLINDADA (SUPABASE AUTH + RPC SHA-256)
    // ==========================================================================

    async function verifyAdminLogin(identifier, rawPassword) {
        const cleanId = String(identifier || '').trim().toLowerCase();
        const passHash = hashAdminPassword(rawPassword);

        if (!isConfigured()) {
            return { ok: false, passHash, reason: 'offline' };
        }

        const baseUrl = ZSX_SUPABASE_CONFIG.url.replace(/\/+$/, '');

        // 1. Tenta autenticar via Supabase Auth oficial (caso o admin esteja registrado em Authentication -> Users)
        if (cleanId.includes('@')) {
            try {
                const authRes = await fetch(`${baseUrl}/auth/v1/token?grant_type=password`, {
                    method: 'POST',
                    headers: {
                        'apikey': ZSX_SUPABASE_CONFIG.anonKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: cleanId, password: String(rawPassword || '').trim() })
                });
                if (authRes.ok) {
                    const authData = await authRes.json();
                    if (authData && authData.access_token) {
                        sessionStorage.setItem('zsx_admin_jwt', authData.access_token);
                        return {
                            ok: true,
                            role: cleanId.startsWith('dono') || cleanId.startsWith('prop') ? 'owner' : 'dev',
                            email: cleanId,
                            passHash,
                            jwt: authData.access_token
                        };
                    }
                }
            } catch (authErr) {
                console.warn('[ZSX_DB] Supabase Auth fallback:', authErr.message);
            }
        }

        // 2. Valida no cofre criptografado zsx_admin_secrets via RPC no servidor
        try {
            const rpcRes = await request('rpc/verify_zsx_admin_login', {
                method: 'POST',
                body: JSON.stringify({
                    p_identifier: cleanId,
                    p_pass_hash: passHash
                })
            });
            if (rpcRes && rpcRes.authenticated) {
                return {
                    ok: true,
                    role: rpcRes.role || 'dev',
                    email: rpcRes.email || cleanId,
                    passHash
                };
            }
            if (rpcRes && rpcRes.authenticated === false) {
                return { ok: false, passHash, reason: 'invalid_credentials' };
            }
        } catch (rpcErr) {
            console.warn('[ZSX_DB] RPC verify_zsx_admin_login indisponível (usando verificação SHA-256 local):', rpcErr.message);
        }

        return { ok: false, passHash, reason: 'rpc_unavailable' };
    }

    async function updateAdminCredentials(callerHash, devEmail, devHash, ownerEmail, ownerHash) {
        if (!isConfigured()) return false;
        try {
            await request('rpc/update_zsx_admin_credentials', {
                method: 'POST',
                body: JSON.stringify({
                    p_caller_hash: callerHash || '',
                    p_dev_email: devEmail || '',
                    p_dev_hash: devHash || '',
                    p_owner_email: ownerEmail || '',
                    p_owner_hash: ownerHash || ''
                })
            });
            return true;
        } catch (err) {
            console.warn('[ZSX_DB] Erro ao atualizar credenciais no cofre Supabase:', err.message);
            return false;
        }
    }

    // ==========================================================================
    // GESTÃO DE CLIENTES / CONTAS DE USUÁRIOS
    // ==========================================================================

    async function saveCustomer(cust) {
        if (!isConfigured() || !cust || !cust.email) return cust;
        const cleanEmail = cust.email.trim().toLowerCase();
        const custId = cust.id || `cust-${Date.now()}`;
        const hashedPass = cust.password ? hashCustomerPassword(cust.password) : '';
        const payload = {
            id: custId,
            name: cust.name || 'Cliente ZSX',
            email: cleanEmail,
            phone: cust.phone || '',
            password: hashedPass,
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
        sha256,
        hashAdminPassword,
        hashCustomerPassword,
        verifyAdminLogin,
        updateAdminCredentials,
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
