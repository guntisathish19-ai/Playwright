const {test} = require('@playwright/test')
const {expect} = require('@playwright/test')

test.describe.configure({mode:'parallel'})
test('UITest', async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://google.com/")
    console.log(await page.title())
    await expect(page).toHaveTitle('Google')
});

test('title', async({page})=>{
    await page.goto("https://google.com/")
    console.log(await page.title())
})

test('title2', async({page})=>{
    await page.goto("https://google.com/")
    console.log(await page.title())
    page.getByRole("")
    expect().
})



