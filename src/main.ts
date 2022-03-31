import { onValue, ref, push, remove } from "firebase/database";
import { db, getBeerInDb, getFoodInDb, getWineInDb, logIn } from "./modules/firebaseApp"; 

getBeerInDb(console.log);
getFoodInDb(console.log);
getWineInDb(console.log)
user(); 

// Login-form
const logInUser: HTMLInputElement = document.querySelector('#log-in-name');
const logInPassword: HTMLInputElement = document.querySelector('#log-in-pass');
const logInBtn: HTMLButtonElement = document.querySelector('.log-in-btn');

let inputUserName: String; 
let inputPassword: String; 

// Button for log in
logInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    inputUserName = logInUser.value;
    inputPassword = logInPassword.value;
    logIn(inputUserName,inputPassword, onLoginFinish);
})

// When log in is successful
function onLoginFinish(result: false | User) {
    console.log(result)

    // Sara puts some code in here later

}
