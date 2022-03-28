class User {
   
    constructor (
        public readonly id: string,
        public readonly username: string,
        private password: any,
        public readonly bio: string,
        public readonly image: URL // How do we declare the image in a class constructor? 
    )
{}

public createUserSignUp(): void {
    // Sign up user by adding input and button, take username + password and save to database 
    // Let user write a short bio and choose image from "array of images" that we have decided
    // If username already exists, alert that they need to pick a different username
}

public userLogIn(): void {
    // When user is already signed up, compare username + password to already existing id in database and let user log in if it matches
    // If it can't find a matching user, show message or alert that user can't be found
}

}