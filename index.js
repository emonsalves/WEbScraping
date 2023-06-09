import puppeteer from 'puppeteer'
import fs from 'fs/promises'

async function openWebPage () {
  const browser = await puppeteer.launch({ headless: 'false', slowMo: 250 })
  const page = await browser.newPage()
  await page.goto('https://example.com')
  await browser.close()
}
// openWebPage()

async function openWebPageWithScreenshot () {
  const browser = await puppeteer.launch({ headless: 'false', slowMo: 400 })
  const page = await browser.newPage()
  await page.goto('https://example.com')
  await page.screenshot({ path: 'example.png' })
  await browser.close()
}
// openWebPageWithScreenshot()

async function openWebPageWithPDF () {
  const browser = await puppeteer.launch({ headless: 'false', slowMo: 400 })
  const page = await browser.newPage()
  await page.goto('https://example.com')
  await page.pdf({ path: 'example.pdf' })
  await browser.close()
}
// openWebPageWithPDF()

async function openWebPageClickLink () {
  const browser = await puppeteer.launch({ headless: 'false', slowMo: 400 })
  const page = await browser.newPage()
  await page.goto('https://quotes.toscrape.com')
  await page.click('a[href="/login"]')
  await page.screenshot({ path: 'example.png' })
  await browser.close()
}
// openWebPageClickLink()

async function openWebPageGetData () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://quotes.toscrape.com')
  const result = await page.evaluate(() => {
    const quotes = document.querySelectorAll('.quote')
    const data = [...quotes].map((quote) => {
      const quoteText = quote.querySelector('.text').innerText
      const author = quote.querySelector('.author').innerText
      const tags = [...quote.querySelectorAll('.tag')].map((tag) => tag.innerText)
      return {
        quoteText,
        author,
        tags
      }
    })

    return data
  })
  console.log(result)
  await fs.writeFile('quotes.json', JSON.stringify(result, null, 2))
  await browser.close()
}

openWebPageGetData()
