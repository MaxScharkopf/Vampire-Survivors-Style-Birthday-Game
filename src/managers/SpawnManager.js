// Spawn Manager - Handles enemy spawning for each chapter
class SpawnManager {
    constructor(scene, chapterId) {
        this.scene = scene;
        this.chapterId = chapterId;

        this.spawnTimer = 0;
        this.currentSpawnRate = GameConfig.spawn.baseSpawnRate * 1000; // Convert to ms
        this.enemyTypes = ChapterEnemies[chapterId] || ['shadowWraith'];

        // Build weighted spawn pool
        this.buildSpawnPool();
    }

    buildSpawnPool() {
        this.spawnPool = [];

        this.enemyTypes.forEach(enemyType => {
            const data = EnemyData[enemyType];
            if (data) {
                for (let i = 0; i < data.spawnWeight; i++) {
                    this.spawnPool.push(enemyType);
                }
            }
        });
    }

    update(delta) {
        this.spawnTimer -= delta;

        if (this.spawnTimer <= 0) {
            this.spawnEnemy();

            // Reset timer and accelerate spawn rate
            this.spawnTimer = this.currentSpawnRate;
            this.currentSpawnRate = Math.max(
                GameConfig.spawn.minSpawnRate * 1000,
                this.currentSpawnRate * GameConfig.spawn.spawnAcceleration
            );
        }
    }

    spawnEnemy() {
        // Check enemy cap
        const activeEnemies = this.scene.enemies.getChildren().filter(e => e.active).length;
        if (activeEnemies >= GameConfig.spawn.maxEnemiesOnScreen) {
            return;
        }

        // Choose random enemy type from pool
        const enemyType = Phaser.Utils.Array.GetRandom(this.spawnPool);

        // Choose random spawn position (off-screen)
        const spawnPos = this.getSpawnPosition();

        // Create enemy
        const enemy = new Enemy(this.scene, spawnPos.x, spawnPos.y, enemyType);
        this.scene.enemies.add(enemy);
    }

    getSpawnPosition() {
        const player = this.scene.player;
        const margin = 100;
        const spawnDistance = 400;

        // Choose random direction
        const angle = Math.random() * Math.PI * 2;

        // Position off-screen from player
        const x = player.x + Math.cos(angle) * spawnDistance;
        const y = player.y + Math.sin(angle) * spawnDistance;

        return { x, y };
    }

    spawnWave(count, enemyType = null) {
        for (let i = 0; i < count; i++) {
            const type = enemyType || Phaser.Utils.Array.GetRandom(this.spawnPool);
            const spawnPos = this.getSpawnPosition();

            this.scene.time.delayedCall(i * 100, () => {
                const enemy = new Enemy(this.scene, spawnPos.x, spawnPos.y, type);
                this.scene.enemies.add(enemy);
            });
        }
    }
}
