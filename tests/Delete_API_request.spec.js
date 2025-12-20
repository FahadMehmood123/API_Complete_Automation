import {test,expect} from '@playwright/test'

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

    const delete_API= await request.delete(`/booking/${bID}`,{
        headers:{
            "content-Type": "application/json",
            "cookie": `token=${token_generator}`
        }
    })

    console.log("========================")
    console.log("Deleted Data")
    expect(delete_API.status()).toBe(201)
})