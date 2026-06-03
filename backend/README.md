# 🚀 Backend - Sistema de Controle de Estoques

## Configuração

### Pré-requisitos
- Node.js 18+
- PostgreSQL 13+

### Instalação

```bash
cd backend
npm install
cp .env.example .env
```

### Variáveis de Ambiente
Edite `.env` com suas configurações locais.

### Iniciando

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## Estrutura

```
src/
├── config/        # Configurações (DB, env)
├── controllers/   # Controladores (lógica)
├── models/        # Modelos de dados
├── routes/        # Rotas da API
├── middleware/    # Middlewares (auth, validação)
├── services/      # Serviços (previsão, análise)
├── utils/         # Funções auxiliares
└── server.js      # Entrada da aplicação
```

## API Endpoints

Ver [docs/API.md](../docs/API.md) para documentação completa.

## Testes

```bash
npm test
```

## Deployment

Ver docker-compose.yml na raiz do projeto.