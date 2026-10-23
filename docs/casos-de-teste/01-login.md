# Login

> Autenticação, mensagens de erro e proteção de rotas

**URL sob teste:** https://www.saucedemo.com/  
**Total de casos:** 21 <br>
**Versão Google Chrome:** 154.0.8037.93 <br>
**Sistema operacional:** Windows 11 <br>
**Testes realizados por:** Vinicius Claret <br>
**Data de execução:** 05/10/2026 <br>

**Critério de prioridade:**

- **Alta:** caminho feliz, segurança e validações obrigatórias
- **Média:** comportamentos alternativos e usuários especiais
- **Baixa:** aspectos visuais e casos de borda

Legenda de status: ⬜ Não executado · ✅ Passou · ❌ Falhou · ⚠️ Bloqueado

| ID | Título | Pré-condições | Passos | Resultado esperado | Prioridade | Status |
|--------|---------|----------|----------|-----------------|:-----------------:|:-------:|
| LOG-01 | Login com usuário válido | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Informar `standard_user` em Username<br>2. Informar `secret_sauce` em Password<br>3. Clicar em Login | Redireciona para a pagina de produtos, exibindo 6 produtos | Alta | ✅ |
| LOG-02 | Login enviado com a tecla Enter | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Preencher usuário e senha válidos<br>2. Pressionar Enter com o foco no campo Password | Login realizado e usuário levado para a pagina de produtos | Média | ✅ |
| LOG-03 | Login com usuário bloqueado | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Informar `locked_out_user` e `secret_sauce`<br>2. Clicar em Login | Permanece na tela de login com a mensagem "Epic sadface: Sorry, this user has been locked out." | Alta | ✅ |
| LOG-04 | Login com problem_user | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Informar `problem_user` e `secret_sauce`<br>2. Clicar em Login | Login realizado com sucesso, redirecionando para lista de produtos. | Média | ✅ |
| LOG-05 | Login com performance_glitch_user | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Informar `performance_glitch_user` e `secret_sauce`<br>2. Clicar em Login e aguardar | Login realizado e usuário levado para a pagina de produtos | Média | ✅ |
| LOG-06 | Login com error_user | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Informar `error_user` e `secret_sauce`<br>2. Clicar em Login | Login realizado com sucesso e tela de produtos exibida | Baixa | ✅ |
| LOG-07 | Login com visual_user | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Informar `visual_user` e `secret_sauce`<br>2. Clicar em Login | Login realizado com sucesso, redirecionando para lista de produtos | Baixa | ✅ |
| LOG-08 | Login com usuário e senha vazios | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Deixar os dois campos vazios<br>2. Clicar em Login | Mensagem "Epic sadface: Username is required" | Alta | ✅ |
| LOG-09 | Login com senha vazia | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Informar `standard_user`<br>2. Deixar Password vazio<br>3. Clicar em Login | Mensagem "Epic sadface: Password is required" | Alta | ✅ |
| LOG-10 | Login com usuário vazio | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Deixar Username vazio<br>2. Informar `secret_sauce`<br>3. Clicar em Login | Mensagem "Epic sadface: Username is required" | Alta | ✅ |
| LOG-11 | Login com senha incorreta | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Informar `standard_user` e `senha_incorreta`<br>2. Clicar em Login | Mensagem "Epic sadface: Username and password do not match any user in this service" | Alta | ✅ |
| LOG-12 | Login com usuário inexistente | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Informar `usuario_invalido` e `secret_sauce`<br>2. Clicar em Login | Mesma mensagem de credenciais inválidas, sem revelar qual campo está errado | Alta | ✅ |
| LOG-13 | Usuário diferencia maiúsculas de minúsculas | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Informar `STANDARD_USER` e `secret_sauce`<br>2. Clicar em Login | Login rejeitado com a mensagem de credenciais inválidas | Média | ✅ |
| LOG-14 | Senha diferencia maiúsculas de minúsculas | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Informar `standard_user` e `SECRET_SAUCE`<br>2. Clicar em Login | Login rejeitado com a mensagem de credenciais inválidas | Média | ✅ |
| LOG-15 | Usuário com espaço no final | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Informar `standard_user ` (com espaço ao final) e `secret_sauce`<br>2. Clicar em Login | Login rejeitado com a mensagem "Epic sadface: Username and password do not match any user in this service" | Baixa | ✅ |
| LOG-16 | Destaque visual dos campos em erro | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Clicar em Login com campos vazios | Campos com borda vermelha e ícone de erro, além do texto da mensagem | Baixa | ✅ |
| LOG-17 | Senha mascarada | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Digitar `secret_sauce` no campo Password | Caracteres exibidos como pontos, nunca em texto claro | Alta | ✅ |
| LOG-18 | Acesso direto ao inventário sem login | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Acessar `https://www.saucedemo.com/inventory.html` diretamente | Redireciona ao login com a mensagem "Epic sadface: You can only access '/inventory.html' when you are logged in." | Alta | ✅ |
| LOG-19 | Sessão mantida após recarregar a página | Logado como `standard_user` (senha `secret_sauce`) na tela de produtos | 1. Pressionar F5 | Usuário continua logado na tela de produtos | Média | ✅ |
| LOG-20 | Nova mensagem substitui a anterior | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Clicar em Login com campos vazios<br>2. Preencher só o usuário e clicar em Login novamente | Apenas a mensagem mais recente ("Password is required") é exibida, sem juntar com outras notificações | Baixa | ✅ |
| LOG-21 | Várias tentativas inválidas seguidas | Navegador aberto em https://www.saucedemo.com/ com usuário deslogado | 1. Tentar login inválido 5 vezes seguidas<br>2. Tentar login válido em seguida | A Swag Labs nao bloqueia por varias tentativas, mas nao permite login invalido mesmo varias vezes seguidas | Média | ✅ |
