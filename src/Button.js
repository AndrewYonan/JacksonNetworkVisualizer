class Button {
    constructor(x,y,w,h,name) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.name = name;
        this.highlight = false;
    }

    get_name() {
        return this.name;
    }

    set_highlight(bool) {
        this.highlight = bool;
    }

    is_overlapping(x, y) {
        if (x > this.x - this.width/2 && x < this.x + this.width/2) {
            if (y > this.y - this.height/2 && y < this.y + this.height/2) {
                return true;
            }
        }
        return false;
    }
    
    draw() {
        graphics.draw_button(this.name, this.x, this.y, this.width, this.height, this.highlight);
    }
}