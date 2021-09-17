class EventsAdapter {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:3000/events'
    }

    getEvents() {
        return fetch(this.baseUrl).then(res => res.json()
        )
    }

    updateEvent(value, id) {
        //console.log(value, id)
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify( value ),
        }).then(res => res.json())
    }

    createWorldEvent(id) {
        const worldEvent = {
            name: "Try to take over the world!",
            detail: "Pinky and the Brain",
            list_id: id
        }
        return fetch('http://127.0.0.1:3000/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify( worldEvent ),
        }).then(res => res.json())
    }
}