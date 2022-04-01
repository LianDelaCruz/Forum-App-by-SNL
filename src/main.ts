
import { db, getBeerInDb, getFoodInDb, getWineInDb, logIn, createNewUser, dbUser } from "./modules/firebaseApp"; 
import { AllUsers } from "./modules/allusersClass";
import { onValue, ref, push, remove, get } from "firebase/database";
import { AllUsers } from "./modules/allusersClass";
import { Profile } from "./modules/profileClass"; 
import { User } from "./modules/userClass";

getBeerInDb(console.log);
getFoodInDb(console.log);
getWineInDb(console.log)
createNewUser();
console.log(createNewUser);

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
    const profile = new Profile(result);
    console.log(profile); 
    onValue(dbUser, snapshot => {
        const userData = snapshot.val(); 
        console.log(userData); 
        const users = new AllUsers(userData); 
        console.log(users); 
    
    })
}// Sara puts some code in here later // from here call function that creates instans of class Profile??
