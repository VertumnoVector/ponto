
# CONTROLE DE PONTOS

Este é um desafio da Logique Inteligência em sistemas. Consiste no controle de entrada e saída de colaborades, marcando de forma assídua o cumprimento do expediente.


## Stack utilizada

**Front-end:** EJS, SCSS

**Back-end:** Node.JS, Express.JS

**Persistência:** PostgreSQL



## REQUISITOS

| Nr   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `RF01` | `FUNCIONAL` | O sistema deve ser protegido por login e senha. |
| `RF02` | `FUNCIONAL` | Os dados precisam ser persistidos em banco de dados
| `RF03` | `FUNCIONAL` | O sistema precisa controlar jornada de 6 horas
| `RF04` | `FUNCIONAL` | O sistema precisa controlar jornada de 8 horas
| `RF06` | `FUNCIONAL` | O sistema deve ser flexivel quanto aos horarios de entrada e saída
| `RF07` | `FUNCIONAL` | O sistema deve ter 2 perfis de usuário: ADMIN, USER
| `RNF01` | `NÃO FUNCIONAL` |Um ponto representa o registro de entrada ou saída de expediente.
| `RNF02` | `NÃO FUNCIONAL` |O administrador deverá informar o tipo de jornada do colaborador
| `RNF03` | `NÃO FUNCIONAL` |O usuário comum não poderá cadastrar novos usuários.
| `RNF04` | `NÃO FUNCIONAL` |O usuário comum faz: Registrar ponto,  Resumo de jornada do dia atual, Previsão para completar jornada, Horas excedidas da jornada.


## Diagrama Entidade-Relacionamento / Fluxo Funcional




![Logo](https://lh3.googleusercontent.com/drive-viewer/AKGpihYoHpnixA55_3C--7X-_D3_V8dcb6S-qhgKltfCZtjOzHMF3Rvsb3wRFoxCtCHXdF8DoPqJRId9QeEOIWi2HYOstomFS7hPfdM=w1860-h885-v0)


## Documentação da API

#### Rota de Login

```http
  GET /login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. username |
| `api_key` | `string` | **Obrigatório**. password |

## ADMINISTRADOR
#### Retorna todos os usuários

```http
  GET /admin/
```
#### Rota de inclusão de usuário
```http
  POST /admin/create
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `req.body` | `application/json` | **Obrigatório**. name, email, password, password2 |

#### Rota de exclusão de usuário comum

```http
  POST /admin/delete
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `req.body` | `application/json` | **Obrigatório**. UserId |



#### checkAuthenticated(req, res, next)

Verifica o estado de autenticação para operação do administrador.


## Instalação

Dependências do projeto

## BACKEND 

```bash
  npm i bcrypt
```
```bash
  npm i dotenv
```
```bash
  npm i express express-flash express-list-endpoints express-session
```
```bash
  npm i nodemon
```
```bash
  npm i passport passport-local
```
```bash
  npm i path
```

## FRONTEND 
```bash
  npm i ejs
```
```bash
  npm i bootstrap
```
```bash
  npm i datatables.net-dt
```
## Deploy local

Inicie uma instância de projeto no seu editor de código. Dentro do diretório raiz do projeto execute no terminal:
```bash
  npm init
```

Siga as instruções gerais do console.


Depois de iniciar o projeto e instalar as dependencias edite o arquivo "package.json" copie o seguinte trecho

```json
  "scripts": {
    "start": "nodemon app.js"
  }
```
No console, dentro do diretorio raiz, execute:


```bash
  nodemon app.js
```


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DB_USER`

`DB_PASSWORD`

`DB_HOST`

`DB_PORT`

`DB_DATABASE`

`SESSION_SECRET`

## Configurando banco para uso primario

```postgresql
CREATE TABLE public.users  (
    id bigserial not null,
    username VARCHAR(50) UNIQUE NOT NULL,
    timeleft int not null,
    password TEXT NOT NULL,
    isAdmin BOOLEAN DEFAULT false,
    email text not null,
    name VARCHAR(255) not null
);
ALTER TABLE users ADD CONSTRAINT users_pk PRIMARY KEY (id);
```

```postgresql
INSERT INTO users(username, password,timeleft, isadmin, email, name)
VALUES 
('admin', '$2a$12$wl1B1jUdGwNjLXlfCBnPSuSExpfXHJU2UVWEJZ83iyDPQWK.GVnRu',0, true, 'sgtmota2015@gmail.com', 'John Doe'),
('20240001','$2a$12$AR.BOGZYrARdD1gqrMcelefJvyEOK4NqQZ3tiXEAWWPIwAqW.zAJ.',360, false, 'mottta.h@gmail.com', 'Jane Doe')

```


## Funcionalidades
- Modo tela cheia
- Multiplataforma

