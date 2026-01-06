// Story Text and Personalization Data
// CUSTOMIZE THIS FILE with your personal story and photos!

const StoryData = {
    // Game title and intro
    gameTitle: "The Chronicles of [Her Name]",
    subtitle: "A Fantasy Quest",

    // Opening scroll text
    opening: {
        title: "Long ago, in a realm beyond time...",
        text: `A hero arose in the mystical lands, destined for greatness.

This is the tale of courage, magic, and an epic journey
through realms both wondrous and perilous.

The quest begins now...`,
    },

    // Story scrolls for each chapter (customize these!)
    scrolls: [
        {
            chapterId: 0,
            title: "CHAPTER I",
            subtitle: "The Meeting at Crossroads Inn",
            narrative: `In the autumn of the Age of Discovery, fate brought
two souls together at the fabled Crossroads Inn.
The hero knew not that this chance encounter would
change the course of destiny itself...`,
            personalMessage: `[Your personal message about meeting her -
Make this heartfelt and specific to your story!]`,
            photoPath: 'assets/story-scrolls/photo1.jpg', // Add your photo here
        },
        {
            chapterId: 1,
            title: "CHAPTER II",
            subtitle: "Journey Through the Whispering Woods",
            narrative: `Through the enchanted forest they ventured, where every
path revealed new wonders and every challenge was faced together.
The bonds of companionship grew stronger with each step.`,
            personalMessage: `[Your message about early relationship moments -
Adventures you had together, experiences you shared]`,
            photoPath: 'assets/story-scrolls/photo2.jpg',
        },
        {
            chapterId: 2,
            title: "CHAPTER III",
            subtitle: "Trials of the Crystal Caverns",
            narrative: `In the depths of the earth, through darkness and trial,
the hero's true strength was revealed. Not in might alone,
but in perseverance, wisdom, and an unyielding spirit.`,
            personalMessage: `[Your message about challenges overcome together -
How you supported each other, what you learned]`,
            photoPath: 'assets/story-scrolls/photo3.jpg',
        },
        {
            chapterId: 3,
            title: "CHAPTER IV",
            subtitle: "The Eternal Gardens",
            narrative: `At last, the hero reached the fabled Eternal Gardens,
where time stands still and beauty knows no end. Here,
in this realm of peace and wonder, a new chapter begins.`,
            personalMessage: `[Your message about the present and future -
What she means to you, your hopes and dreams together]`,
            photoPath: 'assets/story-scrolls/photo4.jpg',
        },
    ],

    // Victory message
    victory: {
        title: "Thus Ends the Tale...",
        prophecy: `And thus ends the tale of [Her Name], whose courage
and grace surpassed all heroes of old. But know this -
the greatest adventures are yet to come, for every
ending is but a new beginning...`,
        finalMessage: `Happy Birthday, [Name]!

Here's to our next chapter, and all the adventures still to come.

With all my love,
[Your Name]`,
    },

    // Game over message
    gameOver: {
        title: "The Quest Pauses...",
        message: "Even heroes must rest. Will you try again?",
    },
};
