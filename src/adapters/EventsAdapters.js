class EventsAdapter {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:3000/events'
    }

    getEvents() {
        return fetch(this.baseUrl).then(res => res.json()
        )
    }

    //LOOK UP HOW TO ADD MULTIPLE VALUES HERE

    createEvent(value) {
        const event = {
            name: value,
            detail: value,
            
        }
    }

    //SAME HERE LOOK UP HOW TO EDIT MULTIPLE VALUES

    updateEvent(value, id) {
        //debugger
        const event = {
        
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