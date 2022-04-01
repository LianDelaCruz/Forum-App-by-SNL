

export class AllUsers {
    constructor (
        public readonly allUsers: Object,
    ){
        this.displayAllUsers(allUsers);
    }

    private displayAllUsers(allUsers):void { /// displays all users from database, called when instans created 
            for(const key in allUsers) {
                console.log(allUsers[key].bio, allUsers[key].username)
                const usersContainer = document.createElement('div'); 
                document.body.append(usersContainer); 
                const userPar = document.createElement('p'); 
                userPar.innerText = allUsers[key].username; 
                usersContainer.appendChild(userPar);
                const bioPar = document.createElement('p'); 
                bioPar.classList.add('#bio'); 
                //bioPar.style.display = ''; // hidden until hovered
                bioPar.innerText = allUsers[key].bio; 
                usersContainer.appendChild(bioPar);  
            }
    
    }
}