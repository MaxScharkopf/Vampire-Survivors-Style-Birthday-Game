// Victory Scene - Final celebration
class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Celebratory background
        this.createVictoryBackground();

        // Title
        const title = this.add.text(width / 2, 120, StoryData.victory.title, {
            fontSize: '52px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 6,
        });
        title.setOrigin(0.5);

        // Decorative separator
        const separator = this.add.graphics();
        separator.lineStyle(3, GameConfig.colors.gold, 1);
        separator.lineBetween(width / 2 - 300, 180, width / 2 + 300, 180);

        // Prophecy text
        const prophecy = this.add.text(width / 2, 230, StoryData.victory.prophecy, {
            fontSize: '20px',
            fontFamily: 'Georgia',
            color: '#DDDDDD',
            align: 'center',
            lineSpacing: 10,
            wordWrap: { width: width - 200 },
        });
        prophecy.setOrigin(0.5, 0);

        // Final message box
        const messageBox = this.add.graphics();
        messageBox.fillStyle(0x1a1a2e, 0.8);
        messageBox.fillRoundedRect(width / 2 - 350, 400, 700, 200, 20);
        messageBox.lineStyle(4, GameConfig.colors.gold, 1);
        messageBox.strokeRoundedRect(width / 2 - 350, 400, 700, 200, 20);

        // Final message
        const finalMessage = this.add.text(width / 2, 500, StoryData.victory.finalMessage, {
            fontSize: '18px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            align: 'center',
            lineSpacing: 8,
            wordWrap: { width: 650 },
        });
        finalMessage.setOrigin(0.5);

        // Play Again button
        this.createButton(width / 2, height - 80, 'Play Again', () => {
            this.scene.start('MenuScene');
        });

        // Continuous particle celebration
        this.createVictoryParticles();

        // Entrance animations
        const elements = [title, separator, prophecy, messageBox, finalMessage];
        elements.forEach((el, index) => {
            el.setAlpha(0);
            this.tweens.add({
                targets: el,
                alpha: 1,
                duration: 1000,
                delay: index * 300,
                ease: 'Power2',
            });
        });

        // Title pulse
        this.tweens.add({
            targets: title,
            scale: 1.05,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });

        // Fade in
        this.cameras.main.fadeIn(1000);
    }

    createVictoryBackground() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Gradient background
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a0f2f, 0x1a0f2f, 0x3d2a5d, 0x3d2a5d, 1);
        bg.fillRect(0, 0, width, height);

        // Starfield
        for (let i = 0; i < 150; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 3;
            const alpha = Math.random() * 0.8 + 0.2;

            const star = this.add.circle(x, y, size, 0xFFFFFF, alpha);

            this.tweens.add({
                targets: star,
                alpha: Math.random() * 0.3,
                duration: 1000 + Math.random() * 3000,
                yoyo: true,
                repeat: -1,
            });
        }
    }

    createVictoryParticles() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Continuous particle emitter
        this.time.addEvent({
            delay: 500,
            callback: () => {
                const x = Phaser.Math.Between(100, width - 100);
                const y = height + 50;

                // Create particle burst
                for (let i = 0; i < 10; i++) {
                    const particle = this.add.circle(x, y, 4, GameConfig.colors.gold, 0.8);

                    this.tweens.add({
                        targets: particle,
                        y: Phaser.Math.Between(0, height - 100),
                        x: x + Phaser.Math.Between(-100, 100),
                        alpha: 0,
                        scale: 0.2,
                        duration: 2000 + Math.random() * 1000,
                        ease: 'Power2',
                        onComplete: () => particle.destroy(),
                    });
                }
            },
            loop: true,
        });
    }

    createButton(x, y, text, onClick) {
        const button = this.add.container(x, y);

        const bg = this.add.graphics();
        bg.fillStyle(GameConfig.colors.darkGold, 1);
        bg.fillRoundedRect(-120, -30, 240, 60, 12);
        bg.lineStyle(3, GameConfig.colors.gold, 1);
        bg.strokeRoundedRect(-120, -30, 240, 60, 12);

        const buttonText = this.add.text(0, 0, text, {
            fontSize: '24px',
            fontFamily: 'Georgia',
            color: '#FFFFFF',
        });
        buttonText.setOrigin(0.5);

        button.add([bg, buttonText]);
        button.setSize(240, 60);
        button.setInteractive({ useHandCursor: true });
        button.setAlpha(0);

        // Entrance animation
        this.tweens.add({
            targets: button,
            alpha: 1,
            duration: 800,
            delay: 2000,
            ease: 'Back.easeOut',
        });

        // Hover effects
        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scale: 1.1,
                duration: 150,
            });
        });

        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scale: 1,
                duration: 150,
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
