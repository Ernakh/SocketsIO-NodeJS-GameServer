var shortID = require('shortid');
var Vector3 = require('./Vector3.js');

module.exports = class Jogador
{
    constructor()
    {
        this.nick = '';
        this.id = shortID.generate();
        this.position = new Vector3();
        this.rotation = new Vector3();
        // this.posX = 0.0;
        // this.posY = 0.0;
        // this.posZ = 0.0;
        // this.rotX = 0.0;
        // this.rotY = 0.0;
        // this.rotZ = 0.0;

        console.log('Jogador criado!' + this.id);
    }
}