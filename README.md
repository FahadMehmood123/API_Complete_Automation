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