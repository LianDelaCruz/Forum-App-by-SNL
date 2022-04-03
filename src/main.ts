
import { onValue, ref, push, remove, get } from "firebase/database";
import { AllUsers } from "./modules/allusersClass";
import { db, getBeerInDb, getFoodInDb, getWineInDb, logIn, createNewUser, allUsers } from "./modules/firebaseApp"; 
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
function onLoginFinish(result: false | User) { // Profile was deleted here after User in the testing to make login work again
    console.log(result)
    const profile = new Profile(result);
    console.log(profile); 
    onValue(allUsers, snapshot => {
        const userData = snapshot.val(); 
        console.log(userData); 
        const users = new AllUsers(userData); 
        console.log(users); 

        logInUser.value = '';
        logInPassword.value = '';
        
    
    })


}

// const imgUrl = new URL('img/DogePanda.png', import.meta.url);
// const img = document.createElement('img');
// img.src = imgUrl.href;
// document.body.append(img);



