const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/generate-pdf', async (req, res) => {
  const { htmlContent } = req.body;

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set the HTML content directly
    await page.setContent(htmlContent);

    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();
    res.contentType('application/pdf');
    res.send(pdf);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while generating the PDF.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
