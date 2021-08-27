class Events {
    constructor() {
        this.events = []
        this.adapter = new EventsAdapter()
        this.fetchAndLoadEvents()
        //this.initBindingsAndEventListeners()
        
    }

    initBindingsAndEventListeners() {
        // debugger
        const eventsContainer = document.getElementById('events-container')
        const eventInfo = document.querySelectorAll('li')        
        //this.newListName = document.getElementById('new-list-name')
        //debugger
       // const newListName = document.getElementById('new-list-name')
       // const listForm = document.getElementById('new-list-form')
        //debugger
        //listForm.addEventListener('submit', this.createList.bind(this))
        listsContainer.addEventListener('dblclick', this.handleListClick.bind(this))

        //names.addEventListener("blur", this.updateList.bind(this), true)
    }

    handleListClick(e) {
        this.toggleList(e)
        
    }

    //handleDeleteButtonClick(e) {
        //e.preventDefault();
    //    this.deleteList(e)
   // }

    toggleList(e) {
        const li = e.target
        li.contentEditable = true
        li.focus()
        li.classList.add('editable')
    }

    updateEvent(e) {
        //debugger
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        const newValue = li.innerHTML
        const id = li.parentNode.dataset.id
        this.adapter.updateList(newValue, id)

    }

    fetchAndLoadEvents() {
        this.adapter
            .getEvents()
            .then(events => {
                events.sort((a, b) => a.id - b.id).forEach(event => this.events.push(new Event(event)))
            })
            .then(() => {
                this.render()
            })
            .then(() => {
                this.initBindingsAndEventListeners()
            })
        }

    render() {
        const eventsContainer = document.getElementById('events-container')            
        eventsContainer.innerHTML = ""
            this.events.forEach((list) => {
                eventsContainer.appendChild(this.getEventElement(event))
            })
            //const deleteButton = document.querySelectorAll('button')
            //console.log(deleteButton)
            //deleteButton.forEach(btn => btn.addEventListener('click', (e) => {
               // this.handleDeleteButtonClick(e)
               // }))
            //deleteButton.forEach((btn) => {btn.addEventListener("click", this.handleDeleteButtonClick.bind(this))})
    
            }

    getEventElement(event) {
        const eventElement = event.renderEvent()
        eventElement.addEventListener("blur", this.updateEvent.bind(this), true)
        return eventElement
    }
}