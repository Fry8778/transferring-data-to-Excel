function novusPriceAndWeightExportToExcel() {     
    const productCards = document.querySelectorAll('.base-is-link.base-card.catalog-products__item');
    console.log("productCards:", productCards);

    // Фильтрация товаров по наличию слова "кава" в тексте ссылки
    const filteredProducts = Array.from(productCards).filter(productCard => {
        const productNameElements = productCard.querySelectorAll('.base-card__label > span');
        const productNames = Array.from(productNameElements).map(element => element.innerText.toLowerCase());
        console.log("productNameElements:", productNameElements);
        return  productNames.some(name => 
            name.includes('кава') ||
            name.includes('кава мелена')  ||
            name.includes('кава мел')  ||
            name.includes('кава зернова') ||
            name.includes('набір кави') ||                    
            name.includes('напій кавовий') ||
            name.includes('натуральна смажена в зернах') ||
            name.includes('натуральна смажена мелена')
        );
    });

    const data = [['Название товара',
                   'Цена товара(текущая цена)',                
                   'Вес товара']];

    filteredProducts.forEach((productCard) => {
        const productNameElements = productCard.querySelectorAll('.base-card__label > span');
        const priceElement = productCard.querySelector('.product-card-price__cost > p.product-card-price__current');      
        const weightElement = productCard.querySelector('p.base-card__capacity');
        

        console.log("productNameElements:", productNameElements);                 
        console.log("priceElement:", priceElement);     
        console.log("weightElement:", weightElement);      
               

        if (productNameElements.length > 0 &&
            priceElement &&          
            weightElement) {
            const productName = Array.from(productNameElements).map(element => element.innerText.trim() || '').join(' ');
            const price = priceElement.innerText.trim() || '';           
            const weight = weightElement.innerText.trim() || '';           

            data.push([productName,
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

export { novusPriceAndWeightExportToExcel };



