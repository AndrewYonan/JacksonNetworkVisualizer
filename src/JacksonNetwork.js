
class JacksonNetwork {

    constructor(preset) {

        this.preset = preset;
        this.nodes = [];

        this.builder = new JacksonNetworkBuilder(this.nodes);
        this.builder.configure(preset);
        this.nodes = this.builder.build();
        this.assert_law_of_probability();
        this.jackson_network_UI_interface = null;
    }   

    attach_UI_interface() {
        this.jackson_network_UI_interface = new JacksonNetworkUI(this);
    }   

    get_UI() {
        return this.jackson_network_UI_interface;
    }

    get_nodes() {
        return this.nodes;
    }

    assert_law_of_probability() {
        for (let node of this.nodes) {
            if (!node.follows_law_of_probability()) {
                throw new Error('Law of total probability not satisfied among nodes!');
            } 
        }
        return true;
    }

    print_probabilities() {
        for (let i = 0; i < this.nodes.length; ++i) {
            let str = "";
            let node = this.nodes[i];
            let adj_nodes = node.get_adjacent_nodes();
            console.log("node : " + node);
            for (let j = 0; j < adj_nodes.length; ++j) {
                str += ("going to " + adj_nodes[j] + " with probability " + node.get_probabilities()[j] + ",");
            }
            console.log(str);
        }
    }

    remove_seekers() {
        for (let node of this.nodes) {
            node.remove_seekers();
        }
    }

    reset_nodes() {
        for (let node of this.nodes) {
            node.reset();
        }
    }


    display_nodes() {
        let info_box_node = null;
        for (let node of this.nodes) {
            if (node.info_box_open) {
                info_box_node = node;
            }
            else {
                node.display();
            }
        }
        if (info_box_node) {
            info_box_node.display();
        }
    }

    get_random_entry_node() {
        let entry_nodes = [];
        for (let node of this.nodes) {
            if (node.get_tag() == "entry" || node.get_tag() == "entry-exit") {
                entry_nodes.push(node);
            }
        }
        if (entry_nodes.length == 0) {
            console.log("ERROR : no entry nodes");
            return null;
        }
        let rand = Random.rand_int(entry_nodes.length);
        return entry_nodes[rand];
    }
};