// Game Scene - Main gameplay
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.currentChapter = data.chapterId || 0;
        this.continueGame = data.continue || false;
        this.playerData = data.playerData || null;
    }

    create() {
        const chapterConfig = GameConfig.chapters[this.currentChapter];

        // Create background
        this.createBackground(chapterConfig.background);

        // Create world bounds (large play area)
        this.physics.world.setBounds(-2000, -2000, 4000, 4000);

        // Create groups
        this.enemies = this.physics.add.group();
        this.xpCrystals = this.physics.add.group();

        // Create player - always create fresh but restore stats if continuing
        this.player = new Player(this, 640, 360);

        // Restore player stats if continuing from previous chapter
        if (this.continueGame && this.playerData) {
            this.restorePlayerStats(this.playerData);
        }

        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        // Create spawn manager
        this.spawnManager = new SpawnManager(this, this.currentChapter);

        // Create UI
        this.createUI();

        // Setup collisions
        this.setupCollisions();

        // Chapter timer
        this.chapterTime = 0;
        this.chapterDuration = chapterConfig.duration;

        // Pause menu
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            // TODO: Add pause menu scene
        });
    }

    createBackground(bgType) {
        // Create background based on chapter theme
        const colors = {
            tavern: { top: 0x4a3728, bottom: 0x2d1f1a },
            forest: { top: 0x1a3d1a, bottom: 0x0d2a0d },
            cavern: { top: 0x1a1a2e, bottom: 0x0d0d1a },
            garden: { top: 0x3d5a4a, bottom: 0x2d3d2a },
        };

        const colorSet = colors[bgType] || colors.tavern;

        const bg = this.add.graphics();
        bg.fillGradientStyle(colorSet.top, colorSet.top, colorSet.bottom, colorSet.bottom, 1);
        bg.fillRect(-2000, -2000, 4000, 4000);
        bg.setDepth(-10);
        bg.setScrollFactor(0.5); // Parallax effect

        // Add atmospheric elements
        this.createAtmosphere(bgType);
    }

    createAtmosphere(bgType) {
        // Environmental particles based on chapter
        const particleConfigs = {
            tavern: { count: 30, color: 0xFFAA66, size: 2 }, // Fireflies
            forest: { count: 50, color: 0x88FF88, size: 3 }, // Leaves
            cavern: { count: 20, color: 0x6666FF, size: 2 }, // Crystal glints
            garden: { count: 40, color: 0xFF88FF, size: 3 }, // Petals
        };

        const config = particleConfigs[bgType] || particleConfigs.tavern;

        for (let i = 0; i < config.count; i++) {
            const x = Math.random() * 4000 - 2000;
            const y = Math.random() * 4000 - 2000;

            const particle = this.add.circle(x, y, config.size, config.color, 0.4);
            particle.setScrollFactor(0.7);
            particle.setDepth(-5);

            this.tweens.add({
                targets: particle,
                y: y + 50,
                alpha: 0.1,
                duration: 3000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
            });
        }
    }

    createUI() {
        const width = this.cameras.main.width;

        // Chapter title display
        const chapterConfig = GameConfig.chapters[this.currentChapter];
        const chapterTitle = this.add.text(width / 2, 40, chapterConfig.name, {
            fontSize: '28px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 5,
        });
        chapterTitle.setOrigin(0.5);
        chapterTitle.setScrollFactor(0);
        chapterTitle.setDepth(100);

        // Fade out chapter title after 3 seconds
        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: chapterTitle,
                alpha: 0,
                duration: 1000,
                onComplete: () => chapterTitle.destroy(),
            });
        });

        // Health bar
        this.healthBarBg = this.add.graphics();
        this.healthBarBg.setScrollFactor(0);
        this.healthBarBg.setDepth(100);

        this.healthBar = this.add.graphics();
        this.healthBar.setScrollFactor(0);
        this.healthBar.setDepth(101);

        // XP bar
        this.xpBarBg = this.add.graphics();
        this.xpBarBg.setScrollFactor(0);
        this.xpBarBg.setDepth(100);

        this.xpBar = this.add.graphics();
        this.xpBar.setScrollFactor(0);
        this.xpBar.setDepth(101);

        // Level text
        this.levelText = this.add.text(20, 60, 'Level 1', {
            fontSize: '20px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 4,
        });
        this.levelText.setScrollFactor(0);
        this.levelText.setDepth(102);

        // Timer
        this.timerText = this.add.text(width - 20, 20, '00:00', {
            fontSize: '24px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 4,
        });
        this.timerText.setOrigin(1, 0);
        this.timerText.setScrollFactor(0);
        this.timerText.setDepth(102);

        // Enemy counter (optional debug info)
        this.enemyCountText = this.add.text(width - 20, 60, 'Enemies: 0', {
            fontSize: '16px',
            fontFamily: 'Georgia',
            color: '#CCCCCC',
            stroke: '#000000',
            strokeThickness: 3,
        });
        this.enemyCountText.setOrigin(1, 0);
        this.enemyCountText.setScrollFactor(0);
        this.enemyCountText.setDepth(102);
    }

    setupCollisions() {
        // Player vs enemies (take damage)
        this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
            if (player.active && enemy.active) {
                player.takeDamage(enemy.damage * 0.1); // Damage per frame
            }
        });

        // Player vs XP crystals
        this.physics.add.overlap(this.player, this.xpCrystals, (player, crystal) => {
            if (player.active && crystal.active) {
                player.gainXP(crystal.xpValue);
                crystal.collect();
            }
        });

        // Set up collision checking in update loop (but not creating new colliders)
        this.collisionCheckEnabled = true;
    }

    checkAbilityCollisions() {
        // Manual collision checking for abilities
        // This is more efficient than creating hundreds of collision handlers
        this.player.abilities.forEach(ability => {
            if (ability.projectiles) {
                const projectiles = ability.projectiles.getChildren();
                const enemies = this.enemies.getChildren();

                projectiles.forEach(projectile => {
                    if (!projectile.active) return;

                    enemies.forEach(enemy => {
                        if (!enemy.active) return;

                        // Check distance for collision
                        const distance = Phaser.Math.Distance.Between(
                            projectile.x, projectile.y,
                            enemy.x, enemy.y
                        );

                        // Collision radius (projectile + enemy)
                        const collisionDist = 16 + (enemy.displayWidth / 2);

                        if (distance < collisionDist) {
                            enemy.takeDamage(projectile.damage);
                            projectile.hit();
                        }
                    });
                });
            }
        });
    }

    update(time, delta) {
        if (!this.player || !this.player.active) return;

        // Update player
        this.player.update(time, delta);

        // Update enemies
        this.enemies.getChildren().forEach(enemy => {
            if (enemy.active) {
                enemy.update(this.player);
            }
        });

        // Update XP crystals
        this.xpCrystals.getChildren().forEach(crystal => {
            if (crystal.active) {
                crystal.update(time, this.player);
            }
        });

        // Check ability collisions manually
        this.checkAbilityCollisions();

        // Update spawn manager
        this.spawnManager.update(delta);

        // Update UI
        this.updateUI(delta);

        // Update chapter timer
        this.chapterTime += delta / 1000;
        if (this.chapterTime >= this.chapterDuration) {
            this.completeChapter();
        }
    }

    updateUI(delta) {
        // Health bar
        const healthBarWidth = 200;
        const healthBarHeight = 20;
        const healthBarX = 20;
        const healthBarY = 20;

        this.healthBarBg.clear();
        this.healthBarBg.fillStyle(GameConfig.colors.healthBg, 0.8);
        this.healthBarBg.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

        this.healthBar.clear();
        const healthPercent = this.player.currentHealth / this.player.maxHealth;
        this.healthBar.fillStyle(GameConfig.colors.health, 1);
        this.healthBar.fillRect(healthBarX, healthBarY, healthBarWidth * healthPercent, healthBarHeight);

        // XP bar
        const xpBarWidth = 200;
        const xpBarHeight = 10;
        const xpBarX = 20;
        const xpBarY = 45;

        this.xpBarBg.clear();
        this.xpBarBg.fillStyle(GameConfig.colors.xpBg, 0.8);
        this.xpBarBg.fillRect(xpBarX, xpBarY, xpBarWidth, xpBarHeight);

        this.xpBar.clear();
        const xpPercent = this.player.currentXP / this.player.xpNeeded;
        this.xpBar.fillStyle(GameConfig.colors.xp, 1);
        this.xpBar.fillRect(xpBarX, xpBarY, xpBarWidth * xpPercent, xpBarHeight);

        // Level text
        this.levelText.setText('Level ' + this.player.level);

        // Timer
        const minutes = Math.floor(this.chapterTime / 60);
        const seconds = Math.floor(this.chapterTime % 60);
        this.timerText.setText(
            String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0')
        );

        // Enemy count
        const activeEnemies = this.enemies.getChildren().filter(e => e.active).length;
        this.enemyCountText.setText('Enemies: ' + activeEnemies);
    }

    completeChapter() {
        // Prevent multiple calls
        if (this.chapterCompleted) return;
        this.chapterCompleted = true;

        // Celebrate!
        this.createVictoryEffect();

        // Save player stats
        const playerData = this.savePlayerStats();

        // Move to next chapter or victory
        this.time.delayedCall(2000, () => {
            if (this.currentChapter < GameConfig.chapters.length - 1) {
                // Next chapter
                this.scene.start('StoryScrollScene', {
                    scroll: this.currentChapter,
                    nextScene: 'GameScene',
                    chapterId: this.currentChapter + 1,
                    playerData: playerData, // Carry over player stats
                });
            } else {
                // Victory!
                this.scene.start('VictoryScene');
            }
        });
    }

    savePlayerStats() {
        // Save all important player stats to pass between scenes
        return {
            level: this.player.level,
            currentXP: this.player.currentXP,
            xpNeeded: this.player.xpNeeded,
            maxHealth: this.player.maxHealth,
            currentHealth: this.player.currentHealth,
            maxMana: this.player.maxMana,
            currentMana: this.player.currentMana,
            moveSpeed: this.player.moveSpeed,
            healthRegen: this.player.healthRegen,
            manaRegen: this.player.manaRegen,
            magnetRange: this.player.magnetRange,
            abilities: this.player.abilities.map(ability => ({
                abilityId: ability.abilityId,
                currentLevel: ability.currentLevel,
            })),
            abilityLevels: { ...this.player.abilityLevels },
        };
    }

    restorePlayerStats(data) {
        // Restore player stats from saved data
        this.player.level = data.level;
        this.player.currentXP = data.currentXP;
        this.player.xpNeeded = data.xpNeeded;
        this.player.maxHealth = data.maxHealth;
        this.player.currentHealth = data.currentHealth;
        this.player.maxMana = data.maxMana;
        this.player.currentMana = data.currentMana;
        this.player.moveSpeed = data.moveSpeed;
        this.player.healthRegen = data.healthRegen;
        this.player.manaRegen = data.manaRegen;
        this.player.magnetRange = data.magnetRange;
        this.player.abilityLevels = { ...data.abilityLevels };

        // Restore abilities
        // Clear starting ability
        this.player.abilities = [];

        // Re-unlock all abilities with their levels
        data.abilities.forEach(abilityData => {
            this.player.unlockAbility(abilityData.abilityId);

            // Upgrade to saved level
            for (let i = 0; i < abilityData.currentLevel; i++) {
                this.player.upgradeAbility(abilityData.abilityId);
            }
        });
    }

    createVictoryEffect() {
        const centerX = this.cameras.main.scrollX + this.cameras.main.width / 2;
        const centerY = this.cameras.main.scrollY + this.cameras.main.height / 2;

        // Big text
        const text = this.add.text(centerX, centerY, 'CHAPTER COMPLETE!', {
            fontSize: '64px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 8,
        });
        text.setOrigin(0.5);
        text.setScrollFactor(0);
        text.setDepth(200);
        text.setAlpha(0);

        this.tweens.add({
            targets: text,
            alpha: 1,
            scale: 1.2,
            duration: 500,
            ease: 'Back.easeOut',
        });

        // Victory particles
        this.add.particles(centerX, centerY, 'xpCrystal', {
            speed: { min: 200, max: 400 },
            scale: { start: 1, end: 0 },
            tint: [GameConfig.colors.gold, 0xFFFFFF, GameConfig.colors.xp],
            lifespan: 2000,
            quantity: 50,
        }).setScrollFactor(0).setDepth(199);
    }
}
