class EventHandler {
    active() {
        document.addEventListener("keypress", function(event) {
            if (event.code == "Space") {
              graphics.invert();
            }
        });
    }
}