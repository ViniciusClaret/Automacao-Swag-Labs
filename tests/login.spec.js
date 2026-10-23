// Automação dos 21 casos de login (docs/casos-de-teste/01-login.md).
// Estilo básico: cada teste é independente e repete os próprios passos.
const { test, expect } = require('@playwright/test');

test('LOG-01 - Login com usuário válido @prioridade-alta @severidade-critica', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.inventory_item')).toHaveCount(6);
});

test('LOG-02 - Login enviado com a tecla Enter @prioridade-media @severidade-baixa', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.press('#password', 'Enter');
  await expect(page).toHaveURL(/inventory\.html/);
});

test('LOG-03 - Login com usuário bloqueado @prioridade-alta @severidade-critica', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  await expect(page).not.toHaveURL(/inventory\.html/);
});

test('LOG-04 - Login com problem_user @prioridade-media @severidade-media', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'problem_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory\.html/);
});

test('LOG-05 - Login com performance_glitch_user @prioridade-media @severidade-media', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'performance_glitch_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  // Este usuário demora para entrar, por isso o tempo de espera é maior.
  await expect(page).toHaveURL(/inventory\.html/, { timeout: 15000 });
});

test('LOG-06 - Login com error_user @prioridade-baixa @severidade-baixa', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'error_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory\.html/);
});

test('LOG-07 - Login com visual_user @prioridade-baixa @severidade-baixa', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'visual_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory\.html/);
});

test('LOG-08 - Login com usuário e senha vazios @prioridade-alta @severidade-media', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});

test('LOG-09 - Login com senha vazia @prioridade-alta @severidade-media', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
});

test('LOG-10 - Login com usuário vazio @prioridade-alta @severidade-media', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});

test('LOG-11 - Login com senha incorreta @prioridade-alta @severidade-critica', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'senha_incorreta');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('LOG-12 - Login com usuário inexistente @prioridade-alta @severidade-alta', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'usuario_invalido');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('LOG-13 - Usuário diferencia maiúsculas de minúsculas @prioridade-media @severidade-media', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'STANDARD_USER');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('LOG-14 - Senha diferencia maiúsculas de minúsculas @prioridade-media @severidade-alta', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'SECRET_SAUCE');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('LOG-15 - Usuário com espaço no final @prioridade-baixa @severidade-baixa', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user ');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('LOG-16 - Destaque visual dos campos em erro @prioridade-baixa @severidade-baixa', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('#user-name')).toHaveClass(/error/);
  await expect(page.locator('#password')).toHaveClass(/error/);
  await expect(page.locator('.error_icon').first()).toBeVisible();
});

test('LOG-17 - Senha mascarada @prioridade-alta @severidade-alta', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#password', 'secret_sauce');
  await expect(page.locator('#password')).toHaveAttribute('type', 'password');
});

test('LOG-18 - Acesso direto ao inventário sem login @prioridade-alta @severidade-critica', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
});

test('LOG-19 - Sessão mantida após recarregar a página @prioridade-media @severidade-media', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory\.html/);
  await page.reload();
  await expect(page).toHaveURL(/inventory\.html/);
});

test('LOG-20 - Nova mensagem substitui a anterior @prioridade-baixa @severidade-baixa', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
  await page.fill('#user-name', 'standard_user');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
});

test('LOG-21 - Várias tentativas inválidas seguidas @prioridade-media @severidade-media', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  for (let i = 0; i < 5; i++) {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'senha_incorreta');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  }
  // O sistema não bloqueia por tentativas: o login válido logo em seguida é aceito.
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory\.html/);
});
