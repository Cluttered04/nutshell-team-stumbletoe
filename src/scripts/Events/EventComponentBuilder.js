//Single event component build
const buildSingleComponent = (name, date, location, id) => {
    return `<div id="event-${id}><h1>${name}</h1><p>${date}</p><p>${location}</p><button class="btn edit-event-btn" id="edit-event-btn-${id}">Edit Event</button><button class="btn" id="delete-event-btn-${id}">Delete Event</button></div>`
}

export default buildSingleComponent