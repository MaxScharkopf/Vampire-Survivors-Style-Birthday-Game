// Story Scroll Scene - Displays story between chapters
class StoryScrollScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StoryScrollScene' });
    }

    init(data) {
        this.scrollType = data.scroll; // 'opening' or chapter id
        this.nextScene = data.nextScene;
        this.nextChapterId = data.chapterId;
        this.playerData = data.playerData; // Player stats to pass to next scene
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Background
        this.createScrollBackground();

        if (this.scrollType === 'opening') {
            this.showOpeningScroll();
        } else {
            this.showChapterScroll(this.scrollType);
        }

        // Continue prompt
        this.time.delayedCall(2000, () => {
            const continueText = this.add.text(width / 2, height - 60,
                'Click anywhere to continue...',
                {
                    fontSize: '18px',
                    fontFamily: 'Georgia',
                    color: '#AAAAAA',
                    fontStyle: 'italic',
                }
            );
            continueText.setOrigin(0.5);

            // Pulse animation
            this.tweens.add({
                targets: continueText,
                alpha: 0.3,
                duration: 1000,
                yoyo: true,
                repeat: -1,
            });

            // Click to continue
            this.input.once('pointerdown', () => {
                this.continueToNextScene();
            });

            // Space or Enter to continue
            this.input.keyboard.once('keydown-SPACE', () => {
                this.continueToNextScene();
            });
            this.input.keyboard.once('keydown-ENTER', () => {
                this.continueToNextScene();
            });
        });
    }

    createScrollBackground() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Parchment-like background
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x3d2f1f, 0x3d2f1f, 0x2d1f0f, 0x2d1f0f, 1);
        bg.fillRect(0, 0, width, height);

        // Add texture/noise effect
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 3;
            const alpha = Math.random() * 0.1;

            this.add.circle(x, y, size, 0x000000, alpha);
        }

        // Decorative border
        const border = this.add.graphics();
        border.lineStyle(5, GameConfig.colors.gold, 1);
        border.strokeRect(40, 40, width - 80, height - 80);

        // Inner border decoration
        border.lineStyle(2, GameConfig.colors.darkGold, 0.5);
        border.strokeRect(50, 50, width - 100, height - 100);
    }

    showOpeningScroll() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const opening = StoryData.opening;

        // Title
        const title = this.add.text(width / 2, 120, opening.title, {
            fontSize: '36px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 5,
            align: 'center',
        });
        title.setOrigin(0.5);

        // Decorative line
        const line = this.add.graphics();
        line.lineStyle(2, GameConfig.colors.gold, 1);
        line.lineBetween(width / 2 - 200, 170, width / 2 + 200, 170);

        // Opening text
        const text = this.add.text(width / 2, height / 2, opening.text, {
            fontSize: '22px',
            fontFamily: 'Georgia',
            color: '#DDDDDD',
            align: 'center',
            lineSpacing: 10,
            wordWrap: { width: width - 200 },
        });
        text.setOrigin(0.5);

        // Fade in animation
        title.setAlpha(0);
        line.setAlpha(0);
        text.setAlpha(0);

        this.tweens.add({
            targets: [title, line],
            alpha: 1,
            duration: 1000,
        });

        this.tweens.add({
            targets: text,
            alpha: 1,
            duration: 1500,
            delay: 500,
        });
    }

    showChapterScroll(chapterId) {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const scroll = StoryData.scrolls[chapterId];
        if (!scroll) {
            this.continueToNextScene();
            return;
        }

        // Chapter header
        const header = this.add.text(width / 2, 100, scroll.title, {
            fontSize: '32px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            stroke: GameConfig.colors.textShadow,
            strokeThickness: 5,
        });
        header.setOrigin(0.5);

        const subtitle = this.add.text(width / 2, 145, scroll.subtitle, {
            fontSize: '24px',
            fontFamily: 'Georgia',
            color: '#CCCCCC',
            fontStyle: 'italic',
        });
        subtitle.setOrigin(0.5);

        // Decorative separator
        const separator = this.add.graphics();
        separator.lineStyle(2, GameConfig.colors.gold, 1);
        separator.lineBetween(width / 2 - 250, 180, width / 2 + 250, 180);

        // Narrative text
        const narrative = this.add.text(width / 2, 240, scroll.narrative, {
            fontSize: '18px',
            fontFamily: 'Georgia',
            color: '#DDDDDD',
            align: 'center',
            lineSpacing: 8,
            wordWrap: { width: width - 200 },
        });
        narrative.setOrigin(0.5, 0);

        // Photo display
        const photoY = 350;
        const photoKey = 'photo_' + scroll.chapterId;
        let photo = null;
        let photoBorder = null;
        let photoBox = null;
        let photoBottomY = photoY + 100; // Default bottom position

        if (this.textures.exists(photoKey)) {
            // Display the actual loaded photo
            photo = this.add.image(width / 2, photoY, photoKey);

            // Scale to fit nicely (max 350x250 to leave room for text)
            const maxWidth = 350;
            const maxHeight = 250;
            const scaleX = maxWidth / photo.width;
            const scaleY = maxHeight / photo.height;
            const scale = Math.min(scaleX, scaleY, 1); // Don't upscale
            photo.setScale(scale);

            // Calculate where photo ends
            photoBottomY = photoY + (photo.displayHeight / 2);

            // Add decorative border around photo
            const borderPadding = 10;
            const borderWidth = photo.displayWidth + borderPadding * 2;
            const borderHeight = photo.displayHeight + borderPadding * 2;

            photoBorder = this.add.graphics();
            photoBorder.lineStyle(3, GameConfig.colors.gold, 1);
            photoBorder.strokeRect(
                width / 2 - borderWidth / 2,
                photoY - borderHeight / 2,
                borderWidth,
                borderHeight
            );
        } else {
            // Fallback: Show placeholder if image didn't load
            photoBox = this.add.rectangle(width / 2, photoY, 300, 200, 0x000000, 0.3);
            photoBox.setStrokeStyle(2, GameConfig.colors.gold, 1);

            const photoText = this.add.text(width / 2, photoY, '[Photo: ' + scroll.photoPath + ']', {
                fontSize: '14px',
                fontFamily: 'Georgia',
                color: '#888888',
                align: 'center',
            });
            photoText.setOrigin(0.5);
            photoBottomY = photoY + 100;
        }

        // Personal message - positioned below photo with spacing
        const messageY = photoBottomY + 30;
        const message = this.add.text(width / 2, messageY, scroll.personalMessage, {
            fontSize: '16px',
            fontFamily: 'Georgia',
            color: GameConfig.colors.text,
            align: 'center',
            lineSpacing: 6,
            wordWrap: { width: width - 180 },
        });
        message.setOrigin(0.5, 0);

        // Fade in animation
        const elements = [header, subtitle, separator, narrative, message];

        // Add photo elements if they exist
        if (photo) {
            elements.splice(4, 0, photo); // Insert photo before message
            if (photoBorder) {
                elements.splice(5, 0, photoBorder); // Insert border after photo
            }
        }
        if (photoBox) {
            elements.splice(4, 0, photoBox); // Insert photoBox before message
        }

        elements.forEach((el, index) => {
            if (el) { // Only animate if element exists
                el.setAlpha(0);
                this.tweens.add({
                    targets: el,
                    alpha: 1,
                    duration: 800,
                    delay: index * 200,
                });
            }
        });
    }

    continueToNextScene() {
        this.cameras.main.fadeOut(500);

        this.time.delayedCall(500, () => {
            if (this.nextScene === 'GameScene') {
                this.scene.start('GameScene', {
                    chapterId: this.nextChapterId,
                    playerData: this.playerData,
                    continue: this.playerData !== undefined && this.playerData !== null,
                });
            } else {
                this.scene.start(this.nextScene);
            }
        });
    }
}
