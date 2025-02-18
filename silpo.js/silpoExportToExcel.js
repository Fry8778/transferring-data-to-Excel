function silpoExportToExcel() {     
    const productCards = document.querySelectorAll('.product-card__body');
    const filteredProducts = Array.from(productCards).filter(productCard => {
          // Перевіряємо наявність повідомлення "Товар закінчився"
          const productContainer = productCard.closest('shop-silpo-common-product-card');
          if (productContainer && productContainer.querySelector('.cart-soldout')) {
              return false; // виключаємо товар, якщо є елемент із класом .cart-soldout
          }
          
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

    const data = [[ 'Назва товару',
                    'Ціна товару(грн)',
                    'Вага товару(г)',
                    'Ціна товару з урахуванням знижки(грн)',
                    'Стара ціна товару(грн)',
                    'Знижка(грн)']];

    filteredProducts.forEach((productCard) => {
        const productNameElements = productCard.querySelectorAll('.product-card__title'); 
        const priceElement = productCard.querySelector('.product-card-price__displayPrice');
        const weightElement = productCard.querySelector('.ft-typo-14-semibold.xl\\:ft-typo-16-semibold > span');    

        // Проверяем наличие скидки
        const specialPriceElement = productCard.querySelector('.product-card-price__displayPrice');  
        const salePriceElement = productCard.querySelector('.product-card-price__displayOldPrice');     
        const discountPercentageElement = productCard.querySelector('.product-card-price__sale');

        console.log("productNameElements:", productNameElements);        
        console.log("priceElement:", priceElement);
        console.log("weightElement:", weightElement);
        
        console.log("specialPriceElement:", specialPriceElement);      
        console.log("salePriceElement:", salePriceElement);   
        console.log("discountPercentageElement:", discountPercentageElement); 

        if (!specialPriceElement || !salePriceElement || !discountPercentageElement) {           
            const price = priceElement ? priceElement.innerText.trim() || '' : '';  
            const weight = weightElement ? weightElement.innerText.trim() || '' : '';  
            const productName = Array
                .from(productNameElements)
                .map(element => element.innerText.trim() || '')
                .join(' ');     
            const specialPrice = '';  
            const salePrice = '';     
            let discountPercentage = '';     
            data.push([ productName,    
                        price,
                        weight,
                        specialPrice,
                        salePrice,                     
                        discountPercentage]);
        } else {            
            const productName = Array
                .from(productNameElements)
                .map(element => element.innerText.trim() || '')
                .join(' ');     
            const price = '';  
            const weight = weightElement ? weightElement.innerText.trim() || '' : '';  
            const specialPrice = specialPriceElement ? specialPriceElement.innerText.trim() || '' : ''; 
            const salePrice = salePriceElement ? salePriceElement.innerText.trim() || '' : '';              
            let discountPercentage = discountPercentageElement ? discountPercentageElement.innerText.trim() || '' : '';             
           
            // Видаляємо знак "-" перед знижкою, якщо він є
            discountPercentage = discountPercentage.replace(/^-/, '');
           
            data.push([ productName,    
                        price,
                        weight,
                        specialPrice,
                        salePrice,                     
                        discountPercentage]);
        }
    });

    if (data.length <= 1) {
        alert("На странице нет данных для экспорта в Excel.");
        return;
    }
    // Фільтруємо товари у алфавітному порядку 
    data.splice(1, data.length - 1, ...data.slice(1).sort((a, b) => {       
        return a[0].localeCompare(b[0]);
    }));

    const wb = XLSX.utils.book_new(); // Создает новый пустой Excel файл
    const ws = XLSX.utils.aoa_to_sheet(data); // Преобразует данные из массива (array of arrays) в формат листа Excel
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Добавляет лист в книгу
    XLSX.writeFile(wb, "data.xlsx"); // Сохраняет книгу в файл "data.xlsx"
}

export { silpoExportToExcel };