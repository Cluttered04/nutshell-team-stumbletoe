// Module to print the login and registration forms to the DOM
// also has functionality to clear the forms from the DOM
// Built by Sydney Wait

import formBuilder from "./formBuilder.js"

const formPrinter= {

    printLoginForm: () => {

        document.querySelector("#body").innerHTML = formBuilder.makeLoginForm()

    },
    removeLoginForm: () => {
        document.querySelector("#body").innerHTML = ""

    },
    printRegisterForm: () => {
        document.querySelector("#body").innerHTML = formBuilder.makeRegisterForm()

    },
    removeRegisterForm: ()=>{
        document.querySelector("#body").innerHTML = ""
    }
}

export default formPrinter
