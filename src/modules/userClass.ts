class User {   
    constructor (
        public readonly id: string,
        public readonly username: string,
        public password: any,
        public readonly bio: string,
        public readonly img: string 
    )
{
    this.id = id;
    this.username = username;
    this.password = password;
    this.bio = bio;
    this.img = img;
}

}

export { User };