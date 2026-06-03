# 📊 Sistema de Controle de Estoques - Alimentos e Bebidas

## 🎯 Objetivo
Diminuir desperdício e falta de estoque em alimentos e bebidas através de previsão inteligente de consumo baseada em taxa de ocupação e perfil de hóspedes.

## 📈 Contexto
- **Ocupação Média**: 300 hóspedes
- **Foco Principal**: Café da manhã
- **Desafio**: Prever consumo exato e identificar desperdício
- **Impacto Esperado**: Redução de custos com alimentos perecíveis e eliminação de rupturas

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** com Express.js
- **PostgreSQL** para persistência de dados
- **Algoritmo de previsão** baseado em ocupação + histórico

### Frontend
- **React** com Vite
- **Tailwind CSS** para estilo
- **Recharts** para gráficos interativos
- **Dashboard** em tempo real

### DevOps
- **Docker** & **Docker Compose** para containerização
- **PostgreSQL 15** em container

## 📁 Estrutura do Projeto

```
Estoque/
├── backend/
│   ├── src/
│   │   ├── config/           # Configurações (DB, env)
│   │   ├── controllers/      # Lógica de negócio
│   │   ├── models/          # Modelos de dados
│   │   ├── routes/          # Rotas da API
│   │   ├── middleware/      # Autenticação, validação
│   │   ├── services/        # Serviços (previsão, etc)
│   │   ├── utils/           # Funções auxiliares
│   │   └── server.js        # Entrada da aplicação
│   ├── .env.example         # Variáveis de ambiente
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/          # Páginas principais
│   │   ├── services/       # Chamadas à API
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Funções auxiliares
│   │   ├── styles/         # Tailwind CSS
│   │   └── App.jsx
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── database/
│   ├── schema.sql          # Estrutura completa das tabelas
│   └── seeds.sql           # Dados iniciais (opcional)
│
├── docs/
│   ├── API.md              # 📚 Documentação da API completa
│   ├── DATABASE.md         # 🗄️ Estrutura do banco (8 tabelas)
│   └── ALGORITHM.md        # 🧠 Algoritmo de previsão detalhado
│
├── docker-compose.yml      # Orquestração de containers
├── .gitignore
├── CONTRIBUTING.md         # Guia de contribuição
└── README.md              # Este arquivo
```

## 🚀 Quick Start

### Com Docker (Recomendado)
```bash
# Clonar repositório
git clone https://github.com/katiromero2107-svg/Estoque.git
cd Estoque

# Iniciar todos os serviços
docker-compose up

# Acessar
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database: localhost:5432
```

