const eventDeactivator = () => {
    document.querySelector("#events-header").innerHTML = "";
    document.querySelector("#events-form").innerHTML = "";
    document.querySelector("#events-body").innerHTML = "";
}

export default eventDeactivator;