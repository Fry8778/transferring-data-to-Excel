function silpoExportToExcel() {     
    const productCards = document.querySelectorAll('.product-card__body');
    const filteredProducts = Array.from(productCards).filter(productCard => {
        const productNameElement = productCard.querySelector('.product-card__title');           
        const productName = productNameElement ? productNameElement.innerText.toLowerCase() : ''; // Проверка существования элемента
            return  productName.includes('кава') ||           
                    productName.includes('кава мелена')  ||
                    productName.includes('кава мел')  ||
                    productName.includes('кава зернова') ||
                    productName.includes('набір кави') ||                    
                    productName.includes('напій кавовий') ||
                    productName.includes('кава натуральна') ||
                    productName.includes('натуральна смажена в зернах') ||
                    productName.includes('натуральна смажена мелена') ||
                    productName.includes('кава натуральна смажена мелена'); 
    });

    const data = [[ 'Название товара',            
                    'Цена товара(текущая цена)', 
                    'Вес товара',     
                    'Цена товара без скидки(старая цена)',
                    'Процент скидки(%)']];

    filteredProducts.forEach((productCard) => {
        const productNameElements = productCard.querySelectorAll('.product-card__title'); 
        const priceElement = productCard.querySelector('.ft-whitespace-nowrap.ft-text-22.ft-font-bold');
        const weightElement = productCard.querySelector('.ft-typo-14-semibold.xl\\:ft-typo-16-semibold > span');    

        // Проверяем наличие скидки
        const specialPriceElement = productCard.querySelector('.ft-line-through.ft-text-black-87.ft-typo-14-regular.xl\\:ft-typo');       
        const salePriceElement = productCard.querySelector('.product-card-price__sale');

        console.log("productNameElements:", productNameElements);        
        console.log("priceElement:", priceElement);
        console.log("weightElement:", weightElement);
        
        console.log("specialPriceElement:", specialPriceElement);        
        console.log("salePriceElement:", salePriceElement); 

        if (!specialPriceElement || !salePriceElement) {
            // Если элементов .price__discount и .price__old нет внутри .product_discount,
            // значит, товар не имеет скидки
            const price = priceElement ? priceElement.innerText.trim() || '' : '';  
            const weight = weightElement ? weightElement.innerText.trim() || '' : '';  
            const productName = Array
                .from(productNameElements)
                .map(element => element.innerText.trim() || '')
                .join(' ');     
            const specialPrice = '';  // Пустое значение для товаров без скидки
            const salePrice = '';     // Пустое значение для товаров без скидки
            data.push([ productName,    
                        price,
                        weight,
                        specialPrice,                     
                        salePrice]);
        } else {
            // Если элементы .price__discount и .price__old найдены, значит, товар имеет скидку
            const productName = Array
                .from(productNameElements)
                .map(element => element.innerText.trim() || '')
                .join(' ');     
            const price = priceElement ? priceElement.innerText.trim() || '' : '';  
            const weight = weightElement ? weightElement.innerText.trim() || '' : '';  
            const specialPrice = specialPriceElement ? specialPriceElement.innerText.trim() || '' : '';               
            const salePrice = salePriceElement ? salePriceElement.innerText.trim() || '' : '';             
            data.push([ productName,    
                        price,
                        weight,
                        specialPrice,                     
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

export { silpoExportToExcel };