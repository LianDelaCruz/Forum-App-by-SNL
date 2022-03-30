class Message {
    constructor (
        public readonly id: String,
        public readonly username: String,
        public readonly message: String,
        //public readonly time: Date
    )
    {}
}

class Topic {
    constructor (
        public readonly id: String,
        public readonly messages: Message[],
    )
    {}
}

class Forum {
    constructor (
        public readonly topics: Topic[]
    )

    {
       
    }
}

const beerMessages = [
    new Message("asdasdsad", "Lian", "Hello world!")
]

const beerTopic = new Topic("beer", beerMessages)

const forum = new Forum([beerTopic])


// Write similar code to chat-miniproject but we need three different ones with unique names (topics) and connect them to different inputs to make sure message ends up in the right forum