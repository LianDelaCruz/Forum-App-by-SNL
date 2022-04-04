import { allUsers } from "./firebaseApp"; 

export class AllUsers {
    constructor (
        public readonly allUsers: Object,
    ){
        this.displayAllUsers(allUsers);
    }

    /// lägga allt detta i en eventlistener kopplad till namnet, som visar user on mouseover 
    private displayAllUsers(allUsers):void { /// displays all users from database, 
        
        for(const key in allUsers) {
            console.log(allUsers[key].bio, allUsers[key].username)
            const usersContainer:HTMLDivElement = document.createElement('div'); 
            document.body.append(usersContainer); 
            const userParName:HTMLParagraphElement = document.createElement('p'); 
            userParName.innerText = allUsers[key].username; 

            /// make these links // put the rest of this in function 
            userParName.style.fontWeight = 'bold';
            userParName.style.textDecoration = 'underline'; 
            usersContainer.appendChild(userParName);

            userParName.addEventListener('click', function(){
                const mainDiv:HTMLDivElement = document.createElement('div');
                document.body.append(mainDiv); 
                const p = document.createElement('p'); 
                p.innerText = allUsers[key].username; 
                mainDiv.appendChild(p); 
                p.style.fontWeight = 'bold'; 
                mainDiv.classList.add('main-div'); 
                mainDiv.style.display = 'block';   
                const bioPar:HTMLParagraphElement = document.createElement('p'); 
                bioPar.classList.add('bio'); 
                bioPar.innerText = allUsers[key].bio;
                mainDiv.appendChild(bioPar); 
                const hideDiv:HTMLDivElement = document.querySelector('.profile-container'); 
                hideDiv.style.display = 'none'; 
                const hideWrapper:HTMLDivElement = document.querySelector('.user-wrapper');
                hideWrapper.style.display = 'none'; 
                const img:HTMLImageElement = document.createElement('img'); 
                mainDiv.appendChild(img); 
                img.src = allUsers[key].img; 
            })
        }
    
    }
}