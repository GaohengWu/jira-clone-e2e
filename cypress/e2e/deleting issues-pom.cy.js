import IssueModalGao from "../pages/IssueModalGao";
import { faker } from '@faker-js/faker';

describe('creating issues', () => {
    beforeEach(() => {
        cy.visit('https://jira.ivorreic.com/project/board');
        cy.url().should('eq', 'https://jira.ivorreic.com/project/board').then((url) => {
        });
    });


    it('Delete a recently created issue', () => {
        // Create an issue 
        const issueType = 'Bug';
        const title = faker.name.firstName();
        const description = 'This is the description';
        const assigneeName = 'Baby Yoda';
        const iconName = 'arrow-up';

        IssueModalGao.createIssue(issueType, title, description, assigneeName);

        // Check that the issue created displays in the backlog
        const expectedAmountIssues = 5;
        IssueModalGao.ensureIssueIsCreated(expectedAmountIssues, title, assigneeName, iconName);

        // Delete the issue
        IssueModalGao.deleteAnIssue();

        // Check that the issue is not displayed in the backlog anymore
        cy.get('[data-testid="list-issue"]').eq(0).find('p').should('not.be.equal', title);
    });


    it('Start deletion process for recently created issue but cancel it', () => {
        // Create an issue 
        const issueType = 'Bug';
        const title = faker.name.firstName();
        const description = 'This is the description';
        const assigneeName = 'Baby Yoda';
        const iconName = 'arrow-up';

        IssueModalGao.createIssue(issueType, title, description, assigneeName);
        
        // Start the deletion process but cancel it
        cy.get('[data-testid="list-issue"]').first().click();
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]').should('be.visible'); 
        cy.get('button').contains('Cancel').click();

        // The deletion confirmation dialogue is not visible
        cy.get('[data-testid="modal:confirm"]').should('not.exist'); 
        
        // Check that the issue created is still in the backlog
        const expectedAmountIssues = 5;
        IssueModalGao.ensureIssueIsCreated(expectedAmountIssues, title, assigneeName, iconName); 
    });
});