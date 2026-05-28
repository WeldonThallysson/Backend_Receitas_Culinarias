# Receitas Culinárias - Backend API

API REST desenvolvida com Node.js, TypeScript, Express, Prisma ORM e MySQL para gerenciamento de receitas culinárias.

---

# Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- MySQL
- Docker
- Swagger
- Jest
- JWT
---

# Requisitos para execução local

Antes de iniciar, é necessário possuir instalado na máquina:

- Docker
- Docker Compose
- Node.js
- NPM

---

# Configuração do ambiente

O projeto possui um script automatizado responsável por:

- Criar o container Docker do MySQL
- Criar o banco de dados
- Executar o script SQL inicial
- Sincronizar o banco com o Prisma ORM
- Gerar automaticamente o Prisma Client

Execute o comando abaixo:

```bash
npm run setup
```

Este processo pode levar alguns segundos até que o banco finalize sua inicialização.

---

# Executando a aplicação

Após finalizar a configuração do ambiente, execute:

```bash
npm run dev
```

A aplicação iniciará localmente na porta configurada.

---
# Executando os testes 

Para executar os testes unitários, execute:

```bash
npm run test
```

---

# Acesso da API

URL base da API:

```txt
http://localhost:3000
```

---

# Documentação Swagger

A documentação completa da API pode ser acessada através do Swagger:

```txt
http://localhost:3000/docs
```

No Swagger será possível:

- Visualizar todas as rotas
- Testar endpoints
- Consultar parâmetros
- Ver exemplos de request e response
- Utilizar autenticação Bearer Token

---

# Scripts disponíveis

| Comando | Descrição |
|---|---|
| npm run setup | Configura todo o ambiente automaticamente |
| npm run dev | Executa a aplicação em modo desenvolvimento |
| npm run build | Gera build da aplicação |
| npm run start | Executa aplicação em produção |
| npm run docker:up | Inicializa containers Docker |
| npm run docker:down | Remove containers Docker |
| npm run docker:restart | Reinicia containers Docker |
| npm run docker:logs | Exibe logs do container MySQL |
| npm run prisma:sync | Sincroniza Prisma com banco de dados |
| npm run test | Executa os testes unitários referente aos módulos do webservice | 

---

# Estrutura principal da API

A API possui os seguintes módulos:

- Autenticação
- Usuários
- Categorias
- Receitas

---

# Funcionalidades implementadas

## Autenticação

- Cadastro de usuários
- Login com JWT
- Login utilizando e-mail ou CPF
- Recuperação de senha
- Redefinição de senha via token
- Middleware de autenticação

## Usuários

- Listagem
- Busca por ID
- Atualização
- Remoção

## Categorias

- Cadastro de categorias
- Atualização
- Exclusão
- Listagem
- Busca individual

## Receitas

- Cadastro de receitas
- Atualização
- Exclusão
- Listagem
- Busca individual
- Associação com categorias
- Associação com usuário autenticado

---

# Considerações extras

Além dos requisitos solicitados no desafio, foram implementados módulos adicionais pensando em uma aplicação real do dia a dia de mercado.

O sistema possui um módulo completo de autenticação utilizando JWT, para login através de e-mail ou CPF, além de fluxo de recuperação e redefinição de senha.

Também foi implementado um módulo de gerenciamento de categorias para melhor organização das receitas culinárias, para permitir escalabilidade e separação adequada dos dados da aplicação.

Outro diferencial que integrei foi a documentação completa da API com Swagger, além da utilização de Docker para facilitar toda a configuração e execução do ambiente local.

---