const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');
const email = 'sathish@gmail.com';

test('Book an event testing', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    //Login
    await page.goto('https://eventhub.rahulshettyacademy.com/login')
    await page.getByPlaceholder('you@email.com').fill(email);
    await page.locator('#password').fill('Password@111');
    await page.getByRole('button', {name: 'Sign In'}).click();
    await expect( page.locator('#nav-home')).toHaveText('Home');
    console.log(`User logged in succesfully with email: ${email}`)

    //Navigate to envents page
    await page.locator("[data-testid='nav-events']").click();
    await expect(page.locator("text='Upcoming Events'")).toHaveText('Upcoming Events');

    //select an event
    await page.locator('.p-4.flex').first().waitFor()
    const event = page.locator('.p-4.flex')
    await event.locator('#book-now-btn').first().click();

    //form update
    await page.locator('#customerName').fill('xyz');
    await page.locator('#customer-email').fill(email);
    await page.locator('#phone').fill('+91 9876543210');
    await page.getByRole('button', {name: 'Confirm Booking'}).click();

    //confirm booking
    await expect(page.locator('.text-xl')).toHaveText('Booking Confirmed! 🎉');

    //get booking ref.no
    const bookingRef = await page.locator('.booking-ref').textContent();
    console.log(`Booking is confirmed wtih reference number: ${bookingRef}`);
    
    //navigate to my bookings page
    await page.getByRole('button', {name:'View My Bookings'}).click();
    await page.waitForLoadState('networkidle')
    await expect(page.locator('.text-3xl')).toHaveText('My Bookings');

    //verify whether event is booked or not
    const bookings = page.locator('#booking-card')
    const count = await bookings.count();
    for(let i=0; i<count; i++){
        var allBookingRef = await bookings.locator('.booking-ref').nth(i).textContent();
        if( allBookingRef === bookingRef){
            console.log(`Booking is verified in my bookings page with booking reference numbner: ${bookingRef}`);
            break;
        }
    }

})
