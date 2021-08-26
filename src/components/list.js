class List {
    constructor(listJSON) {
        this.id = listJSON.id
        this.name = listJSON.name
    }

    renderList() {
        console.log(this)
        const output = document.createElement("li")
        output.innerHTML = (this.name)
        output.setAttribute('data-id', this.id)
        return output
        //`<li data-id=${this.id}>${this.name}</li>`
    }

}