import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import ExcelJS from 'exceljs'

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

async function openWebPageWithPDFAndOptions () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 400 })
  const page = await browser.newPage()
  await page.goto('https://example.com')
  await page.pdf({
    path: 'example.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      bottom: '40px',
      left: '20px',
      right: '20px'
    }
  })
  await browser.close()
}
// openWebPageWithPDFAndOptions()

async function openWebPageWithPDFAndOptionsAndHeaderFooter () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 400 })
  const page = await browser.newPage()
  await page.goto('https://example.com')
  await page.pdf({
    path: 'example.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      bottom: '40px',
      left: '20px',
      right: '20px'
    },
    displayHeaderFooter: true,
    headerTemplate: '<h1>Header</h1>',
    footerTemplate: '<h1>Footer</h1>'
  })

  await browser.close()
}
// openWebPageWithPDFAndOptionsAndHeaderFooter()

async function openWebPageWithExcel () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 400 })
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

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Datos')

  worksheet.getCell('A1').value = 'Texto de la cita'
  worksheet.getCell('B1').value = 'Autor'
  worksheet.getCell('C1').value = 'Etiquetas'

  // Utiliza un bucle para escribir los datos en las celdas del archivo Excel
  for (let i = 0; i < result.length; i++) {
    const quote = result[i]
    const row = i + 2 // Empieza desde la segunda fila

    worksheet.getCell(`A${row}`).value = quote.quoteText
    worksheet.getCell(`B${row}`).value = quote.author
    worksheet.getCell(`C${row}`).value = quote.tags.join(', ') // Concatena las etiquetas separadas por coma
  }

  const fileName = 'datos.xlsx'
  await workbook.xlsx.writeFile(fileName)

  console.log(`Archivo Excel generado: ${fileName}`)

  await browser.close()
}

// openWebPageWithExcel()

async function openWebPageClickLink () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 400 })
  const page = await browser.newPage()
  await page.goto('https://quotes.toscrape.com')
  await page.click('a[href="/login"]')
  await page.screenshot({ path: 'example.png' })
  await browser.close()
}
openWebPageClickLink()

async function openWebPageGetData () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 400 })
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

// openWebPageGetData()
