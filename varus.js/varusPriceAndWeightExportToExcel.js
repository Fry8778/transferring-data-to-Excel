function varusPriceAndWeightExportToExcel() {     
    const productCards = document.querySelectorAll('.sf-product-card__wrapper');
    console.log("productCards:", productCards);

    // Фильтрация товаров по наличию слова "кава" в тексте ссылки
    const filteredProducts = Array.from(productCards).filter(productCard => {
        const productNameElements = productCard.querySelectorAll('.sf-product-card__title');
        const productNames = Array.from(productNameElements).map(element => element.innerText.toLowerCase());
        console.log("productNameElements:", productNameElements);
        return  productNames.some(name => 
            name.includes('кава') ||           
            name.includes('кава мелена')  ||
            name.includes('кава мел')  ||
            name.includes('кава зернова') ||
            name.includes('набір кави') ||                    
            name.includes('напій кавовий') ||
            name.includes('кава натуральна') ||
            name.includes('натуральна смажена в зернах') ||
            name.includes('натуральна смажена мелена') ||
            name.includes('кава натуральна смажена мелена') 
        );
    });

    const data = [[ 'Название товара',
                    'Цена товара(текущая цена)',                 
                    'Вес товара']];

    filteredProducts.forEach((productCard) => {
        const productNameElements = productCard.querySelectorAll('.sf-product-card__title');
        const priceElement = productCard.querySelector('.sf-price .sf-price__regular');  
        const weightElement = productCard.querySelector('.sf-product-card__quantity');      


            console.log("productNameElements:", productNameElements); 
            console.log("priceElement:", priceElement);          
            console.log("weightElement:", weightElement);        
            

            if (productNameElements &&
                priceElement &&             
                weightElement) {
                    const productName = Array
                        .from(productNameElements)
                        .map(element => element.innerText.trim() || '')
                        .join(' ');
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

export { varusPriceAndWeightExportToExcel };