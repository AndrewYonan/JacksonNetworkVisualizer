class EventHandler {
    
    active() {

        const get_mouse_pos = (canvas, event) => {
            var rect = canvas.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }

        document.addEventListener("keypress", function(event) {
            if (event.code == "Space") graphics.invert();
            else if (event.code == "KeyR") simulation.restart();
        });

        c.onmousemove = function(evt) {

            let pos = get_mouse_pos(c, evt);
            let control_panel = simulation.get_control_panel();
            let slider = control_panel.get_bound_slider();

            control_panel.highlight_hovered_sliders(pos.x, pos.y);
            control_panel.highlight_hovered_buttons(pos.x, pos.y);

            if (slider == null) return;

            control_panel.set_most_recent_change_time(simulation.get_frame_count())
            slider.track_to(pos.x);
        }

        c.onmousedown = function(evt) {

            let pos = get_mouse_pos(c, evt);
            let control_panel = simulation.get_control_panel();

            let slider = control_panel.get_clicked_slider(pos.x, pos.y);
            let button = control_panel.get_clicked_button(pos.x, pos.y);

            if (slider != null) slider.bind_to_mouse();
            if (button != null) {
                let new_simulation_preset = button.get_name();
                simulation.change_jackson_network_structure(new_simulation_preset);
            }
        }

        c.onmouseup = function(evt) {
            let control_panel = simulation.get_control_panel();
            control_panel.release_all()
        }
    }
}