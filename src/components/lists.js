class Lists {
    constructor() {
        this.lists = []
        this.adapter = new ListsAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadLists()
    }

    initBindingsAndEventListeners() {
        // debugger
         const listsContainer = document.getElementById('lists-container')
         // const name = document.querySelector('name')
        //this.newListName = document.getElementById('new-list-name')
        //debugger
        const newListName = document.getElementById('new-list-name')
         const listForm = document.getElementById('new-list-form')
        listForm.addEventListener('submit', this.createList.bind(this))
        listsContainer.addEventListener('dblclick', this.handleListClick.bind(this))
        // name.addEventListener("blur", this.updateList.bind(this), true)
    }

    handleListClick(e) {
        this.toggleList(e)
        
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
        li.focus()
        li.classList.remove('editable')
        const newValue = li.innerHTML
        const id = li.dataset.id
        this.adapter.updateList(newValue, id)

    }

    createList(e) {
        e.preventDefault()
        const value = this.newListName.value

        this.adapter.createList(value).then(list => {
            this.lists.push(new List(list))
            this.newListName.value = ''
            this.render()
        })
    }

    fetchAndLoadLists() {
        this.adapter
            .getLists()
            .then(lists => {
                lists.sort((a, b) => a.id - b.id).forEach(list => this.lists.push(new List(list)))
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