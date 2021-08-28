class Event {
    constructor(eventJSON, updateEventCallback) {
        this.id = eventJSON.id
        this.name = eventJSON.name
        this.detail = eventJSON.detail
        this.list_id = eventJSON.list_id
        this.event_start = eventJSON.event_start
        this.event_end = eventJSON.event_end

        this.updateEvent = updateEventCallback

        return this.render()
    }

    render() {
        const eventOutput = document.createElement("div")
        eventOutput.className = 'event-class';
        eventOutput.setAttribute('data-id', this.id)
        const eventName = document.createElement("div")
        const eventDetail = document.createElement("div")
        const eventStart = document.createElement("div")
        const eventEnd = document.createElement("div")

        eventName.innerHTML = this.name
        eventDetail.innerHTML = this.detail
        eventStart.innerHTML = this.event_start
        eventEnd.innerHTML = this.event_end
        eventName.className = "name"
        eventDetail.className = "detail"
        eventStart.className = "event_start"
        eventEnd.className = "event_end"
        //eventOutput.appendChild = (this.name), this.detail, this.event_start, this.event_end)
        eventOutput.appendChild(eventName)
        eventOutput.appendChild(eventDetail)
        eventOutput.appendChild(eventStart)
        eventOutput.appendChild(eventEnd)

        eventOutput.addEventListener("blur", this.updateEvent, true)
        return eventOutput

    }

}