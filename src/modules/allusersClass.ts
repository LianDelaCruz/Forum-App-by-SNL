

export class AllUsers {
    constructor (
        public readonly allUsers: Object,
    ){
        this.displayAllUsers(allUsers);
    }
    private displayAllUsers(allUsers):void { /// displays all users from database, 
        for(const key in allUsers) {

            console.log(allUsers[key].bio, allUsers[key].username)
            const usersContainer:HTMLDivElement = document.createElement('div'); 
            document.body.append(usersContainer); 
            const userParName:HTMLParagraphElement = document.createElement('p'); 
            userParName.innerText = allUsers[key].username; 
            userParName.style.fontStyle = 'bold'; 
            usersContainer.appendChild(userParName);

            const hiddenDiv:HTMLDivElement = document.createElement('div'); 
            document.body.append(hiddenDiv); 
            hiddenDiv.style.display = 'none'; 
            const bioPar:HTMLParagraphElement = document.createElement('p'); 
            bioPar.classList.add('#bio'); 
            //bioPar.style.display = ''; // hidden until hovered
            bioPar.innerText = allUsers[key].bio; 
            hiddenDiv.appendChild(bioPar);  
            const img:HTMLImageElement = document.createElement('img');
            hiddenDiv.appendChild(img); 
            img.src = allUsers[key].img; 
            userParName.addEventListener('mouseover', function() {
                hiddenDiv.style.display = 'block'; 
                    
            })
            userParName.addEventListener('mouseout', function() {
                hiddenDiv.style.display = 'none'; 
            })
        }
    
    }
}