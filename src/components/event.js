class Event {
    constructor(eventJSON) {
        this.id = eventJSON.id
        this.name = eventJSON.name
        this.detail = eventJSON.detail
        this.list_id = eventJSON.list_id
        this.event_start = eventJSON.event_start
        this.event_end = eventJSON.event_end

        return this.render()
    }

    render() {
        const eventOutput = document.createElement("div")
        const eventName = document.createElement("div")
        const eventDetail = document.createElement("div")
        const eventStart = document.createElement("div")
        const eventEnd = document.createElement("div")
        eventName.innerHTML = this.name
        eventDetail.innerHTML = this.detail
        eventStart.innerHTML = this.event_start
        eventEnd.innerHTML = this.event_end
        //eventOutput.appendChild = (this.name), this.detail, this.event_start, this.event_end)
        eventOutput.appendChild(eventName)
        eventOutput.appendChild(eventDetail)
        eventOutput.appendChild(eventStart)
        eventOutput.appendChild(eventEnd)
        return eventOutput

    }

}