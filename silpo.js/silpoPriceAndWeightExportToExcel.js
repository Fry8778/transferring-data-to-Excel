function silpoPriceAndWeightExportToExcel() {     
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
                    'Цена',
                    'Вес товара']];

    filteredProducts.forEach((productCard) => {
        const productNameElement = productCard.querySelector('.product-card__title');
        const priceElement = productCard.querySelector('.ft-whitespace-nowrap.ft-text-22.ft-font-bold');
        const weightElement = productCard.querySelector('.ft-typo-14-semibold.xl\\:ft-typo-16-semibold > span');
       

            if (productNameElement &&
                priceElement &&
                weightElement) {
            const productName = productNameElement.innerText.trim() || '';
            const price = priceElement.innerText.trim() || '';
            const weight = weightElement.innerText.trim() || '';           

            data.push([ productName,
                        price, 
                        weight]);
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

export { silpoPriceAndWeightExportToExcel };



