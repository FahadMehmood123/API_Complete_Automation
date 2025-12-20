import {test,expect} from '@playwright/test'
import console from 'node:console';

test("Get APi Request validation",async({request})=>{

    // this 1668 cannot be put in randomnly we have to get in from generated post
    // Daikho pahly aik data post kary gain server par 
    // ==>phr he usay read kar pay gain na

    // han agar developer humay day daita hai to direst ya method hum 
    // use kar skty hain else we to hit post api first then we will get the data
    
    //Method: const api_endpoint=await request.get('/booking/1668')
    //        console.log(await api_endpoint.json())

    //so for that we have to get the 
    // post id from data that is created its like getting a unique id

    const request_body=await request.post("/booking",{

        data:{
            "firstname": "Alpha",
            "lastname": "beta",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
        }
    })

    const response_api=await request_body.json()

    const bID=response_api.bookingid;

    //Get API call:
    const get_data=await request.get(`/booking/${bID}`)
            //KEEP IN MIND THIS IS `` not ''
    console.log(await get_data.json())

    expect(get_data.status()).toBe(200);
})