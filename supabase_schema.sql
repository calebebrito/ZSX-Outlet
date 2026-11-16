-- ==========================================================================
-- SCHEMA DO BANCO DE DADOS (SUPABASE / POSTGRESQL) - ZSX OUTLET
-- Execute este script no SQL Editor do seu painel Supabase.
-- ==========================================================================

-- 1. Tabela de Produtos e Overrides de Catálogo
CREATE TABLE IF NOT EXISTS zsx_products (
    id TEXT PRIMARY KEY,
    category_key TEXT NOT NULL DEFAULT 'camisas',
    category TEXT NOT NULL DEFAULT 'Camisas',
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    original_price NUMERIC(10, 2),
    discount TEXT DEFAULT '',
    installments TEXT DEFAULT '',
    badge TEXT DEFAULT 'NEW DROP',
    sizes JSONB NOT NULL DEFAULT '["P", "M", "G", "GG"]'::jsonb,
    image TEXT DEFAULT '../images/shirts3d.png',
    stock INTEGER NOT NULL DEFAULT 20,
    active BOOLEAN NOT NULL DEFAULT true,
    is_custom BOOLEAN NOT NULL DEFAULT false,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    popularity INTEGER NOT NULL DEFAULT 90,
    description TEXT DEFAULT '',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Tabela de Pedidos dos Clientes
CREATE TABLE IF NOT EXISTS zsx_orders (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    customer_name TEXT,
    customer_email TEXT,
    address TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    status_label TEXT NOT NULL DEFAULT 'Aguardando Pagamento',
    payment_method TEXT NOT NULL,
    total NUMERIC(10, 2) NOT NULL DEFAULT 0,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Tabela de Cupons de Desconto
CREATE TABLE IF NOT EXISTS zsx_coupons (
    code TEXT PRIMARY KEY,
    percent INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    description TEXT DEFAULT ''
);

-- 4. Tabela de Configurações Globais da Loja
CREATE TABLE IF NOT EXISTS zsx_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    store_name TEXT NOT NULL DEFAULT 'ZSX Outlet',
    whatsapp TEXT NOT NULL DEFAULT '(71) 99289-0814',
    support_email TEXT NOT NULL DEFAULT 'suporte@zsxoutlet.com.br',
    pix_discount INTEGER NOT NULL DEFAULT 5,
    free_shipping_min NUMERIC(10, 2) NOT NULL DEFAULT 199.00,
    default_shipping NUMERIC(10, 2) NOT NULL DEFAULT 19.90,
    pix_key TEXT DEFAULT ''
);

-- 5. Tabela de Clientes / Contas dos Usuários
CREATE TABLE IF NOT EXISTS zsx_customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT DEFAULT '',
    password TEXT DEFAULT '',
    address JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Inserir configuração padrão inicial (linha id = 1)
INSERT INTO zsx_settings (id, store_name, whatsapp, support_email, pix_discount, free_shipping_min, default_shipping)
VALUES (1, 'ZSX Outlet', '(71) 99289-0814', 'suporte@zsxoutlet.com.br', 5, 199.00, 19.90)
ON CONFLICT (id) DO NOTHING;

-- Inserir cupons iniciais padrão
INSERT INTO zsx_coupons (code, percent, active, description)
VALUES
    ('ZSX10', 10, true, '10% de desconto na primeira compra'),
    ('BEMVINDO', 15, true, 'Cupom especial de boas-vindas')
ON CONFLICT (code) DO NOTHING;

-- ==========================================================================
-- POLÍTICAS DE SEGURANÇA (RLS - Row Level Security)
-- Permite leitura e escrita pela API pública da loja (anon key)
-- ==========================================================================
ALTER TABLE zsx_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE zsx_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE zsx_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE zsx_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE zsx_customers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Acesso publico zsx_products" ON zsx_products;
CREATE POLICY "Acesso publico zsx_products" ON zsx_products FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso publico zsx_orders" ON zsx_orders;
CREATE POLICY "Acesso publico zsx_orders" ON zsx_orders FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso publico zsx_coupons" ON zsx_coupons;
CREATE POLICY "Acesso publico zsx_coupons" ON zsx_coupons FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso publico zsx_settings" ON zsx_settings;
CREATE POLICY "Acesso publico zsx_settings" ON zsx_settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso publico zsx_customers" ON zsx_customers;
CREATE POLICY "Acesso publico zsx_customers" ON zsx_customers FOR ALL USING (true) WITH CHECK (true);
