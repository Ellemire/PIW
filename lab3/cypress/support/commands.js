// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add('loginTestUser', () => {
  cy.request({
    method: 'POST',
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1XygQQmX9r3fmW1uG8u32r8xpDXUGuGM`,
    body: {
      email: 'test_user@example.com',
      password: 'test1234',
      returnSecureToken: true,
    },
  }).then(({ body }) => {
    const { idToken, localId, email } = body;

    cy.visit('http://localhost:5173', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'firebase:authUser:yggdrasil-bookstore',
          JSON.stringify({
            uid: localId,
            email: email,
            stsTokenManager: {
              accessToken: idToken,
              expirationTime: Date.now() + 3600 * 1000,
            },
          })
        );
      },
    });
  });
});
