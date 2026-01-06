// Game Over Scene
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Dark background
        const bg = this.add.graphics();
        bg.fillStyle(0x000000, 0.9);
        bg.fillRect(0, 0, width, height);

        // Title
        const title = this.add.text(width / 2, height / 3, StoryData.gameOver.title, {
            fontSize: '56px',
            fontFamily: 'Georgia',
            color: '#CC4444',
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 6,
        });
        title.setOrigin(0.5);

        // Message
        const message = this.add.text(width / 2, height / 2, StoryData.gameOver.message, {
            fontSize: '24px',
            fontFamily: 'Georgia',
            color: '#CCCCCC',
            align: 'center',
        });
        message.setOrigin(0.5);

        // Buttons
        this.createButton(width / 2 - 130, height / 2 + 100, 'Try Again', () => {
            this.scene.start('GameScene', { chapterId: 0 });
        });

        this.createButton(width / 2 + 130, height / 2 + 100, 'Main Menu', () => {
            this.scene.start('MenuScene');
        });

        // Fade in
        this.cameras.main.fadeIn(500);

        // Entrance animations
        title.setAlpha(0);
        message.setAlpha(0);

        this.tweens.add({
            targets: title,
            alpha: 1,
            y: title.y - 20,
            duration: 800,
            ease: 'Power2',
        });

        this.tweens.add({
            targets: message,
            alpha: 1,
            duration: 800,
            delay: 400,
        });
    }

    createButton(x, y, text, onClick) {
        const button = this.add.container(x, y);

        const bg = this.add.graphics();
        bg.fillStyle(GameConfig.colors.darkGold, 1);
        bg.fillRoundedRect(-100, -25, 200, 50, 10);
        bg.lineStyle(2, GameConfig.colors.gold, 1);
        bg.strokeRoundedRect(-100, -25, 200, 50, 10);

        const buttonText = this.add.text(0, 0, text, {
            fontSize: '20px',
            fontFamily: 'Georgia',
            color: '#FFFFFF',
        });
        buttonText.setOrigin(0.5);

        button.add([bg, buttonText]);
        button.setSize(200, 50);
        button.setInteractive({ useHandCursor: true });
        button.setAlpha(0);

        // Entrance animation
        this.tweens.add({
            targets: button,
            alpha: 1,
            y: y + 10,
            duration: 600,
            delay: 800,
            ease: 'Back.easeOut',
        });

        // Hover effects
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
