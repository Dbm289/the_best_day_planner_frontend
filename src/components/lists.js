class Lists {
    constructor() {
        this.lists = []
        this.adapter = new ListsAdapter()
        this.fetchAndLoadLists()
        //this.initBindingsAndEventListeners()
        
    }

    initBindingsAndEventListeners() {
        // debugger
        const listsContainer = document.getElementById('lists-container')
        const names = document.querySelectorAll('li')        
        //this.newListName = document.getElementById('new-list-name')
        //debugger
        const newListName = document.getElementById('new-list-name')
        const listForm = document.getElementById('new-list-form')
        listForm.addEventListener('submit', this.createList.bind(this))
        listsContainer.addEventListener('dblclick', this.handleListClick.bind(this))

        //names.addEventListener("blur", this.updateList.bind(this), true)
    }

    handleListClick(e) {
        this.toggleList(e)
        
    }

    handleDeleteButtonClick(e) {
        e.preventDefault();
        this.deleteList(e)
    }

    toggleList(e) {
        const li = e.target
        li.contentEditable = true
        li.focus()
        li.classList.add('editable')
    }

    updateList(e) {
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        const newValue = li.innerHTML
        const id = li.dataset.id
        this.adapter.updateList(newValue, id)

    }

    createList(e) {
        e.preventDefault()
        //console.log(e)
        const newListValue = document.getElementById("new-list-name")
        //console.log(newListValue.value)
        const value = newListValue.value
        //console.log(value)
        this.adapter.createList(value).then(newList => {
            this.lists.push(new List(newList))
            newListValue.value = ''
            this.render()
        })
    }

    deleteList(e) {
        const li = e.target.parentNode
        console.log(li)
        const id = li.dataset.id
        this.adapter.destroyList(id)
        this.render()
    }

    fetchAndLoadLists() {
        this.adapter
            .getLists()
            .then(lists => {
                lists.sort((a, b) => a.id - b.id).forEach(list => this.lists.push(new List(list)))
            })
            .then(() => {
                this.render()
            })
            .then(() => {
                this.initBindingsAndEventListeners()
            })
        }

    render() {
        const listsContainer = document.getElementById('lists-container')
        listsContainer.innerHTML = ""
        this.lists.forEach((list) => {
            listsContainer.appendChild(this.getListElement(list))
        })
        const deleteButton = document.querySelectorAll('button')
        console.log(deleteButton)
        deleteButton.forEach((btn) => {btn.addEventListener("click", this.handleDeleteButtonClick.bind(this))})

        }
        //listsContainer.innerHTML = this.lists.map(list => this.getListElement(list).innerHTML).join('')

    getListElement(list) {
        const listElement = list.renderList()
        listElement.addEventListener("blur", this.updateList.bind(this), true)
        return listElement
    }
}

//create function to render one list item at a time
//add event listener to each rendered object

//create lists for each item
//create li
//give that li's innter text the item name
//attach event listener to the li
//append li to UL