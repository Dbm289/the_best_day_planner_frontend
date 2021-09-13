class List {
    constructor(listJSON, refreshCallback) {
        this.id = listJSON.id
        this.name = listJSON.name
        this.events = listJSON.events
        this.refreshCallback = refreshCallback
        //this.handleWorldButtonClick = handleWorldButtonClick
    }

    renderList(updateListCallback) {
        // console.log(this.events);
        const lineDiv = document.createElement("div")
        const output = document.createElement("li")
        output.className = 'list-title';
        output.addEventListener("blur", updateListCallback, true)
        const addBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")
        const worldBtn = document.createElement("button")
        const eventGroup = document.createElement("div")
        //debugger
        worldBtn.addEventListener("click", this.handleWorldButtonClick, true)
        eventGroup.appendChild(new Events(this.events, updateListCallback))
        deleteBtn.innerHTML = "X";
        deleteBtn.className = "delete-button";
        addBtn.innerHTML = "Add Event";
        addBtn.className = "add-button";
        worldBtn.innerHTML = "Try to take over the world!"
        worldBtn.className = "world-button"
        output.innerHTML = (this.name)
        lineDiv.appendChild(output)
        lineDiv.appendChild(eventGroup)
        lineDiv.appendChild(deleteBtn)
        lineDiv.appendChild(addBtn)
        lineDiv.appendChild(worldBtn)
        lineDiv.setAttribute('data-id', this.id)
        
        return lineDiv
        //`<li data-id=${this.id}>${this.name}</li>`
    }

}