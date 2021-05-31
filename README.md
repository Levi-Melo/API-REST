<h1  align="center">Api Rest</h1>

### Index

- [Documentação](#Documentação)
- [Proposta](#Proposta)
- [Requisitos](#Requirements)
- [Techs](#Techs-usadas)

# Documentação

A Api está com a documentação de rotas em http://localhost:3000 gerada automaticamente pelo swagger

# Proposal

Uma Api Rest com protocolos http, operações CRUD usando typescript e principios de Clean Architecture

## Requirements:

- Cadastro, Leitura, Alteração e Remoção de Clientes com endereço (2 entidades separadas).<br>

### Os clientes devem possuir:<br>

- CNPJ.<br>
- Razão Social .<br>
- Contato.<br>
- Telefone.<br>

### Os endereços devem possuir:<br>

- Logradouro.<br>
- Número. <br>
- Complemento.<br>
- Bairro. <br>
- Cidade. <br>
- Estado. <br>
- CEP. <br>

# Techs usadas

- JavaScript
- TypeScript
- Sequelize
- mySql
- uuidv4
- Swagger
