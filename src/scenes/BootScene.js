// Boot Scene - Loads assets and initializes the game
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading the Chronicles...',
            style: {
                font: '20px Georgia',
                fill: '#FFD700',
            },
        });
        loadingText.setOrigin(0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: '0%',
            style: {
                font: '18px Georgia',
                fill: '#ffffff',
            },
        });
        percentText.setOrigin(0.5);

        // Update loading bar
        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xFFD700, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        // Load story scroll photos
        // Load each photo from storyText.js
        StoryData.scrolls.forEach(scroll => {
            if (scroll.photoPath) {
                const photoKey = 'photo_' + scroll.chapterId;
                this.load.image(photoKey, scroll.photoPath);
            }
        });

        // Optional: Load background images for chapters
        // this.load.image('background_tavern', 'assets/backgrounds/tavern.jpg');
        // this.load.image('background_forest', 'assets/backgrounds/forest.jpg');
        // this.load.image('background_cavern', 'assets/backgrounds/cavern.jpg');
        // this.load.image('background_garden', 'assets/backgrounds/garden.jpg');

        // Optional: Load audio
        // this.load.audio('music_menu', 'assets/sounds/menu_music.mp3');
        // this.load.audio('music_chapter1', 'assets/sounds/chapter1_music.mp3');
    }

    create() {
        // Hide loading message
        const loadingDiv = document.getElementById('loading');
        if (loadingDiv) {
            loadingDiv.style.display = 'none';
        }

        // Start menu scene
        this.scene.start('MenuScene');
    }
}
