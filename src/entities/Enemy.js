// Enemy class for fantasy creatures
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, enemyType) {
        super(scene, x, y);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Get enemy data
        const data = EnemyData[enemyType];
        this.enemyType = enemyType;
        this.maxHealth = data.health;
        this.currentHealth = data.health;
        this.moveSpeed = data.speed;
        this.damage = data.damage;
        this.xpValue = data.xpValue;
        this.enemyColor = data.color;

        // Apply difficulty scaling from chapter
        if (scene.currentChapter) {
            const difficulty = GameConfig.chapters[scene.currentChapter].difficulty;
            this.maxHealth *= difficulty;
            this.currentHealth = this.maxHealth;
            this.damage *= difficulty;
            this.moveSpeed *= (0.8 + difficulty * 0.2); // Speed scales less
        }

        // Visual setup
        this.createEnemySprite(scene, data);

        // Physics setup
        this.setCircle(data.size / 2);
        this.setCollideWorldBounds(false);

        // Health bar
        this.healthBar = scene.add.graphics();
        this.healthBar.setDepth(10);

        // Damage flash effect
        this.damageFlashTimer = 0;

        // AI state
        this.stunned = false;
        this.stunnedTimer = 0;
    }

    createEnemySprite(scene, data) {
        const texKey = 'enemy_' + this.enemyType;
        if (!scene.textures.exists(texKey)) {
            // Generate simple enemy sprite
            const graphics = scene.add.graphics();

            // Body
            graphics.fillStyle(data.color, 1);
            graphics.fillCircle(data.size / 2, data.size / 2, data.size / 2);

            // Eyes (simple white dots)
            graphics.fillStyle(0xFFFFFF, 1);
            const eyeOffset = data.size * 0.2;
            graphics.fillCircle(data.size / 2 - eyeOffset, data.size / 2 - eyeOffset, data.size * 0.1);
            graphics.fillCircle(data.size / 2 + eyeOffset, data.size / 2 - eyeOffset, data.size * 0.1);

            // Darker outline
            graphics.lineStyle(2, 0x000000, 0.5);
            graphics.strokeCircle(data.size / 2, data.size / 2, data.size / 2);

            graphics.generateTexture(texKey, data.size, data.size);
            graphics.destroy();
        }

        this.setTexture(texKey);
        this.setDisplaySize(data.size, data.size);
    }

    update(player) {
        // Don't update if dead, inactive, or no player
        if (!this.active || this.currentHealth <= 0 || !player || !player.active) return;

        // Update stun
        if (this.stunned) {
            this.stunnedTimer -= this.scene.game.loop.delta;
            if (this.stunnedTimer <= 0) {
                this.stunned = false;
            }
            this.setTint(0x888888);
        } else {
            // Move towards player
            const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
            this.setVelocity(
                Math.cos(angle) * this.moveSpeed,
                Math.sin(angle) * this.moveSpeed
            );
        }

        // Update damage flash
        if (this.damageFlashTimer > 0) {
            this.damageFlashTimer -= this.scene.game.loop.delta;
            if (this.damageFlashTimer <= 0) {
                this.clearTint();
            }
        }

        // Update health bar
        this.updateHealthBar();
    }

    takeDamage(amount) {
        // Don't take damage if already dead or inactive
        if (!this.active || this.currentHealth <= 0) return;

        this.currentHealth -= amount;
        this.damageFlashTimer = 100;
        this.setTint(0xFF8888);

        // Damage number popup
        this.showDamageNumber(amount);

        if (this.currentHealth <= 0) {
            this.die();
        }
    }

    showDamageNumber(amount) {
        const text = this.scene.add.text(this.x, this.y - 20, Math.floor(amount).toString(), {
            fontSize: '16px',
            fontFamily: 'Georgia',
            color: '#FFFF00',
            stroke: '#000000',
            strokeThickness: 3,
        });
        text.setOrigin(0.5);
        text.setDepth(100);

        this.scene.tweens.add({
            targets: text,
            y: text.y - 30,
            alpha: 0,
            duration: 800,
            ease: 'Power2',
            onComplete: () => text.destroy(),
        });
    }

    updateHealthBar() {
        if (!this.healthBar || !this.active || this.currentHealth <= 0) return;

        this.healthBar.clear();

        // Only show health bar if damaged
        if (this.currentHealth < this.maxHealth && this.currentHealth > 0) {
            const barWidth = 40;
            const barHeight = 4;
            const x = this.x - barWidth / 2;
            const y = this.y - this.displayHeight / 2 - 10;

            // Background
            this.healthBar.fillStyle(GameConfig.colors.healthBg, 0.8);
            this.healthBar.fillRect(x, y, barWidth, barHeight);

            // Health
            const healthWidth = (this.currentHealth / this.maxHealth) * barWidth;
            this.healthBar.fillStyle(GameConfig.colors.health, 1);
            this.healthBar.fillRect(x, y, healthWidth, barHeight);
        }
    }

    die() {
        // Mark as inactive immediately to prevent further updates
        this.setActive(false);
        this.setVisible(false);

        // Drop XP crystals
        const xpCount = Math.ceil(this.xpValue);
        for (let i = 0; i < xpCount; i++) {
            const offsetX = Phaser.Math.Between(-20, 20);
            const offsetY = Phaser.Math.Between(-20, 20);
            const crystal = new XPCrystal(this.scene, this.x + offsetX, this.y + offsetY, 1);
            this.scene.xpCrystals.add(crystal);
        }

        // Death particle effect with auto-cleanup
        const particles = this.scene.add.particles(this.x, this.y, this.texture.key, {
            speed: { min: 50, max: 150 },
            scale: { start: 1, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 600,
            quantity: 8,
            tint: this.enemyColor,
        });

        // Destroy particle emitter after particles finish
        this.scene.time.delayedCall(700, () => {
            if (particles) {
                particles.destroy();
            }
        });

        // Cleanup health bar
        if (this.healthBar) {
            this.healthBar.destroy();
            this.healthBar = null;
        }

        // Destroy the enemy sprite
        this.destroy();
    }

    destroy() {
        if (this.healthBar) {
            this.healthBar.destroy();
            this.healthBar = null;
        }
        super.destroy();
    }
}
