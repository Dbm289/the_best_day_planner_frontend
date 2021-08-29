class ListsAdapter {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:3000/lists'
    }

    getLists() {
        return fetch(this.baseUrl).then(res => res.json()
        )
    }

    //iterate over these and render each one individually

    createList(value) {
        const list = {
            name: value,
        }
        
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({ list }),
        }).then(res => res.json())
    }


updateList(value, id) {
    //debugger
    const list = {
        name: value,
    }

    return fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
        body: JSON.stringify( list ),
    }).then(res => res.json())
}

destroyList(id) {
    return fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
    })
}

createEvent(id) {
    const event = {
        name: "Edit event title",
        detail: "Edit event detail",
        list_id: id
    }
    return fetch('http://127.0.0.1:3000/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
        body: JSON.stringify( event ),
    }).then(res => res.json())
}

}