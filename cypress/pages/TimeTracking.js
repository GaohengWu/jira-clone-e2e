class TimeTrackingGao {
    constructor () {
        this.issueType = '[data-testid="select:type"]';
        this.issueTitle = 'input[name="title"]';
        this.issueDescription = '.ql-editor';
        this.submit = 'button[type="submit"]';
        this.createButton = '[data-testid="icon:plus"]';
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.timeTrackingSection = '[class="sc-fhYwyz jxvanQ"]';
        this.enterANumber = 'input[placeholder="Number"]';
        this.closeButton = '[data-testid="icon:close"]';
        this.stopWatch = '[data-testid="icon:stopwatch"]';
        this.timeLoggingModal = '[data-testid="modal:tracking"]';
    }

    getThisIssueModal() {
        cy.get(this.createButton).click();
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

    submitAnIssue() {
        cy.get(this.submit).click();
    }

    createAnIssue(issueType, title, description) {
        this.getThisIssueModal();
        this.selectIssueType(issueType);
        this.editTitle(title);
        this.editDescription(description);
        this.submitAnIssue();
    }

    addEstimationTime(title, number) {
        cy.contains(title).click();
        cy.get(this.timeTrackingSection).should('have.text','No time logged');
        cy.get(this.enterANumber).type(number);
        cy.get(this.enterANumber).should('have.value', number);
        cy.get(this.closeButton).eq(0).click();

        // Reopen the same issue to check that original estimation is saved
        cy.contains(title).click(); // here the result shows empty value
        cy.get(this.enterANumber).should('have.value', number) // here the result shows empty value
    }

    updateEstimationTime(title, number) {
        cy.contains(title).click();
        cy.get(this.enterANumber).clear().type(number);
        cy.get(this.timeTrackingSection).should('contain', number +'h estimated');
        cy.get(this.closeButton).eq(0).click();

        // Reopen the same issue to check that original estimation is updated
        cy.contains(title).click();
        cy.get(this.enterANumber).should('have.value', number)
    }

    removeEstimationTime(title, number) {
        cy.get(this.enterANumber).clear();
        cy.get(this.timeTrackingSection).should('not.contain', number +'h estimated');
        cy.get(this.closeButton).eq(0).click();

        // Reopen the same issue to check that estimation time is removed
        cy.contains(title).click();
        cy.get(this.enterANumber).should('be.empty');
    }

    logTime(title, number1, number2) {
        cy.contains(title).click();
        cy.get(this.stopWatch).click();
        cy.get(this.timeLoggingModal).should('be.visible');
        cy.get(this.enterANumber).eq(1).type(number1);
        cy.get(this.enterANumber).eq(2).type(number2);
        cy.get('button').contains('Done').click();

        cy.get('.sc-rBLzX').should('contain', number1 +'h logged');
        cy.get('.sc-rBLzX').should('not.contain','No time logged');
        cy.get('.sc-rBLzX').should('contain', number2 +'h remaining');
    }

    removeLoggedTime(number1, number2) {
        cy.get(this.stopWatch).click();
        cy.get(this.timeLoggingModal).should('be.visible');
        cy.get(this.enterANumber).eq(1).clear();
        cy.get(this.enterANumber).eq(2).clear();
        cy.get('button').contains('Done').click();

        cy.get('.sc-rBLzX').should('not.contain', number1 +'h logged');
        cy.get('.sc-rBLzX').should('contain','No time logged');
        cy.get('.sc-rBLzX').should('not.contain', number2 +'h remaining');
    }
}

export default new TimeTrackingGao();
    