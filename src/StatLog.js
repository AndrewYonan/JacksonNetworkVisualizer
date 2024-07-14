class StatLog {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.font_size = 25;
        this.font = "Times New Roman";
        this.clock_font_size = 30;
        this.finished_clock_font_size = 40
        this.clock_font = "Times New Roman";
        this.space = 200;
    }

    display_seekers_created() {
        let cur = ctx.fillStyle;
        ctx.fillStyle = graphics.text_reg_color();
        ctx.font = this.font_size.toString() + "px " + this.font;
        ctx.fillText("Created : " + seekers_created.toString(), this.x, this.y);
        ctx.fillStyle = cur;
    }

    display_seekers_processed() {
        let cur = ctx.fillStyle;
        ctx.fillStyle = graphics.text_reg_color();
        ctx.font = this.font_size.toString() + "px " + this.font;
        ctx.fillText("Processed : " + seekers_processed.toString(), this.x + this.space, this.y);
        ctx.fillStyle = cur;
    }

    display_seekers_alive() {
        let cur = ctx.fillStyle;
        ctx.fillStyle = graphics.text_reg_color();
        ctx.font = this.font_size.toString() + "px " + this.font;
        ctx.fillText("Alive : " + seekers.length.toString(), this.x + 2 * this.space, this.y);
        ctx.fillStyle = cur;
    }

    //horrendous method:
    display_clock() {
        
        let str = "";
        let milliseconds = frame_count % frame_rate;
        let seconds = Math.floor(frame_count / frame_rate);
        let minutes = Math.floor(seconds / 60);
        seconds %= 60;

        ctx.font = this.clock_font_size.toString() + "px " + this.clock_font;
        let cur_style = ctx.fillStyle;

        if (simulation_finished) {
            this.clock_font_size = this.finished_clock_font_size;
            ctx.fillStyle = graphics.clock_highlight_color();
        } 
        else {
            ctx.fillStyle = graphics.clock_color();
        } 

        if (minutes < 10) str += ("0" + minutes.toString());
        else str += minutes.toString();

        if (seconds < 10) str += (":0" + seconds.toString());
        else str += (":" + seconds.toString());

        if (milliseconds < 10) str += (":0" + milliseconds.toString())
        else str += (":" + milliseconds.toString());

        ctx.fillText(str, this.x + 5.5 * this.space, this.y);
        ctx.fillStyle = cur_style;

    }
    display_restart_message() {
        graphics.fill_text("Press \"R\" to restart", 50, H - 50, "Times New Roman", 25);
    }
    display() {
        this.display_seekers_created();
        this.display_seekers_processed();
        this.display_clock();
        this.display_restart_message();

    }
}