describe('Gestion des étudiants E2E', () => {
  const apiGateway = 'http://localhost:8080';
  const frontendUrl = 'http://localhost:3000';

  beforeEach(() => {
    // On s'assure d'être sur la page des étudiants
    cy.visit(`${frontendUrl}/etudiants`);
  });

  it('devrait afficher la liste et créer un nouvel étudiant', () => {
    // 1. Vérifier l'affichage
    cy.contains('Gestion des Étudiants').should('be.visible');

    // 2. Naviguer vers le formulaire (on suppose qu'il y a un bouton ou que c'est la même page)
    // Ici on va simuler le remplissage s'il y a un formulaire d'ajout
    cy.get('input[placeholder*="Nom"]').first().type('Jean Testeur');
    cy.get('input[placeholder*="CIN"]').first().type('99887766');
    cy.get('input[type="email"]').first().type('jean.testeur@example.com');
    
    // 3. Soumettre
    cy.get('button').contains('Valider').click();

    // 4. Vérifier le succès (Alerte ou apparition dans la liste)
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Étudiant enregistré avec succès !`);
    });
    
    cy.contains('Jean Testeur').should('be.visible');
  });

  it('devrait pouvoir supprimer un étudiant', () => {
    cy.contains('Jean Testeur').parent().find('button').contains('Supprimer').click();
    cy.contains('Jean Testeur').should('not.exist');
  });
});
