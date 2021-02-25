module.exports = class Vector3
{
    constructor(x = 0, y = 0, z = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /*Magnitude()
    {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    }

    Normalized()
    {
        var mag = this.Magnitude();
        return new Vector3(this.x/mag, this.y/mag, this.z/mag);
    }

    Distance (OtherVector = Vector3)
    {
        var direcao = new Vector3();
        direcao.x = OtherVector.x - this.x;
        direcao.y = OtherVector.y - this.y;
        direcao.z = OtherVector.z - this.z;
        
        return direcao.Magnitude();
    }

    ConsoleOutout()
    {
        return '(' + this.x + ',' + this.y + ',' + this.z + ')';
    }*/
}