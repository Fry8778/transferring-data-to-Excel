import puppeteer from 'puppeteer';
import * as XLSX from 'xlsx';

async function scrapeProducts() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.goto('https://www.tavriav.ua/ca/%D1%87%D0%B0%D1%97-%D0%BA%D0%B0%D0%B2%D0%B0-%D1%82%D0%B0-%D0%BA%D0%B0%D0%BA%D0%B0%D0%BE/%D0%BA%D0%B0%D0%B2%D0%BE%D0%B2%D1%96-%D0%BD%D0%B0%D0%BF%D0%BE%D1%97/9829/9830', { waitUntil: 'networkidle2' });
    } catch (error) {
        console.log('Error loading page:', error);
        await browser.close();
        return;
    }

    async function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async function autoScroll() {
        let previousHeight = await page.evaluate(() => document.body.scrollHeight);
        let unchangedCount = 0;

        while (unchangedCount < 3) {
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await delay(5000);
            let newHeight = await page.evaluate(() => document.body.scrollHeight);

            if (newHeight === previousHeight) {
                unchangedCount++;
            } else {
                unchangedCount = 0;
            }

            previousHeight = newHeight;
        }
    }

    await autoScroll();

    const products = await page.evaluate(() => {
        const productCards = document.querySelectorAll('.general__content');
        const keywords = ['кава зернова', 'зерно', 'зерн.', 'ваг.'];       
        const data = [];
        const uniqueProducts = new Set();

        productCards.forEach((productCard) => {
            const productNameElement = productCard.querySelector('.prod__name');
            if (!productNameElement) return;

            const productName = productNameElement.innerText.trim();
            if (!keywords.some(keyword => productName.toLowerCase().includes(keyword))) return;

            // const outOfStock = productCard.querySelector('.ant-btn, .css-zg0ahe, .ant-btn-disabled, .ant-btn-block, .add__remove__product, .type-disabled') !== null;
            // const outOfStock = productCard.querySelector('.ant-btn-disabled, .type-disabled') !== null;
            
            // const outOfStock = productCard.querySelector('.styles__OutOfStockStyles-sc-v51mmc-1') !== null;
            // if (outOfStock) {
            //     console.log(`[ЛОГ] Пропущено (відсутній на складі):`, productName);
            //     return;
            // }

            const priceElement = productCard.querySelector('.base__price');
            const salePriceElement = productCard.querySelector('.prod-crossed-out__price__old');
            const discountPercentageElement = productCard.querySelector('.prod-crossed-out__price__special-off');

            const price = priceElement ? priceElement.innerText.trim() : '';
            const salePrice = salePriceElement ? salePriceElement.innerText.trim() : '';
            const discountPercentage = discountPercentageElement ? discountPercentageElement.innerText.trim() : '';
            const specialPrice = salePrice ? price : '';
            const regularPrice = salePrice ? '' : price;

            const productKey = `${productName}-${price}-${salePrice}`;
            if (uniqueProducts.has(productKey)) return;
            uniqueProducts.add(productKey);

            data.push([productName, regularPrice, specialPrice, salePrice, discountPercentage]);
        });

        return data;
    });

    console.log('Зібрані товари:', products);
    
    if (products.length > 0) {
        products.sort((a, b) => a[0].localeCompare(b[0]));
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([
            ['Назва товару', 'Ціна товару (грн)', 'Ціна товару з урахуванням знижки (грн)', 'Стара ціна товару (грн)', 'Знижка (%)'],
            ...products
        ]);
        XLSX.utils.book_append_sheet(wb, ws, 'Товари');
        XLSX.writeFile(wb, 'puppeteer_tavriaV_kava_v_zernakh.xlsx');
    }

    await browser.close();
}

scrapeProducts();
