// Upgrade Manager - Generates upgrade choices for level up
class UpgradeManager {
    constructor(scene) {
        this.scene = scene;
    }

    generateUpgradeChoices(player, count = 3) {
        const choices = [];
        const available = [];

        // Check for new abilities to unlock
        Object.keys(AbilityData).forEach(abilityId => {
            const abilityData = AbilityData[abilityId];
            const hasAbility = player.abilities.some(a => a.abilityId === abilityId);

            // Check if player can unlock this ability
            const unlockLevel = abilityData.unlockLevel || 1;
            if (!hasAbility && player.level >= unlockLevel) {
                available.push({
                    type: 'unlock',
                    abilityId: abilityId,
                    name: abilityData.name,
                    description: abilityData.description,
                    icon: '✨', // New ability
                });
            }
        });

        // Check for ability upgrades
        player.abilities.forEach(ability => {
            const currentLevel = player.abilityLevels[ability.abilityId] || 0;
            const abilityData = AbilityData[ability.abilityId];

            if (abilityData.upgrades && abilityData.upgrades[currentLevel]) {
                const upgrade = abilityData.upgrades[currentLevel];
                available.push({
                    type: 'upgrade',
                    abilityId: ability.abilityId,
                    name: abilityData.name + ' (Level ' + (currentLevel + 1) + ')',
                    description: upgrade.description,
                    icon: '⬆️', // Upgrade
                });
            }
        });

        // Add blessings (passive upgrades)
        Object.keys(BlessingData).forEach(blessingId => {
            const blessing = BlessingData[blessingId];
            available.push({
                type: 'blessing',
                blessingId: blessingId,
                name: blessing.name,
                description: blessing.description,
                icon: '🌟', // Blessing
            });
        });

        // Shuffle and pick random choices
        Phaser.Utils.Array.Shuffle(available);

        for (let i = 0; i < Math.min(count, available.length); i++) {
            choices.push(available[i]);
        }

        // If not enough choices, add generic healing
        while (choices.length < count) {
            choices.push({
                type: 'heal',
                name: 'Divine Healing',
                description: 'Fully restore health and gain +10 max health',
                icon: '❤️',
            });
        }

        return choices;
    }

    applyUpgrade(player, upgrade) {
        switch (upgrade.type) {
            case 'unlock':
                player.unlockAbility(upgrade.abilityId);
                break;

            case 'upgrade':
                player.upgradeAbility(upgrade.abilityId);
                break;

            case 'blessing':
                player.applyBlessing(upgrade.blessingId);
                break;

            case 'heal':
                player.maxHealth += 10;
                player.currentHealth = player.maxHealth;
                break;
        }
    }
}
