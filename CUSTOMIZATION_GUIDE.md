# 🎨 Customization Guide - Make It Personal!

This guide walks you through personalizing the game with your relationship story. This is the most important part!

## 📝 Step-by-Step Personalization

### Step 1: The Opening (First Impression)

**File**: `src/data/storyText.js`

**What to change**:
```javascript
gameTitle: "The Chronicles of [Her Name]",
```

Replace `[Her Name]` with her actual name.

**Example**:
```javascript
gameTitle: "The Chronicles of Emma",
```

---

### Step 2: Opening Scroll (Set the Scene)

**File**: `src/data/storyText.js` → `opening` section

**What to write**: A brief, epic introduction that sets the fantasy tone.

**Template**:
```javascript
opening: {
    title: "Long ago, in a realm beyond time...",
    text: `A hero arose in [mention your city/location], destined for greatness.

This is the tale of [brief description - courage, adventure, love],
through realms both wondrous and perilous.

The quest begins now...`,
},
```

**Example**:
```javascript
opening: {
    title: "In the Age of Wonder...",
    text: `A hero arose in the mystical realm of Seattle, where coffee
flows like rivers and mountains touch the clouds.

This is the tale of courage, discovery, and a bond that
would transcend all challenges.

The quest begins now...`,
},
```

---

### Step 3: Chapter I - How You Met

**File**: `src/data/storyText.js` → `scrolls[0]`

**What to write**:
- **Narrative**: Epic fantasy version of how you met (2-3 sentences)
- **Personal Message**: Your actual heartfelt message about meeting her

**Template**:
```javascript
{
    chapterId: 0,
    title: "CHAPTER I",
    subtitle: "The Meeting at Crossroads Inn",
    narrative: `In [season] of [year/description], fate brought
two souls together at [location framed as fantasy place].
The hero knew not that this [encounter type] would
change the course of destiny itself...`,
    personalMessage: `[Your actual message about meeting her.
What attracted you? What do you remember most?
How did you feel?]`,
    photoPath: 'assets/story-scrolls/photo1.jpg',
},
```

**Real Example**:
```javascript
{
    chapterId: 0,
    title: "CHAPTER I",
    subtitle: "The Meeting at Crossroads Inn",
    narrative: `In the autumn of the Age of Discovery, fate brought
two souls together at the fabled Crossroads Inn (also known as The Pine Box Bar).
The hero knew not that this chance encounter over trivia night
would change the course of destiny itself...`,
    personalMessage: `I still remember the moment I saw you - you were wearing
that green sweater and laughing at your friend's terrible answer. When you joined
our trivia team and absolutely crushed the '90s music round, I knew you were special.
That night changed everything for me.`,
    photoPath: 'assets/story-scrolls/photo1.jpg',
},
```

---

### Step 4: Chapter II - Early Adventures

**File**: `src/data/storyText.js` → `scrolls[1]`

**What to write**: Early dates, getting to know each other, first adventures together

**Template**:
```javascript
{
    chapterId: 1,
    title: "CHAPTER II",
    subtitle: "Journey Through the Whispering Woods",
    narrative: `Through the [fantasy location] they ventured, where every
path revealed [metaphor for your experiences]. The bonds of
companionship grew stronger with each [challenge/adventure].`,
    personalMessage: `[Write about your early relationship - first dates,
discovering shared interests, things you did together,
what made you fall for her]`,
    photoPath: 'assets/story-scrolls/photo2.jpg',
},
```

**Real Example**:
```javascript
{
    chapterId: 1,
    title: "CHAPTER II",
    subtitle: "Journey Through the Whispering Woods",
    narrative: `Through the enchanted forest of Discovery Park they wandered,
where every trail revealed new wonders - hidden beaches, ancient trees,
and eagles soaring overhead. The bonds of companionship grew stronger
with each sunrise hike and sunset picnic.`,
    personalMessage: `Those first few months were magical. Our Saturday morning
