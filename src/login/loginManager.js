//This module handles the login and registration functionality of the APP
// Built by Sydney Wait

import formPrinter from "./printToDom.js"
import buildUserObject from "./objectBuilder.js"
import APIManager from "./APIManager.js"
import dashboardActivator from "./dashboardActivator.js";



const loginManager = () => {
    //EVENT LISTENER ON THE LOGIN CONTAINER TO HANDLE ALL OF LOGIN AND REGISTRATION FEATURES
    document.querySelector("#login-cont").addEventListener("click", () => {

        const eventTarget = event.target.id.split("-")

        if (event.target.id === "login-btn") {
            console.log("You clicked the login button!")
            const userName = document.querySelector("#login-name").value
            const password = document.querySelector("#login-pass").value
            //check if username is in the database
            APIManager.getSingleUser("username", userName)
                .then((singleUser) => {
                    if (singleUser.length === 1) {
                        console.log("The username of", userName, "was verified")
                        //check if password matches
                        if (singleUser[0].password === password) {
                            formPrinter.removeLoginForm()
                            sessionStorage.setItem("activeUser", singleUser[0].id)

                            //this activates the dashboard
                            dashboardActivator()

                        }
                        else {
                            window.alert("The password is incorrect!")
                        }
                    }
                    else {
                        window.alert("that username does not exist in the database")
                    }
                })
        }

        //If user clicks the register button, load the registration form
        if (event.target.id === "reg-btn") {
            console.log("you clicked the register button")
            formPrinter.printRegisterForm()

        }
        //if user clicks the submit button, registration will be posted to database
        if (event.target.id === "submit-reg-btn") {
            console.log("you clicked the submit button")
            //first check if username is already in the database.
            const userName = document.querySelector("#reg-name").value
            APIManager.getSingleUser("username", userName)
                .then((singleUser) => {
                    //username not in database, proceed
                    if (singleUser.length === 0) {
                        console.log("The username of", userName, "was verified")

                        const password = document.querySelector("#reg-pass").value
                        const email = document.querySelector("#reg-email").value

                        const userObject = buildUserObject(userName, password, email)
                        console.log("this is the userObject", userObject)
                        APIManager.addUser(userObject);
                        formPrinter.removeRegisterForm()
                        //this activates the dashboard
                        dashboardActivator()

                    }
                    else {
                        //username is already in database, do not proceed
                        window.alert("that username already exists")
                    }
                })
        }
    })
    // EVENT LISTENER FOR THE LOGOUT OPERATION
    document.querySelector("#header").addEventListener("click", () => {
        if (event.target.id === "logout-btn") {

            sessionStorage.removeItem("activeUser")
            //this is just a placeholder until we have the dashboard //
            formPrinter.removeLogoutForm()
            document.querySelector("#body").innerHTML = ""
            formPrinter.printLoginForm()
        }
    })



}

export default loginManager;
