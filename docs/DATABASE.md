# 🗄️ Documentação do Banco de Dados

## Visão Geral
PostgreSQL com 8 tabelas principais para gerenciar estoque, consumo, previsões e custos.

## Tabelas

### 1. **users**
Usuários do sistema
```sql
id          | SERIAL PRIMARY KEY
name        | VARCHAR(255) - Nome do usuário
email       | VARCHAR(255) UNIQUE - Email único
password    | VARCHAR(255) - Senha com hash
role        | VARCHAR(50) - 'admin' ou 'user'
created_at  | TIMESTAMP - Data de criação
updated_at  | TIMESTAMP - Última atualização
```

### 2. **items**
Itens de estoque (alimentos e bebidas)
```sql
id              | SERIAL PRIMARY KEY
name            | VARCHAR(255) - Nome do item
category        | VARCHAR(100) - 'Café', 'Pão', 'Bebidas', etc
unit            | VARCHAR(50) - 'unidade', 'litro', 'kg'
cost_per_unit   | DECIMAL(10,2) - Custo unitário
current_quantity| DECIMAL(10,2) - Quantidade em estoque
min_quantity    | DECIMAL(10,2) - Estoque mínimo (alerta)
max_quantity    | DECIMAL(10,2) - Estoque máximo
expiration_date | DATE - Data de vencimento (opcional)
supplier        | VARCHAR(255) - Fornecedor
created_at      | TIMESTAMP
updated_at      | TIMESTAMP
```

### 3. **stock_movements**
Histórico de entrada e saída de estoque
```sql
id              | SERIAL PRIMARY KEY
item_id         | INTEGER FK → items
movement_type   | VARCHAR(50) - 'entrada' ou 'saída'
quantity        | DECIMAL(10,2) - Quantidade movimentada
unit_cost       | DECIMAL(10,2) - Custo na data do movimento
notes           | TEXT - Observações
created_at      | TIMESTAMP
created_by      | INTEGER FK → users
```

### 4. **occupancy**
Taxa de ocupação diária
```sql
id          | SERIAL PRIMARY KEY
date        | DATE UNIQUE - Data (sem hora)
guest_count | INTEGER - Número de hóspedes
created_at  | TIMESTAMP
updated_at  | TIMESTAMP
```

### 5. **forecasts**
Previsões de consumo
```sql
id                  | SERIAL PRIMARY KEY
date                | DATE - Data prevista
item_id             | INTEGER FK → items
occupancy           | INTEGER - Ocupação prevista
predicted_quantity  | DECIMAL(10,2) - Quantidade prevista
confidence          | DECIMAL(5,2) - Confiança da previsão (%)
created_at          | TIMESTAMP - Quando foi gerada
```

### 6. **consumption**
Registro de consumo real e desperdício
```sql
id                  | SERIAL PRIMARY KEY
date                | DATE - Data do consumo
item_id             | INTEGER FK → items
actual_quantity     | DECIMAL(10,2) - Quantidade consumida
forecast_quantity   | DECIMAL(10,2) - Quantidade prevista
waste_quantity      | DECIMAL(10,2) - Quantidade desperdiçada
waste_reason        | VARCHAR(100) - 'vencido', 'danificado', 'não utilizado'
notes               | TEXT - Observações
created_at          | TIMESTAMP
created_by          | INTEGER FK → users
```

### 7. **consumption_history**
Histórico agregado para análise e treino do algoritmo
```sql
id          | SERIAL PRIMARY KEY
date        | DATE - Data do consumo
item_id     | INTEGER FK → items
quantity    | DECIMAL(10,2) - Quantidade consumida
occupancy   | INTEGER - Ocupação no dia
day_of_week | VARCHAR(20) - 'Monday', 'Tuesday', etc
created_at  | TIMESTAMP
```

### 8. **cost_analysis**
Análise de custos por dia e item
```sql
id              | SERIAL PRIMARY KEY
date            | DATE
item_id         | INTEGER FK → items
total_cost      | DECIMAL(10,2) - Custo total consumido
waste_cost      | DECIMAL(10,2) - Custo desperdiçado
cost_per_guest  | DECIMAL(10,2) - Custo por hóspede
occupancy       | INTEGER
created_at      | TIMESTAMP
```

## Índices

| Índice | Tabela | Coluna | Benefício |
|--------|--------|--------|-----------|
| idx_items_category | items | category | Filtragem rápida por categoria |
| idx_stock_movements_item_date | stock_movements | item_id, created_at | Histórico de movimento |
| idx_consumption_date_item | consumption | date, item_id | Consultas de consumo |
| idx_consumption_history_date | consumption_history | date | Análise histórica |
| idx_forecasts_date_item | forecasts | date, item_id | Previsões por data |
| idx_occupancy_date | occupancy | date | Consultas de ocupação |

## Relacionamentos

```
users (1) ──────── (N) stock_movements
users (1) ──────── (N) consumption

items (1) ──────── (N) stock_movements
items (1) ──────── (N) forecasts
items (1) ──────── (N) consumption
items (1) ──────── (N) consumption_history
items (1) ──────── (N) cost_analysis

occupancy (1) ──────── (N) forecasts
```

## Exemplo de Dados

### Inserir item
```sql
INSERT INTO items (name, category, unit, cost_per_unit, min_quantity, max_quantity)
VALUES ('Café Coado', 'Bebidas', 'litro', 15.50, 10, 50);
```

### Registrar ocupação
```sql
INSERT INTO occupancy (date, guest_count)
VALUES ('2026-06-02', 300);
```

### Registrar consumo real
```sql
INSERT INTO consumption (date, item_id, actual_quantity, forecast_quantity, waste_quantity, waste_reason)
VALUES ('2026-06-02', 1, 245, 250, 5, 'não utilizado');
```

### Consultar desperdício do mês
```sql
SELECT 
  i.name,
  SUM(c.waste_quantity) as total_waste,
  SUM(c.waste_quantity * i.cost_per_unit) as waste_cost
FROM consumption c
JOIN items i ON c.item_id = i.id
WHERE DATE_TRUNC('month', c.date) = DATE_TRUNC('month', NOW())
GROUP BY i.name
ORDER BY waste_cost DESC;
```

### Analisar acurácia de previsões
```sql
SELECT 
  f.date,
  i.name,
  f.predicted_quantity,
  c.actual_quantity,
  ABS(f.predicted_quantity - c.actual_quantity) / c.actual_quantity * 100 as error_percent
FROM forecasts f
JOIN consumption c ON f.date = c.date AND f.item_id = c.item_id
JOIN items i ON f.item_id = i.id
WHERE f.date >= NOW() - INTERVAL '30 days'
ORDER BY f.date DESC;
```

## Performance

### Tamanho Estimado (1 ano de operação)
- 365 registros de occupancy
- ~10.000+ registros de forecasts (365 × 30 itens médio)
- ~10.000+ registros de consumption
- ~1.000+ registros de cost_analysis

**Tamanho estimado**: ~2-5 MB

### Backup Recomendado
```bash
# Backup completo
pg_dump estoque_db > backup_$(date +%Y%m%d).sql

# Restore
psql estoque_db < backup_20260602.sql
```

## Manutenção

### Limpeza de dados antigos (opcional)
```sql
-- Manter apenas 1 ano de histórico
DELETE FROM consumption_history 
WHERE date < NOW() - INTERVAL '1 year';

DELETE FROM forecasts 
WHERE created_at < NOW() - INTERVAL '1 year';
```

---

**Última atualização**: 2 de junho de 2026
