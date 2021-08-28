class List {
    constructor(listJSON, deleteCallback) {
        this.id = listJSON.id
        this.name = listJSON.name
        this.events = listJSON.events
    }

    renderList() {
        // console.log(this.events);
        const lineDiv = document.createElement("div")
        const output = document.createElement("li")
        const btn = document.createElement("button")
        const eventGroup = document.createElement("div")
        eventGroup.appendChild(new Events(this.events))
        btn.innerHTML = "X";
        output.innerHTML = (this.name)
        lineDiv.appendChild(btn)        
        lineDiv.appendChild(output)
        lineDiv.appendChild(eventGroup)
        lineDiv.setAttribute('data-id', this.id)
        return lineDiv
        //`<li data-id=${this.id}>${this.name}</li>`
    }

}