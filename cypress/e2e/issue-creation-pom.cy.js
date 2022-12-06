import IssueModalGao from "../pages/IssueModalGao";

describe('Issue create', () => {
    beforeEach(() => {
      cy.visit('https://jira.ivorreic.com/project/board');
      cy.url().should('eq', 'https://jira.ivorreic.com/project/board').then((url) => {
        cy.visit(url + '/settings?modal-issue-create=true');
      });
    });

    it('Should create an issue and validate it successfully', () => {
        const issueType = 'Bug';
        const title = 'This is the title';
        const description = 'This is the description';
        const assigneeName = 'Baby Yoda';

        IssueModalGao.createIssue(issueType, title, description, assigneeName);
    });

    it('Should validate title is required field if missing', () => {
        const expectedAmountIssues = 4;
        const assigneeName = 'Baby Yoda';
        
        IssueModalGao.ensureIssueIsCreated(expectedAmountIssues, assigneeName);
    });

    it('Check that title field is mandatory', () => {
        IssueModalGao.validateTitleFieldError();
    });

  });
  