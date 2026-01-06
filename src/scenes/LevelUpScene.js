// Level Up Scene - Choose upgrades
class LevelUpScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelUpScene' });
    }

    init(data) {
        this.player = data.player;
        this.playerLevel = data.level;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Semi-transparent background
        const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7);
        overlay.setOrigin(0);

        // Title
        const title = this.add.text(width / 2, 100, 'Level Up!', {
            fontSize: '48px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 6,
        });
        title.setOrigin(0.5);

        // Level display
        const levelText = this.add.text(width / 2, 160, 'Choose Your Divine Blessing', {
            fontSize: '24px',
            fontFamily: 'Georgia',
            color: '#CCCCCC',
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 4,
        });
        levelText.setOrigin(0.5);

        // Generate upgrade choices
        const upgradeManager = new UpgradeManager(this);
        const choices = upgradeManager.generateUpgradeChoices(this.player, 3);

        // Display choices
        const startY = 240;
        const spacing = 150;

        choices.forEach((choice, index) => {
            const x = width / 2;
            const y = startY + index * spacing;

            this.createUpgradeChoice(x, y, choice, () => {
                upgradeManager.applyUpgrade(this.player, choice);
                this.selectUpgrade(choice);
            });
        });

        // Entrance animation
        this.cameras.main.setAlpha(0);
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,
            duration: 300,
        });
    }

    createUpgradeChoice(x, y, choice, onClick) {
        const container = this.add.container(x, y);

        // Background card
        const cardWidth = 600;
        const cardHeight = 120;

        const bg = this.add.graphics();
        bg.fillStyle(0x1a1a2e, 0.9);
        bg.fillRoundedRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 15);
        bg.lineStyle(3, GameConfig.colors.gold, 1);
        bg.strokeRoundedRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 15);

        // Icon (emoji for now, could be replaced with sprites)
        const icon = this.add.text(-cardWidth / 2 + 40, 0, choice.icon, {
            fontSize: '48px',
        });
        icon.setOrigin(0.5);

        // Name
        const name = this.add.text(-cardWidth / 2 + 100, -20, choice.name, {
            fontSize: '22px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            fontStyle: 'bold',
        });
        name.setOrigin(0, 0.5);

        // Description
        const description = this.add.text(-cardWidth / 2 + 100, 15, choice.description, {
            fontSize: '16px',
            fontFamily: 'Georgia',
            color: '#CCCCCC',
            wordWrap: { width: cardWidth - 120 },
        });
        description.setOrigin(0, 0.5);

        container.add([bg, icon, name, description]);
        container.setSize(cardWidth, cardHeight);
        container.setInteractive({ useHandCursor: true });

        // Hover effect
        container.on('pointerover', () => {
            this.tweens.add({
                targets: container,
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 150,
            });

            bg.clear();
            bg.fillStyle(0x2a2a3e, 0.95);
            bg.fillRoundedRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 15);
            bg.lineStyle(4, GameConfig.colors.gold, 1);
            bg.strokeRoundedRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 15);
        });

        container.on('pointerout', () => {
            this.tweens.add({
                targets: container,
                scaleX: 1,
                scaleY: 1,
                duration: 150,
            });

            bg.clear();
            bg.fillStyle(0x1a1a2e, 0.9);
            bg.fillRoundedRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 15);
            bg.lineStyle(3, GameConfig.colors.gold, 1);
            bg.strokeRoundedRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 15);
        });

        container.on('pointerdown', () => {
            this.tweens.add({
                targets: container,
                scale: 0.95,
                duration: 50,
                yoyo: true,
                onComplete: onClick,
            });
        });

        // Entrance animation
        container.setAlpha(0);
        container.setScale(0.8);
        this.tweens.add({
            targets: container,
            alpha: 1,
            scale: 1,
            duration: 300,
            delay: 100,
            ease: 'Back.easeOut',
        });

        return container;
    }

    selectUpgrade(choice) {
        // Show selection feedback
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const feedbackText = this.add.text(width / 2, height - 100, 'Acquired: ' + choice.name, {
            fontSize: '28px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 5,
        });
        feedbackText.setOrigin(0.5);
        feedbackText.setAlpha(0);

        this.tweens.add({
            targets: feedbackText,
            alpha: 1,
            duration: 300,
        });

        // Return to game after short delay
        this.time.delayedCall(800, () => {
            this.cameras.main.fadeOut(200);
            this.time.delayedCall(200, () => {
                this.scene.resume('GameScene');
                this.scene.stop();
            });
        });
    }
}
