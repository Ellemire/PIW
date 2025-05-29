describe('Strona główna księgarni', () => {
  beforeEach(() => {
    // Odwiedź stronę przed każdym testem
    cy.visit('http://localhost:5173')
  })

  it('1. Powinna wyświetlać listę książek', () => {
    // Sprawdź czy lista książek jest widoczna
    cy.get('.book-grid').should('exist')
    // Sprawdź czy są jakieś książki na liście
    cy.get('.book-item').should('have.length.greaterThan', 0)
  })

  it('2. Powinna filtrować książki po tytule', () => {
    // Wpisz tekst w pole wyszukiwania tytułu
    cy.get('#title').type('Book')
    
    // Sprawdź czy wyświetlane książki zawierają w tytule "Hobbit"
    cy.get('.book-item').each(($el) => {
      cy.wrap($el).find('h3').should('contain.text', 'Book')
    })
  })

  it('3. Powinna sortować książki po cenie malejąco', () => {
    // Wybierz sortowanie po cenie malejąco
    cy.get('#sort').select('price-desc')
    
    // Pobierz ceny wszystkich książek
    const prices = []
    cy.get('.price').each(($el) => {
      const priceText = $el.text().replace(' zł', '').replace(',', '.')
      prices.push(parseFloat(priceText))
    }).then(() => {
      // Sprawdź czy ceny są posortowane malejąco
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).to.be.at.least(prices[i + 1])
      }
    })
  })
})