
import { getBeerInDb} from "./modules/firebaseApp";
import { Topic } from "./modules/forumClass";
import { displayTopic } from "./modules/display";

const beerBtn:HTMLButtonElement = document.querySelector('#beer-btn');
const foodBtn:HTMLButtonElement = document.querySelector('#food-btn');
const wineBtn:HTMLButtonElement = document.querySelector('#wine-btn');
const topicContainer = document.querySelector("#topic-container")

beerBtn.addEventListener('click',e => {
    e.preventDefault();
   getBeerInDb(displayTopic)
})

