import { ref, remove } from "firebase/database";
import { db, users } from "./firebaseApp";

export function deleteAccount(): void {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('del-btn-div'); 
    document.body.append(buttonDiv);
    const deleteButton: HTMLButtonElement = document.createElement('button');
    deleteButton.classList.add('del-btn'); 
    buttonDiv.append(deleteButton);
    deleteButton.innerText = 'Delete my profile';

    deleteButton.addEventListener('click', (e) => {
        let deleteAccountBtn = confirm('Are you sure?');

        console.log(sessionStorage.getItem('username'), users);

        if (deleteAccountBtn) {

            for (let i = 0; i < users.length; i++) {
                console.log(users[i]);
                const user = users[i].username;
                console.log(user);

                if (sessionStorage.getItem('username') == users[i].username) {
                    const deleteMyUser = ref(db, '/SNLApp/User/' + users[i].id);
                    sessionStorage.clear();
                    remove(deleteMyUser);
                    location.href = '/index.html';
                }
            }

        }
    })
}