class List {
    constructor(listJSON, deleteCallback) {
        this.id = listJSON.id
        this.name = listJSON.name
    }

    renderList() {
        //console.log(this)
        const output = document.createElement("li")
        const btn = document.createElement("button")
        btn.innerHTML = "X";
        output.innerHTML = (this.name)
        output.appendChild(btn)
        output.setAttribute('data-id', this.id)
        return output
        //`<li data-id=${this.id}>${this.name}</li>`
    }

}