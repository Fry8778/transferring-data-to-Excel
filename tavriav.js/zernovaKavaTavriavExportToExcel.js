function zernovaKavaTavriavExportToExcel() { 
    // Фильтрация товаров по наличию слова "кава" в тексте ссылки
    const productCards = document.querySelectorAll('.general__content');
    // console.log("productCards:", productCards);
    const filteredProducts = Array.from(productCards).filter(productCard => {
        const productNameElement = productCard.querySelector('.prod__name');           
        const productName = productNameElement ? productNameElement.innerText.toLowerCase() : ''; // Проверка существования элемента
            return  productName.includes('кава зернова') ||
                    productName.includes('зерно') ||                    
                    productName.includes('зерн.') ||
                    productName.includes('ваг.'); 
    });

    const data = [[ 'Назва товару',            
                    'Ціна товару (грн)',      
                    'Ціна товару з урахуванням знижки (грн)',
                    'Стара ціна товару (грн)',
                    'Відсоток знижки (%)']];

    filteredProducts.forEach((productCard) => {
        const productNameElements = productCard.querySelectorAll('.prod__name'); 
        const priceElement = productCard.querySelector('.base__price');    

        // Проверяем наличие скидки
        const specialPriceElement = productCard.querySelector('.base__price');       
        const salePriceElement = productCard.querySelector('.prod-crossed-out__price__old');
        const discountPercentageElement = productCard.querySelector('.prod-crossed-out__price__special-off');    

        console.log("productNameElements:", productNameElements);        
        console.log("priceElement:", priceElement);
        
        console.log("specialPriceElement:", specialPriceElement);        
        console.log("salePriceElement:", salePriceElement); 
        console.log("discountPercentageElement:", discountPercentageElement);

        if (!specialPriceElement || !salePriceElement || !discountPercentageElement) {
            // Если элементов .price__discount, .price__old и span.percentage__info нет внутри .product_discount,
            // значит, товар не имеет скидки
            const price = priceElement ? priceElement.innerText.trim() || '' : '';  
            const productName = Array
                .from(productNameElements)
                .map(element => element.innerText.trim() || '')
                .join(' ');     
            const specialPrice = '';  // Пустое значение для товаров без скидки
            const salePrice = '';     // Пустое значение для товаров без скидки
            const discountPercentage = '';     // Пустое значение для товаров без скидки
            data.push([ productName,    
                        price,
                        specialPrice,                     
                        salePrice,
                        discountPercentage]);
        } else {
            // Если элементы .price__discount, .price__old и span.percentage__info найдены, значит, товар имеет скидку
            const productName = Array
                .from(productNameElements)
                .map(element => element.innerText.trim() || '')
                .join(' ');     
            const price = '';  
            const specialPrice = specialPriceElement ? specialPriceElement.innerText.trim() || '' : '';               
            const salePrice = salePriceElement ? salePriceElement.innerText.trim() || '' : ''; 
            const discountPercentage = discountPercentageElement ? discountPercentageElement.innerText.trim() || '' : '';             
            data.push([ productName,    
                        price,
                        specialPrice,                     
                        salePrice,
                        discountPercentage]);
        }
    });

    // if (data.length <= 1) {
    //     alert("На странице нет данных для экспорта в Excel.");
    //     return;
    // }

    // const wb = XLSX.utils.book_new();
    // const ws = XLSX.utils.aoa_to_sheet(data);
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // XLSX.writeFile(wb, "data.xlsx");

    if (data.length > 1) {
        // Сортуємо масив, виключаючи заголовок
        const sortedData = [data[0], ...data.slice(1).sort((a, b) => a[0].localeCompare(b[0], ['en', 'uk']))];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(sortedData);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "kava_zernova.xlsx");
    } else {
        alert("На сторінці немає даних для експорту в Excel.");
}
}

export { zernovaKavaTavriavExportToExcel };