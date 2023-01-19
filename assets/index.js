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
        showcarrinho: false
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
            alert('promo ok')
        },
        adicionarItem() {
            this.produtoModal.estoque --
            const {id, nome, preco} = this.produtoModal
            this.carrinho.push({id, nome, preco})
        },
        removerItem(index) {
            this.carrinho.splice(index, 1)
        },
        checarLocalstorage() {
            if (window.localStorage.carrinho) {
                this.carrinho = JSON.parse(window.localStorage.carrinho)
            }
        },
        handleScroll() {
            let nav = document.querySelector('#nav')
            this.scrollNumber = window.scrollY
            if (this.scrollNumber > 100) {
                nav.classList.add('navShadow')
            } else {
                nav.classList.remove('navShadow')
            }
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