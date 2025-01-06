// Код передбачений для пошуку кави на загальній сторінці  
function zakazuaNovusExportToExcel() {   
    const productCards = document.querySelectorAll('.ProductTile');
    console.log("productCards:", productCards);  
    const filteredProducts = Array.from(productCards).filter(productCard => {
        const productNameElement = productCard.querySelector('.ProductTile__title');          
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
    console.log("filteredProducts:", filteredProducts);
    // Якщо productCards знаходить массив елементів але у filteredProducts length:0, треба звернути увагу на мову сторінки (укр/рус). 
    // Можливо задані невірні параметри для пошуку елементів массиву, тобто якщо мова пошуку українська, а мова сторінки російська елементи знайти не є можливим.   
    

    const data = [[ 'Название товара',            
                    'Цена товара(текущая цена)', 
                    'Вес товара',     
                    'Цена товара с учетом скидки(текущая цена)',
                    'Старая цена товара(цена без скидки)',
                    'Процент скидки(%)']];

                    filteredProducts.forEach((productCard) => {
                        const productNameElements = productCard.querySelectorAll('.ProductTile__title'); 
                        const priceElement = productCard.querySelector('.jsx-cdc81c93bd075911 > span.Price__value_caption');
                        const weightElement = productCard.querySelector('.ProductTile__weight');    
                
                        // Проверяем наличие скидки
                        const specialPriceElement = productCard.querySelector('.jsx-cdc81c93bd075911 > span.Price__value_discount');  
                        const salePriceElement = productCard.querySelector('.ProductTile__oldPrice > span.Price__value_minor');     
                        const discountPercentageElement = productCard.querySelector('.Badge_discount.Badge_straightLeft > span.Badge__text');
                
                        console.log("productNameElements:", productNameElements);        
                        console.log("priceElement:", priceElement);
                        console.log("weightElement:", weightElement);
                        
                        console.log("specialPriceElement:", specialPriceElement);      
                        console.log("salePriceElement:", salePriceElement);   
                        console.log("discountPercentageElement:", discountPercentageElement); 
                
                        if (!specialPriceElement || !salePriceElement || !discountPercentageElement) {
                            // Если элементов .ft-line-through.ft-text-black-87.ft-typo-14-regular.xl\\:ft-typo и .product-card-price__sale нет внутри .product-card-price__old,
                            // значит, товар не имеет скидки
                            const price = priceElement ? priceElement.innerText.trim() || '' : '';  
                            const weight = weightElement ? weightElement.innerText.trim() || '' : '';  
                            const productName = Array
                                .from(productNameElements)
                                .map(element => element.innerText.trim() || '')
                                .join(' ');     
                            const specialPrice = '';  // Пустое значение для товаров без скидки
                            const salePrice = '';     // Пустое значение для товаров без скидки
                            const discountPercentage = '';     // Пустое значение для товаров без скидки
                            data.push([ productName,    
                                        price,
                                        weight,
                                        specialPrice,
                                        salePrice,                     
                                        discountPercentage]);
                        } else {
                            // Если элементы .ft-line-through.ft-text-black-87.ft-typo-14-regular.xl\\:ft-typo и .product-card-price__sale найдены, значит, товар имеет скидку
                            const productName = Array
                                .from(productNameElements)
                                .map(element => element.innerText.trim() || '')
                                .join(' ');     
                            const price = '';  
                            const weight = weightElement ? weightElement.innerText.trim() || '' : '';  
                            const specialPrice = specialPriceElement ? specialPriceElement.innerText.trim() || '' : ''; 
                            const salePrice = salePriceElement ? salePriceElement.innerText.trim() || '' : '';              
                            const discountPercentage = discountPercentageElement ? discountPercentageElement.innerText.trim() || '' : '';             
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
                
                    const wb = XLSX.utils.book_new();
                    const ws = XLSX.utils.aoa_to_sheet(data);
                    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
                    XLSX.writeFile(wb, "data.xlsx");
                }

export { zakazuaNovusExportToExcel };