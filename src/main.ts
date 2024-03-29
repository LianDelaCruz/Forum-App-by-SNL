
import { logIn, createNewUser, allUsers } from "./modules/firebaseApp";
import { onValue } from "firebase/database";
import { AllUsers } from "./modules/allusersClass";
import { Profile } from "./modules/profileClass";
import { User } from "./modules/userClass";
import { deleteAccount } from "./modules/deleteUser";


createNewUser();

// Login-form
const logInUser: HTMLInputElement = document.querySelector('#log-in-name');
const logInPassword: HTMLInputElement = document.querySelector('#log-in-pass');
const logInBtn: HTMLButtonElement = document.querySelector('.log-in-btn');

export let inputUserName: string;
let inputPassword: string;

// Button for login
logInBtn.addEventListener('click', (e):void => {
    e.preventDefault();
    inputUserName = logInUser.value;
    inputPassword = logInPassword.value;
    logIn(inputUserName, inputPassword, onLoginFinish);
})

// When log in is successful
function onLoginFinish(result: false | User | Profile):void {
    sessionStorage.setItem('username', `${inputUserName}`);
    let usrName = sessionStorage.getItem('username');
    if (result) {
        const profile = new Profile(result);
        console.log(profile);
        sessionStorage.setItem('username', inputUserName)
        onValue(allUsers, snapshot => {
            const uData:any = snapshot.val();
            console.log(uData);
            const users:any = new AllUsers(uData);
            console.log(users);
            const a:HTMLAnchorElement = document.createElement('a');
            a.setAttribute('href', `./modules/forum.html?username=${inputUserName}`);
            a.innerHTML = 'forum';
            document.body.appendChild(a);

            deleteAccount();
        })
    } else {
        alert('Hey! You sure you have an account here? Or maybe you typed the wrong password.');
    }
}