hikes became my favorite tradition. I loved how you'd point out every bird,
how you made me try bubble tea (I still can't believe I like it now!), and
how we could talk for hours about everything and nothing. Falling for you
was the easiest thing I've ever done.`,
    photoPath: 'assets/story-scrolls/photo2.jpg',
},
```

---

### Step 5: Chapter III - Overcoming Challenges

**File**: `src/data/storyText.js` → `scrolls[2]`

**What to write**: Challenges you faced together, how you supported each other, growth

**Template**:
```javascript
{
    chapterId: 2,
    title: "CHAPTER III",
    subtitle: "Trials of the Crystal Caverns",
    narrative: `In the depths of [metaphor for difficulty], through darkness and trial,
the hero's true strength was revealed. Not in might alone,
but in [qualities - perseverance, wisdom, compassion, etc.].`,
    personalMessage: `[Write about challenges - could be external (pandemic, distance, job stress)
or personal growth together. Focus on how you got through it together]`,
    photoPath: 'assets/story-scrolls/photo3.jpg',
},
```

**Real Example**:
```javascript
{
    chapterId: 2,
    title: "CHAPTER III",
    subtitle: "Trials of the Crystal Caverns",
    narrative: `In the depths of the Long Dark (the pandemic lockdown), through
isolation and uncertainty, the hero's true strength was revealed.
Not in might alone, but in resilience, creativity, and an
unwavering spirit of hope.`,
    personalMessage: `2020 tested us in ways we never expected. But you turned
our tiny apartment into an adventure - our cooking experiments (RIP that
burnt lasagna), virtual game nights with friends, and those 1000-piece
puzzles. You found light in the darkness. Supporting each other through
job losses and family worries brought us closer than I ever imagined.`,
    photoPath: 'assets/story-scrolls/photo3.jpg',
},
```

---

### Step 6: Chapter IV - Present & Future

**File**: `src/data/storyText.js` → `scrolls[3]`

**What to write**: Current relationship, what she means to you, hopes for the future

**Template**:
```javascript
{
    chapterId: 3,
    title: "CHAPTER IV",
    subtitle: "The Eternal Gardens",
    narrative: `At last, the hero reached the fabled Eternal Gardens,
where [description of metaphorical paradise]. Here, in this realm
of [peace/beauty/love/etc.], a new chapter begins.`,
    personalMessage: `[Write about now - what you love about your relationship,
what she means to you, dreams for your future together,
why you're excited about what's ahead]`,
    photoPath: 'assets/story-scrolls/photo4.jpg',
},
```

**Real Example**:
```javascript
{
    chapterId: 3,
    title: "CHAPTER IV",
    subtitle: "The Eternal Gardens",
    narrative: `At last, the hero reached the fabled Eternal Gardens,
where cherry blossoms bloom eternally and every sunset paints
the sky in gold. Here, in this realm of endless spring,
a new chapter begins - one of dreams yet to unfold.`,
    personalMessage: `Every day with you is an adventure I'm grateful for.
From our lazy Sunday mornings with terrible coffee to planning our
dream trip to Japan, from your random 2am philosophical questions to
the way you still laugh at my awful puns - I love all of it.
Here's to our next chapter, whatever adventures it brings. ❤️`,
    photoPath: 'assets/story-scrolls/photo4.jpg',
},
```

---

### Step 7: Victory Message (The Birthday Wish)

**File**: `src/data/storyText.js` → `victory` section

**What to write**: Epic conclusion + heartfelt birthday message with your name

**Template**:
```javascript
victory: {
    title: "Thus Ends the Tale...",
    prophecy: `And thus ends the tale of [Her Name], whose [qualities]
surpassed all heroes of old. But know this - the greatest
adventures are yet to come, for every ending is but a
new beginning...`,
    finalMessage: `Happy Birthday, [Her Name]!

[Your birthday message - keep it heartfelt but concise]

[Sign it with a closing and your name]`,
},
```

**Real Example**:
```javascript
victory: {
    title: "Thus Ends the Tale...",
    prophecy: `And thus ends the tale of Emma, whose courage, kindness,
and terrible taste in puns surpassed all heroes of old.
But know this - the greatest adventures are yet to come,
for every ending is but a new beginning...`,
    finalMessage: `Happy Birthday, Emma!

Thank you for being my adventure partner, my best friend,
and the person who makes every day brighter. Here's to
another year of terrible jokes, amazing memories, and
all the quests yet to come.

With all my love,
Alex`,
},
```

---

## 🎯 Naming the Magical Abilities

**File**: `src/data/abilityData.js`

### Starfall (First Ability)
Name it after an important date or first moment:

```javascript
starfall: {
    name: 'Starfall of February',  // Change this!
    // Examples:
    // "Starfall of June 15th" (first date)
    // "Cascade of First Sight" (meeting)
    // "February's Blessing" (month you met)
}
```

### Enchanted Brew (Second Ability)
Name it after a shared activity or place:

```javascript
enchantedBrew: {
    name: 'Enchanted Brew',  // Change this!
    // Examples:
    // "Mocha Magic" (favorite coffee shop)
    // "Espresso of Destiny" (first coffee date)
    // "Starbucks Sorcery" (where you met up)
    // "Bubble Tea Blessing" (her favorite drink)
}
```

### Arcane Light (Third Ability)
Name it after another shared experience:

```javascript
arcaneLight: {
    name: "Cinema's Arcane Light",  // Change this!
    // Examples:
    // "Moonlight Cinema" (movie nights)
    // "Lighthouse Beam" (visited together)
    // "Stage Light of Broadway" (saw a show)
    // "Aurora of the North" (trip you took)
}
```

### Eternal Bond (Ultimate Ability)
Keep this or personalize further:

```javascript
eternalBond: {
    name: 'The Eternal Bond',  // This works well, or change it!
    // Examples:
    // "Promise of Forever"
    // "The Unbreakable Vow"
    // "Destiny's Embrace"
}
```

---

## 📸 Adding Photos

1. **Choose 4 photos** that represent each chapter:
   - Photo 1: Meeting/early dating
   - Photo 2: Adventures together
   - Photo 3: Overcoming challenges or growing together
   - Photo 4: Recent/current happiness

2. **Name them**:
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
   - `photo4.jpg`

3. **Place them** in: `assets/story-scrolls/`

4. **Format**: JPG or PNG, recommended size: 800x600 or 1000x750 pixels

---

## ⚖️ Balancing Difficulty

**File**: `src/config.js`

### Make it easier:
```javascript
player: {
    baseHealth: 150,    // Increase from 100
    speed: 250,         // Increase from 200
},
chapters: [
    { duration: 240 },  // Shorter chapters (4 minutes instead of 5)
],
```

### Make it harder:
```javascript
player: {
    baseHealth: 75,     // Decrease from 100
    speed: 180,         // Decrease from 200
},
chapters: [
    { duration: 360 },  // Longer chapters (6 minutes)
],
```

---

## ✅ Final Checklist

Before sharing the game:

- [ ] Replaced `[Her Name]` with actual name
- [ ] Wrote opening scroll
- [ ] Wrote all 4 chapter narratives and personal messages
- [ ] Customized ability names
- [ ] Added birthday message with YOUR name
- [ ] Added 4 photos (optional but recommended)
- [ ] Tested the game from start to finish
- [ ] Checked that all text displays correctly
- [ ] Made sure difficulty feels right

---

## 💡 Writing Tips

1. **Be authentic** - Write in your voice, not what you think sounds "good"
2. **Be specific** - Inside jokes and specific memories > generic statements
3. **Balance tone** - Epic fantasy framing + genuine heartfelt messages = perfect
4. **Keep it concise** - 2-3 sentences for narrative, 3-5 for personal messages
5. **Test readability** - Make sure text fits on screen (use wordWrap)

---

Need help? The game structure is complete and working. Focus on the story - that's what makes it special! ❤️
