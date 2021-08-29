class List {
    constructor(listJSON, refreshCallback) {
        this.id = listJSON.id
        this.name = listJSON.name
        this.events = listJSON.events
        this.refreshCallback = refreshCallback
    }

    renderList(updateListCallback) {
        // console.log(this.events);
        const lineDiv = document.createElement("div")
        const output = document.createElement("li")
        output.className = 'list-title';
        output.addEventListener("blur", updateListCallback, true)
        const addBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")
        const eventGroup = document.createElement("div")
        eventGroup.appendChild(new Events(this.events, this.refreshCallback))
        deleteBtn.innerHTML = "X";
        deleteBtn.className = "delete-button";
        addBtn.innerHTML = "Add Event";
        addBtn.className = "add-button";
        output.innerHTML = (this.name)
        lineDiv.appendChild(deleteBtn)
        lineDiv.appendChild(addBtn)        
        lineDiv.appendChild(output)
        lineDiv.appendChild(eventGroup)
        lineDiv.setAttribute('data-id', this.id)
        
        return lineDiv
        //`<li data-id=${this.id}>${this.name}</li>`
    }

}