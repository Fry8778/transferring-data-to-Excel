
const puppeteer = require('puppeteer');
const XLSX = require('xlsx');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Відкриваємо браузер у візуальному режимі
    const page = await browser.newPage();
    await page.goto('https://www.tavriav.ua/ca/%D1%87%D0%B0%D1%97-%D0%BA%D0%B0%D0%B2%D0%B0-%D1%82%D0%B0-%D0%BA%D0%B0%D0%BA%D0%B0%D0%BE/%D0%BA%D0%B0%D0%B2%D0%BE%D0%B2%D1%96-%D0%BD%D0%B0%D0%BF%D0%BE%D1%97/9829/9830', { waitUntil: 'networkidle2' });

    await page.waitForSelector('.general__content');

    const products = await page.evaluate(() => {
        const productCards = document.querySelectorAll('.general__content');
        console.log("Знайдено карток товарів:", productCards.length);

        return Array.from(productCards).map(productCard => {
            const productNameElement = productCard.querySelector('.prod__name');
            const productName = productNameElement ? productNameElement.innerText.trim().toLowerCase() : '';
            console.log("Назва товару:", productName);

            if (!(
                productName.includes('кава') ||
                productName.includes('кава мелена') ||
                productName.includes('кава мел') ||
                productName.includes('кава зернова') ||
                productName.includes('набір кави') ||
                productName.includes('напій кавовий') ||
                productName.includes('кава натуральна') ||
                productName.includes('натуральна смажена в зернах') ||
                productName.includes('натуральна смажена мелена') ||
                productName.includes('кава натуральна смажена мелена')
            )) {
                return null;
            }

            const priceElement = productCard.querySelector('.base__price');
            const specialPriceElement = productCard.querySelector('.base__price');
            const salePriceElement = productCard.querySelector('.prod-crossed-out__price__old');
            const discountPercentageElement = productCard.querySelector('.prod-crossed-out__price__special-off');

            console.log("Ціна товару:", priceElement ? priceElement.innerText.trim() : 'Немає');
            console.log("Ціна зі знижкою:", specialPriceElement ? specialPriceElement.innerText.trim() : 'Немає');
            console.log("Стара ціна:", salePriceElement ? salePriceElement.innerText.trim() : 'Немає');
            console.log("Відсоток знижки:", discountPercentageElement ? discountPercentageElement.innerText.trim() : 'Немає');

            return {
                name: productName,
                price: priceElement ? priceElement.innerText.trim() : '',
                specialPrice: specialPriceElement ? specialPriceElement.innerText.trim() : '',
                salePrice: salePriceElement ? salePriceElement.innerText.trim() : '',
                discountPercentage: discountPercentageElement ? discountPercentageElement.innerText.trim() : ''
            };
        }).filter(product => product !== null);
    });

    console.log("Зібрані товари:", products);

    const data = [[
        'Назва товару',
        'Ціна товару (грн)',
        'Ціна товару з урахуванням знижки (грн)',
        'Стара ціна товару (грн)',
        'Відсоток знижки (%)'
    ]].concat(products.map(p => [
        p.name,
        p.price,
        p.specialPrice,
        p.salePrice,
        p.discountPercentage
    ]));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "scraper_kava_tavriaV_puppeteer1.xlsx");
    console.log("Файл scraper_kava_tavriaV_puppeteer1.xlsx збережено!");

    await browser.close();
})();
