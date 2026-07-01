describe('Automatización E2E - Flujo de compra en SauceDemo', () => {
  
  beforeEach(() => {
    // 1. Navegar a la página y autenticarse
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Validar que el login fue exitoso
    cy.url().should('include', '/inventory.html');
  });

  it('Debe agregar productos, completar el formulario y finalizar la compra', () => {
    // 2. Agregar dos productos al carrito
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Validar que el badge del carrito se actualizó a 2
    cy.get('.shopping_cart_badge').should('have.text', '2');

    // 3. Visualizar el carrito
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 2);

    // Iniciar Checkout
    cy.get('[data-test="checkout"]').click();

    // 4. Completar el formulario de compra
    cy.get('[data-test="firstName"]').type('QA');
    cy.get('[data-test="lastName"]').type('Automation');
    cy.get('[data-test="postalCode"]').type('170101');
    cy.get('[data-test="continue"]').click();

    // Validar que estamos en la vista de resumen
    cy.url().should('include', '/checkout-step-two.html');

    // 5. Finalizar la compra hasta la confirmación
    cy.get('[data-test="finish"]').click();
    
    // Aserción final requerida por el ejercicio
    cy.get('.complete-header').should('contain.text', 'Thank you for your order');
  });
});