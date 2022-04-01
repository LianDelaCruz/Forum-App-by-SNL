
import { Message, Topic } from "./forumClass";
import { getBeerInDb } from "./firebaseApp";

// This is where we will create elements that will appear on our website

//FORUM Display section


export function displayTopic(topic:Topic){
    const forumContainer = document.querySelector('.forum-wrapper');
    //loop through topic.messages 
    // in the loop:
    const messages = topic.messages;
    for(let i=0; i<messages.length; i++){
        const message = messages[i]

        const content = message.message;
        const name = message.username;

        const messageElement = document.createElement('div');
        const messageContentElement = document.createElement('p')
        messageContentElement.innerText = content
        messageElement.appendChild(messageContentElement)
        forumContainer.appendChild(messageElement);

        console.log(message)
    }


    //create div and append message.message


}