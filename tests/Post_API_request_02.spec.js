import { expect ,test} from "@playwright/test";
import console from "console";
import { request } from "https";

// coding ko clean bnany lia hum kia karty hain kay API link postman pai paste kar kay send 
// kar kay jo data humay raw body mai milta hai inside request mai usay hum alag say aik 
// json file mai save kar laity hain aur usay yaha import kra laity hain

const postApiData=require('../test-data/post_request_body.json') //data ko import kra lia

test('Test post API by statis json file',async({request})=>{
    const ApiBody=await request.post('/booking',{
        data:postApiData
    })

    console.log(await ApiBody.json())

    expect(ApiBody.ok()).toBeTruthy()
    expect(ApiBody.status()).toBe(200)

    const API_Response=await ApiBody.json()
    expect(await API_Response.booking).toHaveProperty("firstname","Fahad")
    expect(await API_Response.booking).toHaveProperty("lastname","Mehmood")

    expect(await API_Response.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")
    expect(await API_Response.booking.bookingdates).toHaveProperty("checkout", "2019-01-01")

})

