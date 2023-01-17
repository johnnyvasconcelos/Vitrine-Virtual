const vm = new Vue({
    el: "#wrapper",
    data: {
        counter: 0,
        preco: 120 - 10,
        produtos: {},
        showMenu: false,
        scrollNumber: 0
    },
    methods: {
        produtosFetch() {
            fetch("./api/produtos.json")
            .then(r => r.json())
            .then(r => {
                this.produtos = r
            })
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
        
    },
    created() {
        this.produtosFetch(),
        window.addEventListener('scroll', this.handleScroll)
    }
})