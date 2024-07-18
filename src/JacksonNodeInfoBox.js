class JacksonNodeInfoBox {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size_x = 150;
        this.size_y = 200;
        this.margin_dist = 30;
    }
    display() {
        let x = this.x + this.size_x/2 + this.margin_dist;
        let y = this.y - this.size_y/2 - this.margin_dist;
        graphics.trace_rect(x, y, this.size_x, this.size_y, graphics.info_box_fill_color());
        graphics.fill_rect(x, y, this.size_x, this.size_y, graphics.info_box_fill_color())
    }
}