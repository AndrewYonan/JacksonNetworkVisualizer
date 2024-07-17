class graphics {
    static color_invert = true;
    static trace_square(x,y,s,color) {
        let cur_style = ctx.strokeStyle;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.rect(x - s/2, y - s/2, s, s);
        ctx.stroke();
        ctx.strokeStyle = cur_style;
    }
    static trace_rect(x,y,w,h,color) {
        let cur_style = ctx.strokeStyle;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.rect(x - w/2, y - h/2, w, h);
        ctx.stroke();
        ctx.strokeStyle = cur_style;
    }
    static fill_rect(x,y,w,h,color) {
        let cur_fill = ctx.fillStyle;
        ctx.fillStyle = color;
        ctx.fillRect(x - w/2, y - h/2, w, h);
        ctx.fillStyle = cur_fill;
    }
    static dot(x, y) {
        let cur_style = ctx.strokeStyle;
        let cur_line_width = ctx.lineWidth;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeStyle = cur_style;
        ctx.lineWidth = cur_line_width;
    }
    static fill_text(text, x, y, font, font_size) {
        let cur = ctx.fillStyle;
        ctx.fillStyle = graphics.text_reg_color();
        ctx.font = font_size.toString() + "px " + font;
        ctx.fillText(text, x, y);
        ctx.fillStyle = cur;
    }
    static clear(c,ctx) {

        let cur_transform = ctx.getTransform();
        ctx.resetTransform();

        let cur = ctx.fillStyle;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = graphics.background_color();
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = cur;

        ctx.setTransform(cur_transform);
    } 
    static draw_button(text, x, y, w, h, highlight) {
        let cur_width = ctx.lineWidth;
        if (highlight) {
            ctx.lineWidth = 4;
            graphics.trace_rect(x,y,w,h,graphics.button_outline_color());
        } 
        graphics.fill_rect(x,y,w,h, graphics.button_color());
        ctx.textAlign = "center";
        ctx.fillStyle = graphics.text_reg_color();
        graphics.fill_text(text, x, y, "Arial", 18);
        ctx.lineWidth = cur_width;
    }
    static invert() {
        this.color_invert = !this.color_invert;
    }
    static button_outline_color() {
        return graphics.treat(new Color(10,10,10,255)).getHex();
    }
    static button_color() {
        return graphics.treat(new Color(240,240,240,255)).getHex();
    }
    static seeker_color() {
        return graphics.treat(new Color(30,170,30,255)).getHex()
    }
    static seeker_highlight_color() {
        return graphics.treat(new Color(40,220,40,255)).getHex()
    }
    static seeker_finished_color() {
        return graphics.treat(new Color(50, 50, 50,255)).getHex()
    }
    static server_color() {
        return graphics.treat(new Color(3,3,3,255)).getHex()
    }
    static server_highlight_color() {
        return graphics.treat(new Color(50,50,50,255)).getHex()
    }
    static text_reg_color() {
        return graphics.treat(new Color(0,0,0,255)).getHex();
    }
    static clock_color() {
        return graphics.treat(new Color(140, 140, 140, 255)).getHex();
    }
    static clock_highlight_color() {
        return graphics.treat(new Color(0, 0, 0, 255)).getHex();
    }
    static slider_rail_color() {
        return graphics.treat(new Color(100, 100, 100, 255)).getHex();
    }
    static slider_color() {
        return graphics.treat(new Color(40, 40, 40, 255)).getHex();
    }
    static slider_highlight_color() {
        return graphics.treat(new Color(75, 150, 40, 255)).getHex();
    }
    static background_color() {
        return graphics.treat(new Color(230, 230, 230, 255)).getHex();
    }
    static treat(color) {
        if (graphics.color_invert) {
            return color.invert();
        }
        else {
            return color;
        }
    }
}