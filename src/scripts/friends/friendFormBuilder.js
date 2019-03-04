// This module builds a form to add a friend in the DOM
//  Built by Sydney Wait

const friendFormBuilder = () => {

    const htmlString = `<input type = "text" class = "friend-input" id = "friend-input" placeholder="add friend by username" ></input><br>
    <button type = "submit" class = "btn" id = "save-friend-btn">add a friend</button>`

    document.querySelector("#frnds-input").innerHTML = htmlString;
}

export default friendFormBuilder;
