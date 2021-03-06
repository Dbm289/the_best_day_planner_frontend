class List {
    static all = []

    constructor(listJSON, refreshCallback) {
        this.id = listJSON.id
        this.name = listJSON.name
        this.events = listJSON.events
        this.refreshCallback = refreshCallback

        List.all.push(this)
        //console.log(List.all)
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
        worldBtn.addEventListener("click", 
            this.createWorldEvent.bind(this))
        
        return lineDiv
        //`<li data-id=${this.id}>${this.name}</li>`
    }

    createWorldEvent(e) {
        e.preventDefault()
        
        const adapter = new ListsAdapter
        //debugger
        const worldEventValue = e.target.parentNode
        const value = worldEventValue.value
        const id = worldEventValue.dataset.id
        adapter.createWorldEvent(id)
        .then((worldEvent) => {
            const correctList = List.all.filter((list) => {
                return list.id == worldEvent.list.id
            })
            correctList[0].events.push(worldEvent)
            this.refreshCallback()
        })
        //.then(() => {
          //  this.lists = []
        //})
        //.then(() => {
           // this.fetchAndLoadLists()
       // })
    }

    render() {
        // const eventsContainer = document.getElementById('lists-container')   
        const eventsOutput = document.createElement('div');
        this.events.forEach((myEvent) => {
            //console.log(myEvent);
            eventsOutput.appendChild(new Event(myEvent, this.updateTextEvent.bind(this), this.updateTextEvent.bind(this), this.handleTextEventClick.bind(this), this.handleDateEventClick.bind(this)))
        })
        return eventsOutput
    
            }

    fetchAndLoadLists() {
        const adapter = new ListsAdapter
        adapter
            .getLists()
            .then(() => {
                this.refreshCallback()
            })
            // .then(lists => {
            //     lists.sort((a, b) => a.id - b.id).forEach(list => this.lists.push(new List(list, this.refreshCallback)))
            // })
            // .then(() => {
            //     this.render()
            // })
            // .then(() => {
            //     this.initBindingsAndEventListeners()
            // })
        }
}