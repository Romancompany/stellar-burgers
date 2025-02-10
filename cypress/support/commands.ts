/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('prepare', (email: string, password: string) => {
  // установили размер экрана
  cy.viewport(1250, 1150);
  // перехват loginUserApi
  cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as(
    'postLogin'
  );
  // перехват getIngredientsApi
  cy.intercept('api/ingredients', { fixture: 'ingredients.json' });
  // токен
  cy.intercept('api/auth/token', { fixture: 'token.json' });
  // /auth/user
  cy.intercept('api/auth/user', { fixture: 'user.json' });
  // перехват заказа
  cy.intercept('api/orders', { fixture: 'orders.json' }).as('postOrder');
  // установить токен в куках
  cy.setCookie(
    'accessToken',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODY2NWIwMTMzYWNkMDAxYmU0YTM2YiIsImlhdCI6MTczODg2MTc0MCwiZXhwIjoxNzM4ODYyOTQwfQ.b6V_mQQETT8Entr6vLNiKF_kxTHILyWefFpkbU06IyE'
  );
  //
  window.localStorage.setItem(
    'refreshToken',
    JSON.stringify(
      '7020d26473490fd17edfb114b6c4dfd00d44e2cb0008e708ead13049a0264f21a946301c8e7f37e6'
    )
  );

  // логинимся
  cy.visit('http://localhost:4000/login');
  cy.get(`[data-cy=email_input]`).type(`${email}`);
  cy.get(`[data-cy=password_input]`).type(`${password}{enter}`);
  cy.wait('@postLogin').then(({ response }) => {
    expect(response.statusCode).to.eq(200);
    expect(response.body.user.name).to.eq('Николаев Роман Борисович');
  });
});

Cypress.Commands.add('raiseModalOpen', () => {
  cy.get('#modals')
    .find('div')
    .should(($div) => {
      if ($div.length !== 0) {
        throw new Error('Открыто модальное окно');
      }
    });
});

Cypress.Commands.add('raiseModalClose', () => {
  cy.get('#modals')
    .find('div')
    .should(($div) => {
      if ($div.length === 0) {
        throw new Error('Не открыто модальное окно');
      }
    });
});

Cypress.Commands.add('clearToken', () => {
  cy.clearCookie('accessToken');
  cy.clearLocalStorage('refreshToken');
});
