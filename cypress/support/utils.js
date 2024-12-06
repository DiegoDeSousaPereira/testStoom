Cypress.Commands.add('gerarEmailTemporario', () => {
    cy.request('GET', 'https://api.guerrillamail.com/ajax.php?f=get_email_address').then((response) => {
        const email = response.body.email_addr;
        Cypress.env('email', email); // Armazena o e-mail no ambiente do Cypress
        cy.log(`E-mail gerado: ${email}`);
    });
});

Cypress.Commands.add('buscarCodigoEnviado', (tentativas = 3) => {
    if (tentativas === 0) throw new Error('Token de validação não encontrado após 3 tentativas.');

    cy.wait(10000);
    cy.request('GET', 'https://api.guerrillamail.com/ajax.php?f=check_email&seq=0')
        .then(({ body: { list } }) => list[0]?.mail_id || null)
        .then((mailId) => {
            if (!mailId) return cy.buscarCodigoEnviado(tentativas - 1); // Tenta novamente
            return cy.request(`https://api.guerrillamail.com/ajax.php?f=fetch_email&email_id=${mailId}`);
        })
        .then((response) => {
            const codigo = response?.body?.mail_body?.match(/<td style="padding-top:16px;">([\w\d]+)<\/td>/)?.[1];
            if (!codigo) return cy.buscarCodigoEnviado(tentativas - 1); // Tenta novamente
            Cypress.env('codigoValidacao', codigo);
        });
});

Cypress.Commands.add('validarTextoVisivel', (texto) => {
    cy.contains(texto)
        .should('be.visible')
});

Cypress.Commands.add('validarTextoNaoVisivel', (texto) => {
    cy.contains(texto)
        .should('not.exist')
});