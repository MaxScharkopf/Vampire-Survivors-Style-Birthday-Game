# 🎮 The Chronicles - A Fantasy Birthday Game

A Vampire Survivors-style bullet-heaven game built with Phaser.js, themed as a high fantasy quest. Created as a personalized birthday gift.

## 🎯 Project Overview

This is a top-down action game where the player controls a hero through 4 epic fantasy chapters, each representing a milestone in your relationship. The game features:

- **Auto-attacking magical abilities** that fire periodically
- **Enemy waves** with increasing difficulty
- **XP collection and leveling system** with upgrade choices
- **Story scrolls** between chapters for personalization
- **~15 minutes of gameplay** across 4 chapters

## 🎨 High Fantasy Theme

The game transforms your relationship story into an epic fantasy quest:

- **Chapter I**: The Meeting at Crossroads Inn (First meeting)
- **Chapter II**: Journey Through the Whispering Woods (Early relationship)
- **Chapter III**: Trials of the Crystal Caverns (Challenges overcome)
- **Chapter IV**: The Eternal Gardens (Present and future)

## 🚀 Quick Start

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Vampire-Survivors-Style-Birthday-Game
   ```

2. **Serve the files:**

   You need a local web server to run the game. Choose one:

   **Option A: Python (Simple)**
   ```bash
   # Python 3
   python -m http.server 8000

   # Then open: http://localhost:8000
   ```

   **Option B: Node.js (http-server)**
   ```bash
   npx http-server -p 8000

   # Then open: http://localhost:8000
   ```

   **Option C: VS Code Live Server**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Play the game** in your browser!

## 🎨 Customization Guide

### ⭐ Priority: Personalize the Story

The most important customization is adding your personal story! Edit these files:

#### **1. Story Text** (`src/data/storyText.js`)

Replace all placeholder text with your actual story:

```javascript
const StoryData = {
    gameTitle: "The Chronicles of Emma",  // Replace with her name

    scrolls: [
        {
            chapterId: 0,
            title: "CHAPTER I",
            subtitle: "The Meeting at Crossroads Inn",
            narrative: `Write your story about how you met...`,
            personalMessage: `Add a heartfelt message about that first meeting...`,
            photoPath: 'assets/story-scrolls/photo1.jpg',
        },
        // ... customize all 4 chapters
    ],

    victory: {
        prophecy: `Personalize the ending...`,
        finalMessage: `Happy Birthday, [Her Name]!

Here's to our next chapter...

With all my love,
[Your Name]`,
    },
};
```

#### **2. Ability Names** (`src/data/abilityData.js`)

Name the magical abilities after meaningful moments:

```javascript
const AbilityData = {
    starfall: {
        name: 'Starfall of February',  // Change to your meaningful date
        // e.g., "Starfall of June 15th" (first date)
    },

    enchantedBrew: {
        name: 'Enchanted Brew',  // Change to shared experience
        // e.g., "Mocha Magic" (favorite coffee shop)
    },

    arcaneLight: {
        name: "Cinema's Arcane Light",  // Change to activity
        // e.g., "Moonlight Cinema" (movie nights together)
    },

    eternalBond: {
        name: 'The Eternal Bond',  // The ultimate ability
        // Keep this or personalize further
    },
};
```

### 📸 Adding Photos

1. Add 4 photos to `assets/story-scrolls/`:
   - `photo1.jpg` - First meeting/date
   - `photo2.jpg` - Early relationship
   - `photo3.jpg` - Challenges overcome
   - `photo4.jpg` - Recent/current

2. Update the paths in `src/data/storyText.js`

3. *Optional*: Implement photo loading in `BootScene.js`:
   ```javascript
   this.load.image('photo1', 'assets/story-scrolls/photo1.jpg');
   ```

### 🎮 Gameplay Tuning

Edit `src/config.js` to adjust difficulty:

```javascript
const GameConfig = {
    player: {
        baseHealth: 100,    // Higher = easier
        speed: 200,         // Movement speed
    },

    chapters: [
        {
            duration: 300,      // Chapter length in seconds
            difficulty: 1.0,    // Enemy strength multiplier
        },
        // ... adjust all 4 chapters
    ],

    spawn: {
        baseSpawnRate: 1.5,     // Seconds between spawns (lower = harder)
        maxEnemiesOnScreen: 100, // Enemy cap
    },
};
```

### 🎨 Visual Customization

**Colors** (`src/config.js`):
```javascript
colors: {
    gold: 0xFFD700,      // Primary accent color
    health: 0xFF3333,    // Health bar
    mana: 0x3366FF,      // Mana bar
    xp: 0x00FF88,        // XP crystal color
},
```

**Backgrounds**: Replace generated backgrounds with images in `BootScene.js` preload():
```javascript
this.load.image('background_tavern', 'assets/backgrounds/tavern.jpg');
this.load.image('background_forest', 'assets/backgrounds/forest.jpg');
// etc.
```

### 🔊 Adding Audio

1. Add audio files to `assets/sounds/`:
   - `menu_music.mp3`
   - `chapter_music.mp3`
   - `level_up.mp3`
   - `enemy_death.mp3`
   - etc.

2. Load in `BootScene.js`:
   ```javascript
   this.load.audio('music_menu', 'assets/sounds/menu_music.mp3');
   this.load.audio('sfx_levelup', 'assets/sounds/level_up.mp3');
   ```

3. Play in scenes:
   ```javascript
   this.sound.play('music_menu', { loop: true, volume: 0.5 });
   this.sound.play('sfx_levelup');
   ```

## 📁 Project Structure

```
Vampire-Survivors-Style-Birthday-Game/
├── index.html              # Main HTML file
├── assets/                 # Game assets
│   ├── sprites/           # (Optional) Custom sprites
│   ├── sounds/            # (Optional) Audio files
│   ├── backgrounds/       # (Optional) Background images
│   └── story-scrolls/     # Photos for story sections
├── src/
│   ├── config.js          # Game configuration
│   ├── main.js            # Game initialization
│   ├── data/
│   │   ├── storyText.js   # ⭐ CUSTOMIZE THIS - Your story
│   │   ├── abilityData.js # ⭐ CUSTOMIZE THIS - Ability names
│   │   └── enemyData.js   # Enemy definitions
│   ├── entities/
│   │   ├── Player.js      # Hero character
│   │   ├── Enemy.js       # Fantasy creatures
│   │   ├── Ability.js     # Magical attacks
│   │   ├── Projectile.js  # Attack projectiles
│   │   └── XPCrystal.js   # XP drops
│   ├── managers/
│   │   ├── SpawnManager.js    # Enemy spawning
│   │   └── UpgradeManager.js  # Level up system
│   └── scenes/
│       ├── BootScene.js       # Asset loading
│       ├── MenuScene.js       # Title screen
│       ├── GameScene.js       # Main gameplay
│       ├── LevelUpScene.js    # Upgrade selection
│       ├── StoryScrollScene.js # Story display
│       ├── GameOverScene.js   # Death screen
│       └── VictoryScene.js    # Victory celebration
└── README.md              # This file
```

## 🎮 Controls

- **WASD** or **Arrow Keys** - Move the hero
- **Abilities** - Auto-fire (no manual control needed)
- **Mouse** - Click to select upgrades and navigate menus

## 🚢 Deployment

### GitHub Pages (Free, Easy)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Complete fantasy birthday game"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save

3. **Access your game:**
   - URL: `https://yourusername.github.io/repository-name`
   - Share this link with the birthday recipient!

