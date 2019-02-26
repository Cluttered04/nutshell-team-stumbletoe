// Module to print the login and registration forms to the DOM
// also has functionality to clear the forms from the DOM
// Built by Sydney Wait

import formBuilder from "./formBuilder.js"

const formPrinter= {

    printLoginForm: () => {

        document.querySelector("#login-container").innerHTML = formBuilder.makeLoginForm()

    },
    removeLoginForm: () => {
        document.querySelector("#login-container").innerHTML = ""

    },
    printRegisterForm: () => {
        document.querySelector("#login-container").innerHTML = formBuilder.makeRegisterForm()

    },
    removeRegisterForm: ()=>{
        document.querySelector("#login-container").innerHTML = ""
    }
}

export default formPrinter
