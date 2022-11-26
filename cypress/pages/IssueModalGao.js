class IssueModal{
    constructor(){
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.issueType = '[data-testid="select:type"]';
        this.issueStory = '[data-testid="select-option:Story"]';
        this.issueTitle = 'input[name="title"]';
        this.issueDescription = '.ql-editor';
        this.assignee = '[data-testid="select:userIds"]';
        this.assigneeGaben = '[data-testid="select-option:Lord Gaben"]';
        this.submitButton = 'button[type="submit"]';

        this.backlog = '[data-testid="board-list:backlog';
        this.listIssue = '[data-testid="list-issue"]';
        this.avatar = '[data-testid="icon:story"]';
    }

    getIssueModal() {
       return cy.get(this.issueModal);
    }

    selectIssueType() {
        cy.get(this.issueType).click('bottomRight');
        cy.get(this.issueStory)
          .trigger('mouseover')
          .trigger('click');
    }
    editTitle(title) {
        cy.get(this.issueTitle).type(title);
    }

    editDescription(description) {
        cy.get(this.issueDescription).type(description);
    }

    selectAssignee() {
        cy.get(this.assignee).click('bottomRight');
        cy.get(this.assigneeGaben).click();
    }

    submitIssue() {
        cy.get(this.submitButton).click();
    }

    createIssue(title, description) {
        this.getIssueModal.within(() => {
            this.selectIssueType();
            this.editTitle(title);
            this.editDescription(description);
            this.selectAssignee();
            this.submitButton();
        })
    };
}

class TitleVilidation {
    constructor() {
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.reporter = '[data-testid="select:reporterId"]';
        this.submitButton = 'button[type="submit"]';
        this.titleFieldError = '[data-testid="form-field:title"]';
    }

    getIssueModal() {
        return cy.get(this.issueModal);
    }

    selectReporter() {
        cy.get(this.reporter).children();
    }

    checkErrorMessage() {
        return cy.get(this.titleFieldError).scrollIntoView().should('contain', 'This field is required');
    }

    validateTitleFieldError() {
        this.getIssueModal.within(() => {
            this.selectReporter();
            cy.get(this.submitButton).click();
            this.checkErrorMessage();
        })
    }
}

export default new IssueModal();