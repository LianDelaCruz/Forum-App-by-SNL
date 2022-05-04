
import { getBeerInDb, getFoodInDb, getWineInDb} from "./firebaseApp";
import { displayTopic } from "./display";

const beerBtn:HTMLButtonElement = document.querySelector('#beer-btn');
const foodBtn:HTMLButtonElement = document.querySelector('#food-btn');
const wineBtn:HTMLButtonElement = document.querySelector('#wine-btn');
const deleteMsgBtn: HTMLButtonElement = document.createElement ('button');
export let userName: string = sessionStorage.getItem('username');
console.log(userName)

beerBtn.addEventListener('click',(e):void => {
    e.preventDefault();
   getBeerInDb(displayTopic)
});

foodBtn.addEventListener('click', (e):void => {
    e.preventDefault();
    getFoodInDb(displayTopic);
});

wineBtn.addEventListener('click', (e):void => {
    e.preventDefault();
    getWineInDb(displayTopic);
})



export { beerBtn, foodBtn, wineBtn, deleteMsgBtn }