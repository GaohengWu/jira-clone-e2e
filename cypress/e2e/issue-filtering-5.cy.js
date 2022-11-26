/**
 * Workshop #16
 * We are locating issues here based on one enter ('multiple assignees')
 * Think and create a loop using "forEach", which would allow us to test multiple enters without creating a new instance of test for that
 * Use object with multiple rows for solving this task.
 *
 * Expected result:
 * 1. You will have object with multiple entries
 * 2. You are running test X amount of times without creating new instance of test (using "it")
 */

describe('Issue filtering', () => {
  beforeEach(() => {
    cy.visit('https://jira.ivorreic.com/project/board');
  });

  it('Should filter issues by title', () => {
    getSearchInput().debounced('type', 'multiple assignee');
    cy.get('[data-testid="list-issue"]').should('have.length', '1');
  });

  const issuesToValidate = [
    {issueName:'task', expectedNumberOfIssues:'1'},
    {issueName:'you can', expectedNumberOfIssues:'2'},
    {issueName:'an issue', expectedNumberOfIssues:'3'}
  ]

  for (let issue of issuesToValidate) {
    it('Validate issue numbers by searching', () => {
      getSearchInput().debounced('type', issue.issueName);
      cy.get('[data-testid="list-issue"]').should('have.length', issue.expectedNumberOfIssues)
    });
  }
  
  const getSearchInput = () => cy.get('[data-testid="board-filters"]').find('input');

  /**
   * New tests can be created here for practice
   * 1. Filter by avatar
   * 2. Filter by "Only My Issues" button
   * 3. Filter by "Recently Updated" button
   */

  
  const issuesByAvatar = [
    {issueAssignee:'Lord Gaben', expectedNumberOfIssues:'2'},
    {issueAssignee:'Baby Yoda', expectedNumberOfIssues:'2'},
    {issueAssignee:'Pickle Rick', expectedNumberOfIssues:'2'}
  ]

  for (let issue1 of issuesByAvatar) {
    it.only('Validate issue numbers by Avatar', () => {
      cy.get('[class="sc-dqBHgY hQtGun"]').contains(issue1.issueAssignee ).click()
      cy.get('[data-testid="list-issue"]').should('have.length', issue1.expectedNumberOfIssues)
    });
  }



});
