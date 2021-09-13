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
        listForm.addEventListener('submit', this.createList.bind(this))
        listsContainer.addEventListener('dblclick', this.handleListClick.bind(this))
    }

    handleListClick(e) {
        this.toggleList(e)
        
    }

    handleDeleteButtonClick(e) {
        //e.preventDefault();
        this.deleteList(e)
    }

    handleAddButtonClick(e) {
        this.createEvent(e)
    }

    handleWorldButtonClick(e) {
        this.createWorldEvent(e)
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
            this.render()
        })
        .then(() => {
            this.initBindingsAndEventListeners()
        })
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

    createWorldEvent(e) {
        e.preventDefault()
        const worldEventValue = e.target.parentNode
        const value = worldEventValue.value
        const id = worldEventValue.dataset.id
        this.adapter.createWorldEvent(id)
        .then(() => {
            this.lists = []
        })
        .then(() => {
            fetchAndLoadLists()
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
                lists.sort((a, b) => a.id - b.id).forEach(list => this.lists.push(new List(list, this.triggerRefresh.bind)))
            })
            .then(() => {
                this.render()
            })
            .then(() => {
                this.initBindingsAndEventListeners()
            })
        }

    triggerRefresh() {
        this.lists = []
        this.fetchAndLoadLists()
    }

    render() {
        const listsContainer = document.getElementById('lists-container')            
        listsContainer.innerHTML = ""
            this.lists.forEach((list) => {
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