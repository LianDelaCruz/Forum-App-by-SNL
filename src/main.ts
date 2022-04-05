
import { logIn, createNewUser, allUsers } from "./modules/firebaseApp"; 
import { onValue, ref, push, remove, get, update } from "firebase/database";
import { AllUsers } from "./modules/allusersClass";
import { Profile } from "./modules/profileClass"; 
import { User } from "./modules/userClass";


createNewUser();

// Login-form
const logInUser: HTMLInputElement = document.querySelector('#log-in-name');
const logInPassword: HTMLInputElement = document.querySelector('#log-in-pass');
const logInBtn: HTMLButtonElement = document.querySelector('.log-in-btn');

export let inputUserName: string; 
let inputPassword: string; 

// Button for login
logInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    inputUserName = logInUser.value;
    inputPassword = logInPassword.value;
    logIn(inputUserName,inputPassword, onLoginFinish);
})

// When log in is successful
function onLoginFinish(result: false | User | Profile) {
    sessionStorage.setItem('username', `${inputUserName}`); 
    let usrName = sessionStorage.getItem('username');  
    if(result) {
        const profile = new Profile(result);
        console.log(profile);
        sessionStorage.setItem('username', inputUserName)
        onValue(allUsers, snapshot => {
            const uData = snapshot.val(); 
            console.log(uData); 
            const users = new AllUsers(uData); 
            console.log(users); 
            const a = document.createElement('a');
            a.setAttribute('href', `/forum.html?username=${inputUserName}`);
            a.innerHTML = 'forum';
            document.body.appendChild(a);
        })
    } else {
        alert('Hey! You sure you have an account here? Or maybe you typed the wrong password.');
    }
}

