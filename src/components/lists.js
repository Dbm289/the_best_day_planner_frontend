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
                lists.forEach(list => this.lists.push(list))
                //console.log(this.notes)
            })
            .then(() => {
                this.render()
            })
        }

    render() {
        const listsContainer = document.getElementById('lists-container')
        listsContainer.innerHTML = 'my notes here'
        // console.log('my lists are', this.lists)
    }
}