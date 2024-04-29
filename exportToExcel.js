// function exportToExcel() {    
//     const productNames = document.querySelectorAll('.product-card__body > a.product-card__title');   
//     const prices = document.querySelectorAll('.ft-whitespace-nowrap.ft-text-22.ft-font-bold');   
//     const salePrices = document.querySelectorAll('.ft-line-through.ft-text-black-87.ft-typo-14-regular.xl\\:ft-typo');    
//     const weights = document.querySelectorAll('.ft-typo-14-semibold.xl\\:ft-typo-16-semibold > span');   
//     const amountsOfDiscount = document.querySelectorAll('.product-card-price__sale');

//     // Фильтрация товаров по тексту внутри элемента <a>
//         const filteredProducts = Array.from(productNames).filter(product => product.innerText.toLowerCase().includes('кава'));

//     // Создание массива данных для записи в Excel
//     const data = [['Название товара', 'Цена', 'Цена без скидки', 'Вес товара', 'Размер скидки в %']];

//     // Добавление данных из отфильтрованных элементов в массив
//     filteredProducts.forEach((product, i) => {
//         const productName = product.innerText;
//         const price = prices[i]?.innerText || '';
//         const salePrice = salePrices[i]?.innerText || '';
//         const weight = weights[i]?.textContent || '';
//         const amountOfDiscount = amountsOfDiscount[i]?.innerText || '';

//         data.push([productName, price, salePrice, weight, amountOfDiscount]);
//     });

//     // Создание новой книги Excel
//     const wb = XLSX.utils.book_new();
//     // Преобразование данных в формат, понятный для библиотеки SheetJS
//     const ws = XLSX.utils.aoa_to_sheet(data);
//     // Добавление листа в книгу
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

//     // Запись книги в файл Excel
//     XLSX.writeFile(wb, "data.xlsx");
// }

// export { exportToExcel };




// function exportToExcel() {    
//     const productNames = document.querySelectorAll('.product-card__body > a.product-card__title');   
//     const prices = document.querySelectorAll('.ft-whitespace-nowrap.ft-text-22.ft-font-bold');   
//     const salePrices = document.querySelectorAll('.ft-line-through.ft-text-black-87.ft-typo-14-regular.xl\\:ft-typo');    
//     const weights = document.querySelectorAll('.ft-typo-14-semibold.xl\\:ft-typo-16-semibold > span');   
//     const amountsOfDiscount = document.querySelectorAll('.product-card-price__sale');

//     // Фильтрация товаров по тексту внутри элемента <a>
//     const filteredProducts = Array.from(productNames).filter(product => product.innerText.toLowerCase().includes('кава'));

//     // Создание массива данных для записи в Excel
//     const data = [['Название товара', 'Цена', 'Цена без скидки', 'Вес товара', 'Размер скидки в %']];

//     // Добавление данных из отфильтрованных элементов в массив
//     filteredProducts.forEach((product, i) => {
//         const productName = product.innerText;
//         const price = prices[i]?.innerText.trim();
//         const salePrice = salePrices[i]?.innerText.trim();
//         const weight = weights[i]?.textContent.trim();
//         const amountOfDiscount = amountsOfDiscount[i]?.innerText.trim();

//         // Проверка наличия всех данных перед добавлением в массив
//         if (price && salePrice && weight && amountOfDiscount) {
//             data.push([productName, price, salePrice, weight, amountOfDiscount]);
//         }
//     });

//     // Если массив данных остался пустым, значит, ничего не найдено
//     if (data.length <= 1) {
//         alert("На странице нет данных для экспорта в Excel.");
//         return;
//     }

//     // Создание новой книги Excel
//     const wb = XLSX.utils.book_new();
//     // Преобразование данных в формат, понятный для библиотеки SheetJS
//     const ws = XLSX.utils.aoa_to_sheet(data);
//     // Добавление листа в книгу
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

//     // Запись книги в файл Excel
//     XLSX.writeFile(wb, "data.xlsx");
// }

// export { exportToExcel };


// function exportToExcel() {    
//     const productNames = document.querySelectorAll('.product-card__body');   
//     const prices = document.querySelectorAll('.ft-whitespace-nowrap.ft-text-22.ft-font-bold');   
//     const salePrices = document.querySelectorAll('.ft-line-through.ft-text-black-87.ft-typo-14-regular.xl\\:ft-typo');    
//     const weights = document.querySelectorAll('.ft-typo-14-semibold.xl\\:ft-typo-16-semibold > span');   
//     const amountsOfDiscount = document.querySelectorAll('.product-card-price__sale');

//     // Фильтрация товаров по тексту внутри элемента <a>
//     const filteredProducts = Array.from(productNames).filter(product => product.innerText.toLowerCase().includes('кава'));

//     // Создание массива данных для записи в Excel
//     const data = [['Название товара', 'Цена', 'Цена без скидки', 'Вес товара', 'Размер скидки']];

