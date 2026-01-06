// Game Configuration
const GameConfig = {
    // Display settings
    width: 1280,
    height: 720,

    // Game balance
    player: {
        speed: 200,
        baseHealth: 100,
        baseMana: 50,
        healthRegen: 0.1, // per second
        manaRegen: 1, // per second
    },

    // XP and leveling
    xp: {
        baseXPNeeded: 10,
        xpScaling: 1.5, // Multiplier per level
        crystalValue: 1,
        magnetRange: 80,
    },

    // Chapter configuration
    chapters: [
        {
            id: 0,
            name: "The Meeting at Crossroads Inn",
            duration: 20, // seconds - for testing (change to 240-300 for final)
            background: 'tavern',
            difficulty: 1.0,
        },
        {
            id: 1,
            name: "Journey Through the Whispering Woods",
            duration: 20, // seconds - for testing (change to 240-300 for final)
            background: 'forest',
            difficulty: 1.3,
        },
        {
            id: 2,
            name: "Trials of the Crystal Caverns",
            duration: 20, // seconds - for testing (change to 240-300 for final)
            background: 'cavern',
            difficulty: 1.6,
        },
        {
            id: 3,
            name: "The Eternal Gardens",
            duration: 20, // seconds - for testing (change to 240-300 for final)
            background: 'garden',
            difficulty: 2.0,
        },
    ],

    // Enemy spawn configuration
    spawn: {
        baseSpawnRate: 1.5, // seconds between spawns
        minSpawnRate: 0.3,
        spawnAcceleration: 0.95, // Multiplier each spawn (gets faster)
        maxEnemiesOnScreen: 100,
    },

    // Colors for UI
    colors: {
        gold: 0xFFD700,
        darkGold: 0xB8860B,
        health: 0xFF3333,
        healthBg: 0x660000,
        mana: 0x3366FF,
        manaBg: 0x000066,
        xp: 0x00FF88,
        xpBg: 0x004422,
        text: '#FFD700',
        textShadow: '#000000',
    },
};
