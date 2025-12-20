import {test,expect} from '@playwright/test'
import console from 'node:console';

test("Get APi Request validation",async({request})=>{

    //Query parameters check karty hain kay data with certain valkues hai db mai ya nae
    // Think of it as SQL query : select * from table where firstname is fahad

    const request_body=await request.post("/booking",{

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

    // what we are doing is we are trying to get booking ids of all the
    // entities with firstname=fahad
    
    const save_query=await request.get('/booking/',{
        params:{"firstname" : "Fahad"}
        
    }) 

    console.log(await save_query.json())



})