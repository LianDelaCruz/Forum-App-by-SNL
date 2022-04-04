import { allUsers } from "./firebaseApp"; 

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
            /// make these links // put the rest of this in function 
            userParName.style.fontStyle = 'bold'; 
            usersContainer.appendChild(userParName);

            userParName.addEventListener('click', function(){
                const hiddenDiv:HTMLDivElement = document.createElement('div');
                document.body.append(hiddenDiv); 
                hiddenDiv.classList.add('.main-div'); 
                hiddenDiv.style.display = 'block'; 
                const bioPar:HTMLParagraphElement = document.createElement('p'); 
                bioPar.classList.add('#bio'); 
                bioPar.innerText = allUsers[key].bio; 
                hiddenDiv.appendChild(bioPar);  
                const img:HTMLImageElement = document.createElement('img');
                hiddenDiv.appendChild(img); 
                const hideProfile:HTMLDivElement = document.querySelector('.profile-container'); 
                hideProfile.style.display = 'none'; 


                /// Skall ta alla andra divs och dölja dem 
                // const allDivs = document.querySelector('div'); 
                // for(let i = 0; i < allDivs.length; i++) {
                //     allDivs[i].style.display = 'none'; 
                // }
                
            })
        }
        
        
        // for(const key in allUsers) {

        //     console.log(allUsers[key].bio, allUsers[key].username)
        //     const usersContainer:HTMLDivElement = document.createElement('div'); 
        //     document.body.append(usersContainer); 
        //     const userParName:HTMLParagraphElement = document.createElement('p'); 
        //     userParName.innerText = allUsers[key].username; 
        //     /// make these links // put the rest of this in function 
        //     userParName.style.fontStyle = 'bold'; 
        //     usersContainer.appendChild(userParName);

        //     const hiddenDiv:HTMLDivElement = document.createElement('div'); 
        //     document.body.append(hiddenDiv); 
        //     hiddenDiv.style.display = 'none'; 
        //     const bioPar:HTMLParagraphElement = document.createElement('p'); 
        //     bioPar.classList.add('#bio'); 
        //     //bioPar.style.display = ''; // hidden until hovered
        //     bioPar.innerText = allUsers[key].bio; 
        //     hiddenDiv.appendChild(bioPar);  
        //     const img:HTMLImageElement = document.createElement('img');
        //     hiddenDiv.appendChild(img); 
        //     // img.src = allUsers[key].img; 
        //     const stringImg1 = `${allUsers[key].img}`;
        //     const imgUrl = new URL(stringImg1, import.meta.url );
        //     img.src = imgUrl.href;
        //     console.log(imgUrl);
        //     userParName.addEventListener('mouseover', function() {
        // //         hiddenDiv.style.display = 'block'; 
                    
        //     // })
        //     // userParName.addEventListener('mouseout', function() {
        //     //     hiddenDiv.style.display = 'none'; 
        //     // })
        // // }
    
    }
}