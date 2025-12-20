import {test,expect} from '@playwright/test'
import { type } from 'node:os'
import { json } from 'node:stream/consumers'


//steps:post data
// get posted data id
// check authorization by auth API post api
// check if authorized or not by status if 200=yes, [401,400,403]= no
// get token from that autorization api
// put token in header along with content-Type


test("Update the data after creation",async ({request}) => {

    const post_request=await request.post('/booking',{
        data:{

            "firstname": "Fahad",
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

    //check authorization
    const verificaion=await request.post('/auth',{
        data:{
            "username":"admin",
            "password":"password123"
        }
    })

    //check status
    expect(verificaion.status()).toBe(200)
    //Get Token + ID
    const response_token=await verificaion.json()
    const token_generator=response_token.token; 

    const response=await post_request.json()
    const bID=await response.bookingid

    const updated=await request.put(`/booking/${bID}`,{

        headers:{

            "content-Type": "application/json",
            "Cookie": `token=${token_generator}`
        },

        data:{
            "firstname": "Specflow",
            "lastname": "Selenium C#",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
        }
    })

    expect(updated.status()).toBe(200)
    const read=await request.get(`/booking/${bID}`)

    console.log(await read.json())

    
    
})