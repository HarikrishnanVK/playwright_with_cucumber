Feature: Playwright demo tests

    Feature Description : To run demo tests with playwright library

    @demo
    Scenario: Verfiy product home page
        Given I am on 'PRODUCT STORE' page
        When  I click categories link
        Then  I see 'Phones', 'Laptops' and 'Monitors' under categories
    
    @demo
    Scenario Outline: Verfy relevant products are displayed
        Given I am on 'PRODUCT STORE' page
        When  I choose '<category>'
        Then  I see '<product>' in display

        Examples:
            | category | product           | 
            | Phones   | Samsung galax s6  | 
            | Laptops  | Sony vaio i5      | 
            | Monitors | Apple monitor 24  |
        
    @demo
    Scenario: Verfiy product home page
        Given I am on 'PRODUCT STORE' page
        When  I click categories link
        Then  I see 'Phones', 'Laptops' and 'Monitor' under categories