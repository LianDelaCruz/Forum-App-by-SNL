import { contains } from "@firebase/util";

export class Profile {

    // public readonly allUsers; // from database
    constructor (
        public readonly userData: Object, /// from login-function
        // public readonly allUsers:any
    ){
        this.displayUser(userData);
        // this.displayAllUsers(allUsers); 
    }
        
    private displayUser(userData):void { /// creates every element upon creation of instans
        for(const key in userData) {
            console.log(userData[key].username, userData[key].bio); 
        }
        
        const container:HTMLDivElement = document.createElement('div');
        document.body.append(container);
        const nameEl:HTMLHeadingElement = document.createElement('h2');  
        container.appendChild(nameEl); 
        nameEl.innerText = userData.name; 
        const bioEl:HTMLParagraphElement = document.createElement('p'); 
        container.appendChild(bioEl); 
        bioEl.innerText = userData.username;
        const imgEl:HTMLImageElement = document.createElement('img'); 
        container.appendChild(imgEl); 
        imgEl.src = userData.img; 
        
    }


    // private displayAllUsers(allUsers):void { /// displays all users from database, called when instans created 
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