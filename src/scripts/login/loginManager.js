//This module handles the login and registration functionality of the APP
// Built by Sydney Wait

import formPrinter from "./printToDom.js"
import buildUserObject from "./objectBuilder.js"
import APIManager from "./APIManager.js"
import dashboardActivator from "./dashboardActivator.js";
import dashboardDeactivator from "./dashboardDeactivator.js";


const loginManager = () => {
    //EVENT LISTENER ON THE LOGIN CONTAINER TO HANDLE ALL OF LOGIN AND REGISTRATION FEATURES
    document.querySelector("#login-cont").addEventListener("click", () => {

        const eventTarget = event.target.id.split("-")

        if (event.target.id === "login-btn") {
            const userName = document.querySelector("#login-name").value
            const password = document.querySelector("#login-pass").value
            //check if username is in the database
            APIManager.getSingleUser("username", userName)
                .then((singleUser) => {
                    if (singleUser.length === 1) {
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

            formPrinter.printRegisterForm()


        }
        //if user clicks the submit button, registration will be posted to database
        if (event.target.id === "submit-reg-btn") {

            //first check if username is already in the database.
            const userName = document.querySelector("#reg-name").value
            const email = document.querySelector("#reg-email").value
            const password = document.querySelector("#reg-pass").value
            let isUnique = false;

            APIManager.getSingleUser("email", email)
                //check to see is the email address already exists in the database
                .then((singleUser) => {
                    if (singleUser.length === 0) {
                        isUnique = true;

                        APIManager.getSingleUser("username", userName)
                            .then((singleUser) => {
                                //check to see if the username already exists in the database
                                if (singleUser.length === 0) {
                                    isUnique = true;

                                    const userObject = buildUserObject(userName, password, email)

                                    APIManager.addUser(userObject)
                                        .then(() => {
                                            APIManager.getSingleUser("username", userName)
                                                .then((singleUser) => {
                                                    sessionStorage.setItem("activeUser", singleUser[0].id)
                                                    formPrinter.removeRegisterForm()
                                                    dashboardActivator()
                                                })
                                        })
                                }
                                else {
                                    isUnique = false;
                                    window.alert("the username is already in the database")
                                }
                            })
                    }
                    else {
                        isUnique = false;
                        window.alert("the email is already in the database")
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
            dashboardDeactivator()
            formPrinter.printLoginForm()
        }
    })
}

export default loginManager;
