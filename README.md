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
- **React** com TypeScript
- **Dashboard interativo** para monitoramento
- **Gráficos e análises** em tempo real

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
│   ├── migrations/          # Migrations do banco
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/          # Páginas principais
│   │   ├── services/       # Chamadas à API
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Funções auxiliares
│   │   ├── styles/         # CSS/Tailwind
│   │   └── App.tsx
│   ├── package.json
│   └── README.md
│
├── database/
│   ├── schema.sql          # Estrutura das tabelas
│   └── seeds.sql           # Dados iniciais
│
├── docs/
│   ├── API.md              # Documentação da API
│   ├── DATABASE.md         # Estrutura do banco
│   └── ALGORITHM.md        # Algoritmo de previsão
│
└── docker-compose.yml      # Ambiente completo com containers
```

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- PostgreSQL 13+
- Git

### Instalação Local

```bash
# Clonar repositório
git clone https://github.com/katiromero2107-svg/Estoque.git
cd Estoque

# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (em outro terminal)
cd frontend
npm install
npm start
```

### Com Docker
```bash
docker-compose up
```

## 📊 Funcionalidades Principais

### 1. **Dashboard de Monitoramento** 📈
- Visão geral do estoque atual
- Nível de alerta para itens críticos
- Custo total em tempo real
- Taxa de desperdício do período

### 2. **Previsão de Consumo** 🔮
- Algoritmo baseado em:
  - Taxa de ocupação (300 hóspedes base)
  - Dia da semana
  - Sazonalidade
  - Histórico de consumo (14 dias)
- Sugestões automáticas de quantidade a preparar

### 3. **Gestão de Estoque** 📦
- Cadastro de itens (alimentos e bebidas)
- Controle de validade
- Entrada e saída de estoque
- Alertas de estoque mínimo

### 4. **Registro de Consumo & Desperdício** 📝
- Consumo real vs. previsão
- Identificação de desperdício
- Categorização (OK, Vencido, Danificado, Não utilizado)
- Histórico completo

### 5. **Análise de Custos** 💰
- Custo por hóspede/dia
- Análise Pareto (itens A, B, C)
- Identificação de desperdício por item
- ROI de ações de melhoria

### 6. **Relatórios** 📄
- Acurácia de previsões
- Comparativo período vs. período
- Identificação de padrões
- Recomendações de ação

## 🧠 Algoritmo de Previsão

```
Consumo Previsto = (Ocupação Média × Percentual Histórico × Fator Dia) + Ajuste Sazonal

Exemplo:
- Ocupação: 300 hóspedes
- % Consumo de Café: 85% (histórico)
- Fator Sexta: 1.1 (maior consumo)
- Consumo Previsto ≈ 300 × 0.85 × 1.1 = 280,5 unidades
```

## 📱 Páginas Principais

- **Login** → Autenticação
- **Dashboard** → Visão geral
- **Inventory** → Gestão de itens
- **Forecasting** → Previsões
- **Consumption** → Registrar uso/desperdício
- **Analytics** → Análise de custos
- **Reports** → Relatórios

## 🔄 Fluxo de Dados

```
1. Ocupação diária inserida
   ↓
2. Sistema prevê consumo (algoritmo)
   ↓
3. Alertas para itens críticos
   ↓
4. Equipe prepara de acordo com previsão
   ↓
5. Ao final do dia: registro do consumo real
   ↓
6. Cálculo de desperdício (Previsto - Real)
   ↓
7. Algoritmo aprende e refina previsões
```

## 🔐 Segurança

- Autenticação JWT
- Validação de entrada
- Proteção contra SQL Injection
- Rate limiting

## 📞 Próximos Passos

1. ✅ Estrutura do banco de dados
2. ✅ Setup inicial (Docker)
3. ✅ API Backend básica
4. ✅ Interface Frontend
5. ✅ Algoritmo de previsão
6. ✅ Testes e otimizações

---

**Status**: Em desenvolvimento  
**Última atualização**: 2 de junho de 2026
