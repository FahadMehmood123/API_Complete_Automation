import { expect ,test} from "@playwright/test";
import console from "console";
import { request } from "https";


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

