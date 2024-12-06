import './login'
import './utils'
import 'cypress-plugin-api';
import './carrinho'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});
