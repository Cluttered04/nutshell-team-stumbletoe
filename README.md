# Nutshell: The Information Dashboard
<!-- syntax for loading images -->
<!-- ![Alt text](images/searchfield.jpg?raw=true "dashboard") -->

To use this application, fork the repository and clone down to your local machine.  Navigate to the directory that you want to store the project and type the command:

```js
git clone <repository name>
```
cd into the directory and type:
```js
setUpBrowserify
```
cd into the directory src/lib and type:
```js
npm install
```
Once that has finished installing, you will also need to add an additional package called "moment.js" by typing
```js
npm install moment
```

You will need to populate the API folder with a sample db.json file using the following template:
<!-- [here](./api/boilerplatedb.txt) -->

This will create all the files needed to handle the database and browser events

Now you can type:
```js
grunt
```
The application loads with a welcome page where the user can log in, or create a new account.  To test the login feature, you can use the following credentials:
```js
Steve
password
```


##Login
(insert screenshot of login)
Upon login, you will see the main dashboard of the Nutshell app with 5 sections.
(insert screenshot of the dashboard page)
You should now click the logout button and practice adding users.

##Register
(insert screenshot of Register)
To register a new user, click the register button and a form will appear that requests the email address, username, and password for a new user.  If the username already exists in the database, a window alert will pop up with an error message.  Otherwise, the new user will be created and added to the database and you will automatically log in.

##Friends
If you log in as Steve, you will notice that he already has one friend relationship with the user "jordan".  If you would like to add another friend, you can type a username in the box to add them by username.  You can only add friends from usernames that already exist in the app, and those you don't already have an established relationship with.

(insert screenshot of the friends section)
<!-- syntax for loading images -->
<!-- ![Alt text](images/searchfield.jpg?raw=true "dashboard") -->

##Chat

##News

##Tasks


##Events

# Nutshell: The Information Dashboard

You've been hired by a product company that builds productivity apps. For your first week on the job, you've been put on a team to build a new product called Nutshell. It's a one-stop dashboard for people to organize their daily tasks, events, news article, friends, and chat messages.

You will be using all of the skills and concepts that you've learned up to this point in the course.

1. Functions
1. Databases/API
1. Github
1. Objects
1. CSS
1. Handling user events
1. Factory functions
1. Data entry/editing
1. Modular code with Browserify
1. Relational data

To start you off, here's an example of what the resources in your API should look like once it's populated with some data from your application.

### Users

```json
{ "id": 1, "username": "Steve", "email": "me@me.com" }
```

### Messages

```json
{ "id": 1, "userId": 1, "message": "What's up?" }
```

### News

```json
{
    "id": 1,
    "userId": 2,
    "url": "https://www.quantamagazine.org/newfound-wormhole-allows-information-to-escape-black-holes-20171023/",
    "title": "Wormholes Allow Information to Escape Black Holes",
    "synopsis": "Check out this recent discovery about workholes"
}
```

### Friends

```json
{ "id": 1, "userId": 1, "otherFriendId": 3 }
```

### Tasks

```json
{ "id": 1, "userId": 3, "task": "Take out garbage" }
```

## Professional Requirements

1. All teammates must be using Grunt to run ESLint and Browserify during development
1. Each module should have a comment at the top with the following info: author(s) and purpose of module
1. The README for your project should include instructions on how another person can download and run the application

## How to Handle Authentication

You will be using session storage to keep track of which user has logged into Nutshell. When the user fills out the registration form, you will POST their username and password to the `users` collection in your API. You will then immediately take the `id` of the object in the response and save it to session storage.

```js
sessionStorage.setItem("activeUser", user.id)
```

If you want to add a Logout feature, all you need to do it remove the session storage item.

```js
sessionStorage.removeItem("activeUser")
```

## Stretch Goals
1. Private chat messages
1. Friend requests, and the ability to reject or accept them
1. Real time chat updates. If a user in one tab writes a chat message, a user logged in on another tab [will immediately see that chat message](https://www.w3schools.com/jsreF/event_storage_storagearea.asp)







