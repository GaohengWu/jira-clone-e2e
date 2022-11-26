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

    it('Should delete an issue successfully', () => {
        IssueDetailEdit.deleteIssue();
    });

    const priorities = ['Lowest','Low','Medium','High','Highest']
    for (let priority1 of priorities){
        it.skip('Check all the saving priorities ${priority1}', () => {
            IssueDetailEdit.getIssueDetailsModal().within(() => {
                IssueDetailEdit.selectPriority(priority1);
            });
        });
    }

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


    // Tests from workshop #17
    it('Check that the name of a reporter has only characters', () => {
        
        
    });

    it('Check that the name of a reporter has only characters', () => {
       
        
    });


    it('Check that the name of a reporter or an assignee has only characters', () => {
        const reporter1 = 'Lord Gaben'
        getIssueDetailsModal().within(() => {
         //IssueDetailEdit.selectReporter(reporter1).invoke('text').should('match',/^[A-Za-z ]*$/); Cannot read properties of undefined (reading 'invoke')???
           cy.get('[data-testid="select:reporter"]').invoke('text').should('match',/^[A-Za-z ]*$/);
           cy.get('[data-testid="select:assignees"]').invoke('text').should('match',/^[A-Za-z ]*$/);
        });
    });

    
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