//  * Workshop #17

 import IssueDetailEdit from "../pages/IssueDetailEdit";

 describe('Issue details editing', () => {
     beforeEach(() => {
       cy.visit('https://jira.ivorreic.com/project/board');
       cy.url().should('eq', 'https://jira.ivorreic.com/project/board').then((url) => {
         cy.visit(url + '/board');
         cy.contains('This is an issue of type: Task.').click();
       });
     });
 
     // Test from workshop #16
     //Question: Where is it not necessary to srtart within the modal? My test failed, because the status "Done" is not found. 
     //The "Done" status is not chosen though the previous test runs successfully
     it('Check that following issues have text', () => {
         const issues1 = [
             ['[data-testid="select:status"]', 'Done'],
             ['[data-testid="select:reporter"]','Pickle Rick'],
             ['[data-testid="select:priority"]','Medium']
         ]
     
         for (const [property, value] of issues1) {
             IssueDetailEdit.getIssueDetailsModal().within(() => {
                 cy.get(property).should('have.text',value);
             });
 
         const issues2 = [
             ['[data-testid="select:type"]','Story'],
             ['[data-testid="select:assignees"]','Baby Yoda'],
             ['[data-testid="select:assignees"]','Lord Gaben']
         ]
 
         for (const [property, value] of issues2) {
             IssueDetailEdit.getIssueDetailsModal().within(() => {
                 cy.get(property).should('contain',value);
             }); 
         }
         }
     });

//  * Task #3
//  * Topic: String.trim()
//  * 1. Create new spec file with creating new issue
//  * 2. Define issue title as a variable and add multiple spaces between words
//  *      Example: const title = 'Hello             world';
//  * 3. Create issue with this title, save the issue and observe it on the board (issue on the board will not have extra spaces and be trimmed)
//  * 4. Invoke issue title from the board and assert it with variable defined, but remove extra spaces from it
//  *
//  * Expected result:
//  * 1. You will have a test that validates, that issue title on the board does not have extra spaces in it
//  */
 
     // Tests from workshop #17
     it('Check that ...', () => {
         
         
     });

 
    //  * Task #2
    //  * Topic: Regex
    //  * 1. Create new spec file with opening or creating new issue
    //  * 2. Open the created issue and invoke assignee name
    //  * 3. Assert that it has only characters in it (no numbers, no special characters etc).
    //  * Regex to be used: /^[A-Za-z]*$/
    //  *
    //  * Expected result:
    //  * 1. You will have a test that validates assignee matching defined characters
    //  *
     it('Check that the name of a reporter or an assignee has only characters', () => {
         const reporter1 = 'Lord Gaben'
         getIssueDetailsModal().within(() => {
          //IssueDetailEdit.selectReporter(reporter1).invoke('text').should('match',/^[A-Za-z ]*$/); Cannot read properties of undefined (reading 'invoke')???
            cy.get('[data-testid="select:reporter"]').invoke('text').should('match',/^[A-Za-z ]*$/);
            cy.get('[data-testid="select:assignees"]').invoke('text').should('match',/^[A-Za-z ]*$/);
         });
     });
 

    //  * Task #1
    //  * Topic: Array.length + Array.push()
    //  * 1. Create new spec file, which would validate how many options for priorities Jira issue have
    //  * 2. Access the field of priorities
    //  * 3. Invoke values from the field and save them into an Array
    //  * 4. Assert invoked array to be the same length as we expect it to be
    //  * 5. Invoked array will have initially 4 elements in it, push fifth element from initially selected priority value
    //  *
    //  * Expected result:
    //  * You have a test that validates values in issue priorities
    //  * Finished array must have 5 elements: [“Lowest“, “Low“, “Medium”, “High“, “Highest”]
     const numberOfPriorities = 5;
 
     it.only('Check that priority field has ${numberOfPriorities} values', () => {
         let priorities = []
 
         //add chosen priority to the list 
         cy.get('[data-testid="select:priority"]').invoke('text').then((extractedPriority) => {
             priorities.push(extractedPriority);
         })
         
         //priorities.push(IssueDetailEdit.selectPriority('Medium')); what i originally was thinking
         // Click to open priority dropdown options
         cy.get('[data-testid="select:priority"]').click();
 
         // Get the number of options from the page
         cy.get('[data-testid="select:priority"]').then(($options) => {
             const itemCount = Cypress.$($options).length;
         })
         
         // Iterate through the options and add text from each other to the list
         for (let index = 0; index < itemCount; index++) {
             cy.get('[data-testid="select:priority"]').eq(index).invoke('text').then((extractedPriority) => {
                 priorities.push(extractedPriority);
             })
         }
 
         if (index == (itemCount-1) ) {
             cy.log('The total calculated array length: ' + priorities.length);
             expect(priorities.length).to.be.eq(numberOfPriorities);
         }
     });
   
     const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
 });