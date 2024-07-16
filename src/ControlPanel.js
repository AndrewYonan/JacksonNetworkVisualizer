class ControlPanel {
    constructor() {

        this.sliders = []
        this.buttons = [];
        this.button_texts = ["1-Queue", 
                            "2-Queue", 
                            "3-Queue", 
                            "Fork",
                            "Fan", 
                            "2-Fan",
                            "Star",
                            "Spiral",
                            "Waterfall"];

        this.slider_margin = 40;
        this.button_margin = 10;
        this.start_y = 90;
        this.start_x = W/3 + 135
        this.time_to_idle = 60;
        this.most_recent_change_time = 0;

        this.seeker_speed_slider = null;
        this.seeker_reaction_slider = null;

        this.create_seeker_speed_slider();
        this.create_seeker_reaction_slider();

        this.create_buttons();

    }
    set_most_recent_change_time(time) {
        this.most_recent_change_time = time;
    }

    sliders_have_been_changed_recently(time) {
        return (time - this.most_recent_change_time) < this.time_to_idle;
    }

    calculate_button_len(num_buttons, space_px, margin_px) {
        return space_px / (num_buttons) - margin_px; 
    }

    create_buttons(num) {

        let start_x = this.start_x - 300;
        let num_buttons = this.button_texts.length;
        let w = this.calculate_button_len(num_buttons, W - 150 - start_x, this.button_margin);
        let h = 60;

        for (let i = 0; i < this.button_texts.length; ++i) {
            let x = start_x + i*(w + this.button_margin);
            let y = H - 60;
            this.buttons.push(new Button(x,y,w,h,this.button_texts[i]));
        }
    }

    create_seeker_speed_slider() {

        let x = this.start_x;
        let y = this.start_y;

        this.seeker_speed_slider = new Slider(x, y, "Seeker Speed", 1, 8, 3);
        this.sliders.push(this.seeker_speed_slider);
    }

    create_seeker_reaction_slider() {

        let x = this.start_x + this.seeker_speed_slider.rail_len + this.slider_margin;
        let y = this.start_y;

        this.seeker_reaction_slider = new Slider(x, y, "Seeker Reaction Margin", 1, 20, 10);
        this.sliders.push(this.seeker_reaction_slider);
    }

    get_seeker_speed() {
        return this.seeker_speed_slider.get_slider_interpolation();
    }

    get_reaction_margin() {
        return this.seeker_reaction_slider.get_slider_interpolation();
    }

    reset_properties() {
        for (let slider of this.sliders) {
            slider.reset();
        }
    }

    highlight_hovered_buttons(x, y) {
        for (let button of this.buttons) {
            if (button.is_overlapping(x, y)) {
                button.set_highlight(true);
            }
            else button.set_highlight(false);
        }
    }

    highlight_hovered_sliders(x, y) {
        for (let slider of this.sliders) {
            if (slider.is_overlapping(x, y)) {
                slider.set_highlight(true);
            }
            else slider.set_highlight(false);
        }
    }

    get_clicked_slider(x, y) {
        for (let slider of this.sliders) {
            if (slider.is_overlapping(x, y)) {
                slider.bind_to_mouse();
                return slider;
            }
        }
        return null;
    }
    
    get_clicked_button(x, y) {
        for (let button of this.buttons) {
            if (button.is_overlapping(x, y)) {
                return button;
            }
        }
        return null;
    }

    get_bound_slider() {
        for (let slider of this.sliders) {
            if (slider.is_bound_to_mouse()) {
                return slider;
            }
        }
        return null;
    }

    release_all() {
        for (let slider of this.sliders) {
            slider.release();
        }
    }

    set_seeker_speed_slider(p) {
        this.seeker_speed_slider.set_position(p);
    }

    display() {
        for (let slider of this.sliders) {
            slider.draw();
        }
        for (let button of this.buttons) {
            button.draw();
        }

    }
}