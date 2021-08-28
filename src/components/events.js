class Events {
    constructor(events) {
        this.events = events
        this.adapter = new EventsAdapter()
        return this.render()
        //this.initBindingsAndEventListeners()
        
    }

    initBindingsAndEventListeners() {
        // debugger
        const eventsContainer = document.getElementById('lists-container')
        const eventInfo = document.querySelectorAll('li')        
        //this.newListName = document.getElementById('new-list-name')
        //debugger
       // const newListName = document.getElementById('new-list-name')
       // const listForm = document.getElementById('new-list-form')
        //debugger
        //listForm.addEventListener('submit', this.createList.bind(this))
        eventsContainer.addEventListener('dblclick', this.handleEventClick.bind(this))

        //names.addEventListener("blur", this.updateList.bind(this), true)
    }

    handleEventClick(e) {
        this.toggleEvent(e)
        
    }

    //handleDeleteButtonClick(e) {
        //e.preventDefault();
    //    this.deleteList(e)
   // }

    toggleEvent(e) {
        const li = e.target
        li.contentEditable = true
        li.focus()
        li.classEvent.add('editable')
    }

    createList(e) {
        e.preventDefault()
        //console.log(e)
        const newListValue = document.getElementById("new-list-name")
        //console.log(newListValue.value)
        const value = newListValue.value
        //console.log(value)
        this.adapter.createList(value).then(newList => {
            const renderReady = new List(newList)
            this.lists.push(renderReady)
            newListValue.value = ''
        })
    }

    updateEvent(e) {
        //debugger
        const li = e.target
        li.contentEditable = false
        li.classEvent.remove('editable')
        const newValue = li.innerHTML
        const id = li.parentNode.dataset.id
        this.adapter.updateEvent(newValue, id)

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
        // const eventsContainer = document.getElementById('lists-container')   
        const eventsOutput = document.createElement('div');
        this.events.forEach((myEvent) => {
            console.log(myEvent);
            eventsOutput.appendChild(new Event(myEvent))
        })
        return eventsOutput     
        // eventsContainer.innerHTML = ""
        //     this.events.forEach((list) => {
        //         eventsContainer.appendChild(this.getEventElement(list))
        //     })
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