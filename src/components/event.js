class Event {
    constructor(eventJSON, updateTextEventCallback, updateDateEventCallback, handleTextFieldCallback, handleDateFieldCallback) {
        this.id = eventJSON.id
        this.name = eventJSON.name
        this.detail = eventJSON.detail
        this.list_id = eventJSON.list_id
        this.event_start = eventJSON.event_start
        this.event_end = eventJSON.event_end

        this.updateTextEvent = updateTextEventCallback
        this.updateDateEvent = updateDateEventCallback
        this.handleTextFieldClick = handleTextFieldCallback
        this.handleDateFieldClick = handleDateFieldCallback

        return this.render()
    }

    handleTextEventBlur(e, value) {
        if(e.relatedTarget?.nodeName == 'INPUT') {
            return
        }
        e.target.innerHTML = new Date(value).toLocaleString();
    }

    render() {
        const eventOutput = document.createElement("div")
        eventOutput.className = 'event-class';
        eventOutput.classList.add('col', 's4', 'event-output');
        eventOutput.setAttribute('data-id', this.id)
        const eventName = document.createElement("div")
        const eventDetail = document.createElement("div")
        const eventStart = document.createElement("div")
        const eventEnd = document.createElement("div")

        const startDateObject = new Date(this.event_start)
        const endDateObject = new Date(this.event_end)
        console.log(eventStart, startDateObject)

        eventName.innerHTML = this.name
        eventDetail.innerHTML = this.detail
        eventStart.innerHTML = startDateObject.toLocaleString()
        eventEnd.innerHTML = endDateObject.toLocaleString()
        eventName.className = "name editable_text"
        eventDetail.className = "detail editable_text"
        eventStart.className = "event_start editable_date"
        eventEnd.className = "event_end editable_date"
        //eventOutput.appendChild = (this.name), this.detail, this.event_start, this.event_end)
        eventOutput.appendChild(eventName)
        eventOutput.appendChild(eventDetail)
        eventOutput.appendChild(eventStart)
        eventOutput.appendChild(eventEnd)

        eventName.addEventListener("dblclick", this.handleTextFieldClick, true)
        eventDetail.addEventListener("dblclick", this.handleTextFieldClick, true)
        eventName.addEventListener("submit", this.handleTextEventClick)
        eventName.addEventListener("blur", this.updateTextEvent, true)
        eventDetail.addEventListener("blur", this.updateTextEvent, true)


        eventStart.addEventListener("dblclick", this.handleDateFieldClick, true)
        eventEnd.addEventListener("dblclick", this.handleDateFieldClick, true)
        eventStart.addEventListener("blur", (e) => this.handleTextEventBlur(e, this.event_start), true)
        eventEnd.addEventListener("blur", (e) => this.handleTextEventBlur(e, this.event_end), true)


        return eventOutput

    

    }

}