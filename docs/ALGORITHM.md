# 🧠 Algoritmo de Previsão de Consumo

## Objetivo
Prever com precisão a quantidade de cada item necessária para o café da manhã baseado em:
- Taxa de ocupação
- Dia da semana
- Histórico de consumo
- Sazonalidade

## Fórmula Principal

```
Consumo Previsto = (Ocupação Base × % Consumo Histórico × Fator Dia × Fator Sazonal) + Ajuste Fino

Onde:
- Ocupação Base = ocupação do dia em questão (max 300 hóspedes)
- % Consumo Histórico = percentual médio do item consumido
- Fator Dia = multiplicador baseado no dia da semana
- Fator Sazonal = ajuste sazonal (estações, feriados)
- Ajuste Fino = correção baseada em tendência recente
```

## Componentes

### 1. **Ocupação Base**
```
Se ocupação < 50 hóspedes:
  Consumo_ajustado = Ocupação × % Consumo

Se ocupação >= 50 hóspedes:
  Consumo_ajustado = Ocupação × % Consumo × Coeficiente_Escala
  
Coeficiente_Escala = 1 + (0.05 × ocupação / 100)
```

**Exemplo**: Com 300 hóspedes e 85% consumindo café:
```
300 × 0.85 × 1.15 = 294 xícaras
```

### 2. **Fator Dia da Semana**

| Dia | Fator | Justificativa |
|-----|-------|--------------|
| Segunda | 1.05 | Volta do fim de semana, consumo normaliza |
| Terça | 1.00 | Dia base |
| Quarta | 0.98 | Leve redução |
| Quinta | 1.02 | Tendência de aumento |
| Sexta | 1.15 | Fim de semana começa, maior consumo |
| Sábado | 1.20 | Fim de semana, maior lazer e consumo |
| Domingo | 1.10 | Ainda fim de semana |

### 3. **Fator Sazonal**

```javascript
Mês       | Fator | Motivo
Janeiro   | 1.00  | Base
Fevereiro | 0.95  | Verão, menor ocupação
Março     | 0.98  | Transição
Abril     | 1.05  | Feriados/eventos
...
Dezembro  | 1.30  | Férias, máxima ocupação
```

### 4. **Ajuste Fino (Tendência Recente)**

Baseado nos últimos 14 dias:

```
Se últimos_7_dias > média_30_dias:
  Ajuste = +5% (tendência de aumento)

Se últimos_7_dias < média_30_dias:
  Ajuste = -5% (tendência de queda)

Senão:
  Ajuste = 0% (estável)
```

## Exemplo Completo de Cálculo

**Dados**:
- Data: Sexta-feira, 4 de junho
- Ocupação: 290 hóspedes
- Item: Café coado
- % Consumo histórico: 85%
- Tendência últimos 7 dias: +10% vs média

**Cálculo**:

```
1. Base: 290 × 0.85 = 246,5
2. Escala: 246,5 × 1.13 = 278,5
3. Fator Dia (Sexta): 278,5 × 1.15 = 320,3
4. Fator Sazonal (Junho): 320,3 × 1.02 = 326,7
5. Ajuste Fino (+5%): 326,7 × 1.05 = 343,0

**Consumo Previsto: 343 unidades**
```

## Intervalo de Confiança

A previsão inclui um intervalo de confiança:

```
Limite Inferior = Previsto × 0.85
Limite Superior = Previsto × 1.15

Para 343 unidades:
- Inferior: 291 unidades (90% seguro)
- Superior: 395 unidades (99% seguro)

Recomendação: Preparar 343 ± 26 unidades
```

## Aprendizado Contínuo

A cada dia, o algoritmo se refina:

```
1. Compara previsão vs consumo real
2. Calcula erro: |Previsto - Real| / Real
3. Se erro < 10%: Confiança aumenta
4. Se erro > 25%: Investiga anomalias
5. Atualiza pesos históricos
```

## Matriz de Acurácia

```
Acurácia     | Ação
< 70%        | Revisar dados de entrada
70-85%       | Normal, algoritmo aprendendo
85-95%       | Bom funcionamento
> 95%        | Excelente (pode estar overfitting)
```

## Tratamento de Anomalias

### Detecção
- Se Real > Previsto × 1.5: Anomalia positiva
- Se Real < Previsto × 0.5: Anomalia negativa

### Ações
```
1. Registra a anomalia
2. Solicita motivo (evento, erro de medição, etc)
3. Exclui do treinamento se não verificada
4. Inclui se evento foi especial (feriado, evento)
```

## Validações

Antes de calcular previsão, o sistema valida:

```javascript
if (occupancy < 0 || occupancy > 400) {
  throw new Error("Ocupação inválida");
}

if (!historicalData || historicalData.length < 7) {
  return defaultForecast(); // Usa valores padrão
}

if (confidence < 0.6) {
  return confidenceWarning("Confiança baixa, use com cautela");
}
```

## Integração com Backend

```javascript
// Exemplo de implementação
async function forecastConsumption(itemId, occupancy, date) {
  const historical = await getHistoricalData(itemId, 30);
  const weeklyTrend = calculateWeeklyTrend(historical);
  const dayFactor = getDayFactor(date);
  const seasonalFactor = getSeasonalFactor(date);
  
  const baseForecast = occupancy * historical.avgConsumption;
  const scaledForecast = baseForecast * getScaleFactor(occupancy);
  const finalForecast = scaledForecast * dayFactor * seasonalFactor * weeklyTrend;
  
  const confidence = calculateConfidence(historical, weeklyTrend);
  
  return {
    predictedQuantity: Math.round(finalForecast),
    lowerBound: Math.round(finalForecast * 0.85),
    upperBound: Math.round(finalForecast * 1.15),
    confidence: confidence,
    breakdown: {
      base: baseForecast,
      scaled: scaledForecast,
      withDayFactor: scaledForecast * dayFactor,
      withSeasonality: scaledForecast * dayFactor * seasonalFactor,
      final: finalForecast
    }
  };
}
```

## KPIs de Monitoramento

| KPI | Meta | Frequência |
|-----|------|-----------|
| Acurácia de Previsão | > 85% | Diária |
| Desperdício % | < 8% | Semanal |
| Ruptura de Itens | 0 | Diária |
| Custo por Hóspede | Reduzir 5% | Mensal |

---

**Última atualização**: 2 de junho de 2026
