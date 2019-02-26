// Module to print the login and registration forms to the DOM
// also has functionality to clear the forms from the DOM
// Built by Sydney Wait

import formBuilder from "./formBuilder.js"

const formPrinter = {

    printLoginForm: () => {
        document.querySelector("#login-cont").innerHTML = formBuilder.makeLoginForm()
    },

    removeLoginForm: () => {
        document.querySelector("#login-cont").innerHTML = ""
    },

    printRegisterForm: () => {
        document.querySelector("#login-cont").innerHTML = formBuilder.makeRegisterForm()
    },

    removeRegisterForm: () => {
        document.querySelector("#login-cont").innerHTML = ""
    },

    printLogoutForm:()=>{
        document.querySelector("#header").innerHTML=formBuilder.makeLogoutForm()
    },

    removeLogoutForm:()=>{
        document.querySelector("#header").innerHTML=""
    }
}

export default formPrinter
