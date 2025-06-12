# ContAI Finance App

ContAI Finance App é uma aplicação Fullstack de gestão financeira. O sistema permite ao usuário criar e visualizar transações financeiras ("launches") organizados como "credit" ou "debits".

---

# Features

- Criar e listar transações
- Catalogar como "Credit" ou "Debit"
- Agrupamento por mês e ano
- Sumario do total de créditos e débitos por mês
- Validação de formulário usando Zod + React Hook Form
- Banco de dados PostgreSQL com TypeORM e Express

---

# Estrutura do Projeto

```
contai-finance-app/
├── contai-finance-api/      # Backend
├── contai-finance-client/   # Frontend
├── LICENSE
├── README.md
└── .gitignore
```

---

# Backend: contai-finance-api
```
contai-finance-api/
├── src/
│   ├── controllers/     # Lógica de controle das rotas
│   ├── entities/        # Entidades do banco de dados (TypeORM)
│   ├── migrations/      # Scripts de migração
│   ├── routes/          # Definição de rotas da API
│   ├── app.ts           # Configuração da aplicação (middlewares, rotas)
│   ├── data-source.ts   # Configuração do TypeORM
│   └── server.ts        # Ponto de entrada do servidor
├── .env.exemple
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── ...
```


# Tecnologias principais

- Node.js
- Express.js
- TypeORM
- PostgreSQL (via Docker)
- TypeScript

---

# Frontend: contai-finance-client

```
contai-finance-client/
├── public/              # Arquivos estáticos
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── contexts/        # React Context API
│   ├── hooks/           # Hooks customizados
│   ├── pages/           # Páginas da aplicação
│   ├── schemas/         # Schemas de validação (ex: Zod, Yup)
│   ├── services/        # Integração com APIs
│   ├── types/           # Tipagens globais do TypeScript
│   ├── utils/           # Funções utilitárias
│   ├── App.tsx          # Componente raiz
│   ├── main.tsx         # Ponto de entrada do React
│   └── vite-env.d.ts    # Declarações para Vite
├── index.html
├── vite.config.ts
└── ...
```


# Tecnologias principais

- React
- TypeScript
- Vite
- Zod/Yup (para validações)
- React Context + Hooks

---

# Docker

O projeto utiliza Docker apenas para subir o banco de dados PostgreSQL necessário para o backend.
```bash
# Na raiz de contai-finance-api
docker-compose up -d
```
Isso iniciará um container PostgreSQL acessível nas configurações definidas no seu .env.

---

# Como rodar o projeto

Certifique-se de que o Docker está rodando e o container do PostgreSQL está ativo.

1. Suba o banco de dados:
```bash
cd contai-finance-api
docker-compose up -d
```

2. Rode o backend localmente:
```bash
cd contai-finance-api
npm install
npm run dev
```

3. Rode o frontend localmente:
```bash
cd contai-finance-client
npm install
npm run dev
```

---

# Licença

Este projeto está sob a licença MIT.