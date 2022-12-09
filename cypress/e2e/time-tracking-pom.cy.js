import TimeTrackingGao from "../pages/TimeTracking";

describe('creating issues', () => {
    beforeEach(() => {
        cy.visit('https://jira.ivorreic.com/project/board');
        cy.url().should('eq', 'https://jira.ivorreic.com/project/board').then((url) => {
        });

        // Creating an issue to test the time tracking function
        const issueType = 'Bug';
        const title = 'Title_For_Testing';
        const description = 'This is the description';
        TimeTrackingGao.createAnIssue(issueType, title, description);
    });


    it.skip('Time tracking 1 (add estimation)', () => {
        const title = 'Title_For_Testing';
        let number = '10';
        TimeTrackingGao.addEstimationTime(title, number);
    });

    it('Time tracking 2 (update estimation)', () => {
        const title = 'Title_For_Testing';
        let number = 20;
        TimeTrackingGao.updateEstimationTime(title, number);
        TimeTrackingGao.removeEstimationTime(title, number);
    });

    it('log time and remove logged time', () => {
        const title = 'Title_For_Testing'
        let number1 = 2;
        let number2 = 5
        TimeTrackingGao.logTime(title, number1, number2);
        TimeTrackingGao.removeLoggedTime(number1, number2);
    });
});