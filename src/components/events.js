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
        const editableTextFields = document.getElementsByClassName('editable_text')
        const editableDatetimeFields = document.getElementsByClassName('editable_date')
        const eventInfo = document.querySelectorAll('li')        
        //this.newListName = document.getElementById('new-list-name')
        //debugger
       // const newListName = document.getElementById('new-list-name')
       // const listForm = document.getElementById('new-list-form')
        //debugger
        //listForm.addEventListener('submit', this.createList.bind(this))
        editableTextFields.forEach((element) => element.addEventListener('dblclick', this.handleEventClick.bind(this)))
        editableDatetimeFields.forEach((element) => element.addEventListener('dblclick', this.handleEventClick.bind(this)))
        eventsContainer.addEventListener('dblclick', this.handleEventClick.bind(this))
        eventsContainer.addEventListener('')

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

    updateEvent(e) {
        console.log(e);
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        //const newValue = li.innerHTML
        //const newValueKey = li.dataset.id

        const liParent = li.parentNode;

        const newEventValue = {
            name: liParent.querySelector('.name').innerHTML,
            detail: liParent.querySelector('.detail').innerHTML,
            event_start : liParent.querySelector('.event_start').innerHTML,
            event_end : liParent.querySelector('.event_end').innerHTML,
        } 
        
        
        const id = li.parentNode.dataset.id
        this.adapter.updateEvent(newEventValue, id)

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
            eventsOutput.appendChild(new Event(myEvent, this.updateEvent.bind(this)))
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