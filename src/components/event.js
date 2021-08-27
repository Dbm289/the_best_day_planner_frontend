class Event {
    constructor(eventJSON) {
        this.id = eventJSON.id
        this.name = eventJSON.name
        this.detail = eventJSON.detail
        this.list_id = eventJSON.list_id
        this.event_start = eventJSON.event_start
        this.event_end = eventJSON.event_end
    }

    renderEvent() {
        //console.log(this)
        eventLineDiv = document.createElement("div")
        const output = document.createElement("li")
        //const btn = document.createElement("button")
        //btn.innerHTML = "X";
        output.innerHTML = (this.name, this.detail, this.event_start, this.event_end)
        //lineDiv.appendChild(btn)        
        eventLineDiv.appendChild(output)
        eventLineDiv.setAttribute('data-id', this.id)
        return eventLineDiv
        //`<li data-id=${this.id}>${this.name}</li>`
    }

}