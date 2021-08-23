class Lists {
    constructor() {
        this.lists = []
        this.adapter = new ListsAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadLists()
    }

    initBindingsAndEventListeners() {
        this.listsContainer = document.getElementById('lists-container')
        this.newListName = document.getElementById('new-list-name')
        this.listForm = document.getElementById('new-list-form')
        this.listForm.addEventListener('submit', this.createList.bind(this))
    }

    createList(e) {
        console.log(this)
        e.preventDefault()
        console.log(this.newListName.value)
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
        listsContainer.innerHTML = this.lists.map(list => list.renderList()).join('')
        // console.log('my lists are', this.lists)
    }
}