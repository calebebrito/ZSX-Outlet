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
-- 6. Cofre de Credenciais Administrativas (Criptografado via SHA-256)
-- RLS ativo sem políticas públicas: impossível ler ou alterar via API anônima
-- ==========================================================================
CREATE TABLE IF NOT EXISTS zsx_admin_secrets (
    role TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    pass_hash TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE zsx_admin_secrets ENABLE ROW LEVEL SECURITY;

-- Hashes SHA-256 iniciais (com salt 'zsx-admin-v2-salt:')
INSERT INTO zsx_admin_secrets (role, email, pass_hash)
VALUES
    ('dev', 'dev@zsxoutlet.com.br', '16e568bbd90d78bee802eccc6e86ef8738c6b9bf83b417bd307faa6d978dd36a'),
    ('owner', 'dono@zsxoutlet.com.br', '30a7fa3c2521dea579db7d341621c8de90bb2307fa29a1d24706c01ca71a8be0')
ON CONFLICT (role) DO NOTHING;

-- Função de verificação interna de privilégio administrativo (Supabase Auth ou Header Hash)
CREATE OR REPLACE FUNCTION public.is_zsx_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    req_hash TEXT;
BEGIN
    IF auth.role() = 'authenticated' THEN
        RETURN TRUE;
    END IF;

    BEGIN
        req_hash := current_setting('request.headers', true)::json->>'x-zsx-admin-hash';
    EXCEPTION WHEN OTHERS THEN
        req_hash := NULL;
    END;

    IF req_hash IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.zsx_admin_secrets WHERE pass_hash = req_hash
    ) THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END;
$$;

