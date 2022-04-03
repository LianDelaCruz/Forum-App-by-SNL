

import { db, getBeerInDb, getFoodInDb, getWineInDb, logIn, createNewUser, allUsers } from "./modules/firebaseApp"; 


import { onValue, ref, push, remove, get } from "firebase/database";
import { AllUsers } from "./modules/allusersClass";
import { Profile } from "./modules/profileClass"; 
import { User } from "./modules/userClass";

getBeerInDb(console.log);
getFoodInDb(console.log);
getWineInDb(console.log)
createNewUser();

// Login-form
const logInUser: HTMLInputElement = document.querySelector('#log-in-name');
const logInPassword: HTMLInputElement = document.querySelector('#log-in-pass');
const logInBtn: HTMLButtonElement = document.querySelector('.log-in-btn');

let inputUserName: String; 
let inputPassword: String; 

// Button for login
logInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    inputUserName = logInUser.value;
    inputPassword = logInPassword.value;
    logIn(inputUserName,inputPassword, onLoginFinish);
})

// When log in is successful
function onLoginFinish(result: false | User | Profile) {
    console.log(result)

    if(result) {
        const profile = new Profile(result);
        console.log(profile); 
        onValue(allUsers, snapshot => {
            const uData = snapshot.val(); 
            console.log(uData); 
            const users = new AllUsers(uData); 
            console.log(users); 
            const a = document.createElement('a');
            //a.setAttribute('href', '/forum.html?username=Sara');
            a.setAttribute('href', `/forum.html?username=${profile.uData.username}`);
            a.innerHTML = 'forum';
            document.body.appendChild(a);
        })

    }

    /// add link to forum 
}


// logInUser.value = '';
// logInPassword.value = '';


