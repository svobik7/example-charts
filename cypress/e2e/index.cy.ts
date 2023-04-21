describe('Index Page', () => {
  it('should render header', () => {
    cy.visit('/');
    cy.get('h3').should('contain', 'App Title');
  });

  it('should render toolbar', () => {
    cy.visit('/');
    cy.get('h4').should('contain', 'Covid19 statistics');

    cy.get('button').should('contain', 'Export to PDF');
    cy.get('button').should('contain', 'Notes');
    cy.get('button').should('contain', 'Filter');
  });

  it('should render cards', () => {
    cy.visit('/');
    cy.get('h4').should('contain', 'Covid19 statistics');

    cy.get('.ant-card-head-title').should('contain', 'Cases by years');
    cy.get('.ant-card-head-title').should('contain', 'Cases in total');
  });

  describe('Favorites', () => {
    it('should mark chart as favorite', () => {
      cy.intercept('/api/trpc/putFavorite?batch=1', cy.spy().as('putFavorite'));
      cy.visit('/');

      cy.get('@putFavorite').should('not.have.been.called');

      cy.get('[data-cy="btn-favorite-wrapper"]')
        .first()
        .find('button')
        .as('button');

      cy.get('@button')
        .should('have.css', 'color')
        .and('eq', 'rgba(0, 0, 0, 0.45)');

      cy.get('@button').click();

      cy.get('@putFavorite').should('have.been.calledOnce');

      cy.get('@button')
        .should('have.css', 'color')
        .and('eq', 'rgb(89, 155, 143)');
    });
  });
});
