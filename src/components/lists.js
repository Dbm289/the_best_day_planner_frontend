class Lists {
    constructor() {
        this.lists = []
        this.adapter = new ListsAdapter()
        this.fetchAndLoadLists()
        
    }

    initBindingsAndEventListeners() {
        const listsContainer = document.getElementById('lists-container')
        const names = document.querySelectorAll('li')
        const newListName = document.getElementById('new-list-name')
        const listForm = document.getElementById('new-list-form')
        const filterButton = document.getElementById('new-filter-button')
        listForm.addEventListener('submit', this.createList.bind(this))
        listsContainer.addEventListener('dblclick', this.handleListClick.bind(this))
        filterButton.addEventListener('click', this.handleFilterClick.bind(this))
    }

    handleListClick(e) {
        this.toggleList(e)
        
    }

    handleFilterClick(e) {
        this.filterList(e)
    }

    handleDeleteButtonClick(e) {
        //e.preventDefault();
        this.deleteList(e)
    }

    handleAddButtonClick(e) {
        this.createEvent(e)
    }

    toggleList(e) {
        const li = e.target
        li.contentEditable = true
        li.focus()
        li.classList.add('editable')
    }

    updateList(e) {
        //debugger
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        const newValue = li.innerHTML
        const id = li.parentNode.dataset.id
        this.adapter.updateList(newValue, id)

    }

    createList(e) {
        e.preventDefault()
        const newListValue = document.getElementById("new-list-name")
        const value = newListValue.value
        this.adapter.createList(value).then(newList => {
            const renderReady = new List(newList)
            this.lists.push(renderReady)
            newListValue.value = ''
        })
        .then(() => {
            this.render(this.lists)
        })
        .then(() => {
            this.initBindingsAndEventListeners()
        })
    }

    filterList(e) {
        const filteredList = this.lists.filter(function(word) {
            console.log(word)
            return word.name[0] == 'S'
        })
        console.log(filteredList)
        //return filteredList
        this.render(filteredList)
        
    }

    createEvent(e) {
        e.preventDefault()
        const newEventValue = e.target.parentNode
        const value = newEventValue.value
        const id = newEventValue.dataset.id
        this.adapter.createEvent(id)
        .then(() => {
            this.lists = []
        })
        .then(() => {
            this.fetchAndLoadLists()
        })
    }

    deleteList(e) {
        //debugger
        e.stopPropagation()
        const li = e.target.parentNode
        console.log(li)
        const id = li.dataset.id
        this.adapter.destroyList(id)
        .then(() => {
            this.lists = []
        })
        .then(() => {
            this.fetchAndLoadLists()
        })
        //this.render()
    }

    fetchAndLoadLists() {
        this.adapter
            .getLists()
            .then(lists => {
                lists.sort((a, b) => a.id - b.id).forEach(list => this.lists.push(new List(list, this.triggerRefresh.bind(this))))
            })
            .then(() => {
                this.render(this.lists)
            })
            .then(() => {
                this.initBindingsAndEventListeners()
            })
        }

    triggerRefresh() {
        this.lists = []
        this.fetchAndLoadLists()
    }

    render(lists) {
        const listsContainer = document.getElementById('lists-container')            
        listsContainer.innerHTML = ""
            lists.forEach((list) => {
                listsContainer.appendChild(this.getListElement(list))
            })
            const deleteButton = document.querySelectorAll('.delete-button')
            console.log(deleteButton)
            deleteButton.forEach(btn => btn.addEventListener('click', (e) => {
                this.handleDeleteButtonClick(e)
                }))
            const addButton = document.querySelectorAll('.add-button')
            console.log(addButton)
            addButton.forEach(btn => btn.addEventListener('click', (e) => {
                this.handleAddButtonClick(e)
                }))
            return listsContainer
    
            }

    getListElement(list) {
        const listElement = list.renderList(this.updateList.bind(this))
        return listElement
    }
}