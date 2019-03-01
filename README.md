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



## Module Map:

![Error: Image not found!](README_Images/Modules.png)

---

## ERD Map:

![Error: Image not found!](README_Images/ERD.png)