-- RPC seguro para validar login administrativo no servidor sem expor a tabela
CREATE OR REPLACE FUNCTION public.verify_zsx_admin_login(p_identifier TEXT, p_pass_hash TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    found_row public.zsx_admin_secrets%ROWTYPE;
    clean_id TEXT := LOWER(TRIM(p_identifier));
BEGIN
    SELECT * INTO found_row
    FROM public.zsx_admin_secrets
    WHERE (
        LOWER(email) = clean_id
        OR role = clean_id
        OR (role = 'dev' AND clean_id = 'admin')
        OR (role = 'owner' AND clean_id IN ('dono', 'proprietario'))
    )
    AND pass_hash = p_pass_hash
    LIMIT 1;

    IF FOUND THEN
        RETURN jsonb_build_object(
            'authenticated', true,
            'role', found_row.role,
            'email', found_row.email
        );
    END IF;

    RETURN jsonb_build_object('authenticated', false);
END;
$$;

-- RPC seguro para atualizar credenciais administrativas mediante comprovação da senha atual
CREATE OR REPLACE FUNCTION public.update_zsx_admin_credentials(
    p_caller_hash TEXT,
    p_dev_email TEXT,
    p_dev_hash TEXT,
    p_owner_email TEXT,
    p_owner_hash TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF auth.role() <> 'authenticated' AND NOT EXISTS (
        SELECT 1 FROM public.zsx_admin_secrets WHERE pass_hash = p_caller_hash
    ) THEN
        RAISE EXCEPTION 'Acesso negado';
    END IF;

    IF p_dev_email IS NOT NULL AND LENGTH(TRIM(p_dev_email)) > 0 THEN
        UPDATE public.zsx_admin_secrets SET email = LOWER(TRIM(p_dev_email)), updated_at = NOW() WHERE role = 'dev';
    END IF;
    IF p_dev_hash IS NOT NULL AND LENGTH(TRIM(p_dev_hash)) = 64 THEN
        UPDATE public.zsx_admin_secrets SET pass_hash = TRIM(p_dev_hash), updated_at = NOW() WHERE role = 'dev';
    END IF;

    IF p_owner_email IS NOT NULL AND LENGTH(TRIM(p_owner_email)) > 0 THEN
        UPDATE public.zsx_admin_secrets SET email = LOWER(TRIM(p_owner_email)), updated_at = NOW() WHERE role = 'owner';
    END IF;
    IF p_owner_hash IS NOT NULL AND LENGTH(TRIM(p_owner_hash)) = 64 THEN
        UPDATE public.zsx_admin_secrets SET pass_hash = TRIM(p_owner_hash), updated_at = NOW() WHERE role = 'owner';
    END IF;

    RETURN TRUE;
END;
$$;

-- RPC seguro para atualizar apenas o estoque quando um pedido é concluído na loja
CREATE OR REPLACE FUNCTION public.sync_product_stock(p_id TEXT, p_stock INTEGER)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.zsx_products
    SET stock = GREATEST(0, p_stock),
        updated_at = NOW()
    WHERE id = p_id;
END;
$$;

-- ==========================================================================
-- POLÍTICAS DE SEGURANÇA (RLS - Row Level Security Blindado)
-- Leitura pública para a vitrine; Escrita restrita ao Administrador nas tabelas críticas
-- ==========================================================================
ALTER TABLE zsx_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE zsx_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE zsx_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE zsx_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE zsx_customers ENABLE ROW LEVEL SECURITY;

-- zsx_products: Clientes apenas visualizam; apenas Admin cria, edita preços ou exclui
DROP POLICY IF EXISTS "Acesso publico zsx_products" ON zsx_products;
DROP POLICY IF EXISTS "Leitura publica zsx_products" ON zsx_products;
DROP POLICY IF EXISTS "Escrita admin zsx_products" ON zsx_products;
CREATE POLICY "Leitura publica zsx_products" ON zsx_products FOR SELECT USING (true);
CREATE POLICY "Escrita admin zsx_products" ON zsx_products FOR ALL USING (public.is_zsx_admin()) WITH CHECK (public.is_zsx_admin());

-- zsx_coupons: Clientes apenas consultam; apenas Admin cria, ativa/pausa ou exclui
DROP POLICY IF EXISTS "Acesso publico zsx_coupons" ON zsx_coupons;
DROP POLICY IF EXISTS "Leitura publica zsx_coupons" ON zsx_coupons;
DROP POLICY IF EXISTS "Escrita admin zsx_coupons" ON zsx_coupons;
CREATE POLICY "Leitura publica zsx_coupons" ON zsx_coupons FOR SELECT USING (true);
CREATE POLICY "Escrita admin zsx_coupons" ON zsx_coupons FOR ALL USING (public.is_zsx_admin()) WITH CHECK (public.is_zsx_admin());

-- zsx_settings: Clientes apenas consultam; apenas Admin altera frete, PIX e configurações
DROP POLICY IF EXISTS "Acesso publico zsx_settings" ON zsx_settings;
DROP POLICY IF EXISTS "Leitura publica zsx_settings" ON zsx_settings;
DROP POLICY IF EXISTS "Escrita admin zsx_settings" ON zsx_settings;
CREATE POLICY "Leitura publica zsx_settings" ON zsx_settings FOR SELECT USING (true);
CREATE POLICY "Escrita admin zsx_settings" ON zsx_settings FOR ALL USING (public.is_zsx_admin()) WITH CHECK (public.is_zsx_admin());

-- zsx_orders: Clientes podem criar e consultar pedidos; apenas Admin pode excluir pedidos
DROP POLICY IF EXISTS "Acesso publico zsx_orders" ON zsx_orders;
DROP POLICY IF EXISTS "Leitura e criacao zsx_orders" ON zsx_orders;
DROP POLICY IF EXISTS "Atualizacao zsx_orders" ON zsx_orders;
DROP POLICY IF EXISTS "Exclusao admin zsx_orders" ON zsx_orders;
CREATE POLICY "Leitura e criacao zsx_orders" ON zsx_orders FOR SELECT USING (true);
CREATE POLICY "Insercao publica zsx_orders" ON zsx_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Atualizacao zsx_orders" ON zsx_orders FOR UPDATE USING (public.is_zsx_admin() OR status = 'pending') WITH CHECK (true);
CREATE POLICY "Exclusao admin zsx_orders" ON zsx_orders FOR DELETE USING (public.is_zsx_admin());

-- zsx_customers: Clientes podem criar e atualizar sua conta; apenas Admin pode excluir registros
DROP POLICY IF EXISTS "Acesso publico zsx_customers" ON zsx_customers;
DROP POLICY IF EXISTS "Leitura clientes zsx_customers" ON zsx_customers;
DROP POLICY IF EXISTS "Cadastro clientes zsx_customers" ON zsx_customers;
DROP POLICY IF EXISTS "Atualizacao clientes zsx_customers" ON zsx_customers;
DROP POLICY IF EXISTS "Exclusao admin zsx_customers" ON zsx_customers;
CREATE POLICY "Leitura clientes zsx_customers" ON zsx_customers FOR SELECT USING (true);
CREATE POLICY "Cadastro clientes zsx_customers" ON zsx_customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Atualizacao clientes zsx_customers" ON zsx_customers FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Exclusao admin zsx_customers" ON zsx_customers FOR DELETE USING (public.is_zsx_admin());
