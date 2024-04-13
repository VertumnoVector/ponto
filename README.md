
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


# Documentação da API

## Arquivo de Roteamento Principal
### Descrição
o arquivo (`api/index`) é responsável por definir as rotas principais da aplicação e redirecionar as requisições para os roteadores específicos.
### Rota Principal definida
```http
  GET /login
```
| Descrição                           |
| :---------------------------------- |
| Redireciona para a página de login (`/login`) por padrão |


## END-POINT LOGIN

```http
  POST /login
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `req.body` | `string` | **Obrigatório** {username: string, password: string} |

### Descrição
Esta rota é usada para autenticar o usuário durante o processo de login. Ela utiliza a estratégia de autenticação local configurada com Passport.js.

### Comportamento
- Se a autenticação for bem-sucedida, o usuário é redirecionado para a página do dashboard (`/dashboard`).
- Se a autenticação falhar, o usuário é redirecionado de volta para a página de login (`/login`) com uma mensagem de erro exibida.
- Na rota (`/dashboard`), mais a frente, é que será determina o direcionamento para (`/admin`), se o usuário autenticado for um administrador comparando o retorno do `req.user.isadmin`.

### Exemplo de Uso
```javascript
fetch('/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username: 'seu-username', password: 'sua-senha' })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
  ```

## END-POINTS DO ADMINISTRADOR
## Retorna todos os usuários

```http
  GET /admin/
  Autenticação necessária: Sim (middleware `checkAuthenticated`)
```
### Descrição
Esta rota é usada para acessar a página de administração. Ela lista todos os usuários registrados no sistema para visualização e gerenciamento, dando ao administrador a opção de (`/delete`), se necessário.

### Comportamento
- Verifica se o usuário está autenticado e é um administrador.
- Consulta o banco de dados para obter informações de todos os usuários.
- Renderiza a página `adminPanel` com a lista de usuários.

### Exemplo de Uso
```javascript
fetch('/', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer seu-token-de-autenticacao'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
  ```

## Rota de inclusão de usuário
```http
  POST /admin/create
  Autenticação necessária: Sim (checkAuthenticated middleware)
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `req.body` | `application/json` | **Obrigatório**. {name:string, email:string, password:string, password2:string} |

### Descrição
Esta rota é responsável por criar um novo usuário comum no sistema. Ela recebe os dados do usuário através de uma requisição POST e executa uma série de validações antes de inserir os dados no banco de dados.
### Lógica de validação
1. Verifica se todos os campos obrigatórios estão preenchidos.
2. Verifica se a senha possui pelo menos 6 caracteres.
3. Verifica se a senha e a confirmação de senha são iguais.

### Respostas
- **200 OK**: Se o usuário for criado com sucesso.
- **400 Bad Request**: Se houver erros nos parâmetros da requisição ou nos dados fornecidos.
- **500 Internal Server Error**: Se ocorrer algum erro interno no servidor durante o processo de criação do usuário.
## Exemplo de Uso

```javascript
fetch('/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'johndoe@example.com',
    timeleft: '30 days',
    password: 'mypassword',
    password2: 'mypassword',
  }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
  ```

## Rota de exclusão de usuário comum

```http
  POST /admin/delete
  Autenticação necessária: Sim (checkAuthenticated middleware)
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `req.body` | `application/json` | **Obrigatório**. {UserId :int} |

### Descrição
Esta rota é responsável por excluir um usuário do banco de dados com base no ID fornecido no corpo da requisição.
### Lógica de exclusão
1. Recebe o ID do usuário a ser excluído do corpo da requisição.
2. Executa a lógica para excluir o usuário do banco de dados usando o ID fornecido.
### Respostas
- **200 OK**: Se o usuário for excluído com sucesso.
- **400 Bad Request**: Se houver erros nos parâmetros da requisição ou nos dados fornecidos.
- **500 Internal Server Error**: Se ocorrer algum erro interno no servidor durante o processo de exclusão do usuário.
### Exemplo de Uso
```javascript
fetch('/', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer seu-token-de-autenticacao'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
  ```


#### Funções do controller 

```javascript
function checkAuthenticated(req, res, next) 

//verifica a autenticação
```




## END-POINTS DO USUARIO COMUM
## Rota index do usuário comum
```http
  GET /dashboard/
  Autenticação necessária: Sim (checkAuthenticated middleware)
```
### Descrição
Esta rota é usada para renderizar a página inicial do dashboard. Se o usuário for um administrador, ele será redirecionado para a página de administração (`/admin`). Caso contrário, o dashboard do usuário será renderizado, mostrando seus registros de ponto e jornada de trabalho com base nos dados obtidos do banco de dados.
### Respostas
- **200 OK:** A página do dashboard é renderizada com sucesso.
- **302 Found:** Redireciona para /admin se o usuário for um administrador.
- **500 Internal Server Error:** Em caso de falha ao buscar os registros de ponto ou jornada de trabalho.
### Exemplo de Uso
```javascript
fetch('/', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer seu-token-de-autenticacao'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
  ```


## Rota de inclusão de registro de ponto
```http
  POST /dashboard/create
```
### Descrição
Esta rota é usada para criar um novo registro de pontos para um usuário com base no ID fornecido no corpo da requisição. Se o usuário já tiver um registro existente, o horário de início ou término será definido com base na paridade do seu ID.
### Parâmetros do Corpo da Requisição
- **user_id** (String, obrigatório): O ID do usuário para o qual o registro de pontos será criado.


### Lógica de Criação do Registro de Pontos
1. Verifica se já existe um registro para o `user_id`.
2. Se não houver registro, define o `starttime` como a hora atual.
3. Se houver registro, determina se o ID é par ou ímpar.
   - Se o ID for par, define o `stoptime` como a hora atual.
   - Se o ID for ímpar, define o `starttime` como a hora atual.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `req.body` | `application/json` |  {UserId :int} |

### Respostas
- **201 Created:** O registro de pontos foi criado com sucesso. Retorna o registro criado.
- **500 Internal Server Error:** Em caso de falha ao inserir o registro de pontos.
### Exemplo de Uso
```javascript
fetch('/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user_id: 'id-do-usuario' })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
  ```
#### Funções do controller
```javascript
async function getJornada(user_id) 

// assíncrona para captura da jornada cadastrada pelo adm.
```
```javascript
async function verificarRegistroExistente(user_id) 
 
//verifica se tem pelo menos 1 registro de ponto lançado pelo usuário.
//no end-point /dashboard/create é registrado como primeira entrada.
```
```javascript
async function isIdPar(id)

//depois de verificar se existe um lançamento e for verdadeiro,
//esta função determina se o registro será uma entrada ou saída.
//Caso o resto da divisão por 2 for 0 sempre será uma saída.
//Se for diferente disto é a entrada ou retorno. 
```





## Instalação
## BACKEND
Partindo do princípio que seu ambiente de desenvolvimento ja possua instalado o Node.js, basta seguir os passos abaixo, se não instale o node (https://nodejs.org/en/download) e continue.

#### Clone do projeto

```bash
  git clone https://github.com/usuario/nome-do-repositorio.git
```
#### Dependências do projeto
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
CREATE TABLE public.registro_de_pontos (
    id serial PRIMARY KEY,
    user_id bigint REFERENCES public.users(id),
    starttime TIMESTAMP,
	stoptime TIMESTAMP
)
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

