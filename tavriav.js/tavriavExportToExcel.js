function tavriavExportToExcel() { 
    // Фильтрация товаров по наличию слова "кава" в тексте ссылки
    const productCards = document.querySelectorAll('.products__item');
    // console.log("productCards:", productCards);
    const filteredProducts = Array.from(productCards).filter(productCard => {
        const productNameElement = productCard.querySelector('.product__title');           
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
                    'Цена товара с учетом скидки(текущая цена)',
                    'Старая цена товара(цена без скидки)',
                    'Процент скидки(%)']];

    filteredProducts.forEach((productCard) => {
        const productNameElements = productCard.querySelectorAll('.product__title'); 
        const priceElement = productCard.querySelector('.product__price > b');    

        // Проверяем наличие скидки
        const specialPriceElement = productCard.querySelector('.price__with_discount .price__discount');       
        const salePriceElement = productCard.querySelector('.price__with_discount .price__old');
        const discountPercentageElement = productCard.querySelector('.discount_info > span.percentage__info');    

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
            const price = priceElement ? priceElement.innerText.trim() || '' : '';  
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

    if (data.length <= 1) {
        alert("На странице нет данных для экспорта в Excel.");
        return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
}

export { tavriavExportToExcel };