# Amazon Web Scraping con Puppeteer y Generación de Archivo Excel

Este proyecto utiliza Puppeteer, una biblioteca de Node.js para controlar un navegador Chrome o Chromium automatizado, para extraer información de productos de Amazon y guardarla en un archivo Excel.

## Descripción del Proyecto

El objetivo de este script es buscar productos de "placa de video" en Amazon y recolectar detalles como el título y el precio de cada producto encontrado. Luego, estos datos se almacenan en un archivo Excel (`products.xlsx`).

## Funcionamiento del Script

El script realiza las siguientes acciones:

1. **Configuración Inicial:**
   - Inicia una instancia de Puppeteer y abre una nueva página.
   - Configura el User-Agent para simular un navegador común.

2. **Navegación y Extracción de Datos:**
   - Navega a la URL de búsqueda de Amazon para "placa de video".
   - Espera a que la página cargue completamente utilizando `waitUntil: 'networkidle2'`.
   - Utiliza `page.evaluate()` para ejecutar un código JavaScript en el contexto de la página y extraer los datos de los productos (título y precio).

3. **Paginación:**
   - Itera a través de las páginas de resultados mientras haya un botón de "siguiente página" disponible.
   - Hace clic en el botón de "siguiente página" y espera brevemente antes de continuar para asegurar que la página siguiente se cargue.

4. **Generación del Archivo Excel:**
   - Almacena los datos de los productos en un array `products`.
   - Convierte este array en una hoja de trabajo (`worksheet`) utilizando la biblioteca `xlsx`.
   - Crea un archivo Excel llamado `products.xlsx` y guarda la hoja de trabajo en él.

5. **Cierre del Navegador:**
   - Cierra la instancia de Puppeteer una vez que se hayan extraído todos los datos y se haya generado el archivo Excel.

## Requisitos

- Node.js instalado (debe ser al menos la versión 14).
- Conexión a Internet para realizar la búsqueda en Amazon.

## Instalación y Uso

1. Clona o descarga este repositorio.
2. Instala las dependencias ejecutando `npm install`.
3. Ejecuta el script con el comando `node index.js`.

## Notas Adicionales

- El script espera 2 segundos entre cada página para evitar sobrecargar los servidores de Amazon y para asegurar que las páginas se carguen completamente.
- Asegúrate de ajustar el selector CSS utilizado para los productos (`".puis-card-container.s-card-container"`, `".a-text-normal"`, `.a-price-whole`, `.a-price-fraction`) según los cambios en la estructura de la página de Amazon.

## Autor

- Nombre: Iván L. Alvarez
- GitHub: https://github.com/ivanlalvarez22

Si tienes alguna pregunta o problema, no dudes en abrir un problema en este repositorio o contactarme directamente.

