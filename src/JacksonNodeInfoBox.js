class JacksonNodeInfoBox {
    constructor(x,y) {

        this.x = x;
        this.y = y;
        this.size_x = 150;
        this.size_y = 200;
        this.margin_dist = 30;
        this.x += (this.size_x/2 + this.margin_dist);
        this.y -= (this.size_y/2 + this.margin_dist);

        this.sliders = [];
        this.make_slider();
    }

    make_slider() {
        this.sliders.push(new Slider(this.x, this.y, "Property", 1, 5, 2));
    }

    display_shade_box() {
        graphics.dot(this.x, this.y);
        let x = this.x;
        let y = this.y;
        graphics.trace_rect(x, y, this.size_x, this.size_y, graphics.info_box_fill_color());
        graphics.fill_rect(x, y, this.size_x, this.size_y, graphics.info_box_fill_color())
    }

    display_sliders() {
        for (let slider of this.sliders) {
            slider.draw();
        }
    }

    display() {
        this.display_shade_box();
        this.display_sliders();
    }
}