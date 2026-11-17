# Projeto Leve um Casaco ☀️

Front-end para verificar a previsão do tempo!

## Descrição

Bem-vindo ao nosso projeto de previsão do tempo, onde você consegue verificar a previsão e a temperatura em tempo real para qualquer lugar do mundo. E ainda por cima saber se você deve levar um casaquinho para o frio que possa fazer! 🧥

## Funcionalidades

- Tempo atual da cidade (temperatura, mínima, máxima, umidade e vento)
- Atalhos para SP, DF, BH e RJ e busca por qualquer cidade
- Gráfico com a previsão dos próximos 5 dias (de 3 em 3 horas, no horário local da cidade)
- Aviso se você deve levar um casaquinho (17 °C ou menos)
- Modo claro e escuro

## Tecnologias Utilizadas

- React + Vite
- Axios
- Styled-Components
- Recharts
- OpenWeatherMap
- SweetAlert2

## Como Rodar o Projeto

1. Clone este repositório:

```bash
git clone https://github.com/PedroGomes2k/projeto23-Leve-Um-Casaco.git
```

2. Instale as dependências (requer Node.js 26):

```bash
npm install
```

3. Configure a chave da API:

- Crie uma conta gratuita em [OpenWeatherMap](https://openweathermap.org/api) e gere uma API key.
- Copie o arquivo `.env.example` para `.env` e coloque a sua chave em `VITE_API_KEY`.

4. Rode o projeto:

```bash
npm run dev
```

Outros comandos: `npm run build` (build de produção), `npm run preview` (serve o build) e `npm run lint`.

## Deploy

[projeto23-leve-um-casaco.vercel.app](https://projeto23-leve-um-casaco.vercel.app/)

#
Agora você pode ficar sempre de olho no tempo! ☁️
