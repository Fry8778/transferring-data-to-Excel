function silpoAmountOfDiscountExportToExcel() {     
    const productCards = document.querySelectorAll('.product-card__body');
  
    // Фильтрация товаров по наличию слова "кава" в тексте ссылки
    const filteredProducts = Array.from(productCards).filter(productCard => {
        const productNameElement = productCard.querySelector('.product-card__title');   
        const productName = productNameElement ? productNameElement.innerText.toLowerCase() : ''; // Проверка существования элемента
            return  productName.includes('кава') ||
                    productName.includes('кава мелена')  ||
                    productName.includes('кава мел')  ||
                    productName.includes('кава зернова') ||
                    productName.includes('набір кави') ||                    
                    productName.includes('напій кавовий');
    });

    const data = [[ 'Название товара',                    
                    'Цена без скидки',
                    'Размер скидки']];

    filteredProducts.forEach((productCard) => {
        const productNameElement = productCard.querySelector('.product-card__title');     
        const priceWithoutDiscountElement = productCard.querySelector('.ft-line-through.ft-text-black-87.ft-typo-14-regular.xl\\:ft-typo');
        const amountOfDiscountElement = productCard.querySelector('.product-card-price__sale');

            if (productNameElement &&               
                priceWithoutDiscountElement &&
                amountOfDiscountElement) {
            const productName = productNameElement.innerText.trim() || '';          
            const priceWithoutDiscount = priceWithoutDiscountElement.innerText.trim() || '';
            const amountOfDiscount = amountOfDiscountElement.innerText.trim() || '';

            data.push([ productName,                       
                        priceWithoutDiscount,
                        amountOfDiscount]);
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

export { silpoAmountOfDiscountExportToExcel };
