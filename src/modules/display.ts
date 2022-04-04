
import { Message, Topic } from "./forumClass";
import { getBeerInDb, sendMessageToBeer, dbFoodForum, dbBeerForum, dbWineForum, db } from "./firebaseApp";
import { update, push, remove, ref } from "firebase/database";
import { userName, deleteMsgBtn } from "../forum";

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

        messageContainer.appendChild(deleteMsgBtn);
        deleteMsgBtn.innerText = 'delete';
    }
    const messageInputElement:HTMLInputElement= document.createElement('input');
    messageInputElement.placeholder = 'Write your message here!';
    topicContainer.appendChild(messageInputElement);

    const messageButtonElement:HTMLButtonElement = document.createElement('button');
    messageButtonElement.textContent = 'SEND';
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
        const newKey:string = push(dbReferences[topic.id]).key;
        const newChat = {};
        newChat[newKey] = messageToAdd;
        update(dbReferences[topic.id], newChat);   
    })

    deleteMsgBtn.addEventListener('click', () => {
        const deleteMessage = ref(db, '/SNLApp/Forum/' + this.id);
        remove(deleteMessage);
    })

    // if(userName != Message[this.username]){
    //     deleteMsgBtn.style.display = 'none';
    // }

};


