import IssueDetailEdit from "../pages/IssueDetailEdit";

describe('Issue details editing', () => {
    beforeEach(() => {
      cy.visit('https://jira.ivorreic.com/project/board');
      cy.url().should('eq', 'https://jira.ivorreic.com/project/board').then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });

    it('Should update type, status, assignees, reporter, priority', () => {
        IssueDetailEdit.editIssueDetails('Bug','Done','Lord Gaben','Pickle Rick','Medium');

        getIssueDetailsModal().within(() => {
            IssueDetailEdit.selectAssignees('Baby Yoda');
        });
    });
  
    it('Should update title, description', () => {
        const title = 'TEST_TITLE';
        const description = 'TEST_DESCRIPTION';
    
        IssueDetailEdit.editIssueTitleAndDescription(title, description);
    });

    it.skip('Should delete an issue successfully', () => {
        IssueDetailEdit.deleteIssue();
    });

    const priorities = ['Lowest','Low','Medium','High','Highest']
    for (let priority1 of priorities){
        it.skip('Check all the saving priorities ${priority1}', () => {
            IssueDetailEdit.getIssueDetailsModal().within(() => {
                //IssueDetailEdit.selectPriority(priority1);
                cy.get(this.priority).invoke(text).then((extractedText) => {
                    if (extractedText != priority) {
                        this.clickOnIssuePriorityField(priority);
                        this.chooseIssuePriority(priority);
                        this.ensureIssuePriorityIsUpdatedTo(priority);
                    }
                });
            });
        });
    }
  
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
});