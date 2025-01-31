class JacksonNode {

    constructor(x,y,rate,tag,orientation) {
        this.x = x;
        this.y = y;
        this.set_tag(tag);
        this.server = new Server(x,y,rate,orientation);
        this.adjacent_nodes = [];
        this.transition_probabilities = [];
        this.jacksonNodeInfoBox = null;
        this.info_box_open = false;
    }

    open_info_box() {
        this.info_box_open = true;
        this.jacksonNodeInfoBox = new JacksonNodeInfoBox(this.x ,this.y);
    }

    close_info_box() {
        this.info_box_open = false;
        this.jacksonNodeInfoBox = null;
    }

    is_overlapping(x,y) {
        let size = this.server.get_size();
        if (x > this.x - size/2 && x < this.x + size/2) {
            if (y > this.y - size/2 && y < this.y + size/2) {
                return true;
            }
        }
        return false;
    }

    set_highlight(bool) {
        this.server.set_highlight(bool);
    }

    remove_seekers() {
        this.server.remove_seekers();
    }

    reset() {
        this.server.reset_params();
    }

    get_probabilities() {
        return this.transition_probabilities;
    }

    get_adjacent_nodes() {
        return this.adjacent_nodes;
    }

    follows_law_of_probability() {
        let margin = 0.0001;
        let sum = 0;
        if (this.adjacent_nodes.length == 0) return true;
        for (let i = 0; i < this.adjacent_nodes.length; ++i) {
            sum += this.transition_probabilities[i];
        }
        return (sum >= 1 - margin && sum <= 1 + margin);
    }

    add_adjacent_node(node, probability) {
        this.adjacent_nodes.push(node);
        this.transition_probabilities.push(probability);
    }

    get_probabilistic_adjacent_node() { //get random adjacent node based on transition probabilities
        let r = Math.random();
        let end = this.transition_probabilities[0];
        let idx = 0;
        while (r > end) end += this.transition_probabilities[++idx];
        return this.adjacent_nodes[Math.min(idx, this.adjacent_nodes.length - 1)];
    }

    get_server() {
        return this.server;
    }

    get_tag() {
        return this.tag;
    }

    get_end_of_line() {
        return this.server.get_end_of_line();
    }

    get_server_position() {
        return {x : this.server.x, y : this.server.y};
    }

    set_tag(tag) {
        if (tag != "entry" && tag != "reg" && tag != "exit" && tag != "entry-exit") this.tag = "reg";
        else this.tag = tag;
    }

    display_info_box() {
        graphics.trace_rect(this.x, this.y, 20, 20, graphics.text_reg_color());
    }

    display() {
        this.server.display();
        if (this.jacksonNodeInfoBox != null) {
            this.jacksonNodeInfoBox.display();
        }
    }
}