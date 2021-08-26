class List {
    constructor(listJSON, deleteCallback) {
        this.id = listJSON.id
        this.name = listJSON.name
    }

    renderList() {
        //console.log(this)
        const lineDiv = document.createElement("div")
        const output = document.createElement("li")
        const btn = document.createElement("button")
        btn.innerHTML = "X";
        output.innerHTML = (this.name)
        lineDiv.appendChild(btn)        
        lineDiv.appendChild(output)
        lineDiv.setAttribute('data-id', this.id)
        return lineDiv
        //`<li data-id=${this.id}>${this.name}</li>`
    }

}