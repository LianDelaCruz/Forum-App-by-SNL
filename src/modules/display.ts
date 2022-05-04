
import { Message, Topic } from "./forumClass";
import { dbFoodForum, dbBeerForum, dbWineForum, db } from "./firebaseApp";
import { update, push, remove, ref } from "firebase/database";
import { userName } from "./forum";

// This is where we will create elements that will appear on our website

//FORUM Display section


export function displayTopic(topic:Topic){
    const topicContainer:Element = document.querySelector('#topic-container');
    topicContainer.className = 'topic-container';
    topicContainer.innerHTML = '';
    //loop through topic.messages 
    // in the loop:
    let messages = topic.messages;
    for(let i=0; i<messages.length; i++){
        const message:Message = messages[i];
        const messageId:string = message.id;
        const content:string = message.message;
        const messageAuthor:string = message.username;

        const messageContainer:HTMLDivElement = document.createElement('div');
        topicContainer.appendChild(messageContainer);
        messageContainer.className = 'msg-container';

        const messageUserElement:HTMLHeadingElement = document.createElement('h4');
        messageContainer.appendChild(messageUserElement);
        messageUserElement.innerText = messageAuthor;
        messageUserElement.className = 'msg-user';

        const messageContentElement: HTMLParagraphElement = document.createElement('p');
        messageContainer.appendChild(messageContentElement);
        messageContentElement.innerText = content;
        messageContentElement.className = 'msg-content';

        const shouldAddDeleteButton:boolean = messageAuthor === sessionStorage.getItem('username');
        if(shouldAddDeleteButton) {
            const deleteMsgBtn: HTMLButtonElement = document.createElement ('button');
            deleteMsgBtn.innerText = 'Delete';
            deleteMsgBtn.className = 'delbtn';
            deleteMsgBtn.addEventListener('click', () => {
                const dbPath:any = '/SNLApp/Forum/' + topic.id + '/' + messageId
                const messageDbref:any = ref(db, dbPath);
                remove(messageDbref);
            })
            messageContainer.appendChild(deleteMsgBtn);
        }
    }
    const messageInputElement:HTMLInputElement= document.createElement('input');
    messageInputElement.placeholder = 'Write your message here!';
    messageInputElement.className = 'msg-input';
    topicContainer.appendChild(messageInputElement);

    const messageButtonElement:HTMLButtonElement = document.createElement('button');
    messageButtonElement.textContent = 'SEND';
    topicContainer.appendChild(messageButtonElement);
    messageButtonElement.className = 'msg-btn';
    

    //this will refer to which topic is selected in the messageButtonElement(send button)
    const dbReferences:any = {
        'beer': dbBeerForum,
        'wine': dbWineForum,
        'food': dbFoodForum,
    }

    messageButtonElement.addEventListener('click', e => {
        messageInputElement;
        e.preventDefault();
        const messageToAdd:any = {
            username:userName,
            message: messageInputElement.value
        }
        const newKey:string = push(dbReferences[topic.id]).key;
        const newChat = {};
        newChat[newKey] = messageToAdd;
        update(dbReferences[topic.id], newChat);   
    })
};


