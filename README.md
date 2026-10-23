# Automação de testes E2E: Sauce Demo (login e carrinho)

Projeto de automação de testes com **Playwright (JavaScript)** para o site de demonstração [Sauce Demo](https://www.saucedemo.com/). Ele transforma em testes automatizados os casos de teste manuais de **login** e **carrinho**, mantendo o ID de cada caso (`LOG-01`, `CAR-001`...) no título do teste para facilitar a rastreabilidade.

## Sobre o projeto

- **Sistema sob teste:** Sauce Demo, e-commerce de demonstração (web), em https://www.saucedemo.com/
- **Escopo:** login (autenticação, mensagens de erro, usuários especiais e proteção de rotas) e carrinho (visualização, remoção e navegação)
- **Tipo de teste:** E2E (ponta a ponta) no navegador
- **Total:** 34 testes automatizados (21 de login e 13 de carrinho)


## Tecnologias

- [Playwright Test](https://playwright.dev/) (`@playwright/test`)
- Node.js e JavaScript (CommonJS)
- Navegador Chromium

## Estrutura de pastas

```
saucedemo-automacao-qa/
├── tests/
│   ├── login.spec.js        # 21 testes de login (LOG-01 a LOG-21)
│   └── carrinho.spec.js     # 13 testes de carrinho (CAR-001 a CAR-013)
├── docs/
│   └── casos-de-teste/
│       ├── 01-login.md      # casos de teste manuais de login
│       └── 02-carrinho.md   # casos de teste manuais de carrinho
├── playwright.config.js     # configuração e relatórios
├── package.json             # scripts e dependências
└── README.md
```

## Pré-requisitos e instalação

- [Node.js](https://nodejs.org/) em versão LTS (18 ou superior)
- [VS Code](https://code.visualstudio.com/) (opcional, recomendado)

```bash
npm install
npx playwright install chromium
```

Ao abrir a pasta no VS Code, ele sugere instalar a extensão **Playwright Test for VS Code**, que permite rodar e depurar cada teste pelo botão de play ao lado do código.

## Como rodar

```bash
# todos os testes
npm test

# só login ou só carrinho
npm run test:login
npm run test:carrinho

# com o navegador visível
npm run test:headed


### Resultado da execução

| Data | Ambiente | Navegador |
|------|----------|-----------|
| 23/10/2026 | Vs Code | Chromium |

| Resultado | Qtde |
|-----------|-----:|
| ✅ Passou | 33 |
| ❌ Falhou | 01 |
| **Total** | **34** |

### Falha conhecida

| Teste | Situação | Origem |
|-------|----------|--------|
| `CAR-009` - Checkout com carrinho vazio | Falha na execução manual de 06/10/2026 | [02-carrinho.md](docs/casos-de-teste/02-carrinho.md) |

O teste automatizado verifica o comportamento **correto** (checkout bloqueado com o carrinho vazio, usuário permanece em `cart.html`). Enquanto o bug existir no sistema, esse teste aparece como **falhado** no relatório. Isso é intencional: a falha sinaliza o bug e não é escondida. Quando o bug for corrigido, o teste passa sem nenhuma alteração.

## Casos de teste

Os casos de teste manuais, com pré-condições, passos e resultado esperado, estão em [`docs/casos-de-teste/`](docs/casos-de-teste/). Na automação, o título de cada teste segue o padrão:

```
CAR-002 - Item adicionado aparece no carrinho @prioridade-alta @severidade-critica
```

- **ID e nome** do caso (rastreabilidade com a documentação manual)
- **Tags** de prioridade (`@prioridade-alta`, `@prioridade-media`, `@prioridade-baixa`) e de severidade (`@severidade-critica`, `@severidade-alta`, `@severidade-media`, `@severidade-baixa`)
- **`@bug-conhecido`** nos testes que falham por causa de um defeito já identificado

## Autoria

**Vinicius Claret**, QA de software em formação.

- LinkedIn: https://www.linkedin.com/in/viniciusclaret/
