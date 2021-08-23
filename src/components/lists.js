class Lists {
    constructor() {
        this.lists = []
        this.adapter = new ListsAdapter()
        //this.bindEventListeners()
        this.fetchAndLoadLists()
    }

    fetchAndLoadLists() {
        this.adapter
            .getLists()
            .then(lists => {
                lists.forEach(list => this.lists.push(new List(list)))
                console.log(this.lists)
            })
            .then(() => {
                this.render()
            })
        }

    render() {
        //console.log(listsString)
        const listsContainer = document.getElementById('lists-container')
        listsContainer.innerHTML = this.lists.map(list => `<li>${list.name}</li>`).join('')
        // console.log('my lists are', this.lists)
    }
}