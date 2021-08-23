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
        const listsContainer = document.getElementById('lists-container')
        listsContainer.innerHTML = 'my lists go here'
        // console.log('my lists are', this.lists)
    }
}