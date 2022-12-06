class IssueModalGao {
    constructor() {
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.issueType = '[data-testid="select:type"]';
        this.issueTitle = 'input[name="title"]';
        this.issueDescription = '.ql-editor';
        this.reporter = '[data-testid="select:reporterId"]';
        this.assignee = '[data-testid="select:userIds"]';
        this.priority = '[data-testid="select:priority"]';
        this.submitButton = 'button[type="submit"]';
        this.backlog = '[data-testid="board-list:backlog';
        this.listIssue = '[data-testid="list-issue"]';
        this.titleFieldError = '[data-testid="form-field:title"]';
        this.createButton = '[data-testid="icon:plus"]'
        this.trashIcon = '[data-testid="icon:trash"]';
    }

    getIssueModal() {
        cy.get(this.createButton).click()
        cy.get(this.issueModal).should('be.visible');
    }

    selectIssueType(issueType) {
        cy.get(this.issueType).invoke('text').then((extractedText) => {
            if (extractedText != issueType) {
                cy.get(this.issueType).click('bottomRight');
                cy.get(`[data-testid="select-option:${issueType}"]`)
                    .trigger('mouseover')
                    .trigger('click');
            }
        });
    }

    editTitle(title) {
        cy.get(this.issueTitle).type(title);
    }

    editDescription(description) {
        cy.get(this.issueDescription).type(description);
    }

    selectReporter(reporterName) {
        cy.get(this.reporter).click('bottomRight');
        cy.get(`[data-testid="select-option:${reporterName}"]`).click();
    }

    selectAssignee(assigneeName) {
        cy.get(this.assignee).click('bottomRight');
        cy.get(`[data-testid="select-option:${assigneeName}"]`).click();
    }

    selectPriority(priority) {
        cy.get(this.priority).click('bottomRight');
        cy.get(`[data-testid="select-option:${priority}"]`).click();
    }

    submitIssue() {
        cy.get(this.submitButton).click();
    }

    createIssue(issueType, title, description, assigneeName) {
        this.getIssueModal()
        this.selectIssueType(issueType);
        this.editTitle(title);
        this.editDescription(description);
        this.selectAssignee(assigneeName);
        this.submitIssue();
    };

    checkErrorMessage() {
        return cy.get(this.titleFieldError).scrollIntoView().should('contain', 'This field is required');
    }

    ensureIssueIsCreated(expectedAmountIssues, title, assigneeName, iconName) {
        cy.get(this.issueModal).should('not.exist');
        cy.contains('Issue has been successfully created.').should('not.exist')

        cy.get(this.backlog).should('be.visible').and('have.length', '1').within(() => {
            cy.get(this.listIssue).should('have.length', expectedAmountIssues)
                .first()
                .find('p')
                .contains(title)
            cy.get(`[data-testid="avatar:${assigneeName}"]`).should('be.visible');
            cy.get(`[data-testid="icon:${iconName}"]`).should('be.visible');
        });
    }

    validateTitleFieldError() {
        this.getIssueModal()
        cy.get(this.submitButton).click();
        cy.get('input[name="title"]').scrollIntoView()
            .should('have.css', 'border')
            .should('contain', 'rgb(225, 60, 60)');
        this.checkErrorMessage();
    }

    deleteAnIssue() {
        cy.get(this.listIssue).first().click();
        cy.get(this.trashIcon).click();
        cy.get('button').contains('Delete issue').click();
    }
}

export default new IssueModalGao();