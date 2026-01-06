// XP Crystal - dropped by enemies
class XPCrystal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, value = 1) {
        super(scene, x, y);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.xpValue = value;
        this.magnetized = false;

        // Create crystal graphic
        this.createCrystalTexture(scene);

        // Physics setup
        this.setCircle(8);
        this.setDrag(100);

        // Float animation
        this.floatOffset = Math.random() * Math.PI * 2;
        this.baseY = y;

        // Sparkle effect
        this.sparkleTimer = 0;
    }

    createCrystalTexture(scene) {
        const key = 'xpCrystal';
        if (!scene.textures.exists(key)) {
            const graphics = scene.add.graphics();
            graphics.fillStyle(GameConfig.colors.xp, 1);
            graphics.fillCircle(8, 8, 6);
            graphics.fillStyle(0xFFFFFF, 0.6);
            graphics.fillCircle(6, 6, 3);
            graphics.generateTexture(key, 16, 16);
            graphics.destroy();
        }
        this.setTexture(key);
    }

    update(time, player) {
        if (!this.active) return;

        // Floating animation
        this.floatOffset += 0.05;
        this.y = this.baseY + Math.sin(this.floatOffset) * 3;

        // Sparkle effect
        this.sparkleTimer += 0.1;
        const scale = 1 + Math.sin(this.sparkleTimer) * 0.1;
        this.setScale(scale);

        // Magnetic pull towards player
        if (player && player.active) {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
            const magnetRange = player.magnetRange || GameConfig.xp.magnetRange;

            if (distance < magnetRange) {
                this.magnetized = true;
                const speed = 300;
                const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
                this.setVelocity(
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                );
            }
        }
    }

    collect() {
        // Mark as inactive immediately
        this.setActive(false);
        this.setVisible(false);

        // Particle effect on collection with auto-cleanup
        const particles = this.scene.add.particles(this.x, this.y, 'xpCrystal', {
            speed: { min: 20, max: 50 },
            scale: { start: 0.5, end: 0 },
            lifespan: 300,
            quantity: 5,
        });

        // Destroy particle emitter after particles finish
        this.scene.time.delayedCall(400, () => {
            if (particles) {
                particles.destroy();
            }
        });

        this.destroy();
    }
}
