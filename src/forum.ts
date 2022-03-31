
import { getBeerInDb} from "./modules/firebaseApp";
import { Topic } from "./modules/forumClass";

alert("HELLO");

const beerBtn:HTMLButtonElement = document.querySelector('#beer-btn');
const foodBtn:HTMLButtonElement = document.querySelector('#food-btn');
const wineBtn:HTMLButtonElement = document.querySelector('#wine-btn');

beerBtn.addEventListener('click',e => {
    e.preventDefault();
    return getBeerInDb()
})