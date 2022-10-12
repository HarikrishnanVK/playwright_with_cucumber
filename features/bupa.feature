Feature: Tests related to Bupa health insurance site

    Feature Description : To test basic functionalities of bupa health insurance site

    @bupaTest
    Scenario: Verify the Bupa leadership display the relevant news

        Given I am on Bupa homepage
        When  I mouse hover on 'our-bupa' link
        Then  I see the sub links of our Bupa
        And   I click 'Leadership' from sub links
        Then  I see the page title as 'Leadership | Bupa.com'
        When  I search for 'James lenton'
        Then  I see results about 'James lenton'
        When  I click first url from the results
        Then  I see an article about 'James lenton' is displayed

    @bupaTest @bupaSocialMedia
    Scenario Outline: Verify Bupa's service link searches

        Given I am on Bupa homepage
        When  I mouse hover on 'our-bupa' link
        Then  I see the sub links of our Bupa
        And   I click '<LinkName>' from sub links
        Then  I see the page title as '<LinkName>'
        When  I mouse hover on 'what-we-do' link
        And   I click '<LinkName2>' from sub links
        Then  I see the page title as '<LinkTitle>'
        When  I mouse hover on 'sustainability' link
        And   I click '<LinkName3>' from sub links
        Then  I see the page title as '<LinkName3>'
        When  I mouse hover on 'news' link
        And   I click '<LinkName4>' from sub links
        Then  I see the page title as '<LinkName4>'
        When  I click on '<BupaServiceSite>' link
        Then  I see the page title as '<ServicePageTitle>'
        When  I search for 'Bupa'
        Then  I see results about 'Bupa'
        When  I click first url from the results
        Then  I see an article about 'Bupa' is displayed

        Examples:
            | BupaServiceSite          | ServicePageTitle         | LinkName                | LinkName2           | LinkTitle                                       | LinkName3                          | LinkName4            |
            | sitemap                  | Sitemap                  | Our strategy            | Our markets         | Our markets                                     | Our Approach to Sustainability     | Stories and insights |
            | accessibility            | Accessibility            | Culture and values      | Health insurance    | Private Health Insurance, Medical providers     | Environment and climate action     | Press releases       |
            | cookie-policy            | Cookie policy            | Inclusion and diversity | Healthcare services | Health services, Dental Centers, Health Clinics | eco-Disruptive                     | Regulatory news      |
            | privacy-policy           | Privacy policy           | Leadership              | Aged care           | Care and support for the elderly                | Contributing to communities        | Media library        |
            | modern-slavery-statement | Modern slavery statement | Governance              | Health insurance    | Private Health Insurance, Medical providers     | Partnerships with Paralympic teams | Stories and insights |
            | scam-warning             | Scam warning             | Our strategy            | Aged care           | Care and support for the elderly                | Responsible business conduct       | Press releases       |


