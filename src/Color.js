class Color{
    constructor(r,g,b,a){
        this.r=r;
        this.g=g;
        this.b=b;   
        this.a=a;
    }
    hexComponent(val) {
        var hex = val.toString(16);
        if (hex.length == 1){
            return "0" + hex;
        }
        return hex;
    }
    getHex() {
        return "#" + this.hexComponent(this.r) + 
                    this.hexComponent(this.g) + 
                    this.hexComponent(this.b) + 
                    this.hexComponent(this.a);
    }
    invert() {
        return new Color(255 - this.r, 255 - this.g, 255 - this.b, this.a);
    }
}