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
            if (event.code == "Space") {
              graphics.invert();
            }
            else if (event.code == "KeyR") {
                restart();
            }
        });
        c.onmousemove = function(evt) {
            let pos = get_mouse_pos(c, evt);
            controlPanel.highlight_hovered_sliders(pos.x, pos.y);
            let slider = controlPanel.get_bound_slider();
            if (slider == null) return;
            slider.track_to(pos.x);
        }
        c.onmousedown = function(evt) {
            let pos = get_mouse_pos(c, evt);
            let slider = controlPanel.get_clicked_slider(pos.x, pos.y);
            if (slider != null) slider.bind_to_mouse();
        }
        c.onmouseup = function(evt) {
            controlPanel.release_all()
        }
    }
}