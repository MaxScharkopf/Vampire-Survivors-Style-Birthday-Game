// Enemy Type Definitions
// Fantasy creatures that populate the realms

const EnemyData = {
    shadowWraith: {
        id: 'shadowWraith',
        name: 'Shadow Wraith',
        health: 15,
        speed: 60,
        damage: 5,
        xpValue: 1,
        size: 32,
        color: 0x4444AA, // Dark purple/blue
        spawnWeight: 10, // Higher = more common
    },

    flameImp: {
        id: 'flameImp',
        name: 'Flame Imp',
        health: 20,
        speed: 80,
        damage: 8,
        xpValue: 2,
        size: 28,
        color: 0xFF4444, // Red
        spawnWeight: 7,
    },

    corruptedWolf: {
        id: 'corruptedWolf',
        name: 'Corrupted Wolf',
        health: 35,
        speed: 100,
        damage: 12,
        xpValue: 3,
        size: 40,
        color: 0x666666, // Gray
        spawnWeight: 5,
    },

    iceElemental: {
        id: 'iceElemental',
        name: 'Ice Elemental',
        health: 50,
        speed: 40,
        damage: 15,
        xpValue: 5,
        size: 48,
        color: 0x44FFFF, // Cyan
        spawnWeight: 3,
    },

    goblinHorde: {
        id: 'goblinHorde',
        name: 'Goblin',
        health: 10,
        speed: 70,
        damage: 4,
        xpValue: 1,
        size: 24,
        color: 0x88AA44, // Greenish
        spawnWeight: 15, // Very common
    },

    darkKnight: {
        id: 'darkKnight',
        name: 'Dark Knight',
        health: 100,
        speed: 50,
        damage: 20,
        xpValue: 10,
        size: 56,
        color: 0x220022, // Very dark purple
        spawnWeight: 1, // Rare elite
    },
};

// Enemy spawn pools for each chapter
const ChapterEnemies = {
    0: ['shadowWraith', 'goblinHorde'], // Chapter 1: Easy start
    1: ['shadowWraith', 'goblinHorde', 'flameImp', 'corruptedWolf'], // Chapter 2: More variety
    2: ['flameImp', 'corruptedWolf', 'iceElemental', 'darkKnight'], // Chapter 3: Harder enemies
    3: ['corruptedWolf', 'iceElemental', 'darkKnight'], // Chapter 4: Toughest foes
};
