-- 1. Criação da Tabela de Alta Densidade
CREATE TABLE IF NOT EXISTS corporate_partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    cnpj TEXT UNIQUE NOT NULL,
    segment TEXT NOT NULL CHECK (segment IN ('Alimentação', 'Moda & Calçados', 'Acessórios', 'Saúde & Beleza', 'Fitness', 'Educação', 'Serviços', 'Automotivo', 'Turismo')),
    status TEXT NOT NULL CHECK (status IN ('lead', 'negociacao', 'ativo', 'inadimplente', 'cancelado')),
    annual_revenue NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    units_count INTEGER NOT NULL DEFAULT 1,
    region TEXT NOT NULL CHECK (region IN ('Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste', 'Norte')),
    account_manager TEXT NOT NULL,
    last_interaction_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Habilitação Obrigatória de Segurança (RLS - Row Level Security)
ALTER TABLE corporate_partners ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Acesso para a PoC (Permitindo leitura e atualização para a demo)
CREATE POLICY "Permitir leitura anonima para PoC" 
ON corporate_partners FOR SELECT USING (true);

CREATE POLICY "Permitir atualizacao para PoC" 
ON corporate_partners FOR UPDATE USING (true);

-- 4. Índices B-Tree para Alta Densidade (Otimização de Busca e Filtros na URL)
CREATE INDEX IF NOT EXISTS idx_partners_status ON corporate_partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_region ON corporate_partners(region);
CREATE INDEX IF NOT EXISTS idx_partners_company_name ON corporate_partners(company_name);

-- 5. Seed Corporativo (15 Franquias com Dados Realistas)
INSERT INTO corporate_partners 
(company_name, cnpj, segment, status, annual_revenue, units_count, region, account_manager, last_interaction_at)
VALUES
('Cacau Show - Polo SP', '04.770.528/0001-30', 'Alimentação', 'ativo', 14500000.00, 28, 'Sudeste', 'Mariana Alencar', now() - interval '2 days'),
('Arezzo & Co Nordeste', '16.590.234/0001-98', 'Moda & Calçados', 'ativo', 22800000.00, 42, 'Nordeste', 'Carlos Eduardo', now() - interval '5 hours'),
('Chilli Beans Sul', '03.234.876/0001-12', 'Acessórios', 'negociacao', 8900000.00, 15, 'Sul', 'Mariana Alencar', now() - interval '1 day'),
('O Boticário Sudeste', '11.122.333/0001-44', 'Saúde & Beleza', 'ativo', 45000000.00, 95, 'Sudeste', 'Rodrigo Bittencourt', now() - interval '3 days'),
('Smart Fit Franquias CO', '28.987.654/0001-55', 'Fitness', 'ativo', 31200000.00, 18, 'Centro-Oeste', 'Carlos Eduardo', now() - interval '6 days'),
('Chiquinho Sorvetes', '09.876.543/0001-21', 'Alimentação', 'inadimplente', 4200000.00, 12, 'Sudeste', 'Mariana Alencar', now() - interval '12 days'),
('Wizard Idiomas Norte', '01.234.567/0001-89', 'Educação', 'negociacao', 3800000.00, 8, 'Norte', 'Rodrigo Bittencourt', now() - interval '4 hours'),
('Burger King Brasil R1', '13.579.246/0001-77', 'Alimentação', 'ativo', 62000000.00, 54, 'Sudeste', 'Rodrigo Bittencourt', now() - interval '1 day'),
('Havaianas Franquias Sul', '22.334.455/0001-66', 'Moda & Calçados', 'ativo', 18400000.00, 31, 'Sul', 'Carlos Eduardo', now() - interval '4 days'),
('Espaçolaser Centro-Norte', '30.405.060/0001-11', 'Saúde & Beleza', 'lead', 1200000.00, 4, 'Centro-Oeste', 'Mariana Alencar', now() - interval '8 days'),
('Localiza Frotas Parceiro', '17.890.123/0001-00', 'Serviços', 'ativo', 51000000.00, 60, 'Sudeste', 'Rodrigo Bittencourt', now() - interval '2 hours'),
('Subway Lojas Nordeste', '05.678.901/0001-22', 'Alimentação', 'cancelado', 2100000.00, 6, 'Nordeste', 'Carlos Eduardo', now() - interval '30 days'),
('DryWash Franquias', '07.891.234/0001-33', 'Automotivo', 'negociacao', 5600000.00, 14, 'Sudeste', 'Mariana Alencar', now() - interval '3 days'),
('CVC Viagens Sul', '10.987.654/0001-45', 'Turismo', 'ativo', 27500000.00, 36, 'Sul', 'Carlos Eduardo', now() - interval '5 days'),
('Kumon América do Sul', '19.876.543/0001-88', 'Educação', 'ativo', 19800000.00, 40, 'Sudeste', 'Rodrigo Bittencourt', now() - interval '7 days')
ON CONFLICT (cnpj) DO NOTHING;

