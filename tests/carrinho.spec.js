// Automação dos 13 casos de carrinho

const { test, expect } = require('@playwright/test');

test('CAR-001 - Abrir o carrinho pelo ícone @prioridade-alta @severidade-alta', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.title')).toHaveText('Your Cart');
  await expect(page.locator('.cart_quantity_label')).toBeVisible();
  await expect(page.locator('.cart_desc_label')).toBeVisible();
  await expect(page.locator('#continue-shopping')).toBeVisible();
  await expect(page.locator('#checkout')).toBeVisible();
});

test('CAR-002 - Item adicionado aparece no carrinho @prioridade-alta @severidade-critica', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('.cart_quantity')).toHaveText('1');
  await expect(page.locator('.inventory_item_desc')).not.toBeEmpty();
  await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');
});

test('CAR-003 - Vários itens listados @prioridade-alta @severidade-alta', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#add-to-cart-sauce-labs-bike-light');
  await page.click('#add-to-cart-sauce-labs-onesie');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toHaveCount(3);
  await expect(page.locator('.inventory_item_name').nth(0)).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Bike Light');
  await expect(page.locator('.inventory_item_name').nth(2)).toHaveText('Sauce Labs Onesie');
});

test('CAR-004 - Remover item no carrinho @prioridade-alta @severidade-alta', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#add-to-cart-sauce-labs-bike-light');
  await page.click('.shopping_cart_link');
  await page.click('#remove-sauce-labs-backpack');
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('CAR-005 - Remover todos os itens @prioridade-media @severidade-media', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('.shopping_cart_link');
  await page.click('#remove-sauce-labs-backpack');
  await expect(page.locator('.cart_item')).toHaveCount(0);
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});

test('CAR-006 - Continue Shopping @prioridade-alta @severidade-alta', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('.shopping_cart_link');
  await page.click('#continue-shopping');
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('CAR-007 - Abrir detalhe a partir do carrinho @prioridade-media @severidade-media', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('.shopping_cart_link');
  await page.click('.inventory_item_name');
  await expect(page).toHaveURL(/inventory-item\.html/);
  await expect(page.locator('.inventory_details_desc')).not.toBeEmpty();
});

test('CAR-008 - Ir para o checkout @prioridade-alta @severidade-alta', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('.shopping_cart_link');
  await page.click('#checkout');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await expect(page.locator('#first-name')).toBeVisible();
  await expect(page.locator('#last-name')).toBeVisible();
  await expect(page.locator('#postal-code')).toBeVisible();
});

test('CAR-009 - Checkout com carrinho vazio @prioridade-media @severidade-media @bug-conhecido', async ({ page }) => {
  // BUG CONHECIDO: este caso falhou na execução manual de 06/10/2026
  // (docs/casos-de-teste/02-carrinho.md). O teste descreve o comportamento
  // CORRETO (checkout bloqueado) e por isso aparece como falhado enquanto o bug existir.
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('.shopping_cart_link');
  await page.click('#checkout');
  await expect(page).toHaveURL(/cart\.html/);
});

test('CAR-010 - Contador consistente entre páginas @prioridade-alta @severidade-media', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#add-to-cart-sauce-labs-bike-light');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  // Na listagem há 6 produtos, então clicamos no primeiro nome da lista.
  await page.locator('.inventory_item_name').first().click();
  await expect(page).toHaveURL(/inventory-item\.html/);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await page.click('#checkout');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

test('CAR-011 - Carrinho mantido após recarregar @prioridade-media @severidade-media', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#add-to-cart-sauce-labs-bike-light');
  await page.click('.shopping_cart_link');
  await page.reload();
  await expect(page.locator('.cart_item')).toHaveCount(2);
});

test('CAR-012 - Não duplicar o mesmo item @prioridade-baixa @severidade-baixa', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();
  await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toHaveCount(0);
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.cart_quantity')).toHaveText('1');
});

test('CAR-013 - Carrinho após logout e novo login @prioridade-baixa @severidade-baixa', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.cart_quantity')).toHaveText('1');
});
