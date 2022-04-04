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
    {
        
    }
}

export class Forum {
    constructor (public readonly topics: Topic[])
    {}
}


// Write similar code to chat-miniproject but we need three different ones with unique names (topics) and connect them to different inputs to make sure message ends up in the right forum