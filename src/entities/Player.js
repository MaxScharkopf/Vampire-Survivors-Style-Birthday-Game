// Player - The Hero
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Stats
        this.maxHealth = GameConfig.player.baseHealth;
        this.currentHealth = this.maxHealth;
        this.maxMana = GameConfig.player.baseMana;
        this.currentMana = this.maxMana;
        this.moveSpeed = GameConfig.player.speed;
        this.healthRegen = GameConfig.player.healthRegen;
        this.manaRegen = GameConfig.player.manaRegen;
        this.magnetRange = GameConfig.xp.magnetRange;

        // Leveling
        this.level = 1;
        this.currentXP = 0;
        this.xpNeeded = GameConfig.xp.baseXPNeeded;

        // Abilities
        this.abilities = [];
        this.abilityLevels = {};

        // Visual setup
        this.createPlayerSprite(scene);

        // Physics setup
        this.setCircle(16);
        this.setCollideWorldBounds(true);
        this.setDrag(800);

        // Invulnerability frames
        this.invulnerable = false;
        this.invulnerabilityTime = 0;
        this.damageFlashTimer = 0;

        // Input
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasd = {
            up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };

        // Start with the first ability
        this.unlockAbility('starfall');
    }

    createPlayerSprite(scene) {
        const texKey = 'player';
        if (!scene.textures.exists(texKey)) {
            const graphics = scene.add.graphics();

            // Hero body (golden)
            graphics.fillStyle(GameConfig.colors.gold, 1);
            graphics.fillCircle(32, 32, 28);

            // Cape/cloak (darker)
            graphics.fillStyle(GameConfig.colors.darkGold, 1);
            graphics.fillCircle(32, 36, 24);

            // Head highlight
            graphics.fillStyle(0xFFFFAA, 1);
            graphics.fillCircle(28, 28, 12);

            // Eyes
            graphics.fillStyle(0x000088, 1);
            graphics.fillCircle(26, 26, 3);
            graphics.fillCircle(34, 26, 3);

            // Crown/helm
            graphics.fillStyle(0xFFD700, 1);
            graphics.fillRect(24, 18, 16, 6);
            graphics.fillTriangle(32, 14, 28, 18, 36, 18);

            graphics.generateTexture(texKey, 64, 64);
            graphics.destroy();
        }

        this.setTexture(texKey);
        this.setDisplaySize(48, 48);
    }

    update(time, delta) {
        if (!this.active) return;

        // Movement
        this.handleMovement();

        // Update abilities
        this.updateAbilities(time, delta);

        // Regeneration
        const deltaSeconds = delta / 1000;
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + this.healthRegen * deltaSeconds);
        this.currentMana = Math.min(this.maxMana, this.currentMana + this.manaRegen * deltaSeconds);

        // Invulnerability
        if (this.invulnerable) {
            this.invulnerabilityTime -= delta;
            if (this.invulnerabilityTime <= 0) {
                this.invulnerable = false;
                this.clearTint();
            } else {
                // Flash effect
                this.setAlpha(Math.sin(time * 0.02) > 0 ? 1 : 0.5);
            }
        } else {
            this.setAlpha(1);
        }

        // Damage flash
        if (this.damageFlashTimer > 0) {
            this.damageFlashTimer -= delta;
            if (this.damageFlashTimer <= 0) {
                this.clearTint();
            }
        }
    }

    handleMovement() {
        const speed = this.moveSpeed;
        let velocityX = 0;
        let velocityY = 0;

        // Check WASD and Arrow keys
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            velocityX = -speed;
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            velocityX = speed;
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            velocityY = -speed;
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            velocityY = speed;
        }

        // Normalize diagonal movement
        if (velocityX !== 0 && velocityY !== 0) {
            velocityX *= 0.707;
            velocityY *= 0.707;
        }

        this.setVelocity(velocityX, velocityY);

        // Rotation to face movement direction
        if (velocityX !== 0 || velocityY !== 0) {
            const angle = Math.atan2(velocityY, velocityX);
            this.setRotation(angle + Math.PI / 2);
        }
    }

    updateAbilities(time, delta) {
        this.abilities.forEach(ability => {
            ability.update(time, delta);
        });
    }

    unlockAbility(abilityId) {
        const abilityData = AbilityData[abilityId];
        if (!abilityData) return;

        // Check if already have this ability
        const existing = this.abilities.find(a => a.abilityId === abilityId);
        if (existing) {
            this.upgradeAbility(abilityId);
            return;
        }

        // Create new ability
        const ability = new Ability(this.scene, this, abilityData);
        this.abilities.push(ability);
        this.abilityLevels[abilityId] = 0;
    }

    upgradeAbility(abilityId) {
        const ability = this.abilities.find(a => a.abilityId === abilityId);
        if (!ability) return;

        this.abilityLevels[abilityId] = (this.abilityLevels[abilityId] || 0) + 1;
        ability.upgrade(this.abilityLevels[abilityId]);
    }

    applyBlessing(blessingId) {
        const blessing = BlessingData[blessingId];
        if (!blessing) return;

        switch (blessing.stat) {
            case 'maxHealth':
                this.maxHealth += blessing.value;
                this.currentHealth += blessing.value;
                break;
            case 'speed':
                this.moveSpeed += blessing.value;
                break;
            case 'healthRegen':
                this.healthRegen += blessing.value;
                break;
            case 'magnetRange':
                this.magnetRange += blessing.value;
                break;
        }
    }

    gainXP(amount) {
        this.currentXP += amount;

        // Level up check
        while (this.currentXP >= this.xpNeeded) {
            this.levelUp();
        }
    }

    levelUp() {
        this.currentXP -= this.xpNeeded;
        this.level++;
        this.xpNeeded = Math.floor(GameConfig.xp.baseXPNeeded * Math.pow(GameConfig.xp.xpScaling, this.level - 1));

        // Heal on level up
        this.currentHealth = this.maxHealth;

        // Trigger level up scene
        this.scene.scene.pause('GameScene');
        this.scene.scene.launch('LevelUpScene', {
            player: this,
            level: this.level,
        });
    }

    takeDamage(amount) {
        if (this.invulnerable) return;

        this.currentHealth -= amount;
        this.damageFlashTimer = 200;
        this.setTint(0xFF4444);

        // Damage number
        const text = this.scene.add.text(this.x, this.y - 40, '-' + Math.floor(amount), {
            fontSize: '20px',
            fontFamily: 'Georgia',
            color: '#FF4444',
            stroke: '#000000',
            strokeThickness: 4,
        });
        text.setOrigin(0.5);
        text.setDepth(100);

        this.scene.tweens.add({
            targets: text,
            y: text.y - 40,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => text.destroy(),
        });

        // Brief invulnerability
        this.invulnerable = true;
        this.invulnerabilityTime = 500;

        // Check death
        if (this.currentHealth <= 0) {
            this.die();
        }
    }

    die() {
        this.active = false;
        this.setVisible(false);

        // Death effect
        this.scene.add.particles(this.x, this.y, 'player', {
            speed: { min: 100, max: 200 },
            scale: { start: 0.5, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 1000,
            quantity: 20,
        });

        // Game over
        this.scene.time.delayedCall(1000, () => {
            this.scene.scene.start('GameOverScene');
        });
    }
}
