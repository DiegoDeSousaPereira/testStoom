import './login'
import './utils'
import 'cypress-plugin-api';
import './carrinho'

Cypress.on('uncaught:exception', (err, runnable) => {
    // Retorna `false` para evitar que o Cypress falhe o teste
    return false;
});
