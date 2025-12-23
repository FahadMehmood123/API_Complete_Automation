import {test,expect} from '@playwright/test'

// to generate an allure report do the following command in your tests first
// ## Allure Report with Playwright [Screenshots, Videos & Traces]

// ### Step1: 
// Install Allure Report command-line tool
// npm install -g --save-dev allure-commandline

// ### Step2: 

// Install the Allure Playwright adapter.
// npm install --save-dev allure-playwright

// ### Step3: 

// Add below config in playwright.config.js file.

// reporter:[
// ['html'],
// ['allure-playwright']
// ],

// ### Step4: 

// Run Playwright tests.
// npx playwright test

// ### Step5: 

// Generate Allure Report

// npx allure serve allure-results
// or
// allure generate allure-results --clean



test("Test API Post Request",async({request})=>{

    const post_API_Response=await request.post('/booking',{
        data:{
        "firstname": "Fahad",
        "lastname": "Mehmood",
        "totalprice": 1000,
        "depositpaid": true,
        "bookingdates": { //nested data
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "super bowls"
    }

    })
    
    //Getting Response Body
    console.log(await post_API_Response.json())

    //Getting status
    expect(post_API_Response.status()).toBe(200);

    //Getting status -status kay sath wala portion
    expect(post_API_Response.ok()).toBeTruthy();

    //validating the data jo hum bhj rhy hain wohe reposnse a rha hai na (aik property ko check)
    // karny lia
    const response_body=await post_API_Response.json()
    expect(response_body.booking).toHaveProperty("firstname","Fahad")
    expect(response_body.booking).toHaveProperty("firstname","Fahad")

    //nested nested data lia?
    expect(response_body.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")
    expect(response_body.booking.bookingdates).toHaveProperty("checkout", "2019-01-01")
})


test("Patch API request",async ({request}) => {

    //creating a post on server
    const API_request=await request.post('/booking',{
        data:{
            "firstname": "Ali",
            "lastname": "Mehmood",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
        }
    })

    //check if it is created or not then take the id
    expect(API_request.status()).toBe(200)
    const response_body=await API_request.json()

    console.log("========================")
    console.log(await response_body)
    
    //get the ID
    const bID=response_body.bookingid

    //now check for authorization to get the token

    const verificaion_API=await request.post('/auth',{
        data:{
            "username":"admin",
            "password":"password123"

        }
    })

    expect(verificaion_API.status()).toBe(200)
    const verificaion_body=await verificaion_API.json()

    const token_generator=verificaion_body.token;

    //Now update(put)/partial-update(patch) bs keyword ka difference hai
    const patch_id=await request.patch(`booking/${bID}`,{
        headers:{
            "content-Type": "application/json",
            "cookie": `token=${token_generator}`
        },
        data:{

            "firstname": "Fahad"
        }
    })

    expect(patch_id.status()).toBe(200)
    //check if the booking detail was updated or not

    const updated_data=await request.get(`/booking/${bID}`)
    console.log("========================")
     console.log("Updated Data")
    console.log(await updated_data.json())
    
})