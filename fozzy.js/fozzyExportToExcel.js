function fozzyExportToExcel() {
    const productCards = document.querySelectorAll('.js-product-miniature-wrapper');
    const filteredProducts = Array.from(productCards).filter(productCard => {
         // Виключаємо товари, яких немає в наявності
         if (productCard.classList.contains('product_grey')) {
            return false;
        }
        
        const productNameElement = productCard.querySelector('.h3.product-title');
        const productName = productNameElement ? productNameElement.innerText.toLowerCase() : '';
        return productName.includes('кава') ||
               productName.includes('кава мелена') ||
               productName.includes('кава мел') ||
               productName.includes('кава зернова') ||
               productName.includes('набір кави') ||
               productName.includes('напій кавовий') ||
               productName.includes('кава натуральна') ||
               productName.includes('натуральна смажена в зернах') ||
               productName.includes('натуральна смажена мелена') ||
               productName.includes('кава натуральна смажена мелена');
    });

    const data = [['Назва товару', 'Ціна товару(грн)', 'Вага товару(г)', 'Ціна товару з урахуванням знижки(грн)', 'Стара ціна товару(грн)', 'Знижка(грн)']];

    filteredProducts.forEach((productCard) => {
        const productNameElements = productCard.querySelectorAll('.h3.product-title');
        const priceElement = productCard.querySelector('.product-price.sregular-price ');
        const weightElement = productCard.querySelector('.fasovka');

        const specialPriceElement = productCard.querySelector('.product-price');
        const salePriceElement = productCard.querySelector('.regular-price.text-muted');
        const discountPercentageElement = productCard.querySelector('.flag-discount-value');

        const productName = Array.from(productNameElements).map(element => element.innerText.trim() || '').join(' ');
        const price = priceElement ? priceElement.innerText.trim() || '' : '';
        let weight = weightElement ? weightElement.innerText.trim() || '' : '';
        let specialPrice = specialPriceElement ? specialPriceElement.innerText.trim() || '' : '';
        let salePrice = salePriceElement ? salePriceElement.innerText.trim() || '' : '';
        let discountPercentage = discountPercentageElement ? discountPercentageElement.innerText.trim() || '' : '';

        // Видаляємо кому на початку ваги, якщо вона є
        weight = weight.replace(/^,\s*/, '');
        
        // Видаляємо знак "-" перед знижкою, якщо він є
        discountPercentage = discountPercentage.replace(/^-/, '');

        // Якщо немає знижки, залишаємо ціну лише у колонці "Ціна товару(грн)"
        if (!salePrice) {
            salePrice = '';
            specialPrice = '';
        }

        data.push([ productName,
                    price,
                    weight,
                    specialPrice,
                    salePrice,
                    discountPercentage]);
    });

    if (data.length <= 1) {
        alert("На сторінці немає даних для експорту в Excel.");
        return;
    }
    // Фільтруємо товари у алфавітному порядку 
    data.splice(1, data.length - 1, ...data.slice(1).sort((a, b) => {       
        return a[0].localeCompare(b[0]);
    }));
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
}

export { fozzyExportToExcel };
