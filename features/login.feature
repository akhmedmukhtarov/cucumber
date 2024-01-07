Feature: Login

    Login with valid credentials and fail with invalid credentials


    Scenario: Login with valid credentials
    Given You are in login page
    When Insert valid credentials and click login
    Then Login should be successful


    Scenario: Login with invalid credentials
    Given Logout from account
    When Insert invalid credentials and click login
    Then  Login should fail