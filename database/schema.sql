-- Tabela de Usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Itens de Estoque
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  cost_per_unit DECIMAL(10, 2) NOT NULL,
  current_quantity DECIMAL(10, 2) DEFAULT 0,
  min_quantity DECIMAL(10, 2) NOT NULL,
  max_quantity DECIMAL(10, 2) NOT NULL,
  expiration_date DATE,
  supplier VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Estoque (Entrada/Saída)
CREATE TABLE stock_movements (
  id SERIAL PRIMARY KEY,
  item_id INTEGER NOT NULL REFERENCES items(id),
  movement_type VARCHAR(50) NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit_cost DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by INTEGER REFERENCES users(id)
);

-- Tabela de Ocupação Diária
CREATE TABLE occupancy (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  guest_count INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Previsões
CREATE TABLE forecasts (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  item_id INTEGER NOT NULL REFERENCES items(id),
  occupancy INTEGER NOT NULL,
  predicted_quantity DECIMAL(10, 2) NOT NULL,
  confidence DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Consumo Real
CREATE TABLE consumption (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  item_id INTEGER NOT NULL REFERENCES items(id),
  actual_quantity DECIMAL(10, 2) NOT NULL,
  forecast_quantity DECIMAL(10, 2),
  waste_quantity DECIMAL(10, 2) DEFAULT 0,
  waste_reason VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by INTEGER REFERENCES users(id)
);

-- Tabela de Histórico de Consumo (para análise)
CREATE TABLE consumption_history (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  item_id INTEGER NOT NULL REFERENCES items(id),
  quantity DECIMAL(10, 2) NOT NULL,
  occupancy INTEGER,
  day_of_week VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Análise de Custos
CREATE TABLE cost_analysis (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  item_id INTEGER NOT NULL REFERENCES items(id),
  total_cost DECIMAL(10, 2),
  waste_cost DECIMAL(10, 2),
  cost_per_guest DECIMAL(10, 2),
  occupancy INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_items_category ON items(category);
CREATE INDEX idx_stock_movements_item_date ON stock_movements(item_id, created_at);
CREATE INDEX idx_consumption_date_item ON consumption(date, item_id);
CREATE INDEX idx_consumption_history_date ON consumption_history(date);
CREATE INDEX idx_forecasts_date_item ON forecasts(date, item_id);
CREATE INDEX idx_occupancy_date ON occupancy(date);