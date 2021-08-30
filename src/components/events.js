class Events {
    constructor(events, refreshCallback) {
        this.events = events
        this.adapter = new EventsAdapter()
        this.refreshCallback = refreshCallback
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
        console.log('FIELDS', editableDatetimeFields)
        editableTextFields.forEach((element) => element.addEventListener('dblclick', this.handleTextEventClick.bind(this)))
        editableDatetimeFields.forEach((element) => element.addEventListener('dblclick', this.handleDateEventClick.bind(this)))
        //eventsContainer.addEventListener('dblclick', this.handleEventClick.bind(this))
        //eventsContainer.addEventListener('')

        //names.addEventListener("blur", this.updateList.bind(this), true)
    }

    //handleDeleteButtonClick(e) {
        //e.preventDefault();
    //    this.deleteList(e)
   // }

    handleTextEventClick(e) {
        const li = e.target
        li.contentEditable = true
        li.focus()
        li.classEvent.add('editable')
    }

    updateTextEvent(e) {
        e.preventDefault()
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        //const newValue = li.innerHTML
        //const newValueKey = li.dataset.id

        const liParent = li.parentNode;

        const newEventValue = {
            name: liParent.querySelector('.name').innerHTML,
            detail: liParent.querySelector('.detail').innerHTML,
            
        } 
        
        
        const id = li.parentNode.dataset.id
        this.adapter.updateEvent(newEventValue, id)

    }

    handleDateEventClick(e) {
        //console.log(e.target)
        const li = e.target
        const inputElement = document.createElement('input')
        inputElement.type = "datetime-local"
        inputElement.value = e.target.innerHTML

        inputElement.addEventListener("blur", this.updateDateEvent.bind(this), true)

        li.appendChild(inputElement)
    }

    updateDateEvent(e) {
        e.preventDefault()
        console.log(e);
        const newDateValue = e.target.value;
        const newDateKey = e.target.parentNode.classList[0];
        const id = e.target.parentNode.parentNode.dataset.id;
        const newEventValue = {
            [newDateKey]: newDateValue
        }
        this.adapter.updateEvent(newEventValue, id)
        e.target.remove();
        this.refreshCallback()
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
            eventsOutput.appendChild(new Event(myEvent, this.updateTextEvent.bind(this), this.updateTextEvent.bind(this), this.handleTextEventClick.bind(this), this.handleDateEventClick.bind(this)))
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

    //getEventElement(event) {
      //  const eventElement = event.renderEvent()
        //eventElement.addEventListener("blur", this.updateEvent.bind(this), true)
        //return eventElement
    //}
}