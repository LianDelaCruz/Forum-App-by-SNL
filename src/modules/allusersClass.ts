
import { inputUserName } from "../main"; 

export class AllUsers {
    constructor (
        public readonly allUsers: Object, 
    ){
        this.displayAllUsers(allUsers);
    }

    private displayAllUsers(allUsers):void { /// displays all users from database, 
        const allUsersContainer:HTMLDivElement = document.createElement('div'); 
        document.body.append(allUsersContainer);
        allUsersContainer.classList.add('allusers-links'); /// shows all users names
        let allUsersDiv:HTMLDivElement = document.createElement('div');
        document.body.append(allUsersDiv);

        for(const key in allUsers) { /// loops true allusers to display users 
            let allUsersName:HTMLParagraphElement = document.createElement('p'); 
            allUsersName.innerText = allUsers[key].username; 

            if (allUsers[key].username === inputUserName) { /// get back to my own profile 
                allUsersName.innerText = 'Min profil'; 
            }
 
            allUsersName.style.fontWeight = 'bold'; 
            allUsersContainer.appendChild(allUsersName);
            
            allUsersName.addEventListener('click', function():void{ /// when pressed renders other profiles 
                allUsersDiv.innerHTML = ''; 
                const profileName:HTMLParagraphElement = document.createElement('p'); 
                profileName.innerText = allUsers[key].username; 
                allUsersDiv.appendChild(profileName); 
                const smallBox:HTMLDivElement = document.createElement('div');
                smallBox.classList.add('profile-name-bio-div'); 
                smallBox.appendChild(profileName);
                allUsersDiv.appendChild(smallBox); 
                profileName.classList.add('profile-name'); 
                allUsersDiv.classList.add('profile-container'); 
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
                allUsersDiv.appendChild(img);
            })

        }
    
    }
    
}