import puppeteer from 'puppeteer';
import * as XLSX from 'xlsx';

async function scrapeProducts() {
    const browser = await puppeteer.launch({ headless: false, protocolTimeout: 180000 });
    const page = await browser.newPage();

    try {
        await page.goto('https://www.tavriav.ua/ca/%D1%87%D0%B0%D1%97-%D0%BA%D0%B0%D0%B2%D0%B0-%D1%82%D0%B0-%D0%BA%D0%B0%D0%BA%D0%B0%D0%BE/%D0%BA%D0%B0%D0%B2%D0%BE%D0%B2%D1%96-%D0%BD%D0%B0%D0%BF%D0%BE%D1%97/9829/9830', { waitUntil: 'networkidle2', timeout: 180000 });
    } catch (error) {
        console.log('Error loading page:', error);
        await browser.close();
        return;
    }

    // Функція для прокручування сторінки
    async function autoScroll() {
        const previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        // Чекаємо, поки висота сторінки зміниться
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`, { timeout: 60000 });
    }

    let prevCount = 0;
    let currCount = -1;
    while (prevCount !== currCount) {
        prevCount = currCount;
        await autoScroll();
        // Збільшуємо таймаут для чекання появи нових елементів
        await page.waitForSelector('.general__content', { visible: true, timeout: 60000 });
        currCount = (await page.$$('.general__content')).length;
        console.log(`Знайдено товарів: ${currCount}`);
    }

    const products = await page.evaluate(() => {
        const productCards = document.querySelectorAll('.general__content');
        const keywords = ['кава', 'кава мелена', 'кава мел', 'кава зернова', 'набір кави', 'напій кавовий', 'кава натуральна', 'натуральна смажена в зернах', 'натуральна смажена мелена', 'кава натуральна смажена мелена'];
        const data = [];

        productCards.forEach((productCard) => {
            const productNameElement = productCard.querySelector('.prod__name');
            const productName = productNameElement ? productNameElement.innerText.toLowerCase().trim() : '';
            if (!keywords.some((keyword) => productName.includes(keyword))) return;

            const priceElement = productCard.querySelector('.base__price');
            const salePriceElement = productCard.querySelector('.prod-crossed-out__price__old');
            const discountPercentageElement = productCard.querySelector('.prod-crossed-out__price__special-off');

            const price = priceElement ? priceElement.innerText.trim() : '';
            const salePrice = salePriceElement ? salePriceElement.innerText.trim() : '';
            const discountPercentage = discountPercentageElement ? discountPercentageElement.innerText.trim() : '';
            
            data.push([productName, price, salePrice, discountPercentage]);
        });

        return data;
    });

    console.log('Зібрані товари:', products);
    
    if (products.length > 0) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([['Назва товару', 'Ціна', 'Стара ціна', 'Знижка'], ...products]);
        XLSX.utils.book_append_sheet(wb, ws, 'Товари');
        XLSX.writeFile(wb, 'scraper_kava_tavriaV_puppeteer2.xlsx');
    }

    await browser.close();
}

scrapeProducts();
