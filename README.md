# Atlantis - Ocean Solutions 🌊

Este projeto foi desenvolvido como parte da disciplina **Técnicas de Programação II** do curso de **Desenvolvimento de Software Multiplataforma**. 
O objetivo da atividade é evoluir o sistema Atlantis, originalmente desenvolvido em CLI, para uma aplicação web completa, baseada no protótipo navegável criado anteriormente.
A nova versão deve entregar uma experiência moderna, acessível e eficiente, permitindo que clientes utilizem o sistema diretamente no navegador.

<br>

A aplicação web contempla as seguintes operações:

- 👤 Gerenciamento de Clientes;
- 🏨 Controle de Acomodações;
- 🛎 Registro e Acompanhamento de Hospedagens;
- 📊 Listagens e Consultas Variadas.

---

<br>

## 🔧 Tecnologias Utilizadas

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2306B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white) 
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

<br>

## ⬇ Guia de Instalação

Este guia oferece instruções detalhadas sobre como baixar, configurar e executar este projeto em sua máquina local.

### Pré-requisitos

- **VSCode**: Editor de código para visualização e edição do projeto. [Baixe o VSCode](https://code.visualstudio.com/download)
- **MySQL**: Banco de dados para armazenar informações necessárias ao sistema. [Baixe o MYSQL](https://dev.mysql.com/downloads/installer/)

---

#### 🌐 Compatibilidade de Ambiente

Para garantir o funcionamento correto do projeto, recomenda-se utilizar:

- **NPM:** versão 8.x ou superior
- **Node.js** entre **v16.0.0 e v20.0.0**: Ambiente de execução de JavaScript open-source. [Baixe o Node.js](https://nodejs.org/en/download)

#### 📌 Observações
O uso de versões mais recentes do Node.js, como v22.x, pode causar incompatibilidades.  
Este projeto foi testado com Node v22.13.0 e funcionou corretamente, mas o suporte oficial de algumas bibliotecas pode não estar garantido ainda.

---

### 🔁 Clonando o Repositório

```bash
git clone https://github.com/abeatrizdscoelho/Atlantis.git
  ```

```bash
git checkout ATVV-Atlantis
```

---

### ⚙️ Configurando o Backend

#### 1. Abrindo um Terminal
> Abra um terminal no VSCode para configurar o backend.

#### 2. Configuração e Execução do Backend
> Navegue até a pasta do backend:
```bash
cd backend
  ```

> Instale as dependências do backend:
```bash
npm install
  ```

#### Configure o Banco de Dados
Crie um banco no MySQL (ex: ```atlantis```).
Crie um arquivo ```.env``` e insira suas credenciais:
```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/atlantis"
PORT=4000
  ```

> Rode as migrações:
```bash
npx prisma migrate dev
  ```

> Rode o seed:
```bash
npm run seed
  ```

> Inicie o servidor:
```bash
npm run dev
  ```

O back-end estará disponível em: http://localhost:4000

---

### 💻 Configurando o Frontend

#### 1. Abrindo um Novo Terminal
> Abra um novo terminal no VSCode para configurar o frontend.

#### 2. Configuração e Execução do Frontend
> Navegue até a pasta do frontend:
```bash
cd frontend
  ```

> Instale as dependências:
```bash
npm install
  ```

#### Configure o Arquivo `.env`
Crie um arquivo ```.env``` contendo:
```bash
VITE_API_URL=http://localhost:4000/api
  ```

> Inicie a aplicação
```bash
npm start
  ```

O front-end estará disponível em: http://localhost:5173

---

### 🔗 Acessando a Aplicação
> No terminal, copie o link que aparece e abra-o no navegador de sua preferência para acessar a aplicação.

