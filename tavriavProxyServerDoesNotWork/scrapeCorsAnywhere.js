async function fetchProductsFromSite() {
    const proxyUrl = "http://localhost:8080/";
    const targetUrl =
      "https://www.tavriav.ua/ca/%D1%87%D0%B0%D1%97-%D0%BA%D0%B0%D0%B2%D0%B0-%D1%82%D0%B0-%D0%BA%D0%B0%D0%BA%D0%B0%D0%BE/%D0%BA%D0%B0%D0%B2%D0%BE%D0%B2%D1%96-%D0%BD%D0%B0%D0%BF%D0%BE%D1%97/9829/9830";
    const response = await fetch(proxyUrl + targetUrl);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

  // Перевірка, чи є елементи з потрібним класом на сторінці
    const productCards = doc.querySelectorAll(".general__content");
    console.log("Картки товарів на початку:", productCards.length);
    
    // console.log("HTML контент сторінки:", html); // Додай виведення HTML в консоль для перевірки
    return html;
  }
  
  async function scrollAndFetchProducts(doc) {
    // Створення спостерігача змін для DOM
    const observer = new MutationObserver(() => {});
    observer.observe(doc.body, { childList: true, subtree: true });
  
    let previousHeight = 0;
    while (true) {
      const currentHeight = doc.body.scrollHeight;
      window.scrollTo(0, currentHeight); // Прокручування сторінки вниз
      await new Promise((resolve) => setTimeout(resolve, 15000)); // Затримка для завантаження нових елементів
  
      if (currentHeight === previousHeight) {
        break; // Якщо висота сторінки не змінилась, зупиняємо скрол
      }
      previousHeight = currentHeight;
    }
  
    // Припиняємо спостереження після прокручування
    observer.disconnect();
  
    // Повертаємо усі картки товарів
    const productCards = doc.querySelectorAll(".general__content");
    return productCards;
  }
  
  async function allKavaTavriavExportToExcel() {
    const html = await fetchProductsFromSite();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
  
    // Динамічно завантажуємо всі товари
    const productCards = await scrollAndFetchProducts(doc);
  
    console.log("Знайдено карток товарів:", productCards.length);
  
    // Фільтрація товарів за назвою
    const filteredProducts = Array.from(productCards).filter((productCard) => {
      const productNameElement = productCard.querySelector(".prod__name");
      const productName = productNameElement
        ? productNameElement.innerText.toLowerCase()
        : "";
      return (
        productName.includes("кава") ||
        productName.includes("кава мелена") ||
        productName.includes("кава мел") ||
        productName.includes("кава зернова") ||
        productName.includes("набір кави") ||
        productName.includes("напій кавовий") ||
        productName.includes("кава натуральна") ||
        productName.includes("натуральна смажена в зернах") ||
        productName.includes("натуральна смажена мелена") ||
        productName.includes("кава натуральна смажена мелена")
      );
    });
  
    console.log("Кількість відфільтрованих товарів:", filteredProducts.length);
  
    const data = [
      [
        "Назва товару",
        "Ціна товару (грн)",
        "Ціна товару з урахуванням знижки (грн)",
        "Стара ціна товару (грн)",
        "Відсоток знижки (%)",
      ],
    ];
  
    filteredProducts.forEach((productCard) => {
      const productNameElements = productCard.querySelectorAll(".prod__name");
      const priceElement = productCard.querySelector(".base__price");
      const specialPriceElement = productCard.querySelector(".base__price");
      const salePriceElement = productCard.querySelector(".prod-crossed-out__price__old");
      const discountPercentageElement = productCard.querySelector(".prod-crossed-out__price__special-off");
  
      // Логування елементів для перевірки
      console.log("productNameElements:", productNameElements);
      console.log("priceElement:", priceElement);
      console.log("specialPriceElement:", specialPriceElement);
      console.log("salePriceElement:", salePriceElement);
      console.log("discountPercentageElement:", discountPercentageElement);
  
      const productName = Array.from(productNameElements)
        .map((element) => element.innerText.trim())
        .join(" ");
      const price = priceElement ? priceElement.innerText.trim() : "";
      const specialPrice = specialPriceElement
        ? specialPriceElement.innerText.trim()
        : "";
      const salePrice = salePriceElement ? salePriceElement.innerText.trim() : "";
      const discountPercentage = discountPercentageElement
        ? discountPercentageElement.innerText.trim()
        : "";
  
      data.push([
        productName,
        price,
        specialPrice,
        salePrice,
        discountPercentage,
      ]);
    });
  
    console.log("Зібрані дані для експорту:", data);
  
    if (data.length > 1) {
      const sortedData = [
        data[0],
        ...data.slice(1).sort((a, b) => a[0].localeCompare(b[0], ["en", "uk"])),
      ];
  
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(sortedData);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "all_kava.xlsx");
    } else {
      alert("На сторінці немає даних для експорту в Excel.");
    }
  }
  
  document
    .getElementById("exportButton")
    .addEventListener("click", allKavaTavriavExportToExcel);
  