class IssueDetailEdit {
    constructor() {
    this.issueDetailsModal = '[data-testid="modal:issue-details"]';
    this.issueType = '[data-testid="select:type"]';
    this.issueStatus = '[data-testid="select:status"]';
    this.assignees = '[data-testid="select:assignees"]';
    this.reporter = '[data-testid="select:reporter"]';
    this.priority = '[data-testid="select:priority"]';
    this.issueTitle = 'textarea[placeholder="Short summary"]';
    this.issueDescription = '.ql-editor';
    this.saveButton = '.dIxFno > .sc-bxivhb';
    this.deleteButton = '[data-testid="icon:trash"]';
    this.deleteConfirm = '[data-testid="modal:confirm"]';
    }

    getIssueDetailsModal() {
        return cy.get(this.issueDetailsModal);
    }

    updateIssueType(issueType) {
        cy.get(this.issueType).click('bottomRight');
        cy.get(`[data-testid="select-option:${issueType}"]`)
          .trigger('mouseover')
          .trigger('click'); 
    }

    updateIssueStatus(issueStatus) {
        cy.get(this.issueStatus).click('bottomRight');
        cy.get(`[data-testid="select-option:${issueStatus}"]`).click();
    }
    
    selectAssignees(assigneeName) {
        cy.get(this.assignees).click('bottomRight');
        cy.get(`[data-testid="select-option:${assigneeName}"]`).click();
    }

    selectReporter(reporterName) {
        cy.get(this.reporter).click('bottomRight');
        cy.get(`[data-testid="select-option:${reporterName}"]`).click();    
    }

    selectPriority(priority) {
        cy.get(this.priority).click('bottomRight');
        cy.get(`[data-testid="select-option:${priority}"]`).click();
    }
    
    editIssueDetails(issueType, issueStatus, assigneeName, reporterName, priority) {
        this.getIssueDetailsModal().within(() => {
            this.updateIssueType(issueType);
            this.updateIssueStatus(issueStatus);
            this.selectAssignees(assigneeName);
            this.selectReporter(reporterName);
            this.selectPriority(priority);
        });
    }

    updateIssueTitle(title) {
        cy.get(this.issueTitle)
        .clear()
        .type(title)
        .blur();
    }

    updateIssueDescription(description) {
        cy.get(this.issueDescription).clear().type(description);
    }

    editIssueTitleAndDescription(title, description) {
        this.getIssueDetailsModal().within(() => {
            this.updateIssueTitle(title);
            cy.get('.ql-snow').click().should('not.exist');
            this.updateIssueDescription(description);
            cy.get(this.saveButton).click().should('not.exist');
            cy.get(this.issueTitle).should('have.text', title);
            cy.get('.ql-snow').should('have.text', description);
        });
    }

    deleteIssue() {
        this.getIssueDetailsModal().within(() => {
            cy.get(this.deleteButton).click();
        });

        cy.get(this.deleteConfirm).contains('button', 'Delete issue').click();
        cy.get(this.deleteConfirm).should('not.exist');
        cy.contains('This is an issue of type: Task.').should('not.exist');
    }
}

export default new IssueDetailEdit();