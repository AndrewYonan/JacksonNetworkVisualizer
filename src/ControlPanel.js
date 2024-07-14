class ControlPanel {
    constructor() {

        this.sliders = []
        this.slider_margin = 175;
        this.start_y = 90;
        this.start_x = W/3 + 135

        this.seeker_speed_slider = new Slider(this.start_x, this.start_y, "Seeker Speed", 1, 8);
        this.seeker_reaction_margin_slider = new Slider(this.start_x + this.slider_margin, this.start_y, "Seeker Reaction Margin", 1, 20);
        
        this.sliders.push(this.seeker_speed_slider);
        this.sliders.push(this.seeker_reaction_margin_slider);

    }

    get_seeker_speed() {
        return this.seeker_speed_slider.get_slider_interpolation();
    }

    get_reaction_margin() {
        return this.seeker_reaction_margin_slider.get_slider_interpolation();
    }

    reset_properties() {
        for (let slider of this.sliders) {
            slider.reset();
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
    get_bound_slider(x,y) {
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
    }
}