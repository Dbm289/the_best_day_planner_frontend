class EventsAdapter {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:3000/events'
    }

    getEvents() {
        return fetch(this.baseUrl).then(res => res.json()
        )
    }

    createEvent(value) {
        const event = {
            name: value,
            detail: 
        }
    }

    updateList(value, id) {
        const event = {
            name: value,
        }
    
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify( event ),
        }).then(res => res.json())
    }
        
}