### Instalação Local

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (em outro terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 📊 Funcionalidades Principais

### 1. **Dashboard de Monitoramento** 📈
- Visão geral do estoque atual
- Nível de alerta para itens críticos
- Custo total em tempo real
- Taxa de desperdício do período
- Gráficos de tendência

### 2. **Previsão de Consumo** 🔮
Algoritmo inteligente que considera:
- Taxa de ocupação (base: 300 hóspedes)
- Dia da semana (sexta/sábado +20%)
- Sazonalidade (junho +10%, dezembro +30%)
- Histórico de consumo (14-30 dias)
- Tendência recente
- Intervalo de confiança (±15%)

**Meta**: Acurácia > 85%

### 3. **Gestão de Estoque** 📦
- Cadastro de itens (alimentos e bebidas)
- Controle de validade
- Entrada e saída de estoque com histórico
- Alertas de estoque mínimo/máximo
- Categorização de itens

### 4. **Registro de Consumo & Desperdício** 📝
- Consumo real vs previsão
- Identificação de desperdício
- Categorização (Vencido, Danificado, Não utilizado)
- Histórico completo com rastreabilidade
- Análise de anomalias

### 5. **Análise de Custos** 💰
- Custo por hóspede/dia
- Análise Pareto (itens A, B, C)
- Identificação de desperdício por item
- Comparativo período vs período
- ROI de ações de melhoria

### 6. **Relatórios Gerenciais** 📄
- Acurácia de previsões
- Padrões de consumo
- Identificação de anomalias
- Recomendações de ação
- Export em CSV/PDF

## 🧠 Algoritmo de Previsão

```
Consumo Previsto = (Ocupação × % Histórico × Fator_Dia × Fator_Sazonal) + Ajuste

Exemplo (Sexta-feira, Junho, 300 hóspedes, Café 85%):
300 × 0.85 × 1.15 × 1.10 × 1.05 ≈ 343 unidades ±26
```

**Componentes**:
- Ocupação base com coeficiente de escala
- Fatores por dia da semana (1.0 a 1.2)
- Fatores sazonais por mês (0.95 a 1.3)
- Ajuste fino por tendência recente (±5%)

Ver [docs/ALGORITHM.md](docs/ALGORITHM.md) para detalhes matemáticos.

## 📱 Páginas Principais do Frontend

1. **Login** → Autenticação com JWT
2. **Dashboard** → KPIs e alertas
3. **Inventory** → CRUD de itens
4. **Occupancy** → Registro de hóspedes
5. **Forecasting** → Previsões do dia
6. **Consumption** → Registrar consumo/desperdício
7. **Analytics** → Gráficos e análise
8. **Reports** → Relatórios gerenciais

## 🗄️ Banco de Dados

8 tabelas PostgreSQL:
- **users**: Autenticação e permissões
- **items**: Catálogo de alimentos/bebidas
- **stock_movements**: Histórico de entrada/saída
- **occupancy**: Taxa de ocupação diária
- **forecasts**: Previsões geradas
- **consumption**: Consumo real e desperdício
- **consumption_history**: Histórico agregado (ML)
- **cost_analysis**: Análise de custos

Ver [docs/DATABASE.md](docs/DATABASE.md) para estrutura completa.

## 📡 API REST

**Base URL**: `http://localhost:5000/api`

Endpoints principais:
- `POST /auth/login` - Autenticação
- `POST /occupancy` - Registrar ocupação
- `POST /forecast/predict` - Gerar previsão
- `POST /consumption` - Registrar consumo
- `GET /analytics/waste` - Análise de desperdício
- `GET /analytics/costs/daily` - Custos diários

Ver [docs/API.md](docs/API.md) para documentação completa.

## 🔐 Segurança

- ✅ Autenticação JWT com expiração (7 dias)
- ✅ Hash de senhas com bcryptjs
- ✅ Validação de entrada (express-validator)
- ✅ Proteção CORS configurável
- ✅ Helmet.js para headers HTTP
- ✅ Rate limiting por IP
- ✅ Proteção contra SQL Injection

## 🧪 Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📊 KPIs de Monitoramento

| KPI | Meta | Frequência |
|-----|------|-----------|
| Acurácia de Previsão | > 85% | Diária |
| Taxa de Desperdício | < 8% | Semanal |
| Ruptura de Itens | 0 | Diária |
| Custo por Hóspede | Reduzir 5% | Mensal |

## 📈 Roadmap

### Phase 1 (MVP) ✅
- [x] Estrutura do banco de dados
- [x] Setup com Docker
- [x] Documentação completa
- [ ] API básica (CRUD)
- [ ] Algoritmo de previsão
- [ ] Dashboard frontend

### Phase 2
- [ ] Testes automatizados
- [ ] Autenticação e permissões
- [ ] Relatórios em PDF
- [ ] Integração com PMS

### Phase 3
- [ ] Machine Learning (Previsão avançada)
- [ ] Integração com fornecedores
- [ ] App mobile
- [ ] Análise preditiva

## 🤝 Como Contribuir

1. Fork do repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit (`git commit -m 'Add nova-funcionalidade'`)
4. Push (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes.

## 📞 Suporte

- 📧 Email: katiromero2107@gmail.com
- 🐛 Issues: https://github.com/katiromero2107-svg/Estoque/issues

## 📝 Licença

MIT License - veja LICENSE.md

---

## 📚 Documentação

| Documento | Conteúdo |
|-----------|----------|
| [README.md](README.md) | Visão geral do projeto |
| [docs/API.md](docs/API.md) | Endpoints e exemplos da API |
| [docs/DATABASE.md](docs/DATABASE.md) | Estrutura e queries do banco |
| [docs/ALGORITHM.md](docs/ALGORITHM.md) | Matemática do algoritmo de previsão |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Guia para contribuidores |
| [backend/README.md](backend/README.md) | Setup do backend |
| [frontend/README.md](frontend/README.md) | Setup do frontend |

---

**Status**: 🚀 Pronto para desenvolvimento  
**Última atualização**: 3 de junho de 2026  
**Versão**: 1.0.0 (MVP)
