import { contains } from "@firebase/util";

export class Profile {

    public readonly userData; /// from login-function
    // public readonly allUsers; // from database

    constructor (userData:any, /*allUsers:any*/) {
        this.userData = userData;
        /*this.allUsers = allUsers;*/
    }
        
    displayUser(userData) { /// creates every element upon creation of instans
        const container = document.createElement('div');
        document.body.append(container);
        const nameEl = document.createElement('h2');  
        container.appendChild(nameEl); 
        nameEl.innerText = userData.name; 
        const bioEl = document.createElement('p'); 
        container.appendChild(bioEl); 
        bioEl.innerText = userData.username;
        const imgEl = document.createElement('img'); 
        container.appendChild(imgEl); 
        imgEl.src = userData.img; 
        
    }


    // displayAllUsers(allUsers) { /// displays all users from database, called when instans created 
    //     for(const key in allUsers) {
    //         console.log(allUsers[key].username);
    //         const usersContainer = document.createElement('div'); 
    //         document.body.append(usersContainer); 
    //         const userPar = document.createElement('p'); 
    //         userPar.innerText = allUsers.name; 
    //         usersContainer.appendChild(userPar); 
    //         const bioPar = document.createElement('p'); 
    //         bioPar.classList.add('#bio'); 
    //         usersContainer.appendChild(bioPar); 
    //         bioPar.style.display = 'none'; // hidden until hovered
    //     }
    // }

}