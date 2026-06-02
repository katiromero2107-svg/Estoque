# 📚 Documentação da API

## Base URL
```
http://localhost:5000/api
```

## Autenticação
Todas as requisições (exceto login) requerem header:
```
Authorization: Bearer {jwt_token}
```

---

## 🔐 Auth

### POST /auth/register
Registrar novo usuário
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```
**Resposta**: `{ id, token }`

### POST /auth/login
Fazer login
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```
**Resposta**: `{ token, user }`

---

## 📦 Items (Estoque)

### GET /items
Listar todos os itens
**Query Params**: `category`, `page`, `limit`

### POST /items
Criar novo item
```json
{
  "name": "Café Coado",
  "category": "Bebidas",
  "unit": "litro",
  "cost_per_unit": 15.50,
  "min_quantity": 10,
  "max_quantity": 50
}
```

### PUT /items/:id
Atualizar item

### DELETE /items/:id
Deletar item

### GET /items/:id/low-stock
Itens com estoque baixo

---

## 📊 Occupancy (Ocupação)

### POST /occupancy
Registrar ocupação do dia
```json
{
  "date": "2026-06-02",
  "guest_count": 285
}
```

### GET /occupancy
Histórico de ocupação
**Query Params**: `start_date`, `end_date`

### GET /occupancy/average
Ocupação média (últimos 30 dias)

---

## 🔮 Forecasting (Previsões)

### POST /forecast/predict
Gerar previsão para o dia
```json
{
  "date": "2026-06-03",
  "occupancy": 300
}
```
**Resposta**: Array de itens com quantidade prevista

### GET /forecast/:date
Obter previsão de um dia específico

### GET /forecast/accuracy
Acurácia das previsões (vs consumo real)

---

## 📝 Consumption (Consumo)

### POST /consumption
Registrar consumo real
```json
{
  "date": "2026-06-02",
  "item_id": 1,
  "actual_quantity": 25,
  "forecast_quantity": 28,
  "waste_quantity": 3,
  "waste_reason": "danificado"
}
```

### GET /consumption
Histórico de consumo
**Query Params**: `item_id`, `date`, `start_date`, `end_date`

### POST /consumption/bulk
Registrar múltiplos consumos em uma única requisição

---

## 💰 Analytics (Análise de Custos)

### GET /analytics/costs/daily
Custos diários
**Query Params**: `start_date`, `end_date`

### GET /analytics/costs/by-item
Custos por item
```json
{
  "period": "month",
  "item_id": "optional"
}
```

### GET /analytics/waste
Análise de desperdício
**Query Params**: `start_date`, `end_date`

### GET /analytics/pareto
Análise Pareto (itens A, B, C)

### GET /analytics/cost-per-guest
Custo por hóspede

---

## 📄 Reports (Relatórios)

### GET /reports/daily
Relatório diário completo
**Query Params**: `date`

### GET /reports/summary
Resumo do período
**Query Params**: `start_date`, `end_date`

### GET /reports/export
Exportar dados em CSV
**Query Params**: `type` (consumption, forecast, costs), `start_date`, `end_date`

---

## Códigos de Resposta

| Código | Significado |
|--------|------------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Erro de validação |
| 401 | Não autenticado |
| 403 | Não autorizado |
| 404 | Não encontrado |
| 500 | Erro interno do servidor |

---

## Exemplo de Fluxo Completo

```bash
# 1. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@example.com","password":"senha123"}'

# Salvar token: TOKEN=xyz...

# 2. Registrar ocupação
curl -X POST http://localhost:5000/api/occupancy \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-06-02","guest_count":300}'

# 3. Obter previsão
curl -X POST http://localhost:5000/api/forecast/predict \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-06-02","occupancy":300}'

# 4. Registrar consumo real
curl -X POST http://localhost:5000/api/consumption \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-06-02","item_id":1,"actual_quantity":25,"waste_quantity":2}'

# 5. Analisar custos
curl -X GET http://localhost:5000/api/analytics/waste?start_date=2026-05-01&end_date=2026-06-02 \
  -H "Authorization: Bearer $TOKEN"
```
