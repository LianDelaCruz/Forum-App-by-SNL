
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
        usersContainer.classList.add('allusers-links'); /// shows all users names
        let mainDiv:HTMLDivElement = document.createElement('div');
        document.body.append(mainDiv);

        for(const key in allUsers) { /// loops true allusers to display users 
            let userParName:HTMLParagraphElement = document.createElement('p'); 
            userParName.innerText = allUsers[key].username; 

            if (allUsers[key].username === inputUserName) { /// get back to my own profile 
                userParName.innerText = 'Min profil'; 
            }
 
            userParName.style.fontWeight = 'bold'; 
            usersContainer.appendChild(userParName);
            
            userParName.addEventListener('click', function(){ /// when pressed renders other profiles 
                mainDiv.innerHTML = ''; 
                const p:HTMLParagraphElement = document.createElement('p'); 
                p.innerText = allUsers[key].username; 
                mainDiv.appendChild(p); 
                const smallBox = document.createElement('div');
                smallBox.classList.add('profile-name-bio-div'); 
                smallBox.appendChild(p);
                mainDiv.appendChild(smallBox); 
                p.classList.add('profile-name'); 
                mainDiv.classList.add('profile-container'); 
                const bioPar:HTMLParagraphElement = document.createElement('p'); 
                bioPar.classList.add('profile-bio'); 
                bioPar.innerText = allUsers[key].bio;
                smallBox.appendChild(bioPar);  
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