const vm = new Vue({
    el: "#wrapper",
    data: {
        counter: 0,
        preco: 120 - 10,
        produtos: {},
        showMenu: false,
        scrollNumber: 0
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
        zeroPromo() {
            let promo = document.querySelectorAll('.promo')
            console.log(promo[1])
            alert('promo ok')
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
    created() {
        this.produtosFetch(),
        window.addEventListener('scroll', this.handleScroll)
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