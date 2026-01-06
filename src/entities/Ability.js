// Ability - Magical attacks that auto-fire
class Ability {
    constructor(scene, player, abilityData) {
        this.scene = scene;
        this.player = player;
        this.abilityId = abilityData.id;
        this.data = JSON.parse(JSON.stringify(abilityData)); // Deep copy
        this.type = abilityData.type;

        this.cooldownTimer = 0;
        this.currentLevel = 0;

        // Create projectile group if needed
        if (this.type === 'projectile' || this.type === 'seeking') {
            this.projectiles = scene.physics.add.group({
                classType: Projectile,
                maxSize: 50,
                runChildUpdate: true,
            });
        }

        // Orbiting projectiles
        if (this.type === 'orbit') {
            this.orbitingProjectiles = [];
            this.createOrbitingProjectiles();
        }
    }

    update(time, delta) {
        this.cooldownTimer -= delta;

        if (this.cooldownTimer <= 0) {
            this.fire();
            this.cooldownTimer = this.data.cooldown;
        }

        // Update orbiting projectiles
        if (this.type === 'orbit') {
            this.updateOrbitingProjectiles(time);
        }
    }

    fire() {
        switch (this.type) {
            case 'projectile':
                this.fireProjectiles();
                break;
            case 'seeking':
                this.fireSeekingProjectiles();
                break;
            case 'area':
                this.fireAreaAttack();
                break;
            case 'orbit':
                // Orbiting projectiles are always active
                break;
        }
    }

    fireProjectiles() {
        const count = this.data.count;
        const angleStep = (Math.PI * 2) / count;
        const startAngle = Math.random() * Math.PI * 2;

        for (let i = 0; i < count; i++) {
            const angle = startAngle + angleStep * i;
            const projectile = this.projectiles.get(this.player.x, this.player.y, this.data);

            if (projectile) {
                projectile.fire(angle);

                // Visual effect
                this.createMuzzleFlash(angle);
            }
        }
    }

    fireSeekingProjectiles() {
        const count = this.data.count;
        const enemies = this.scene.enemies.getChildren().filter(e => e.active);

        if (enemies.length === 0) {
            // Fire randomly if no enemies
            this.fireProjectiles();
            return;
        }

        // Sort enemies by distance
        enemies.sort((a, b) => {
            const distA = Phaser.Math.Distance.Between(this.player.x, this.player.y, a.x, a.y);
            const distB = Phaser.Math.Distance.Between(this.player.x, this.player.y, b.x, b.y);
            return distA - distB;
        });

        // Fire at closest enemies
        for (let i = 0; i < Math.min(count, enemies.length); i++) {
            const target = enemies[i];
            const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, target.x, target.y);
            const projectile = this.projectiles.get(this.player.x, this.player.y, this.data);

            if (projectile) {
                projectile.fire(angle, target);
                this.createMuzzleFlash(angle);
            }
        }
    }

    fireAreaAttack() {
        const radius = this.data.radius;

        // Visual effect - expanding circle
        const circle = this.scene.add.circle(this.player.x, this.player.y, 0, this.data.color, 0.6);
        circle.setDepth(5);

        this.scene.tweens.add({
            targets: circle,
            radius: radius,
            alpha: 0,
            duration: 300,
            ease: 'Power2',
            onComplete: () => circle.destroy(),
        });

        // Damage all enemies in range
        this.scene.enemies.getChildren().forEach(enemy => {
            if (!enemy.active) return;

            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
            if (distance <= radius) {
                enemy.takeDamage(this.data.damage);
            }
        });

        // Particle burst
        this.scene.add.particles(this.player.x, this.player.y, 'xpCrystal', {
            speed: { min: 100, max: 200 },
            scale: { start: 1, end: 0 },
            tint: this.data.color,
            lifespan: 500,
            quantity: 20,
        });
    }

    createOrbitingProjectiles() {
        const count = this.data.count;
        const angleStep = (Math.PI * 2) / count;

        this.orbitingProjectiles = [];

        for (let i = 0; i < count; i++) {
            const angle = angleStep * i;
            const sprite = this.scene.add.circle(0, 0, 10, this.data.color);
            sprite.setDepth(5);
            sprite.angle = angle;
            sprite.lastDamageTime = {};

            this.orbitingProjectiles.push(sprite);
        }
    }

    updateOrbitingProjectiles(time) {
        const count = this.data.count;
        const radius = this.data.radius;
        const rotationSpeed = this.data.rotationSpeed;

        // Ensure we have the right number of orbs
        while (this.orbitingProjectiles.length < count) {
            const angle = (Math.PI * 2 / count) * this.orbitingProjectiles.length;
            const sprite = this.scene.add.circle(0, 0, 10, this.data.color);
            sprite.setDepth(5);
            sprite.angle = angle;
            sprite.lastDamageTime = {};
            this.orbitingProjectiles.push(sprite);
        }

        // Remove excess orbs
        while (this.orbitingProjectiles.length > count) {
            const sprite = this.orbitingProjectiles.pop();
            sprite.destroy();
        }

        // Update positions
        this.orbitingProjectiles.forEach(sprite => {
            sprite.angle += rotationSpeed * 0.016; // Approximate delta time
            const x = this.player.x + Math.cos(sprite.angle) * radius;
            const y = this.player.y + Math.sin(sprite.angle) * radius;
            sprite.setPosition(x, y);

            // Check collision with enemies
            this.scene.enemies.getChildren().forEach(enemy => {
                if (!enemy.active) return;

                const distance = Phaser.Math.Distance.Between(sprite.x, sprite.y, enemy.x, enemy.y);
                if (distance < 20) {
                    // Check damage interval
                    const lastDamage = sprite.lastDamageTime[enemy] || 0;
                    if (time - lastDamage > this.data.damageInterval) {
                        enemy.takeDamage(this.data.damage);
                        sprite.lastDamageTime[enemy] = time;
                    }
                }
            });
        });
    }

    createMuzzleFlash(angle) {
        const distance = 30;
        const x = this.player.x + Math.cos(angle) * distance;
        const y = this.player.y + Math.sin(angle) * distance;

        const flash = this.scene.add.circle(x, y, 8, this.data.color, 0.8);
        flash.setDepth(10);

        this.scene.tweens.add({
            targets: flash,
            scale: 1.5,
            alpha: 0,
            duration: 150,
            ease: 'Power2',
            onComplete: () => flash.destroy(),
        });
    }

    upgrade(level) {
        this.currentLevel = level;
        const upgrades = this.data.upgrades;

        if (upgrades && upgrades[level - 1]) {
            const upgrade = upgrades[level - 1];
            this.data[upgrade.stat] = upgrade.value;

            // Show upgrade notification
            this.showUpgradeNotification(upgrade.description);
        }
    }

    showUpgradeNotification(description) {
        const text = this.scene.add.text(this.player.x, this.player.y - 60, description, {
            fontSize: '18px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 4,
        });
        text.setOrigin(0.5);
        text.setDepth(100);

        this.scene.tweens.add({
            targets: text,
            y: text.y - 30,
            alpha: 0,
            duration: 1500,
            ease: 'Power2',
            onComplete: () => text.destroy(),
        });
    }

    destroy() {
        if (this.projectiles) {
            this.projectiles.destroy(true);
        }
        if (this.orbitingProjectiles) {
            this.orbitingProjectiles.forEach(sprite => sprite.destroy());
        }
    }
}
