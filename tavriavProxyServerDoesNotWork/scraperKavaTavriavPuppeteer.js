import puppeteer from 'puppeteer';
import fs from 'fs';
import XLSX from 'xlsx';

async function scrapeKavaTavriav() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto("https://www.tavriav.ua/ca/%D1%87%D0%B0%D1%97-%D0%BA%D0%B0%D0%B2%D0%B0-%D1%82%D0%B0-%D0%BA%D0%B0%D0%BA%D0%B0%D0%BE/%D0%BA%D0%B0%D0%B2%D0%BE%D0%B2%D1%96-%D0%BD%D0%B0%D0%BF%D0%BE%D1%97/9829/9830", {
        waitUntil: 'networkidle2'
    });

    const products = await page.evaluate(() => {
        const data = [];
        const productCards = document.querySelectorAll('.general__content');
        
        productCards.forEach((productCard) => {
            const productNameElement = productCard.querySelector('.prod__name');
            const priceElement = productCard.querySelector('.base__price');
            const specialPriceElement = productCard.querySelector('.base__price');
            const salePriceElement = productCard.querySelector('.prod-crossed-out__price__old');
            const discountPercentageElement = productCard.querySelector('.prod-crossed-out__price__special-off');

            const productName = productNameElement ? productNameElement.innerText.trim().toLowerCase() : '';
            if (!productName.includes('кава')) return;

            const price = priceElement ? priceElement.innerText.trim() : '';
            const specialPrice = specialPriceElement ? specialPriceElement.innerText.trim() : '';
            const salePrice = salePriceElement ? salePriceElement.innerText.trim() : '';
            const discountPercentage = discountPercentageElement ? discountPercentageElement.innerText.trim() : '';

            data.push([productName, price, specialPrice, salePrice, discountPercentage]);
        });
        
        return data;
    });

    await browser.close();

    if (products.length > 0) {
        const sortedData = [['Назва товару', 'Ціна товару (грн)', 'Ціна товару з урахуванням знижки (грн)', 'Стара ціна товару (грн)', 'Відсоток знижки (%)'], 
                            ...products.sort((a, b) => a[0].localeCompare(b[0], ['en', 'uk']))];
        
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(sortedData);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "scraper_kava_tavriaV_puppeteer.xlsx");
        console.log("Файл scraper_kava_tavriaV_puppeteer.xlsx збережено!");
    } else {
        console.log("На сторінці немає даних для експорту.");
    }
}

scrapeKavaTavriav();

