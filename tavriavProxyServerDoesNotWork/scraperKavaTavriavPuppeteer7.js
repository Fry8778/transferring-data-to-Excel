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
            await delay(2000);
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
        const keywords = ['мелена', 'мел'];
        const data = [];
        const uniqueProducts = new Set();

        productCards.forEach((productCard) => {
            // Перевірка на наявність товару (якщо кнопка "Немає в наявності")
            const outOfStock = productCard.querySelector('.ant-btn-disabled, .type-disabled') !== null;
            if (outOfStock) {
                console.log(`[ЛОГ] Пропущено (відсутній на складі):`, productCard.innerText.trim());
                return;
            }

            const productNameElements = productCard.querySelectorAll('.prod__name');
            const productName = Array.from(productNameElements).map(el => el.innerText.trim()).join(' ');
            if (!keywords.some(keyword => productName.toLowerCase().includes(keyword))) return;

            const priceElement = productCard.querySelector('.base__price');
            const salePriceElement = productCard.querySelector('.prod-crossed-out__price__old');
            const discountPercentageElement = productCard.querySelector('.prod-crossed-out__price__special-off');

            const hasDiscount = salePriceElement && discountPercentageElement;
            const price = priceElement ? priceElement.innerText.trim() : '';
            const salePrice = hasDiscount ? salePriceElement.innerText.trim() : '';
            const discountPercentage = hasDiscount ? discountPercentageElement.innerText.trim() : '';
            const specialPrice = hasDiscount ? price : '';

            const productKey = `${productName}-${price}-${salePrice}`;
            if (uniqueProducts.has(productKey)) {
                console.log(`[ЛОГ] Пропущено (дублікат): ${productName}`);
                return;
            }
            uniqueProducts.add(productKey);

            data.push([productName, hasDiscount ? '' : price, specialPrice, salePrice, discountPercentage]);
        });

        return data;
    });

    console.log('Зібрані товари:', products);
    
    if (products.length > 0) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([
            ['Назва товару', 'Ціна товару (грн)', 'Ціна товару з урахуванням знижки (грн)', 'Стара ціна товару (грн)', 'Знижка (%)'],
            ...products
        ]);
        XLSX.utils.book_append_sheet(wb, ws, 'Товари');
        XLSX.writeFile(wb, 'scraper_kava_tavriaV_puppeteer7.xlsx');
    }

    await browser.close();
}

scrapeProducts();
