// Main game configuration and initialization
window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        width: GameConfig.width,
        height: GameConfig.height,
        parent: 'game-container',
        backgroundColor: '#1a0f1f',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false, // Set to true for physics debugging
            },
        },
        scene: [
            BootScene,
            MenuScene,
            GameScene,
            LevelUpScene,
            StoryScrollScene,
            GameOverScene,
            VictoryScene,
        ],
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        render: {
            pixelArt: false,
            antialias: true,
        },
    };

    const game = new Phaser.Game(config);

    // Global reference for debugging
    window.game = game;
};
