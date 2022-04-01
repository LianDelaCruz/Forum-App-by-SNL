// Initialize firebase app here

import { initializeApp } from "firebase/app";
import { getDatabase, update, onValue, ref, push, remove } from "firebase/database"; 
import { Message, Topic, Forum } from "./forumClass";
import { User } from "./userClass";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL07WyQ4kUZxrJfaW40SjQfrn3gN2dT94",
  authDomain: "slutproject-9a74a.firebaseapp.com",
  databaseURL: "https://slutproject-9a74a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "slutproject-9a74a",
  storageBucket: "slutproject-9a74a.appspot.com",
  messagingSenderId: "361932831586",
  appId: "1:361932831586:web:d37219f0b7b44be54c0a3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); 



//FORUM topics
const dbBeerForum = ref(db, '/SNLApp/Forum/beer/');
const dbFoodForum = ref(db, '/SNLApp/Forum/food/');
const dbWineForum = ref(db, '/SNLApp/Forum/wine/');


export function getBeerInDb(callback: (topic:Topic) => void) {
    onValue(dbBeerForum, snapshot => {
      
        const messagesData = snapshot.val(); 
        const beerMessages = [];

        for(const key in messagesData) {
            const message = new Message (
                key,
                messagesData[key].username,
                messagesData[key].message)
            beerMessages.push(message)
        }
        const beerForum = new Topic("beer", beerMessages);
        callback(beerForum);
    })
}
export function getFoodInDb(callback: (topic:Topic) => void) {
    onValue(dbFoodForum, snapshot => {
        const messagesData = snapshot.val(); 
        const foodMessages = [];

        for(const key in messagesData) {
            const message = new Message (
                key,
                messagesData[key].username,
                messagesData[key].message)
            foodMessages.push(message)
        }
        const foodForum = new Topic("food", foodMessages);
        callback(foodForum);
    })
}

export function getWineInDb(callback: (topic:Topic) => void) {
    onValue(dbWineForum, snapshot => {
        const messagesData = snapshot.val();
        const wineMessages = [];

        for(const key in messagesData ) {
            const message = new Message (
                key,
                messagesData[key].username,
                messagesData[key].message)
            wineMessages.push(message)
        }
        const wineForum = new Topic("wine", wineMessages);//construct the class with data from database
        callback(wineForum); //call callback with the Topic-class
    })
}


//USER 
export const dbUser = ref(db, '/SNLApp/User/');  

//Login existing user
const dbUser = ref(db, '/SNLApp/User/'); 
const logInUser: HTMLInputElement = document.querySelector('#log-in-name');
const logInPassword: HTMLInputElement = document.querySelector('#log-in-pass');

//let inputUserName = logInUser.value;
//let inputPassword = logInPassword.value; // Maybe not needed

export function logIn(username, password, callback): void {
    onValue(dbUser, snapshot => {
        const userData = snapshot.val();
        console.log(logIn); 
        let result = false;
        for(const key in userData) {
            if(userData[key].username == username && userData[key].password == password) {
                 result = userData[key];
                 console.log('Log in was successful.');
            }
        }
        callback(result) // Put an alert or message later for user to know if login fails
    })
}

// Create new user (sign-up)
const createUserBtn: HTMLButtonElement = document.querySelector(".sign-up-btn");

let users: User[] = [];

export function createNewUser(): void {
    onValue(dbUser, snapshot => {
        const newUserData = snapshot.val();

        users = [];

        for(const key in newUserData) {
            users.push(new User(key, newUserData[key].username, newUserData[key].password, newUserData[key].bio, newUserData[key].img));
        }
    })

    createUserBtn.addEventListener('click', (e) => {
        const newUsername: HTMLInputElement = document.querySelector("#sign-up-name");
        const newPassword: HTMLInputElement = document.querySelector("#sign-up-pass");
        const newBio: HTMLTextAreaElement = document.querySelector("#sign-up-bio");
        const newProfileImg: HTMLInputElement = document.querySelector("#sign-up-img");
        e.preventDefault();

        const addNewUser = {
            username: newUsername.value,
            password: newPassword.value,
            bio: newBio.value,
            img: newProfileImg.value
        }

        newUsername.value = "";
        newPassword.value = "";
        newBio.value = "";
        newProfileImg.value = "";

        const newKey:string = push(dbUser).key;
        const newUserProfile = {};
        newUserProfile[newKey] = addNewUser;

        update(dbUser, newUserProfile);
        console.log(addNewUser);
    })

}



