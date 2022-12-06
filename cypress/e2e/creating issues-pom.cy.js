import IssueModalGao from "../pages/IssueModalGao";
import { faker } from '@faker-js/faker';

describe('creating issues', () => {
  beforeEach(() => {
    cy.visit('https://jira.ivorreic.com/project/board');
    cy.url().should('eq', 'https://jira.ivorreic.com/project/board').then((url) => {
      cy.visit(url + '/board?modal-issue-create=true');
    });
  });


  it('validate that the Short Summary field is mandatory', () => {
    // This is another solution.
    // IssueModalGao.getIssueModal();
    // cy.get('input[name="title"]').clear()
    // cy.get('button[type="submit"]').click();
    // cy.get('input[name="title"]')
    //       .should('have.css','border')
    //       .should('contain','1px solid rgb(225, 60, 60)');
    // IssueModalGao.checkErrorMessage();
    IssueModalGao.validateTitleFieldError();
  });

  it('create an issue - issue type:Task. random data for all needed mandatory fields ', () => {
    const issueType = 'Task';
    const title = faker.address.city();
    const expectedAmountIssues = 5;
    const assigneeName = 'Lord Gaben';
    const iconName = 'arrow-up';

    IssueModalGao.getIssueModal();
    IssueModalGao.selectIssueType(issueType);
    IssueModalGao.editTitle(title);
    cy.get('button[type="submit"]').click();
    IssueModalGao.ensureIssueIsCreated(expectedAmountIssues, title, assigneeName, iconName);
  });

  it('create another issue - random data for all needed mandatory fields ', () => {
    const issueType = 'Bug';
    const priority = 'Highest';
    const reporterName = 'Pickle Rick';
    const title = faker.address.city();
    const expectedAmountIssues = 5;
    const iconName1 = 'bug'; // 'bug' can be replaced by issueType.toLowerCase();
    const iconName2 = 'arrow-up';

    IssueModalGao.getIssueModal();
    IssueModalGao.selectIssueType(issueType);
    IssueModalGao.selectPriority(priority);
    IssueModalGao.selectReporter(reporterName);
    IssueModalGao.editTitle(title);
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]').should('have.length', expectedAmountIssues)
        .first()
        .find('p')
        .contains(title)
      cy.get(`[data-testid="icon:${iconName1}"]`).should('be.visible');
      cy.get(`[data-testid="icon:${iconName2}"]`).should('be.visible');
    });
  });
});