// Initialize firebase app here

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 
import { onValue, ref, push, remove } from "firebase/database"; 
import { Message, Topic, Forum } from "./forumClass";

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


export function getBeerInDb() {
    onValue(dbBeerForum, snapshot => {
        const beerForum = snapshot.val(); 
        console.log(beerForum); 
    })
}
export function getFoodInDb() {
    onValue(dbFoodForum, snapshot => {
        const foodForum = snapshot.val(); 
        console.log(foodForum); 
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
const dbUser = ref(db, '/SNLApp/User/'); 

export function user() {
    onValue(dbUser, snapshot => {
        const user = snapshot.val();
        console.log(user); 
    })
}
