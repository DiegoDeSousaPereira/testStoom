Cypress.Commands.add('adicionarProdutoCarrinho', () => {
    cy.get('#buttonbuy-sku-').first().click();
});
Cypress.Commands.add('removerCarrinho', () => {
    cy.get('.btn-action-decrement').first().click();
})
Cypress.Commands.add('selecionarDepartamento', (departamento) => {
    cy.visit(departamento);
});
Cypress.Commands.add('inserirCEP', () => {
    cy.get('#shipping-cep').type('13030710');
    cy.get('.card-content').first().click()
    cy.get('.card-information-component').first().click()
    cy.validarTextoVisivel('Data de retirada')
    cy.get('.tab-day').last().click()
    cy.get('.card-information-component').first().click()
});

Cypress.Commands.add('selecionarFormaEntrega', () => {
    cy.get('.card-information-component').first().click();
});
Cypress.Commands.add('expandirProdutos', () => {
    cy.contains('Ver mais produtos').click();
});
Cypress.Commands.add('continuarCompra', () => {
    cy.contains('Ver carrinho').click();
    cy.get('.btn-finish-order').click();

});
Cypress.Commands.add('cadastroCompra', () => {
    cy.get('#gender').last().click();    
    cy.get('[data-cy="inpt-text-day"]').type('08');
    cy.get('[data-cy="inpt-text-month"]').type('08');
    cy.get('[data-cy="inpt-text-year"]').type('2000');
    cy.get('[placeholder="Ex.: Casa, apartamento, trabalho"]').type('teste');
    cy.get('#zipCode').type('13030-710')
    cy.get('#addressLine2').type('teste')
    cy.get('#number').type('100')
    cy.get('#reference').type('teste')
    cy.contains('Finalizar sua conta no Tenda Atacado').click();
});

Cypress.Commands.add('finalizarCompra', () => {
    cy.contains('Finalizar compra').click()
});

Cypress.Commands.add('preencherDadosEntrega', () => {
    cy.get('.btn-delivery').eq(1).click()
    cy.contains('Clique & Retire').click()
    cy.get('.card-information-component').first().click()
    cy.validarTextoVisivel('Data de retirada')
    cy.get('.tab-day').last().click()
    cy.get('.card-information-component').first().click()
    cy.get('.resume-buttons > .btn').click()
})
Cypress.Commands.add('esolherMetodoPagamento', (metodo, cartao) => {

    cy.contains(metodo).click()
    if(metodo == 'Cartão de crédito'){
        cy.get('#number').type(cartao)
        cy.get('#cvv').type('081')
        cy.get('#month').type('01{enter}')
        cy.get('#year').type('2030{enter}')
        cy.get('[name="document"]').type(Cypress.env('cpfValido'))
        cy.get('#name').type('Teste Automação')
    }
    cy.contains('Pagar com').click()
})
