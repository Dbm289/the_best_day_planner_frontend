class List {
    constructor(listJSON) {
        this.id = listJSON.id
        this.name = listJSON.name
    }

    renderList() {
        return `<li>${this.name}</li>`
    }

}