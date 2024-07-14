class graphics {
    static color_invert = false;
    static trace_square(x,y,s,color) {
        var cur_style = ctx.strokeStyle;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.rect(x - s/2, y - s/2, s, s);
        ctx.stroke();
        ctx.strokeStyle = cur_style;
    }
    static dot(x, y) {
        var cur_style = ctx.strokeStyle;
        var cur_line_width = ctx.lineWidth;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeStyle = cur_style;
        ctx.lineWidth = cur_line_width;
    }
    static clear(c,ctx) {
        let cur = ctx.fillStyle;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = graphics.background_color();
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = cur;
    }
    static invert() {
        this.color_invert = !this.color_invert;
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
    static background_color() {
        return graphics.treat(new Color(245, 245, 245, 255)).getHex();
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