function novusAmountOfDiscountExportToExcel() {     
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
                   'Цена товара со скидкой(текущая цена)',             
                   'Старая цена товара(цена без скидки)']];


    filteredProducts.forEach((productCard) => {
        const productNameElements = productCard.querySelectorAll('.base-card__label > span');           
        const specialPriceElement = productCard.querySelector('.product-card-price__cost > p.product-card-price__current.price-red');       
        const salePriceElement = productCard.querySelector('.product-card-price__cost > p.product-card-price__old');
        

        console.log("productNameElements:", productNameElements);             
        console.log("specialPriceElement:", specialPriceElement);
        console.log("salePriceElement:", salePriceElement);   
            

        if (productNameElements.length > 0 &&          
            specialPriceElement &&           
             salePriceElement) {
            const productName = Array.from(productNameElements).map(element => element.innerText.trim() || '').join(' ');         
            const specialPrice = specialPriceElement.innerText.trim() || '';       
            const salePrice = salePriceElement.innerText.trim() || '';

            data.push([productName,                 
                       specialPrice,                  
                       salePrice
                    ]);
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

export { novusAmountOfDiscountExportToExcel };