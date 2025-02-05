function tavriavAmountOfDiscountExportToExcel() {     
    const productCards = document.querySelectorAll('.products__item');
    console.log("productCards:", productCards);

    // Фильтрация товаров по наличию слова "кава" в тексте ссылки
    const filteredProducts = Array.from(productCards).filter(productCard => {
        const productNameElements = productCard.querySelectorAll('.product__title');
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
                   'Цена товара с учетом скидки(текущая цена)',             
                   'Старая цена товара(цена без скидки)',
                   'Процент скидки(%)']];


    filteredProducts.forEach((productCard) => {
        const productNameElements = productCard.querySelectorAll('.product__title');           
        const specialPriceElement = productCard.querySelector('.price__with_discount .price__discount');       
        const salePriceElement = productCard.querySelector('.price__with_discount .price__old');
        const discountPercentageElement = productCard.querySelector('.discount_info > span.percentage__info');

        console.log("specialPriceElement:", specialPriceElement);        
        console.log("salePriceElement:", salePriceElement); 
        console.log("discountPercentageElement:", discountPercentageElement);
            

        if (productNameElements.length > 0 &&          
            specialPriceElement &&           
             salePriceElement &&
             discountPercentageElement) {
            const productName = Array.from(productNameElements).map(element => element.innerText.trim() || '').join(' ');         
            const specialPrice = specialPriceElement.innerText.trim() || '';       
            const salePrice = salePriceElement.innerText.trim() || '';
            const discountPercentage = discountPercentageElement.innerText.trim() || '';

            data.push([productName,                 
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

export { tavriavAmountOfDiscountExportToExcel };