// This will have the city.

import Firmin from '../gameobjects/firmin.js'

export default class City extends Phaser.Scene {
    constructor() {
        super('City')
    }

    init(data) {
        this.street = data.street || 'profile';
        this.spawn = data.spawn || 'subway';
    }

    create() {
        this.buildCityTilemap();
        this.buildFirmin();
        this.setBounds();
    }

    buildFirmin() {
        let firminSpawnX = 0;
        let firminSpawnY = 0;

        switch (this.spawn) {
        case 'building':
            const tunnelData = this.tilemap.getObjectLayer('Building Spawn').objects[0];
            firminSpawnX = tunnelData.x;
            firminSpawnY = tunnelData.y;
            break;
            
        case 'subway':
            const subwayData = this.tilemap.getObjectLayer('Subway Spawn').objects[0];
            firminSpawnX = subwayData.x;
            firminSpawnY = subwayData.y;
            break;
        default:
            break;
        }

        this.firmin = new Firmin(this, this.tilemapSpawnPointX + firminSpawnX, this.tilemapSpawnPointY + firminSpawnY);
        this.add.existing(this.firmin);
        this.firmin.setDepth(this.firminLayer);
        this.physics.add.existing(this.firmin);
        this.physics.add.collider(this.firmin, this.contourLayer);
    }

    setBounds() {
        const spawnX = this.tilemapSpawnPointX;
        const spawnY = this.tilemapSpawnPointY;

        const tileWidth = this.tilemap.tileWidth;
        const tileHeight = this.tilemap.tileHeight;

        const mapWidth = this.tilemap.width * tileWidth;
        const mapHeight = this.tilemap.height * tileHeight;

        const marginTiles = 1;

        const worldOrginX = spawnX - marginTiles * tileWidth;
        const worldOriginY = spawnY - marginTiles * tileHeight;
        
        const worldWidth = mapWidth + 2 * marginTiles * tileWidth;
        const worldHeight = mapHeight + 2 * marginTiles * tileHeight;

        this.cameras.main.setBounds(
            worldOrginX, 
            worldOriginY, 
            worldWidth, 
            worldHeight
        );
        this.physics.world.setBounds(
            spawnX, 
            spawnY, 
            mapWidth, 
            mapHeight
        );
    }

    buildCityTilemap() {
        this.tilemapSpawnPointX = 0;
        this.tilemapSpawnPointY = 0;

        switch(this.street) {
            case 'profile':
                this.tilemap = this.make.tilemap({ key: 'profileStreetTilemap' });
                this.tileset = this.tilemap.addTilesetImage('StreetTileset', 'streetTileset');
                break;
            
            case 'art':
                this.tilemap = this.make.tilemap({ key: 'artStreetTilemap' });
                this.tileset = this.tilemap.addTilesetImage('StreetTileset', 'streetTileset');
                break;

            case 'project':
                this.tilemap = this.make.tilemap({ key: 'projectStreetTilemap' });
                this.tileset = this.tilemap.addTilesetImage('StreetTileset', 'streetTileset');
                break;

            default:
                console.log('Unknown street:', this.street);
            break;
        }

        // TODO: More Decorative Layers.

        // TODO: Decide the player layer
        this.firminLayer = 7;

        // We only save this layer because its the important one
        
        // TODO: More Decorative Layers.

        this.contourLayer = this.tilemap.createLayer(
            'Contour', this.tileset,
            this.tilemapSpawnPointX, this.tilemapSpawnPointY
        ).setDepth(5);
        this.contourLayer.setCollisionByProperty({ collides: true });
    }
}
