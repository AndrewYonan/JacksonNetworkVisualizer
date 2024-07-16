class Slider {
    constructor(x,y,property_name,min,max,default_val) {
        this.x = x;
        this.y = y;
        this.property_name = property_name;
        this.rail_thickness = 5;
        this.slider_thickness = 20;
        this.slider_len = 50;
        this.rail_len = 220;
        this.position = 0;
        this.highlight = false;
        this.tracking = false;
        this.min_value = min;
        this.max_value = max;
        this.default_value = default_val;
        this.slider_position = this.get_slider_default_position();
    }
    get_slider_default_position() {
        let start = this.get_slider_start_position() 
        let end = this.get_slider_end_position();
        return start + ((this.default_value - this.min_value) / (this.max_value - this.min_value)) * (end - start);
    }
    reset() {
        this.slider_position = this.get_slider_default_position();
    }
    get_slider_start_position() {
        return this.x - this.rail_len/2 + this.slider_len/2;
    }
    get_slider_end_position() {
        return this.x + this.rail_len/2 - this.slider_len/2;
    }
    get_slider_position() {
        return this.slider_position;
    }
    track_to(px_val) {
        this.slider_position = Math.max(
            this.get_slider_start_position(), Math.min(this.get_slider_end_position(), px_val)
        );
    }
    release() {
        this.tracking = false;
    }
    bind_to_mouse() {
        this.tracking = true;
    }
    is_bound_to_mouse() {
        return this.tracking;
    }
    set_highlight(bool) {
        this.highlight = bool;
    }
    get_slider_interpolation() { 
        let interp = (this.slider_position - this.get_slider_start_position()) / (this.rail_len - this.slider_len);
        return this.min_value + Math.ceil(interp * (this.max_value - this.min_value));
    }   
    is_overlapping(x, y) {
        let slider_x = this.get_slider_position();
        let slider_y = this.y;
        if (x > slider_x - this.slider_len/2 && x < slider_x + this.slider_len/2) {
            if (y > slider_y - this.slider_thickness/2 && y < slider_y + this.slider_thickness/2) {
                return true;
            }
        }
        return false;
    }
    draw_slider() {

        let color;
        let cur_line_width = ctx.lineWidth;
        if (this.highlight || this.is_bound_to_mouse()) {
            ctx.lineWidth = 7;
            color = graphics.slider_highlight_color();
        } 
        else {
            color = graphics.slider_color();
            ctx.lineWidth = 3;
        } 

        let x = this.get_slider_position();

        graphics.fill_text(this.property_name, this.x - this.rail_len/2, this.y - this.slider_thickness/2 - 15, "Times New Roman", 20);
        graphics.trace_rect(x, this.y, this.slider_len, this.slider_thickness, color);
        graphics.fill_rect(x, this.y, this.slider_len, this.slider_thickness, graphics.background_color());
        ctx.lineWidth = cur_line_width;

    }

    show_slider_interpolation() {
        let str = this.get_slider_interpolation().toString();
        let x = this.get_slider_position();
        let y = this.y + this.slider_thickness + 15;
        graphics.fill_text(str, x, y, "Times New Roman", 20);
    }

    draw_rail() {
        graphics.trace_rect(this.x, this.y, this.rail_len, this.rail_thickness, graphics.slider_rail_color());
    }

    draw() {
        this.draw_rail();
        this.draw_slider();
        this.show_slider_interpolation();
    }
}