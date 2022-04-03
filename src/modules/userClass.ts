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

showImageInDom() {
        const imgUrl = new URL(`${this.img}`, import.meta.url);
        const img: HTMLImageElement = document.createElement('img');
        img.src = imgUrl.href;
        document.body.appendChild(img);
}

}

const newUser = new User('hej', 'hej', 22, 'hej hej', 'img/DogePanda.png');
newUser.showImageInDom();

export { User };