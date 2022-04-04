
import { Message, Topic } from "./forumClass";
import { getBeerInDb, sendMessageToBeer, dbFoodForum, dbBeerForum, dbWineForum } from "./firebaseApp";
import { update, push } from "firebase/database";
import { userName } from "../forum";

// This is where we will create elements that will appear on our website

//FORUM Display section


export function displayTopic(topic:Topic){
    const topicContainer = document.querySelector('#topic-container');
    topicContainer.className = 'topic-container';
    topicContainer.innerHTML = '';
    //loop through topic.messages 
    // in the loop:
    let messages = topic.messages;
    for(let i=0; i<messages.length; i++){
        const message = messages[i];
        const content = message.message;
        const name = message.username;

        const messageContainer = document.createElement('div');
        topicContainer.appendChild(messageContainer);
        messageContainer.className = 'msg-container';

        const messageUserElement:HTMLHeadingElement = document.createElement('h4');
        messageContainer.appendChild(messageUserElement);
        messageUserElement.innerText = name;

        const messageContentElement: HTMLParagraphElement = document.createElement('p');
        messageContainer.appendChild(messageContentElement);
        messageContentElement.innerText = content;
    }
    const messageInputElement:HTMLInputElement= document.createElement('input');
    messageInputElement.placeholder = 'Write your message here!';
    topicContainer.appendChild(messageInputElement);

    const messageButtonElement:HTMLButtonElement = document.createElement('button');
    messageButtonElement.textContent = 'SEND';
    // messageButtonElement.onclick = () => {sendMessageToBeer(new Message('123', 'Indy', 'hungry'))}
    topicContainer.appendChild(messageButtonElement);
    messageButtonElement.className = 'messageButtonElement';
    

    //this will refer to which topic is selected in the messageButtonElement(send button)
    const dbReferences = {
        'beer': dbBeerForum,
        'wine': dbWineForum,
        'food': dbFoodForum,
    }

    messageButtonElement.addEventListener('click', e => {
        messageInputElement;
        e.preventDefault();
        const messageToAdd = {
            username:userName,
            message: messageInputElement.value
        }
        //messages= '';
        const newKey:string = push(dbReferences[topic.id]).key;
        const newChat = {};
        newChat[newKey] = messageToAdd;
        update(dbReferences[topic.id], newChat);   
    })

};


