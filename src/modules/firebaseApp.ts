// Initialize firebase app here
import { initializeApp } from "firebase/app";
import { getDatabase, update, onValue, ref, push, remove, get, child, equalTo } from "firebase/database";
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

// Everything that has a connection to the database is coded below in this file

//FORUM topics
const dbBeerForum = ref(db, '/SNLApp/Forum/beer/');
const dbFoodForum = ref(db, '/SNLApp/Forum/food/');
const dbWineForum = ref(db, '/SNLApp/Forum/wine/');


export function getBeerInDb(callback: (topic: Topic) => void) {
    onValue(dbBeerForum, snapshot => {

        const messagesData = snapshot.val();
        const beerMessages = [];

        for (const key in messagesData) {
            const message = new Message(
                key,
                messagesData[key].username,
                messagesData[key].message)
            beerMessages.push(message)
        }
        const beerForum = new Topic("beer", beerMessages);
        callback(beerForum);
    })
}
export function getFoodInDb(callback: (topic: Topic) => void) {
    onValue(dbFoodForum, snapshot => {
        const messagesData = snapshot.val();
        const foodMessages = [];

        for (const key in messagesData) {
            const message = new Message(
                key,
                messagesData[key].username,
                messagesData[key].message)
            foodMessages.push(message)
        }
        const foodForum = new Topic("food", foodMessages);
        callback(foodForum);
    })
}

export function getWineInDb(callback: (topic: Topic) => void) {
    onValue(dbWineForum, snapshot => {
        const messagesData = snapshot.val();
        const wineMessages = [];

        for (const key in messagesData) {
            const message = new Message(
                key,
                messagesData[key].username,
                messagesData[key].message)
            wineMessages.push(message)
        }
        const wineForum = new Topic("wine", wineMessages);//construct the class with data from database
        callback(wineForum); //call callback with the Topic-class
    })
}

//Login existing user
export const dbUser = ref(db, '/SNLApp/User/');
const logInUser: HTMLInputElement = document.querySelector('#log-in-name');
const logInPassword: HTMLInputElement = document.querySelector('#log-in-pass');

// let inputUserName = logInUser.value;
// let inputPassword = logInPassword.value; // Maybe not needed

export function logIn(username, password, callback): void {
    onValue(dbUser, snapshot => {
        const userData = snapshot.val();
        console.log(logIn);
        let result = false;
        for (const key in userData) {
            if (userData[key].username == username && userData[key].password == password) {
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

let imgChosen = 'none';

export function createNewUser(): void {
    onValue(dbUser, snapshot => {
        const newUserData = snapshot.val();

        users = [];

        for (const key in newUserData) {
            users.push(new User(key, newUserData[key].username, newUserData[key].password, newUserData[key].bio, newUserData[key].img));
        }
    })

    // Image buttons
    const profileImg1: HTMLButtonElement = document.querySelector("#pic-1");
    const profileImg2: HTMLButtonElement = document.querySelector("#pic-2");
    const profileImg3: HTMLButtonElement = document.querySelector("#pic-3");
    const profileImg4: HTMLButtonElement = document.querySelector("#pic-4");
    const profileImg5: HTMLButtonElement = document.querySelector("#pic-5");

    profileImg1.addEventListener('click', (e) => {
        imgChosen = 'img/DogePanda.png';
        console.log(imgChosen);
    })

    profileImg2.addEventListener('click', (e) => {
        imgChosen = 'img/HoneyBunny.png';
        console.log(imgChosen);
    })

    profileImg3.addEventListener('click', (e) => {
        imgChosen = 'img/Papill.png';
        console.log(imgChosen);
    })

    profileImg4.addEventListener('click', (e) => {
        imgChosen = 'img/MobyDick.png';
        console.log(imgChosen);
    })

    profileImg5.addEventListener('click', (e) => {
        imgChosen = 'img/Spanglinga.png';
        console.log(imgChosen);
    })

    // When user clicks sign up-button the info is sent and stored in database
    createUserBtn.addEventListener('click', (e) => {
        const newUsername: HTMLInputElement = document.querySelector("#sign-up-name");
        const newPassword: HTMLInputElement = document.querySelector("#sign-up-pass");
        const newBio: HTMLTextAreaElement = document.querySelector("#sign-up-bio");
        e.preventDefault();

        const addNewUser = {
            username: newUsername.value,
            password: newPassword.value,
            bio: newBio.value,
            img: imgChosen
        }

        get(dbUser).then((snapshot) => {
            const data = snapshot.val();
            let addUser = true;

            for (const key in data) {
                if (data[key].username == newUsername.value) {
                    alert('Hey! You gotta be more creative than that. That username is already taken!');
                    addUser = false;
                    break;
                }
            }

            if (addUser) {
                const newKey: string = push(dbUser).key;
                const newUserProfile = {};
                newUserProfile[newKey] = addNewUser;

                update(dbUser, newUserProfile);
            }
            else {
                console.log('You can not add a username with the same name as someone else.');
            }

            newUsername.value = "";
            newPassword.value = "";
            newBio.value = "";

        })

    }
    )
}