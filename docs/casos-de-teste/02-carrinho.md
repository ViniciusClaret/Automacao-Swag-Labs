# Carrinho

> Visualização, remoção e navegação do carrinho

**URL sob teste:** https://www.saucedemo.com/  
**Total de casos:** 13 <br>
**Versão Google Chrome:** 154.0.8037.93 <br>
**Sistema operacional:** Windows 11 <br>
**Testes realizados por:** Vinicius Claret <br>
**Data de execução:** 06/10/2026 <br>

**Critério de prioridade:**

- **Alta:** caminho feliz do carrinho (ver, remover, continuar comprando e seguir ao checkout)<br>
- **Média:** comportamentos alternativos (detalhe do produto, remover todos os itens, recarregar a página)<br>
- **Baixa:** casos de borda e persistência fora do fluxo normal (duplicidade de item, logout e novo login)<br>

Legenda de status: ⬜ Não executado · ✅ Passou · ❌ Falhou · ⚠️ Bloqueado

| ID | Título | Pré-condições | Passos | Resultado esperado | Prioridade | Status |
|----|--------|---------------|--------|--------------------|:----------:|:------:|
| CAR-001 | Abrir o carrinho pelo ícone | Logado como `standard_user`; carrinho vazio | 1. Clicar no ícone do carrinho | Abre o carrinho, título "Your Cart", colunas QTY e Description, botões "Continue Shopping" e "Checkout" | Alta | ✅ |
| CAR-002 | Item adicionado aparece no carrinho | Logado como `standard_user`; Backpack adicionado | 1. Abrir o carrinho | Backpack listado com quantidade 1, nome, descrição e preço $29.99 | Alta | ✅ |
| CAR-003 | Vários itens listados | Logado; Backpack, Bike Light e Onesie adicionados | 1. Abrir o carrinho | Exatamente os 3 itens adicionados, com dados corretos | Alta | ✅ |
| CAR-004 | Remover item no carrinho | Logado; 2 itens no carrinho | 1. Abrir o carrinho<br>2. Clicar em "Remove" em um item | Item some da lista e o contador diminui em 1 | Alta | ✅ |
| CAR-005 | Remover todos os itens | Logado; 1 item no carrinho | 1. Abrir o carrinho<br>2. Remover o item | Carrinho vazio, sem contador no ícone | Média | ✅ |
| CAR-006 | Continue Shopping | Logado; 1 item no carrinho | 1. Abrir o carrinho<br>2. Clicar em "Continue Shopping" | Volta à lista de produtos mantendo o item no carrinho | Alta | ✅ |
| CAR-007 | Abrir detalhe a partir do carrinho | Logado; 1 item no carrinho | 1. Abrir o carrinho<br>2. Clicar no nome do item | Abre a página de detalhe com a descrição do produto | Média | ✅ |
| CAR-008 | Ir para o checkout | Logado; 1 item no carrinho | 1. Abrir o carrinho<br>2. Clicar em "Checkout" | Abre página para preencher nome e Postal Code | Alta | ✅ |
| CAR-009 | Checkout com carrinho vazio | Logado como `standard_user`; carrinho vazio | 1. Abrir o carrinho vazio<br>2. Clicar em "Checkout" | O checkout é bloqueado e o sistema exibe mensagem informando que o carrinho está vazio. | Média | ❌ |
| CAR-010 | Contador consistente entre páginas | Logado; 2 itens adicionados | 1. Navegar por listagem, detalhe, carrinho e checkout | Contador exibe 2 em todas as telas em que aparece | Alta | ✅ |
| CAR-011 | Carrinho mantido após recarregar | Logado; 2 itens no carrinho | 1. Abrir o carrinho<br>2. Pressionar F5 | Os 2 itens continuam listados | Média | ✅ |
| CAR-012 | Não duplicar o mesmo item | Logado; Backpack adicionado | 1. Voltar à listagem<br>2. Observar o botão do Backpack<br>3. Abrir o carrinho | O botão do Backpack exibe "Remove" e não permite adicionar uma segunda unidade; no carrinho, QTY continua 1. | Baixa | ✅ |
| CAR-013 | Carrinho após logout e novo login | Logado; 1 item no carrinho | 1. Fazer logout<br>2. Logar novamente com o mesmo usuário<br>3. Abrir o carrinho | O item adicionado antes do logout continua listado no carrinho e a mesma quantidade. | Baixa | ✅ |