class EventHandler {

    //note (TO FIX): event handler shouldn't give two shits
    //about what kind of interface it's relaying data to
    //horrendous coupling follows:

    constructor() {
        this.mouse_down_pos = null;
        this.mouse_down = false;
        this.mouse_pos = null;
    }
    
    set_active() {

        const get_mouse_pos = (canvas, event) => {
            var rect = canvas.getBoundingClientRect();
            this.mouse_pos = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
            return this.mouse_pos;
        }

        document.addEventListener("keypress", function(event) {
            if (event.code == "Space") graphics.invert();
            else if (event.code == "KeyR") simulation.restart();
        });

        c.onmousemove = function(evt) {

            let pos = get_mouse_pos(c, evt);
            let control_panel = simulation.get_control_panel();
            let slider = control_panel.get_bound_slider();
            let jackson_network_UI = simulation.get_jackson_network_UI();

            control_panel.highlight_hovered_sliders(pos.x, pos.y);
            control_panel.highlight_hovered_buttons(pos.x, pos.y);
            jackson_network_UI.highlight_hovered_nodes(pos.x - X_ORIGIN, pos.y - Y_ORIGIN);

            if (slider != null) {
                slider.track_to(pos.x);
                SEEKER_SPEED = control_panel.get_seeker_speed();
                SEEKER_REACTION_MARGIN = control_panel.get_reaction_margin();
            }

            if (this.mouse_down) {

                let dx = (pos.x - this.mouse_down_pos.x);
                let dy = (pos.y - this.mouse_down_pos.y);

                X_ORIGIN += dx;
                Y_ORIGIN += dy;

                ctx.transform(1,0,0,1,dx,dy);
                this.mouse_down_pos.x = pos.x;
                this.mouse_down_pos.y = pos.y;
            }
        }

        c.onmousedown = function(evt) {

            let pos = get_mouse_pos(c, evt);
            let control_panel = simulation.get_control_panel();
            let slider = control_panel.get_clicked_slider(pos.x, pos.y);
            let button = control_panel.get_clicked_button(pos.x, pos.y);
            let jackson_network_UI = simulation.get_jackson_network_UI();

            jackson_network_UI.open_clicked_node_info_boxes(pos.x - X_ORIGIN, pos.y - Y_ORIGIN);

            if (slider != null) {
                slider.bind_to_mouse();
            } 
            else if (button != null) {
                let new_simulation_preset = button.get_name();
                simulation.change_jackson_network(new_simulation_preset);
            }
            else {
                if (!this.mouse_down) {
                    this.mouse_down_pos = {x : pos.x, y : pos.y};
                    this.mouse_down = true;
                }
            }
        }

        c.onmouseup = function(evt) {

            this.mouse_down = false;
            let control_panel = simulation.get_control_panel();
            control_panel.release_all()
        }
    }
}