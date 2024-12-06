import './login'
import './utils'
import './carrinho'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});
