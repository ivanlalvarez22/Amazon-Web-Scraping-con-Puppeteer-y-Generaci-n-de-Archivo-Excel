const puppeteer = require("puppeteer");
const xlsx = require("xlsx");

(async () => {
  const URL =
    "https://www.amazon.com/s?k=placa+de+video&__mk_es_US=%C3%85M%C3%85%C5%BD%C3%95%C3%91";

  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  // Configurar el User-Agent para que se parezca al de un navegador común
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36"
  );

  await page.goto(URL, { waitUntil: "networkidle2" });

  const title = await page.title();
  console.log(`Título de la página: ${title}`);

  let products = [];
  let nextPage = true;

  while (nextPage) {
    // Esperar que los productos se carguen
    await page.waitForSelector(".puis-card-container.s-card-container", {
      timeout: 5000,
    });

    const newProducts = await page.evaluate(() => {
      const products = Array.from(
        document.querySelectorAll(".puis-card-container.s-card-container")
      );

      return products.map((product) => {
        const title = product.querySelector(".a-text-normal")?.innerText;
        const priceWhole = product.querySelector(".a-price-whole")?.innerText;
        const priceFraction =
          product.querySelector(".a-price-fraction")?.innerText;

        if (!priceWhole || !priceFraction) {
          return {
            title,
            price: "N/A",
          };
        }

        const priceWholeCleaned = priceWhole.replace(/\n/g, "").trim();
        const priceFractionCleaned = priceFraction.replace(/\n/g, "").trim();

        return {
          title,
          price: `${priceWholeCleaned}.${priceFractionCleaned}`,
        };
      });
    });

    products = [...products, ...newProducts];

    // Esperar que el botón "Siguiente" esté disponible
    nextPage = await page.evaluate(() => {
      const nextButton = document.querySelector(".s-pagination-next");

      if (
        nextButton &&
        !nextButton.classList.contains("s-pagination-disabled")
      ) {
        nextButton.click();
        return true;
      }

      return false;
    });

    if (nextPage) {
      // Usar setTimeout en lugar de page.waitForTimeout para esperar
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  console.log(products);

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(products);
  const path = "products.xlsx";

  xlsx.utils.book_append_sheet(wb, ws, "Products");
  xlsx.writeFile(wb, path);

  console.log("Proceso completado. Revisa el archivo products.xlsx.");

  await browser.close();
})();
