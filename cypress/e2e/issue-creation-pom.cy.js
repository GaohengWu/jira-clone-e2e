import IssueModalGao from "../pages/IssueModalGao";

describe('Issue create', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.intercept('GET','**/currentUser').as('currentUserApiRequest')
      cy.url().should('eq', 'http://34.247.67.214:8080/project').then((url) => {
        cy.wait('@currentUserApiRequest')
        cy.visit(url + '/settings?modal-issue-create=true');
      });
    });

    let issueModal = new IssueModal();

    it('Should create an issue and validate it successfully', () => {
        IssueModal.createIssue('This is the title', 'This is the description');
    });

    it('Should validate title is required field if missing', () => {
        IssueModal.validateTitleFieldError();
      });
  });
  