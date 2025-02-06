async function tavriaVExportToExcel() {
    const url = "https://www.tavriav.ua/ca/%D1%87%D0%B0%D0%B8-%D0%BA%D0%B0%D0%B2%D0%B0-%D1%82%D0%B0-%D0%BA%D0%B0%D0%BA%D0%B0%D0%BE/%D0%BA%D0%B0%D0%B2%D0%BE%D0%B2%D1%96-%D0%BD%D0%B0%D0%BF%D0%BE%D1%96/9829/9830"; // Замінити на актуальну сторінку товарів
    
    try {
        const response = await fetch(url);
        const text = await response.text();

        // Парсимо отриманий HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        const productCards = doc.querySelectorAll('.general__content');

        const filteredProducts = Array.from(productCards).filter(productCard => {
            const productNameElement = productCard.querySelector('.prod__name');
            const productName = productNameElement ? productNameElement.innerText.toLowerCase() : '';
            return productName.includes('кава') || productName.includes('кава мелена') ||
                   productName.includes('кава зернова') || productName.includes('натуральна смажена');
        });

        const data = [["Назва товару", "Ціна", "Знижена ціна", "Стара ціна", "Знижка"]];

        filteredProducts.forEach(productCard => {
            const productName = productCard.querySelector('.prod__name')?.innerText.trim() || '';
            const price = productCard.querySelector('.base__price')?.innerText.trim() || '';
            const specialPrice = productCard.querySelector('.prod-crossed-out__price__old')?.innerText.trim() || '';
            const salePrice = productCard.querySelector('.prod-crossed-out__price__special-off')?.innerText.trim() || '';

            data.push([productName, price, specialPrice, salePrice]);
        });

        if (data.length > 1) {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, "all_kava.xlsx");
        } else {
            alert("На сторінці немає відповідних товарів.");
        }
    } catch (error) {
        console.error("Помилка завантаження сторінки:", error);
    }
}


export { tavriaVExportToExcel };