
import { getForumFromDB} from "./firebaseApp";
import { displayTopic } from "./display";

const beerBtn:HTMLButtonElement = document.querySelector('#beer-btn');
const foodBtn:HTMLButtonElement = document.querySelector('#food-btn');
const wineBtn:HTMLButtonElement = document.querySelector('#wine-btn');
const deleteMsgBtn: HTMLButtonElement = document.createElement ('button');

export let userName: string = sessionStorage.getItem('username');

beerBtn.addEventListener('click',(e):void => {
    e.preventDefault();
    getForumFromDB('beer', displayTopic)
});

foodBtn.addEventListener('click', (e):void => {
    e.preventDefault();
    getForumFromDB('food', displayTopic);
});

wineBtn.addEventListener('click', (e):void => {
    e.preventDefault();
    getForumFromDB('wine', displayTopic);
})

export { beerBtn, foodBtn, wineBtn, deleteMsgBtn }