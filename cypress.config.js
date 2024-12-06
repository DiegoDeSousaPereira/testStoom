const { defineConfig } = require("cypress");
const cypressMochawesomeReporter = require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  defaultCommandTimeout: 15000,
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: false,
    embeddedScreenshots: true, // Adiciona screenshots ao relatório
    inlineAssets: true // Inclui assets inline no relatório para visualização
  },
  video: true,
  retries: 3,
  viewportWidth: 1600,
  viewportHeight: 900,
  e2e: {
    baseUrl: 'https://marketplace-alpha.tendaatacado.com.br//',
    setupNodeEvents(on, config) {
      cypressMochawesomeReporter(on);
    },
  },
});
