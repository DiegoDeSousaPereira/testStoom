describe('Fluxo E2E', () => {
    beforeEach(function () {
        cy.fixture("user").as('dadosUsuario');
        cy.fixture("mensagens").as('mensagens');
        cy.fixture('departamentos').as('departamento')
        cy.fixture('pagamento').as('dadospagamento')
    });

    context('Cadastro', () => {
        it('Validar codigo invalido', function () {
            cy.gerarEmailTemporario()
            cy.cadastrar(this.dadosUsuario.senha)
            Cypress.env('codigoValidacao', '12345')
            cy.inserirCodigo()
            cy.validarTextoVisivel(this.mensagens.codigoInvalido)
        });

        it('Cadastro com sucesso', function () {
            cy.gerarEmailTemporario()
            cy.cadastrar(this.dadosUsuario.senha)
            cy.validarTextoVisivel(this.mensagens.usuarioCadastrado)
            cy.buscarCodigoEnviado()
            cy.inserirCodigo()
            cy.validarTextoVisivel(this.mensagens.codigoValidado)
        });
    });

    context('Login', () => {

        it('Login invalido', function () {
            cy.login(this.dadosUsuario.senhaInvalida)
            cy.validarTextoVisivel(this.mensagens.senhaInvalida)
        });

        it('Login com sucesso', function () {
            cy.login(this.dadosUsuario.senha)
            cy.validarTextoVisivel(this.mensagens.loginSucesso)
        });

    });
    context('Carrinho de compra', () => {
        beforeEach(() => {
            cy.sessionLogin()
            cy.visit('/')
        });
        it('Adicionar produto ao carrinho: Tenda', function () {
            cy.selecionarDepartamento(this.departamento.tenda);
            cy.inserirCEP()
            cy.expandirProdutos();
            cy.adicionarProdutoCarrinho();
            cy.validarTextoVisivel(this.mensagens.itemCarrinho)
        });

        it('Remover produto do carrinho: Tenda', function () {
            cy.selecionarDepartamento(this.departamento.tenda); 
            cy.removerCarrinho();
            cy.validarTextoVisivel(this.mensagens.carrinhoVazio)
        });
        it('Adicionar produto ao carrinho: Seller', function () {
            cy.selecionarDepartamento(this.departamento.seller);
            cy.adicionarProdutoCarrinho();
            cy.validarTextoVisivel(this.mensagens.itemCarrinho);
        });
        it('Remover produto do carrinho: Seller', function () {
            cy.selecionarDepartamento(this.departamento.seller);
            cy.removerCarrinho();
            cy.validarTextoVisivel(this.mensagens.carrinhoVazio)
        });
    });

    context('Finalização do carrinho de compras', function () {
        beforeEach(() => {
            cy.sessionLogin()
            cy.visit('/')
        });
        it('Finalizando carrinho de compras com boleto', function () {
            cy.selecionarDepartamento(this.departamento.tenda);
            cy.expandirProdutos();
            cy.adicionarProdutoCarrinho();
            cy.validarTextoVisivel(this.mensagens.itemCarrinho)
            cy.continuarCompra();
            cy.cadastroCompra();
            cy.finalizarCompra()
            cy.esolherMetodoPagamento(this.dadospagamento.boleto)
            cy.validarTextoVisivel(this.mensagens.pedidoConcluido)
        });

        it('Finalizando carrinho de compras com cartao de credito', function () {
            cy.selecionarDepartamento(this.departamento.tenda);
            cy.expandirProdutos();
            cy.adicionarProdutoCarrinho();
            cy.validarTextoVisivel(this.mensagens.itemCarrinho)
            cy.continuarCompra();
            cy.finalizarCompra()
            cy.preencherDadosEntrega()
            cy.esolherMetodoPagamento(
                this.dadospagamento.cartao,
                this.dadospagamento.numeroCartao
            )
            cy.validarTextoVisivel(this.mensagens.pedidoConcluido)
        });
    })
});
