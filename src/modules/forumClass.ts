export class Message {
    constructor (
        public readonly id: string,
        public readonly username: string,
        public readonly message: string,
        //public readonly time: Date
    )
    {
        this.username = username;
    }
}

export class Topic {
    constructor (
        public readonly id: string,
        public readonly messages: Message[],
    )
    {}
}