//     // Добавление данных из отфильтрованных элементов в массив
//     filteredProducts.forEach((product, i) => {
//         const productName = product.innerText.trim() || ''; // Проверка наличия данных productName перед добавлением в массив
//         const price = prices[i]?.innerText.trim() || '';
//         const salePrice = salePrices[i]?.innerText.trim() || '';
//         const weight = weights[i]?.innerText.trim() || '';
//         const amountOfDiscount = amountsOfDiscount[i]?.innerText.trim() || '';
    
//         // Проверка наличия всех данных перед добавлением в массив
//         if (productName && price && salePrice && weight && amountOfDiscount) {
//             data.push([productName, price, salePrice, weight, amountOfDiscount]);
//         }
//     });
    

//     // Если массив данных остался пустым, значит, ничего не найдено
//     if (data.length <= 1) {
//         alert("На странице нет данных для экспорта в Excel.");
//         return;
//     }

//     // Создание новой книги Excel
//     const wb = XLSX.utils.book_new();
//     // Преобразование данных в формат, понятный для библиотеки SheetJS
//     const ws = XLSX.utils.aoa_to_sheet(data);
//     // Добавление листа в книгу
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

//     // Запись книги в файл Excel
//     XLSX.writeFile(wb, "data.xlsx");
// }

// export { exportToExcel };

function exportToExcel() {     
    const productNames = document.querySelectorAll('.product-card__body > a.product-card__title');
    const prices = document.querySelectorAll('.product-card__body .ft-whitespace-nowrap.ft-text-22.ft-font-bold');
    const salePrices = document.querySelectorAll('.product-card__body .ft-line-through.ft-text-black-87.ft-typo-14-regular.xl\\:ft-typo');
    const weights = document.querySelectorAll('.product-card__body .ft-typo-14-semibold.xl\\:ft-typo-16-semibold > span');
    const amountsOfDiscount = document.querySelectorAll('.product-card__body .product-card-price__sale');


    // Фильтрация товаров по наличию слова "кава" в тексте ссылки
    const filteredProducts = Array.from(productNames).filter(product => product.innerText.toLowerCase().includes('кава'));

    // Создание массива данных для записи в Excel
    const data = [['Название товара', 'Цена', 'Цена без скидки', 'Вес товара', 'Размер скидки']];

    // Добавление данных из отфильтрованных элементов в массив
    filteredProducts.forEach((product, i) => {
        const productName = product.innerText;
        const price = prices[i]?.innerText || '';
        const salePrice = salePrices[i]?.innerText || '';
        const weight = weights[i]?.innerText || '';
        const amountOfDiscount = amountsOfDiscount[i]?.innerText || '';

        // data.push([productName, price, salePrice, weight, amountOfDiscount]);

        //  Проверка наличия всех данных перед добавлением в массив
        if (productName && price && salePrice && weight && amountOfDiscount) {
            data.push([productName, price, salePrice, weight, amountOfDiscount]);
        }
    });
    

    // Если массив данных остался пустым, значит, ничего не найдено
    if (data.length <= 1) {
        alert("На странице нет данных для экспорта в Excel.");
        return;
    }
  

    // Создание новой книги Excel
    const wb = XLSX.utils.book_new();
    // Преобразование данных в формат, понятный для библиотеки SheetJS
    const ws = XLSX.utils.aoa_to_sheet(data);
    // Добавление листа в книгу
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Запись книги в файл Excel
    XLSX.writeFile(wb, "data.xlsx");
}

export { exportToExcel };


// function exportToExcel() {
//     const productCards = document.querySelectorAll('.product-card');
//     const filteredProducts = Array.from(productCards).filter(product => product.innerText.toLowerCase().includes('кава'));
//     const data = [['Название товара', 'Цена', 'Цена без скидки', 'Вес товара', 'Размер скидки']];

//     filteredProducts.forEach((productCard) => {
//         const productNameElement = productCard.querySelector('a.product-card__title');
//         const priceElement = productCard.querySelector('.ft-whitespace-nowrap.ft-text-22.ft-font-bold');
//         const salePriceElement = productCard.querySelector('.ft-line-through.ft-text-black-87.ft-typo-14-regular.xl\\:ft-typo');
//         const weightElement = productCard.querySelector('.ft-typo-14-semibold.xl\\:ft-typo-16-semibold > span');
//         const amountOfDiscountElement = productCard.querySelector('.product-card-price__sale');

//         if (productNameElement && priceElement && salePriceElement && weightElement && amountOfDiscountElement) {
//             const productName = productNameElement.innerText;
//             const price = priceElement.innerText.trim() || '';
//             const salePrice = salePriceElement.innerText.trim() || '';
//             const weight = weightElement.innerText.trim() || '';
//             const amountOfDiscount = amountOfDiscountElement.innerText.trim() || '';

//               //  Проверка наличия всех данных перед добавлением в массив
//         if (productName && price && salePrice && weight && amountOfDiscount) {
//             data.push([productName, price, salePrice, weight, amountOfDiscount]);
//         }
//         }
//     });

 
   

//     if (data.length <= 1) {
//         alert("На странице нет данных для экспорта в Excel.");
//         return;
//     }

//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

//     XLSX.writeFile(wb, "data.xlsx");
// }

// export { exportToExcel };
