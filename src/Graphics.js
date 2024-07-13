class graphics {
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
        ctx.clearRect(0, 0, c.width, c.height);
    }
}