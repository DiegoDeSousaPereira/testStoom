import { cpf } from 'cpf-cnpj-validator';

const middleDigits = Math.floor(1000 + Math.random() * 9000)
const lastDigits = Math.floor(1000 + Math.random() * 9000)
// Monta o telefone no formato (11)9XXXX-XXXX
const phoneNumber = `(${11})${9}${middleDigits}-${lastDigits}`;

Cypress.Commands.add('cadastrar', (senha) => {
    Cypress.env('cpfValido', cpf.generate())
    cy.visit('/cadastro?origem=home')
    cy.get('#nome').type('Teste automação');
    cy.get('#cpf').type(Cypress.env('cpfValido'));
    cy.get('#email').type(Cypress.env('email'));
    cy.get('#cellphone').clear().type(phoneNumber);
    cy.get('#password').type(senha);
    cy.get('#password2').type(senha);
    cy.get('.btn-create-account').click()
});

Cypress.Commands.add('finalizarCadastro', () => {
    cy.intercept('GET', 'https://services-alpha.tendaatacado.com.br/address/autocomplete/*').as('requestCep')
    cy.get('input[name="gender"]').eq(1).check();
    cy.get('input#day').type('15');
    cy.get('input#month').type('08');
    cy.get('input#year').type('1990');
    cy.get('#zipCode').type('13030-710');
    cy.get('[placeholder="Ex.: Casa, apartamento, trabalho"]').clear().type('Casa');
    cy.get('#number').type('123');
    cy.get('#addressLine2').type('Casa');
    cy.get('#reference').type('Casa');
    cy.wait('@requestCep').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
    cy.get('.btn-create-account').click();
});


Cypress.Commands.add('login', (senha) => {
    cy.visit('/')
    cy.get('[src="/assets/svg/ico_close_with_circle.svg"]').last().click()
    cy.contains('Faça seu login').click()

    cy.get('#login').type(Cypress.env('cpfValido'));
    cy.get('#password').type(senha);
    cy.get('[type="submit"]').click();
});

Cypress.Commands.add('sessionLogin', () => {
    const login = () => {
        cy.visit('/')
        cy.login(Cypress.env('password'))
        cy.validarTextoVisivel('Olá, Teste')
    };
    cy.session(Cypress.env('cpfValido'), login)
});

Cypress.Commands.add('inserirCodigo', () => {
    cy.get('#code').type(Cypress.env('codigoValidacao'))
    cy.contains('Continuar').click()
});

