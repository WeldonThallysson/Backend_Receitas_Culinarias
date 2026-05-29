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

# Visão geral de execução do projeto

O projeto pode ser executado de duas formas:

- Ambiente local utilizando Docker (setup automatizado)
- Ambiente com banco de dados externo (homologação ou produção)

---

# Requisitos para execução local (Docker)

Antes de iniciar, é necessário possuir instalado na máquina:

- Docker
- Docker Compose
- Node.js
- NPM

---

# Requisitos para execução com banco externo

- Node.js
- NPM
- Banco de dados MySQL/MariaDB externo configurado (ex: Railway, Render, etc)

---

# Configuração do ambiente (Docker - local)

Copie as configurações do arquivo `.env.sample` e substitua no seu `.env` atual:

```env
BASE_URL="http://localhost"
BASE_DESCRIPTION_SERVER="Servidor local"
DATABASE_URL="mysql://receitas_user:receitas123@localhost:3306/teste_receitas_rg_sistemas" #Local
DATABASE_USER="receitas_user"
DATABASE_PASSWORD="receitas123"
DATABASE_NAME="teste_receitas_rg_sistemas"
DATABASE_HOST="localhost"
DATABASE_PORT=3306

#DATABASE_URL="mysql://root:RxmXvenZVJXlKFRbZLguYRKbmwZZrusc@zephyr.proxy.rlwy.net:52197/railway" #Homolog
#DATABASE_USER="root"
#DATABASE_PASSWORD="RxmXvenZVJXlKFRbZLguYRKbmwZZrusc"
#DATABASE_NAME="railway"
#DATABASE_HOST="zephyr.proxy.rlwy.net"
#DATABASE_PORT=52197

JWT_SECRET_KEY="ELXN4Kw8cd4MIa2sftAGSAGslTl86I1rndf67gOJ5EQ"
JWT_RESET_SECRET_KEY="9f3c2a1d8b6e4c7f9a2d1b3c5e6f7a8b"
NODE_ENV="development"
```

O projeto possui um script automatizado responsável por:

- Criar o container Docker do MySQL
- Criar o banco de dados
- Executar o script SQL inicial
- Sincronizar o banco com o Prisma ORM
- Gerar automaticamente o Prisma Client

Execute o comando abaixo:

```bash
npm run setup
````

# Executando a aplicação (Docker - local)

Após finalizar a configuração do ambiente, execute:

```bash
npm run dev
```

A aplicação iniciará localmente na porta configurada.

---

# Configuração do ambiente (banco externo - homologação/produção)

## 1. Configurar arquivo .env

Copie as configurações do arquivo `.env.sample` e substitua no seu `.env` atual:

```env
DATABASE_URL="mysql://root:RxmXvenZVJXlKFRbZLguYRKbmwZZrusc@zephyr.proxy.rlwy.net:52197/railway"
DATABASE_USER="root"
DATABASE_PASSWORD="RxmXvenZVJXlKFRbZLguYRKbmwZZrusc"
DATABASE_NAME="railway"
DATABASE_HOST="zephyr.proxy.rlwy.net"
DATABASE_PORT=52197
```

---

## 2. Executar migrations no banco externo

```bash
npx prisma migrate deploy
```

---

## 3. Executar aplicação

### Modo produção

```bash
npm run build
npm start
```

### Modo desenvolvimento

```bash
npm run dev
```

---

# Executando os testes

Para executar os testes unitários:

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

* Visualizar todas as rotas
* Testar endpoints
* Consultar parâmetros
* Ver exemplos de request e response
* Utilizar autenticação Bearer Token

---

# Scripts disponíveis

| Comando                | Descrição                                 |
| ---------------------- | ----------------------------------------- |
| npm run setup          | Configura ambiente local com Docker       |
| npm run dev            | Executa aplicação em modo desenvolvimento |
| npm run build          | Gera build da aplicação                   |
| npm run start          | Executa aplicação em produção             |
| npm run docker:up      | Inicializa containers Docker              |
| npm run docker:down    | Remove containers Docker                  |
| npm run docker:restart | Reinicia containers Docker                |
| npm run docker:logs    | Exibe logs do container MySQL             |
| npm run prisma:sync    | Sincroniza Prisma com banco de dados      |
| npm run test           | Executa testes unitários                  |

---

# Estrutura principal da API

A API possui os seguintes módulos:

* Autenticação
* Usuários
* Categorias
* Receitas

---

# Funcionalidades implementadas

## Autenticação

* Cadastro de usuários
* Login com JWT
* Login utilizando e-mail ou CPF
* Recuperação de senha
* Redefinição de senha via token
* Middleware de autenticação

## Usuários

* Listagem
* Busca por ID
* Atualização
* Remoção

## Categorias

* Cadastro de categorias
* Atualização
* Exclusão
* Listagem
* Busca individual

## Receitas

* Cadastro de receitas
* Atualização
* Exclusão
* Listagem
* Busca individual
* Associação com categorias
* Associação com usuário autenticado

---

# Considerações extras

Além dos requisitos solicitados no desafio, foram implementados módulos adicionais pensando em uma aplicação real do dia a dia de mercado.

O sistema possui um módulo completo de autenticação utilizando JWT, para login através de e-mail ou CPF, além de fluxo de recuperação e redefinição de senha.

Também foi implementado um módulo de gerenciamento de categorias para melhor organização das receitas culinárias, para permitir escalabilidade e separação adequada dos dados da aplicação.

Outro diferencial que integrei foi a documentação completa da API com Swagger, além da utilização de Docker para facilitar toda a configuração e execução do ambiente local.

