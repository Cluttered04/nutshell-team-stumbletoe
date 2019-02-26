//Single event component build
const buildSingleComponent = (name, date, location, id) => {
    return `<div id="event-${id}"><h4>${name}</h4><p>${date}</p><p>${location}</p><button class="btn edit-event-btn" id="edit-event-btn-${id}">Edit Event</button><button class="btn delete-event-btn" id="delete-event-btn-${id}">Delete Event</button></div>`
}

export default buildSingleComponent