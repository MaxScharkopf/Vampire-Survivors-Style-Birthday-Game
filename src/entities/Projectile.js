// Projectile class for magical attacks
class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, config) {
        super(scene, x, y);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.config = config;
        this.damage = config.damage;
        this.pierce = config.pierce || 1;
        this.hitCount = 0;
        this.range = config.range || 400;
        this.startX = x;
        this.startY = y;
        this.isHoming = config.homingStrength !== undefined;
        this.homingStrength = config.homingStrength || 0;

        // Visual setup
        this.setDisplaySize(16, 16);
        this.setTint(config.color);

        // Simple circular projectile graphic
        const graphics = scene.add.graphics();
        graphics.fillStyle(config.color, 1);
        graphics.fillCircle(8, 8, 8);
        graphics.generateTexture('projectile_' + config.color, 16, 16);
        graphics.destroy();

        if (!scene.textures.exists('projectile_' + config.color)) {
            // Texture generation failed, use a simple square
            this.setTexture(null);
        } else {
            this.setTexture('projectile_' + config.color);
        }

        // Collision setup
        this.setCircle(8);
    }

    fire(angle, target = null) {
        this.target = target;
        const speed = this.config.projectileSpeed || 200;

        if (this.isHoming && target) {
            // Initial velocity towards target
            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            this.setVelocity((dx / dist) * speed, (dy / dist) * speed);
        } else {
            // Fixed direction
            this.setVelocity(
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );
        }

        this.setActive(true);
        this.setVisible(true);
    }

    update() {
        if (!this.active) return;

        // Homing behavior
        if (this.isHoming && this.target && this.target.active) {
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 0) {
                const targetVelX = (dx / dist) * this.config.projectileSpeed;
                const targetVelY = (dy / dist) * this.config.projectileSpeed;

                this.setVelocity(
                    Phaser.Math.Linear(this.body.velocity.x, targetVelX, this.homingStrength),
                    Phaser.Math.Linear(this.body.velocity.y, targetVelY, this.homingStrength)
                );
            }
        }

        // Check range
        const distance = Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y);
        if (distance > this.range) {
            this.destroy();
        }
    }

    hit() {
        this.hitCount++;
        if (this.hitCount >= this.pierce) {
            this.destroy();
        }
    }
}