### Alternative Deployment Options

- **Netlify**: Drag and drop the entire folder
- **Vercel**: Import GitHub repository
- **itch.io**: Export as HTML5 game

## 🎯 8-Day Development Timeline

- **Days 1-2**: ✅ Core mechanics (movement, combat, enemies)
- **Days 3-4**: ✅ Progression (XP, leveling, abilities)
- **Days 5-6**: Story scrolls, UI polish, effects
- **Day 7**: Audio, final polish, balance testing
- **Day 8**: Customization, deployment, testing

## 🐛 Troubleshooting

**Game won't load:**
- Must use a web server (not file://)
- Check browser console for errors (F12)

**Abilities not working:**
- Check collision setup in GameScene.js
- Ensure enemy group exists

**Story not showing:**
- Verify `src/data/storyText.js` is loaded in index.html
- Check StoryScrollScene transitions

**Performance issues:**
- Reduce `maxEnemiesOnScreen` in config.js
- Set `debug: false` in physics config
- Optimize particle effects

## 💡 Tips for Success

1. **Test frequently** - Play through each chapter after changes
2. **Start with story** - The personalization is what makes it special
3. **Keep it simple** - Don't over-engineer; the original plan is solid
4. **Balance difficulty** - Playtest to ensure she can complete it
5. **Mobile considerations** - Add touch controls if she'll play on mobile

## 📝 License

This is a personal gift project. Feel free to use this code for your own personal projects!

## 🎁 Final Checklist Before Gifting

- [ ] All story text personalized in `storyText.js`
- [ ] Ability names customized in `abilityData.js`
- [ ] 4 photos added to `assets/story-scrolls/`
- [ ] Victory message includes your name and birthday wishes
- [ ] Game tested from start to finish
- [ ] Difficulty balanced (should be completable but fun)
- [ ] Deployed and URL tested
- [ ] (Optional) Audio added for immersion

---

Made with ❤️ for [Her Name]'s Birthday
