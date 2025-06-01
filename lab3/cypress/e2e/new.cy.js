describe('Dodawanie nowej książki', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/test-login');
    cy.contains('Zaloguj test_user').click();
    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('Wyloguj');
  });

  it('dodaje nową książkę i sprawdza, czy jest na liście', () => {
    cy.contains('Dodaj nową pozycję').click(); // <- przycisk/link prowadzący do /new

    // Wypełnij formularz
    cy.get('#title').clear().type('Cypress Test Book');
    cy.get('#author').clear().type('Tester');
    cy.get('#genre').select('fantasy');
    cy.get('#type').select('ebook');
    cy.get('#price').clear().type('42.99');
    cy.get('#publication-date').type('2024-01-01');
    cy.get('#isbn').clear().type('9781234567897');
    cy.get('#publisher').clear().type('Test Publishing');
    cy.get('#pages').clear().type('333');
    cy.get('#quantity').clear().type('5');
    cy.get('#description').type('Opis testowej książki dodanej przez Cypress');

    // Submit
    cy.get('form').submit();

    // Sprawdź, że użytkownik jest przekierowany na stronę główną
    cy.url().should('eq', `http://localhost:5173/`);

    // Poczekaj na załadowanie książek
    cy.contains('.book-item', 'Cypress Test Book').should('exist');
  });
});
