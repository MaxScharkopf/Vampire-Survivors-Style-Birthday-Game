// Magical Ability Definitions
// These are the auto-attacking powers the player can unlock and upgrade

const AbilityData = {
    // Starting ability - always equipped
    starfall: {
        id: 'starfall',
        name: 'Starfall of February',
        description: 'Mystical stars fall around you, striking nearby foes',
        // Personalize: Name after a meaningful date (first meeting, first date, etc.)

        type: 'projectile',
        damage: 10,
        projectileSpeed: 250,
        cooldown: 2000, // milliseconds
        range: 400,
        count: 1, // number of projectiles
        pierce: 1, // how many enemies it can hit
        color: 0x88CCFF,

        upgrades: [
            { level: 1, stat: 'damage', value: 15, description: '+5 damage' },
            { level: 2, stat: 'count', value: 2, description: 'Fires 2 stars' },
            { level: 3, stat: 'cooldown', value: 1500, description: 'Faster attacks' },
            { level: 4, stat: 'pierce', value: 2, description: 'Pierces 2 enemies' },
            { level: 5, stat: 'damage', value: 25, description: '+10 damage' },
        ],
    },

    enchantedBrew: {
        id: 'enchantedBrew',
        name: 'Enchanted Brew',
        description: 'Swirling magical essence orbits you, damaging all who approach',
        // Personalize: Name after coffee shop meetings, favorite drinks together, etc.

        type: 'orbit',
        damage: 5,
        damageInterval: 500, // damage tick rate
        radius: 100,
        rotationSpeed: 2, // radians per second
        count: 2, // number of orbiting projectiles
        color: 0xFF8844,

        unlockLevel: 2,

        upgrades: [
            { level: 1, stat: 'count', value: 3, description: '3 orbs' },
            { level: 2, stat: 'damage', value: 8, description: '+3 damage' },
            { level: 3, stat: 'radius', value: 130, description: 'Larger orbit' },
            { level: 4, stat: 'count', value: 4, description: '4 orbs' },
            { level: 5, stat: 'damage', value: 15, description: '+7 damage' },
        ],
    },

    arcaneLight: {
        id: 'arcaneLight',
        name: "Cinema's Arcane Light",
        description: 'Beams of pure light seek out and destroy your enemies',
        // Personalize: Name after movie nights, favorite films, shared experiences

        type: 'seeking',
        damage: 20,
        projectileSpeed: 300,
        cooldown: 3000,
        range: 600,
        count: 1,
        homingStrength: 0.05, // how aggressively it seeks
        color: 0xFFFF44,

        unlockLevel: 4,

        upgrades: [
            { level: 1, stat: 'count', value: 2, description: 'Fires 2 beams' },
            { level: 2, stat: 'damage', value: 30, description: '+10 damage' },
            { level: 3, stat: 'cooldown', value: 2000, description: 'Faster attacks' },
            { level: 4, stat: 'count', value: 3, description: 'Fires 3 beams' },
            { level: 5, stat: 'damage', value: 50, description: '+20 damage' },
        ],
    },

    eternalBond: {
        id: 'eternalBond',
        name: 'The Eternal Bond',
        description: 'The ultimate power - devastating lightning strikes all nearby foes',
        // Personalize: The most powerful ability representing your bond

        type: 'area',
        damage: 40,
        cooldown: 5000,
        radius: 200,
        color: 0xFF44FF,

        unlockLevel: 7,

        upgrades: [
            { level: 1, stat: 'damage', value: 55, description: '+15 damage' },
            { level: 2, stat: 'radius', value: 250, description: 'Larger area' },
            { level: 3, stat: 'cooldown', value: 4000, description: 'Faster attacks' },
            { level: 4, stat: 'damage', value: 75, description: '+20 damage' },
            { level: 5, stat: 'radius', value: 300, description: 'Massive area' },
        ],
    },
};

// Divine Blessings - passive upgrades that improve the hero
const BlessingData = {
    vitality: {
        id: 'vitality',
        name: 'Blessing of Vitality',
        description: 'Increases maximum health',
        type: 'passive',
        stat: 'maxHealth',
        value: 20,
    },

    swiftness: {
        id: 'swiftness',
        name: 'Gift of Swiftness',
        description: 'Move faster across the battlefield',
        type: 'passive',
        stat: 'speed',
        value: 30,
    },

    fortitude: {
        id: 'fortitude',
        name: 'Ward of Fortitude',
        description: 'Regenerate health over time',
        type: 'passive',
        stat: 'healthRegen',
        value: 0.5,
    },

    magnetism: {
        id: 'magnetism',
        name: 'Charm of Magnetism',
        description: 'XP crystals are drawn to you from farther away',
        type: 'passive',
        stat: 'magnetRange',
        value: 40,
    },
};
