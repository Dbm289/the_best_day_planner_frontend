class Events {
    constructor(events, refreshCallback) {
        this.events = events
        this.adapter = new EventsAdapter()
        this.refreshCallback = refreshCallback
        this.listsAdapter = new ListsAdapter()
        return this.render()
        
    }

    initBindingsAndEventListeners() {
        const eventsContainer = document.getElementById('lists-container')
        const editableTextFields = document.getElementsByClassName('editable_text')
        const editableDatetimeFields = document.getElementsByClassName('editable_date')
        const eventInfo = document.querySelectorAll('li')        
        console.log('FIELDS', editableDatetimeFields)
        editableTextFields.forEach((element) => element.addEventListener('dblclick', this.handleTextEventClick.bind(this)))
        editableDatetimeFields.forEach((element) => element.addEventListener('dblclick', this.handleDateEventClick.bind(this)))
    }

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
        //debugger
        console.log(e);
        const newDateValue = e.target.value;
        if (newDateValue === "") {
            console.log(newDateValue)
            e.target.remove();
            return
        }
        const newDateKey = e.target.parentNode.classList[0];
        const id = e.target.parentNode.parentNode.dataset.id;
        const newEventValue = {
            [newDateKey]: newDateValue
        }

        const replacementTarget = e.target.parentNode
        const replacementValue = e.target.value
        console.log(replacementValue)



        this.adapter.updateEvent(newEventValue, id)
        e.target.remove();

        replacementTarget.innerHTML = new Date(replacementValue).toLocaleString()
        console.log(e.target.value)

    }

    fetchAndLoadEvents() {
        this.adapter
            .getEvents()
            .then(events => {
                events.sort((a, b) => a.id - b.id).forEach(event => this.events.push(new Event(event, this.refreshCallback)))
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
    
            }
}