# API_Complete_Automation
I will store all my API automation concept explanation and practices

### To create a Fake Data we use command:
npm install @faker-js/faker --save-dev

#### Example:
faker.person.firstName()

### To create custom dates we use:
npm install --save luxon

#### Example:
const {DateTime}=require('luxon')

DateTime.now().toFormat('yyyy-MM-dd') MM for month and mm for minutes

### Following the Tutorial of:
https://www.youtube.com/watch?v=lM-lqPun9P8&t=2229s

## Allure Report with Playwright [Screenshots, Videos & Traces]

### Step1: 
Run commands on terminal of your project
npm install -g --save-dev allure-commandline

### Step2: 

Install the Allure Playwright adapter.
npm install --save-dev allure-playwright

### Step3: 

Add below config in playwright.config.js file.

reporter:[
['html'],
['allure-playwright']
],

### Step4: 

Run Playwright tests.
npx playwright test

### Step5: 

Generate Allure Report

npx allure serve allure-results
or
allure generate allure-results --clean
