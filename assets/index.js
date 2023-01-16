const vm = new Vue({
    el: "#wrapper",
    data: {
        counter: 0,
        preco: 120 - 10,
        produtos: {}
    },
    methods: {
        produtosFetch() {
            fetch("./api/produtos.json")
            .then(r => r.json())
            .then(r => {
                this.produtos = r
            })
        }
    },
    computed: {
        
    },
    created() {
        this.produtosFetch()
    }
})