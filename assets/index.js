const vm = new Vue({
    el: "#wrapper",
    data: {
        counter: 0,
        preco: 120 - 10,
        produtos: {},
        showMenu: false,
        scrollNumber: 0,
        produtoModal: false,
        carrinho: [],
        showcarrinho: false,
        alertaAtivo: false,
        mensagemAlerta: '',
        showmenumobile: false
    },
    filters: {
        numeroPreco(valor) {
            return valor.toLocaleString('pt-BR', {
                style: "currency",
                currency: "BRL"
            })
        }
    },
    methods: {
        produtosFetch() {
            fetch("./api/produtos.json")
            .then(r => r.json())
            .then(r => {
                this.produtos = r
            })
        },
        fetchProduto(id) {
            fetch(`./api/produtos/${id}/dados.json`)
            .then(r => r.json())
            .then(r => {
                this.produtoModal = r
            })
        },
        zeroPromo() {
            let promo = document.querySelectorAll('.promo')
            console.log(promo[1])
        },
        adicionarItem() {
            this.produtoModal.estoque --
            const {id, nome, preco} = this.produtoModal
            this.carrinho.push({id, nome, preco})
            this.alerta(`${nome} foi adicionado ao carrinho.`)
        },
        removerItem(index) {
            this.carrinho.splice(index, 1)
            this.produtoModal.estoque ++
        },
        checarLocalstorage() {
            if (window.localStorage.carrinho) {
                this.carrinho = JSON.parse(window.localStorage.carrinho)
            }
        },
        compararEstoque() {
           const items = this.carrinho.filter(item => {
                if (item.id === this.produtoModal.id) {
                 return true  
                }
            })
            this.produtoModal.estoque = this.produtoModal.estoque - items.length
        },
        handleScroll() {
            let nav = document.querySelector('#nav')
            this.scrollNumber = window.scrollY
            if (this.scrollNumber > 100) {
                nav.classList.add('navShadow')
            } else {
                nav.classList.remove('navShadow')
            }
        },
        alerta(mensagem) {
            this.mensagemAlerta = mensagem
            this.alertaAtivo = true
            setTimeout(() => {
                this.alertaAtivo = false
            }, 1500)
        }
    },
    computed: {
        carrinhoTotal() {
            total = 0
            if (this.carrinho.length) {
                this.carrinho.forEach(item => {
                    total += item.preco
                })
            }
            return total
        }
    },
    watch: {
        produtos() {
            if (this.produtos) {
                this.compararEstoque()
            }
        },
        carrinho() {
            window.localStorage.carrinho = JSON.stringify(this.carrinho)
        }
    },
    created() {
        this.produtosFetch(),
        window.addEventListener('scroll', this.handleScroll)
        this.checarLocalstorage()
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                let promo = document.querySelectorAll('.promo')
                let precoAntigo = document.querySelectorAll('.real')
                for (let i = 0; i < promo.length; i++) {
                    if (promo[i].textContent == 0) {
                        promo[i].style.display = 'none'
                        precoAntigo[i].style.display = 'none'
                    }
                }
            }, 200)
        })
    }
})