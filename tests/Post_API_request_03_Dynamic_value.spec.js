import {test,expect} from '@playwright/test'
import console from 'node:console';
import { request } from 'node:http';
import { faker, Faker } from '@faker-js/faker';

const {DateTime}=require('luxon')
const data_body=require('../test-data/post_request_body.json') //data ko import kra lia

const firstName=faker.person.firstName();
const lastName=faker.person.lastName();
const number=faker.number.int(1000);

const checkin_date=DateTime.now().toFormat('yyyy-MM-dd')
const checkout_date=DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd')


test("Testing an API using Dynamic Values",async({request})=>{

    const API_data=await request.post('/booking',{
        data:{
            
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": number,
            "depositpaid": true,
            "bookingdates": {
                "checkin": checkin_date,
                "checkout": checkout_date
            },
            "additionalneeds": "super bowls"

        }
    })

    expect(API_data.status()).toBe(200);
    expect(API_data.ok()).toBeTruthy();

    console.log(await API_data.json());
    const response=await API_data.json();

    expect(response.booking).toHaveProperty("firstname", firstName)
    expect(response.booking.bookingdates).toHaveProperty("checkin" , checkin_date)
    
})