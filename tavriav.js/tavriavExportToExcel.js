function tavriavExportToExcel() {     
    const productCards = document.querySelectorAll('.products__item');

    const data = [[ 'Название товара',            
                    'Цена товара(текущая цена)',      
                    'Цена товара с учетом скидки',
                    'Старая цена товара(цена без скидки)']];

    productCards.forEach((productCard) => {
        const productNameElements = productCard.querySelectorAll('.product__title'); 
        const priceElement = productCard.querySelector('.product__price > b');    

        // Проверяем наличие скидки
        const specialPriceElement = productCard.querySelector('.price__with_discount .price__discount');       
        const salePriceElement = productCard.querySelector('.price__with_discount .price__old');

        console.log("productNameElements:", productNameElements);        
        console.log("priceElement:", priceElement);
        
        console.log("specialPriceElement:", specialPriceElement);        
        console.log("salePriceElement:", salePriceElement); 

        if (!specialPriceElement || !salePriceElement) {
            // Если элементов .price__discount и .price__old нет внутри .product_discount,
            // значит, товар не имеет скидки
            const price = priceElement ? priceElement.innerText.trim() || '' : '';  
            const productName = Array
                .from(productNameElements)
                .map(element => element.innerText.trim() || '')
                .join(' ');     
            const specialPrice = '';  // Пустое значение для товаров без скидки
            const salePrice = '';     // Пустое значение для товаров без скидки
            data.push([ productName,    
                        price,
                        specialPrice,                     
                        salePrice]);
        } else {
            // Если элементы .price__discount и .price__old найдены, значит, товар имеет скидку
            const productName = Array
                .from(productNameElements)
                .map(element => element.innerText.trim() || '')
                .join(' ');     
            const price = priceElement ? priceElement.innerText.trim() || '' : '';  
            const specialPrice = specialPriceElement ? specialPriceElement.innerText.trim() || '' : '';               
            const salePrice = salePriceElement ? salePriceElement.innerText.trim() || '' : '';             
            data.push([ productName,    
                        price,
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

export { tavriavExportToExcel };