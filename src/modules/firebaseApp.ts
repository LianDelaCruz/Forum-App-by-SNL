import { initializeApp } from "firebase/app";
import { getDatabase, update, onValue, ref, push, get } from "firebase/database";
import { Message, Topic } from "./forumClass";
import { User } from "./userClass";

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

// EVERYTHING THAT SENDS/GETS/UPDATES WITH THE DATABASE IS CODED BELOW IN THIS FILE

//FORUM topics
export const dbForum = ref(db, '/SNLApp/Forum/');
export const dbBeerForum = ref(db, '/SNLApp/Forum/beer/');
export const dbFoodForum = ref(db, '/SNLApp/Forum/food/');
export const dbWineForum = ref(db, '/SNLApp/Forum/wine/');


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
};
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
};

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
};

//USER-references
const dbUser = ref(db, '/SNLApp/User/');
export const allUsers = ref(db, '/SNLApp/User/');

//Login existing user
export function logIn(username, password, callback): void {
    onValue(dbUser, snapshot => {
        const userData:any = snapshot.val();
        console.log(logIn);
        let result:boolean = false;
        for (const key in userData) {
            if (userData[key].username == username && userData[key].password == password) {
                result = userData[key]; /// Object sent to callback function when result is true
                console.log('Log in was successful.');
            }
        }
        callback(result)
    })
};

//Create new user
const createUserBtn: HTMLButtonElement = document.querySelector(".sign-up-btn");
export let users: User[] = [];
let imgChosen:string = 'none';

export function createNewUser(): void {
    onValue(dbUser, snapshot => {
        const newUserData:any = snapshot.val();
        users = [];

        for (const key in newUserData) {
            users.push(new User(key, newUserData[key].username, newUserData[key].password, newUserData[key].bio, newUserData[key].img));
        }
    })

    // Image buttons to choose profile picture upon creating new user
    const profileImg1: HTMLButtonElement = document.querySelector("#pic-1");
    const profileImg2: HTMLButtonElement = document.querySelector("#pic-2");
    const profileImg3: HTMLButtonElement = document.querySelector("#pic-3");
    const profileImg4: HTMLButtonElement = document.querySelector("#pic-4");
    const profileImg5: HTMLButtonElement = document.querySelector("#pic-5");

    // Sends string of API-address as img-value to database
    profileImg1.addEventListener('click', (e) => {
        imgChosen = 'https://api.multiavatar.com/c4914ce2b134f826c7.svg';
    })

    profileImg2.addEventListener('click', (e) => {
        imgChosen = 'https://api.multiavatar.com/HoneyBunny.svg';
    })

    profileImg3.addEventListener('click', (e) => {
        imgChosen = 'https://api.multiavatar.com/Papill.svg';
    })

    profileImg4.addEventListener('click', (e) => {
        imgChosen = 'https://api.multiavatar.com/Moby%20Dick.svg'
    })

    profileImg5.addEventListener('click', (e) => {
        imgChosen = 'https://api.multiavatar.com/Spanglinga.svg';
    })

    // When user clicks sign up-button info is sent and stored in database
    createUserBtn.addEventListener('click', (e):void => {
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
            const data:any = snapshot.val();
            let addUser:boolean = true;

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

    })
};