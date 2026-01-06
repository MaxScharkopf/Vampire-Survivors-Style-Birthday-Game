// Menu Scene - Title screen and game start
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Background
        this.createBackground();

        // Title
        const title = this.add.text(width / 2, height / 3, StoryData.gameTitle, {
            fontSize: '48px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 6,
            align: 'center',
        });
        title.setOrigin(0.5);

        // Subtitle
        const subtitle = this.add.text(width / 2, height / 3 + 60, StoryData.subtitle, {
            fontSize: '24px',
            fontFamily: 'Georgia',
            color: '#CCCCCC',
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 4,
        });
        subtitle.setOrigin(0.5);

        // Decorative border
        const border = this.add.graphics();
        border.lineStyle(3, GameConfig.colors.gold, 1);
        border.strokeRect(width / 2 - 250, height / 3 - 60, 500, 140);

        // Start button
        const buttonY = height / 2 + 80;
        this.createButton(width / 2, buttonY, 'Begin Quest', () => {
            this.scene.start('StoryScrollScene', {
                scroll: 'opening',
                nextScene: 'GameScene',
                chapterId: 0,
            });
        });

        // Instructions
        const instructions = this.add.text(width / 2, height - 80,
            'WASD or Arrow Keys to Move • Auto-attacking abilities\nSurvive and level up through 4 epic chapters',
            {
                fontSize: '16px',
                fontFamily: 'Georgia',
                color: '#AAAAAA',
                align: 'center',
            }
        );
        instructions.setOrigin(0.5);

        // Animated particles in background
        this.createMenuParticles();

        // Pulse animation on title
        this.tweens.add({
            targets: title,
            scale: 1.05,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });
    }

    createBackground() {
        // Gradient background
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x1a0f1f, 0x1a0f1f, 0x2d1b3d, 0x2d1b3d, 1);
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        // Stars
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * this.cameras.main.width;
            const y = Math.random() * this.cameras.main.height;
            const size = Math.random() * 2;
            const alpha = Math.random() * 0.8 + 0.2;

            const star = this.add.circle(x, y, size, 0xFFFFFF, alpha);

            // Twinkle animation
            this.tweens.add({
                targets: star,
                alpha: Math.random() * 0.3,
                duration: 1000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
            });
        }
    }

    createMenuParticles() {
        // Floating magical particles
        for (let i = 0; i < 20; i++) {
            this.time.delayedCall(i * 200, () => {
                const x = Math.random() * this.cameras.main.width;
                const y = this.cameras.main.height + 50;

                const particle = this.add.circle(x, y, 3, GameConfig.colors.gold, 0.6);

                this.tweens.add({
                    targets: particle,
                    y: -50,
                    x: x + (Math.random() - 0.5) * 100,
                    alpha: 0,
                    duration: 5000 + Math.random() * 3000,
                    ease: 'Sine.easeInOut',
                    onComplete: () => particle.destroy(),
                });
            });
        }
    }

    createButton(x, y, text, onClick) {
        const button = this.add.container(x, y);

        // Button background
        const bg = this.add.graphics();
        bg.fillStyle(GameConfig.colors.darkGold, 1);
        bg.fillRoundedRect(-120, -25, 240, 50, 10);
        bg.lineStyle(2, GameConfig.colors.gold, 1);
        bg.strokeRoundedRect(-120, -25, 240, 50, 10);

        // Button text
        const buttonText = this.add.text(0, 0, text, {
            fontSize: '24px',
            fontFamily: 'Georgia',
            color: '#FFFFFF',
        });
        buttonText.setOrigin(0.5);

        button.add([bg, buttonText]);
        button.setSize(240, 50);
        button.setInteractive({ useHandCursor: true });

        // Hover effect
        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scale: 1.1,
                duration: 100,
            });
        });

        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scale: 1,
                duration: 100,
            });
        });

        button.on('pointerdown', () => {
            this.tweens.add({
                targets: button,
                scale: 0.95,
                duration: 50,
                yoyo: true,
                onComplete: onClick,
            });
        });

        return button;
    }
}
