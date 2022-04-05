import { allUsers } from "./firebaseApp";
import { inputUserName } from "../main"; 

export class AllUsers {
    constructor (
        public readonly allUsers: Object,
    ){
        this.displayAllUsers(allUsers);
    }

    private displayAllUsers(allUsers):void { /// displays all users from database, 
        const usersContainer:HTMLDivElement = document.createElement('div'); 
        document.body.append(usersContainer);
        usersContainer.classList.add('allusers-links'); 
        let mainDiv:HTMLDivElement = document.createElement('div');
        document.body.append(mainDiv);

        for(const key in allUsers) {
            console.log(allUsers[key].bio, allUsers[key].username)
            // const usersContainer:HTMLDivElement = document.createElement('div'); 
            // document.body.append(usersContainer); 
            let userParName:HTMLParagraphElement = document.createElement('p'); 
            userParName.innerText = allUsers[key].username; 

            if (allUsers[key].username === inputUserName) {
                userParName.innerText = 'Min profil'; 
            }

            /// make these links // put the rest of this in function 
            userParName.style.fontWeight = 'bold';
            userParName.style.textDecoration = 'underline'; 
            usersContainer.appendChild(userParName);
            // let mainDiv:HTMLDivElement = document.createElement('div');
            // document.body.append(mainDiv); 
            userParName.addEventListener('click', function(){
                mainDiv.innerHTML = ''; 
                const p = document.createElement('p'); 
                p.innerText = allUsers[key].username; 
                mainDiv.appendChild(p); 
                const smallBox = document.createElement('div');
                smallBox.classList.add('profile-name-bio-div'); 
                smallBox.appendChild(p);
                mainDiv.appendChild(smallBox);
                p.style.fontWeight = 'bold'; 
                p.classList.add('profile-name'); 
                mainDiv.classList.add('profile-container'); 
                const bioPar:HTMLParagraphElement = document.createElement('p'); 
                bioPar.classList.add('profile-bio'); 
                bioPar.innerText = allUsers[key].bio;
                smallBox.appendChild(bioPar); 
                //mainDiv.appendChild(bioPar); 
                const hideDiv:HTMLDivElement = document.querySelector('.profile-container'); 
                hideDiv.style.display = 'none'; 
                const hideWrapper:HTMLDivElement = document.querySelector('.user-wrapper');
                hideWrapper.style.display = 'none'; 
                const img:HTMLImageElement = document.createElement('img'); 
                const stringImg: string = `${allUsers[key].img}`;
                const imgUrl = new URL(stringImg, import.meta.url);
                img.src = imgUrl.href;
                mainDiv.appendChild(img);
            })

        }
    
    }
    
}