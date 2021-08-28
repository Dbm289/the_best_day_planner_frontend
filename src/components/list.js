class List {
    constructor(listJSON) {
        this.id = listJSON.id
        this.name = listJSON.name
        this.events = listJSON.events
    }

    renderList(updateListCallback) {
        // console.log(this.events);
        const lineDiv = document.createElement("div")
        const output = document.createElement("li")
        output.className = 'list-title';
        output.addEventListener("blur", updateListCallback, true)
        const btn = document.createElement("button")
        const btn2 = document.createElement("button")
        const eventGroup = document.createElement("div")
        eventGroup.appendChild(new Events(this.events))
        btn.innerHTML = "X";
        btn.className = "delete-button";
        btn2.innerHTML = "Add Event";
        btn2.className = "add-button";
        output.innerHTML = (this.name)
        lineDiv.appendChild(btn)
        lineDiv.appendChild(btn2)        
        lineDiv.appendChild(output)
        lineDiv.appendChild(eventGroup)
        lineDiv.setAttribute('data-id', this.id)
        
        return lineDiv
        //`<li data-id=${this.id}>${this.name}</li>`
    }

}