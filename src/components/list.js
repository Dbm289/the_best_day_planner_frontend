class List {
    constructor(listJSON) {
        this.id = listJSON.id
        this.name = listJSON.name
    }

    renderList() {
        return `<li data-id=${this.id}>${this.name}</li>`
    }

}