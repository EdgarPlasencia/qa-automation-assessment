PROYECTO DE AUTOMATIZACIÓN QA - E2E Y API (CYPRESS)

REQUISITOS PREVIOS:
1. Node.js instalado (v14 o superior).
2. Conexión a internet.

INSTRUCCIONES DE EJECUCIÓN (PASO A PASO):
1. Clonar el repositorio o descomprimir el archivo .zip.
2. Abrir una terminal en la carpeta raíz del proyecto.
3. Ejecutar el comando para instalar las dependencias:
   npm install
4. Para ejecutar las pruebas en modo "Headless" (consola), ejecuta:
   npx cypress run
5. Para ejecutar las pruebas de manera visual utilizando el Test Runner de Cypress, ejecuta:
   npx cypress open
   - Selecciona "E2E Testing"
   - Elige el navegador de tu preferencia (Chrome, Edge, Electron).
   - Haz clic en 'saucedemo_compra.cy.js' para el E2E o 'demoblaze_api.cy.js' para APIs.