const webdriver = require("selenium-webdriver");
var firefox = require('selenium-webdriver/firefox');
var assert = require('assert');
const { resolve } = require("path");

const driver = new webdriver.Builder()
    .forBrowser("firefox")
    .build();

describe("Test Suite Login + Chat", function(){
  
    before(function(done){
        
        // do something before test suite execution
        // no matter if there are failed cases
        driver
            .get("http://localhost:3000/");
        driver.manage().setTimeouts( { implicit: 5000 } ).then(function(){done()});
    
    });
 
    after(function(){
 
        // do something after test suite execution is finished
        // no matter if there are failed cases
        return driver.quit();

 
    });
    
    beforeEach(function(){
        
        // do something before test case execution
        // no matter if there are failed cases
    
    });
 
    afterEach(function(){
 
        // do something after test case execution is finished
        // no matter if there are failed cases
 
    });
  
    it("Test-1 Correct Title", function(done){
        driver.getTitle()
            .then(function(title) {
                assert( title.match('Book Shop'))
                done();
            })
            .catch(err => done(err));
       
    });

    //
    it("Test-2 Check chat access", function(done){
        driver
            .findElement(webdriver.By.id("chat"))
            .getText("value")
            .then(function(header) {
                assert( header.match("You Must Be Logged In To Use The Chat Function"));
                done();
            })
            .catch (err => done(err));
    });
    // Navigate to the lgoing page by pressing the login button.
    it("Test-3 Move to login page via login button", function(done){
        driver
            .findElement(webdriver.By.id("login-link"))
            .click()
            .then(function() {
                driver
                    .findElement(webdriver.By.id("header"))
                    .getText("value")
                    .then(function(user) {
                        console.log(user);
                        assert(user.match("Login Form"));
                        done();
                })
            })
            .catch( err => done(err));
            
        
    });

    // Check that the username field was filled correctly
    it("Test-4 check username field is filled.", function(done){
 
        driver
            .findElement(webdriver.By.id("username"))
            .sendKeys("tim10")
        driver
            .findElement(webdriver.By.id("password"))
            .sendKeys("password")
        driver
            .findElement(webdriver.By.id("username"))
            .getAttribute("value")
            .then(function(username) {
                assert(
                    username.match(
                        "tim10"

                    )
                )
                done();
            
            })
            .catch(err => done(err));
        
    });

    // Check that the password field has been filled.
    it("Test-5 check password field is filled", function(done){
 
        // test Code
        // assertions
        driver
            .findElement(webdriver.By.id("password"))
            .getAttribute("value")
            .then(function(username) { 
                assert(
                    username.match(
                        "password"
                    )
                )
                done();
        })
        .catch(err => done(err));
 
    });

    //Press the login button and then check the navbar for the username.
    it("Test-6 submit login", function(done){
        driver
            .findElement(webdriver.By.id("login"))
            .click()
            .then(function() {
                driver
                    .findElement(webdriver.By.id("user"))
                    .getText()
                    .then(function(user) {
                        assert(
                            user.includes(
                                'tim10'
                            )
                        )
                        done();
                })
                .catch(err => done(err));
            })
        
        
 
    });

    // Send a chat message and then check if the value box is empited.
    it("Test-7 Check chat is available", function(done){
        driver
            .findElement(webdriver.By.id("messageBox"))
            .sendKeys("Hello friends!")
        driver
            .findElement(webdriver.By.id("chatB"))
            .click()
            .then(function() {
                driver
                    .findElement(webdriver.By.id("messageBox"))
                    .getAttribute("value")
                    .then(function(value) {
                        assert(
                            value === ''
                        )
                        done();
                    })
                })
            .catch(err => done(err));
        
    });

    // Navigate to make request page
    it("Test-8 Navigate to make request page", function(done){
        driver
            .findElement(webdriver.By.id("make-request"))
            .click()
            .then(function() {
                driver
                    .findElement(webdriver.By.xpath("//*[contains(text(), 'Request A Book Form')]"))
                    .getText()
                    .then(function(text) {
                        assert(
                            text.match(
                                'Request A Book Form'
                            )
                        )
                        driver
                            .findElement(webdriver.By.id("bookName"))
                            .sendKeys("Example Book")
                         driver
                            .findElement(webdriver.By.id("bookAuthor"))
                            .sendKeys("Example Author")
                        driver
                            .findElement(webdriver.By.id("bookDesc"))
                            .sendKeys("Example Description")
                        driver
                            .findElement(webdriver.By.id("bookPrice"))
                            .sendKeys("Example Price")
                        driver
                            .findElement(webdriver.By.id("bookGenre"))
                            .sendKeys("Example Genre")
                        done();
                    })
                    .catch(err => done(err));
                })
            .catch(err => done(err));
    });

    // Fill in a request template
    it("Test-9 Submit a new book request", function(done){
        
        driver
            .findElement(webdriver.By.id("submit"))
            .click()
            .then(function(){
                driver
                    .findElement(webdriver.By.className("success"))
                    .getText()
                    .then(function(value) {
                        assert(
                            value.match('Successfully Created Ticket')
                        )
                        done();
                    })
            })
            .catch(err => done(err));
    });

    it("Test-10 Navigate to requests to find the newly made request", function(done){
        
        driver
            .findElement(webdriver.By.id("requests"))
            .click()
            .then(function(){
                driver
                .findElement(webdriver.By.id("cancel-Example Book"))
                .getText()
                .then(function(text) {
                    assert(
                        text.match(
                            'Cancel Request'
                    ))
                    done();
                })
                .catch(err => done(err));
            })
            .catch(err => done(err));
    });


    it("Test-11 Delete the newly made request", function(done){
        
        driver
            .findElement(webdriver.By.id("cancel-Example Book"))
            .click()
            .then(function(){
                driver.switchTo().alert().accept();
                done();
            })
            .catch(err => done(err));
    });
    
});