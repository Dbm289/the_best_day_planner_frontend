class EventsAdapter {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:3000/events'
    }

    getEvents() {
        return fetch(this.baseUrl).then(res => res.json()
        )
    }

    updateEvent(value, id) {
        console.log(value, id)
        //debugger
        //grab date value in dom and render it
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify( value ),
        }).then(res => res.json())
    }
}