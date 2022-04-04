import { contains } from "@firebase/util";

export class Profile {

    // public readonly allUsers; // from database
    constructor (
        public readonly uData: Object, /// from login-function 
    ){
        this.displayUser(uData); 
    }
        
    private displayUser(uData):void { /// creates every element upon creation of instans

        /// move to display.ts and call this from a function inside here 
        const container:HTMLDivElement = document.createElement('div');
        document.body.append(container);
        container.classList.add('profile-container'); 
        const nameEl:HTMLHeadingElement = document.createElement('h2');  
        container.appendChild(nameEl); 
        nameEl.innerText = uData.username;  
        const bioEl:HTMLParagraphElement = document.createElement('p');
        container.appendChild(bioEl); 
        bioEl.innerText = uData.bio;
        const imgEl:HTMLImageElement = document.createElement('img'); 
        container.appendChild(imgEl); 
        imgEl.src = uData.img; 
        const hideLogin:HTMLDivElement = document.querySelector('.user-wrapper');
        hideLogin.style.display = 'none'; 
        
    }

}