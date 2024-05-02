function novusInfoExportToExcel() {     
    const productCards = document.querySelectorAll('.sf-product-card__block');
    console.log("productCards:", productCards);

    // Фильтрация товаров по наличию слова "кава" в тексте ссылки
    const filteredProducts = Array.from(productCards).filter(productCard => {
        const productNameElement = productCard.querySelector('.sf-product-card__title');      
        console.log("productNameElement:", productNameElement);
        const productName = productNameElement ? productNameElement.innerText.toLowerCase() : ''; // Проверка существования элемента
        return  productName.includes('кава') ||
                productName.includes('кава мелена')  ||
                productName.includes('кава мел')  ||
                productName.includes('кава зернова') ||
                productName.includes('набір кави') ||                    
                productName.includes('напій кавовий') ||                    
                productName.includes('натуральна смажена в зернах') ||                    
                productName.includes('натуральна смажена мелена');
    });

    const data = [['Название товара',
                   'Цена товара(текущая цена)',
                   'Цена товара со скидкой(текущая цена)',
                   'Вес товара',
                   'Старая цена товара(цена без скидки)']];

    filteredProducts.forEach((productCard) => {
        const productNameElement = productCard.querySelector('.sf-product-card__title');
        const priceElement = productCard.querySelector('.sf-product-card__block.sf-price__regular');
        const specialPriceElement = productCard.querySelector('.ft-line-through.ft-text-black-87.ft-typo-14-regular.xl\\:ft-typo');
        const weightElement = productCard.querySelector('.sf-product-card__quantity');
        const salePriceElement = productCard.querySelector('.product-card-price__sale');

        console.log("productNameElement:", productNameElement);                 
        console.log("priceElement:", priceElement);       
        console.log("weightElement:", weightElement);
        console.log("specialPriceElement:", specialPriceElement);   
        console.log("salePriceElement:", salePriceElement);   

        if (productNameElement &&
            priceElement &&
            weightElement &&
            specialPriceElement &&
            salePriceElement) {
                const productName = productNameElement.innerText.trim() || '';
                const price = priceElement.innerText.trim() || '';
                const specialPrice = specialPriceElement.innerText.trim() || '';
                const weight = weightElement.innerText.trim() || '';
                const salePrice = salePriceElement.innerText.trim() || '';

            data.push([ productName,
                        price, 
                        specialPrice,
                        weight,
                        salePrice]);
        }
    });

    if (data.length <= 1) {
        alert("На странице нет данных для экспорта в Excel.");
        return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
}

export { novusInfoExportToExcel };



