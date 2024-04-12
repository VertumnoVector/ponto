
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


## Funcionalidades
- Modo tela cheia
- Multiplataforma

