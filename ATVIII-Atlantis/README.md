# Atlantis - Ocean Solutions 🌊

Este projeto foi desenvolvido como parte da disciplina **Técnicas de Programação II** do curso de **Desenvolvimento de Software Multiplataforma**, com o objetivo de construir um **Sistema em TypeScript** para gerenciamento de Clientes, Dependentes e Acomodações, aplicando os padrões de projeto **Singleton**, **Strategy**, **Prototype** e **Builder**. <br>
O sistema foi aprimorado para incluir o controle e gerenciamento de hospedagens.

<br>

O sistema permite o controle e gerenciamento de:

- 📇 **Clientes** (CRUD completo)
- 👨‍👩‍👧 **Dependentes** (com dados de contato e endereço herdados do cliente)
- 🔍 Listagem de **Dependentes por Titular**
- 🔍 Listagem de **Titular de um Dependente específico**
- 🛏 **Acomodações** (quartos com diferentes tipos de leitos, suítes, climatização e garagem)
- 🏨 **Hospedagens**, associando hóspedes a acomodações específicas

O sistema funciona via **CLI (linha de comando)**, com menus interativos para realizar todas as operações.

---

<br>

## 🔧 Tecnologias Utilizadas

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

<br>

## ⬇ Guia de Instalação

Este guia oferece instruções detalhadas sobre como baixar, configurar e executar este projeto em sua máquina local.

### Pré-requisitos

- **VSCode**: Editor de código para visualização e edição do projeto. [Baixe o VSCode](https://code.visualstudio.com/download)

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
git clone https://github.com/abeatrizdscoelho/ATVIII-Atlantis.git
  ```

---

### ⚙️ Configurando e Executando o Projeto

1. Instale as dependências

```bash
npm install
```

2. Compile o código TypeScript para JavaScript

```bash
tsc
```

3. Execute o projeto

```bash
node src/js/app/app.js
```

--- 

### 🏗 Estrutura e Padrões do Projeto

**Singleton (```Armazem```):** Armazena uma única instância da lista de clientes, garantindo consistência em todo o sistema. <br>
**Strategy (```Processo```):** Cada ação do sistema (cadastro, edição, exclusão e listagem) é implementada como um processo concreto. <br>
**Prototype (```clonar()```):** Utilizado para copiar objetos como endereço e telefone de um cliente para seus dependentes. <br>
**Builder** **(```Acomodacao```, ```Diretor```, ```ConstrutorAcomodacao```)**: Implementa diferentes tipos de acomodações, permitindo flexibilidade na criação de quartos com camas de solteiro, camas de casal, suítes, climatização e vagas de garagem.
